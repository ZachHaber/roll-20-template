import {
  cascades,
  debug,
  parseTriggerName,
  registerFunc,
} from 'k-scaffold-jsx/script.js';

registerFunc(function calcAttribute({ attributes, trigger }) {
  if (!trigger) {
    return;
  }
  const name = trigger.name.replace(/_mod$/, '');
  const value = attributes[name];
  switch (true) {
    case value < 4:
      return -2;
    case value < 7:
      return -1;
    case value < 15:
      return 0;
    case value < 18:
      return 1;
    case value >= 18:
      return 2;
    default:
      return 0;
  }
});

registerFunc(function calcDefense({ attributes, sections, trigger }) {
  if (!trigger) {
    return;
  }
  let name = trigger.name.replace(/_.+/, '');
  let activeArmorIDs = sections.repeating_armor.filter(
    (id) => attributes[`repeating_armor_${id}_equipped`]
  );
  let finesse = name === 'defense' ? 10 + Number(attributes.finesse_mod) : 0;
  let activeArmorBonus = activeArmorIDs.reduce(
    (total, id) =>
      (total += Number(attributes[`repeating_armor_${id}_${name}`])),
    0
  );
  return Number(attributes[`${name}_mod`]) + finesse + activeArmorBonus;
});

registerFunc(function calcAttack({ attributes, sections, trigger }) {
  if (!trigger) {
    return;
  }
  const [section, id] = parseTriggerName(trigger.name);
  const selectedAttribute = attributes[`${section}_${id}_type`];
  const selectedValue = selectedAttribute
    ? attributes[`${selectedAttribute}_mod`]
    : 0;
  debug({
    attack_modifier: attributes.attack_modifier,
    attack_bonus: attributes[`${section}_${id}_attack_bonus`],
    selectedValue,
    bonusCasc: cascades['attr_repeating_weapon_$X_attack_bonus'],
  });
  return (
    Number(attributes.attack_modifier) +
    Number(attributes[`${section}_${id}_attack_bonus`]) +
    Number(selectedValue)
  );
});
