import {
  AttributesProxy,
  capitalize,
  debug,
  kGetAttrs,
  parseTriggerName,
  registerListener,
} from "k-scaffold-jsx/script.js";
import { attributes } from "../data/attributes.js";
const rollGet = ["roll_state", "whisper"];

interface RollObj {
  name: string;
  [value: string]: string;
}
/**
 * Function that extracts the information of which roll was clicked from the name of the button.
 * @param string - The triggerName to be parsed
 * @returns an array containing the repeating section name, the row id, and the field that is referenced.
 */
function extractRollInfo(string: string) {
  //Get the information on which button was clicked.
  const [section, id, button] = parseTriggerName(string);
  //Convert the button name into the name of the relevant attribute (e.g. saving-throw => saving_throw). Also removes the `-action` suffix of the action button to get the raw field name.
  const field = button.replace(/\-?action/, "").replace(/\-/g, "_");
  return [section, id, field];
}

/**
 * Function to translate our advantage query
 * @returns {string}
 */
function translateAdvantageQuery(): string {
  //Iterate throught the advantage options and create the translated strings.
  const options = [
    ["advantage", "2d20kh1"],
    ["normal", "1d20"],
    ["disadvantage", "2d20kl1"],
  ]
    .map((arr) => {
      const translated = capitalize(getTranslationByKey(arr[0]) || "");
      return `${translated},${arr[1]}`;
    })
    .join("|");
  return `?{${capitalize(getTranslationByKey("roll with") || "")}|${options}}`;
}

/**
 * Our function that will actually initiate the roll.
 * @param  attributes - Our object containing the attributes needed for the roll
 * @param  rollObj - The object containing the fields to send with the roll
 */
async function initiateRollBase(
  attributes: AttributesProxy,
  rollObj: RollObj
): Promise<void> {
  if (rollObj.roll) {
    rollObj.roll = rollObj.roll.replace(/@\{roll_state\}/, (match) => {
      //If roll state is set to ask the user what to do, we need to assemble a translated version of the query.
      if (/\?\{/.test(String(attributes.roll_state))) {
        return translateAdvantageQuery();
      } else {
        //Otherwise just use the roll_state
        return String(attributes.roll_state);
      }
    });
  }
  //Assemble our completed roll string.
  const message = Object.entries(rollObj).reduce((text, [field, content]) => {
    return (text += `{{${field}=${content}}}`);
  }, `@{template_start}`);
  debug(`initiateRollBase`, { message, rollObj });
  //Send the completed roll string to the chat parser.
  const roll = await startRoll(message);
  //An object to aggregate the changes that need to be made to what is displayed in the roll output.
  const computeObj: { result?: number } = {};
  //If the roll contained a result, target, and roll field with an inline roll in them, then we want to compare the roll and target values to determine if the result was a success or failure.
  debug(`initiateRollBase results`, { roll });
  if (roll.results.result && roll.results.target && roll.results.roll) {
    computeObj.result =
      roll.results.roll.result >= roll.results.target.result ? 1 : 0;
  }
  //Now we finish our roll, which tells Roll20 to actually display it in chat.
  finishRoll(roll.rollId, computeObj);
}

registerListener(
  /**
   * Our generic rolling function. This will be used for our simple attribute and saving throw rolls that need very little logic.
   * @param event - The Roll20 event object.
   */
  function initiateRoll(event) {
    const [, , field] = extractRollInfo(event.triggerName);
    debug("initiateRoll Triggered", event);
    if (!field) {
      return;
    }
    const attributeRef = attributes.includes(field)
      ? `${field}_mod`
      : undefined;
    kGetAttrs({
      props: rollGet,
      callback: (attributes) => {
        //object that will aggregate all the roll template fields we will need to send to chat.
        const rollObj: RollObj = {
          name: `^{${field.replace(/_/g, " ")}}`,
          roll: attributeRef
            ? `[[@{roll_state} + 0@{${attributeRef}}]]`
            : `[[@{roll_state}]]`,
          target: `[[0@{saving_throw}]]`,
          result: `[[0[computed value]]]`,
        };
        //Send the roll.
        initiateRollBase(attributes, rollObj);
      },
    });
  }
);

registerListener(
  /**
   * Our attack roll function. This won't need much logic, but has a slightly different button/attribute relationship that we need to account for.
   * @param event - The Roll20 event object.
   * @returns
   */
  function rollAttack(event) {
    const [section, id, field] = extractRollInfo(event.triggerName);
    const row = `${section}_${id}`;
    debug("rollAttack Triggered", event, row);
    kGetAttrs({
      props: [...rollGet, `${row}_type`, `${row}_damage`],
      callback: (attributes) => {
        const type = attributes[`${row}_type`] as string;
        const rollObj: RollObj = {
          name: `@{${row}_name}`,
          roll_name: "^{attack}",
          roll: `[[@{roll_state} + 0@{attack_modifier}[${getTranslationByKey(
            "attack modifier"
          )}] + 0@{${row}_attack_bonus}[${getTranslationByKey(
            "bonus"
          )}] + 0@{${type}_mod}[${getTranslationByKey(type)}]]]`,
          range: `@{${row}_range}`,
          traits: `@{${row}_traits}`,
          aspects: `@{${row}_aspects}`,
          description: `@{${row}_description}`,
        };
        if (attributes[`${row}_damage`]) {
          rollObj.damage = `[[@{${row}_damage}]]`;
        }
        initiateRollBase(attributes, rollObj);
      },
    });
  }
);

registerListener(
  /**
   * Our function to cast spells. This will be our most complex roll function because it is going to have the ability to affect attributes on the sheet in reaction to the roll.
   * @param event - The Roll20 event object.
   * @returns
   */
  function castSpell(event) {
    const [section, id, field] = extractRollInfo(event.triggerName);
    debug("castSpell Triggered", event);
    if (!field) {
      return;
    }
    const row = `${section}_${id}`;

    //Assemble the attributes to get for the spell being cast.
    const spellGet = ["apprentice", "journeyman", "master"].reduce(
      (arr, level) => {
        arr.push(`${level}_per_day`);
        return arr;
      },
      [...rollGet, `${row}_level`]
    );

    kGetAttrs({
      props: spellGet,
      //Note that his callback is asynchronous because we are going to wait for the roll to resolve and then do some additional operations.
      callback: async (attributes) => {
        const level = attributes[`${row}_level`];
        const rollObj: RollObj = {
          name: `@{${row}_name}`,
          description: `@{${row}_description}`,
        };
        if (field !== "describe") {
          const num = field.replace(/.+?(\d+)$/, "$1");
          rollObj.effect = `@{${row}_effect_${num}}`;
        } else {
          [1, 2, 3].forEach((num) => {
            rollObj[`effect_${num}`] = `@{${row}_effect_${num}}`;
          });
        }
        await initiateRollBase(attributes, rollObj);
        //If we are actually casting the spell, decrement the spells per day for that level of spell to a minimum of zero.
        if (field !== "describe") {
          attributes[`${level}_per_day`] = Math.max(
            (attributes[`${level}_per_day`] as number) - 1,
            0
          );
          attributes.set();
        }
      },
    });
  }
);
