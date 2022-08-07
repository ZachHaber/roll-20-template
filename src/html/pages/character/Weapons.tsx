import { default as clsx } from "clsx";
import {
  AdaptiveTextarea,
  Collapse,
  CustomControlRepeater,
  HeadedTextarea,
  InputLabel,
  NumberInput,
  Roller,
  Select,
  TextInput,
} from "k-scaffold-jsx/template.js";
import { attributes } from "../../../data/attributes.js";

export function Weapons() {
  return (
    <section
      id="weapons"
      className="weapons paper-background repeating-container"
      aria-labelledby="weapon-header"
    >
      <h3 id="weapon-header" data-i18n="weapons"></h3>
      {/* We'll put the character's generic attack modifier here. It will affect the attack stat of each weapon. */}
      <InputLabel role="heading" aria-level={5}>
        <NumberInput
          name="attack modifier"
          trigger={{ affects: ["repeating_weapon_$X_attack"] }}
          className="underlined"
        />
      </InputLabel>
      {/* The fieldset that Roll20 will generate our weapon repeating section. The mixin will handle the naming of the repeating section to `repeating_weapon` */}
      <CustomControlRepeater name="weapon">
        {/* A checkbox that will allow users to collapse the entry down to just the stats. */}
        <Collapse />
        <div className="span-all name expanded-container">
          <Roller
            name="roll"
            className="glyph-only"
            trigger={{ listenerFunc: "rollAttack" }}
          />
          <TextInput
            name="name"
            className="underlined"
            data-i18n-placeholder="weapon name"
            trigger={{ affects: ["repeating_weapon_$X_attack"] }}
          />
          <Select
            name="type"
            className="underlined expanded"
            trigger={{ affects: ["repeating_weapon_$X_attack"] }}
            data-i18n-placeholder="choose"
          >
            {attributes.map((attr) => (
              <option key={attr} value={attr} data-i18n={attr}></option>
            ))}
          </Select>
        </div>
        {/* The total attack stat. It's set to `readonly` so that only our sheetworkers will edit this. We'll write the calcAttack function later on in today's tutorial */}
        <InputLabel>
          <InputLabel.Label>
            <h5 />
          </InputLabel.Label>
          <NumberInput
            name="attack"
            className="underlined"
            readOnly
            trigger={{ calculation: "calcAttack" }}
          />
        </InputLabel>
        {/* An input so players can note that a weapon has bonus to attacks (or penalties). 
        It will affect the attack stat.
        We've added the `expanded` class to the divObj so that this field will get
        hidden when the repeating row is collapsed. This will allow us to save valuable
        vertical space. */}
        <InputLabel className="expanded" label="bonus">
          <InputLabel.Label>
            <h5 />
          </InputLabel.Label>
          <NumberInput
            name="attack bonus"
            className="underlined"
            trigger={{ affects: ["repeating_weapon_$X_attack"] }}
          />
        </InputLabel>
        {/*  Several text inputs for noting various aspects of the weapon */}
        {["damage", "range", "traits", "aspects"].map((name, index) => (
          <InputLabel
            key={name}
            className={clsx({ "span-all": index > 1, expanded: index > 0 })}
          >
            <InputLabel.Label>
              <h5 />
            </InputLabel.Label>
            <TextInput
              name={name}
              className="underlined"
              trigger={{ affects: ["repeating_weapon_$X_attack"] }}
            />
          </InputLabel>
        ))}
        <HeadedTextarea expanding>
          <AdaptiveTextarea
            name="description"
            className="underlined"
            trigger={{ affects: ["repeating_weapon_$X_attack"] }}
          />
        </HeadedTextarea>
      </CustomControlRepeater>
    </section>
  );
}
