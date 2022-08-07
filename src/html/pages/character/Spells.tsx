import {
  AdaptiveTextarea,
  HeadedTextarea,
  InputLabel,
  NumberInput,
  RepeatingSection,
  Roller,
  Select,
  TextInput,
} from "k-scaffold-jsx/template.js";

const spellLevels = ["apprentice", "journeyman", "master"];

export function Spells() {
  return (
    <RepeatingSection name="spells" className="paper-background" collapsing>
      <RepeatingSection.NonRepeating>
        {spellLevels.map((level) => (
          <InputLabel key={level}>
            <InputLabel.Label>
              <h5 />
            </InputLabel.Label>
            <NumberInput name={`${level} per day`} className="underlined" />
            <NumberInput name={`${level} per day max`} className="underlined" />
          </InputLabel>
        ))}
      </RepeatingSection.NonRepeating>
      <div className="name">
        <div className="roller-container hover-container hover-container--two-row hover-container--two-column">
          <Roller
            name="describe"
            className="glyph-only hover-container__content roller--scroll align-start justify-start"
            trigger={{ listenerFunc: "castSpell" }}
          />
          <Roller
            name="cast 1"
            className="glyph-only hover-container__content align-start justify-end"
            trigger={{ listenerFunc: "castSpell" }}
          />
          <Roller
            name="cast 2"
            className="glyph-only hover-container__content align-end justify-start"
            trigger={{ listenerFunc: "castSpell" }}
          />
          <Roller
            name="cast 3"
            className="glyph-only hover-container__content align-end justify-end"
            trigger={{ listenerFunc: "castSpell" }}
          />
        </div>
        <TextInput
          name="name"
          className="underlined"
          role="heading"
          aria-level={5}
        />
      </div>
      <Select name="level" className="underlined">
        {spellLevels.map((level) => (
          <option key={level} value={level} data-i18n={level}></option>
        ))}
      </Select>
      {spellLevels.map((_name, index) => {
        const level = index + 1;
        return (
          <HeadedTextarea expanding key={level}>
            <AdaptiveTextarea name={`effect ${level}`} className="underlined" />
          </HeadedTextarea>
        );
      })}
      <HeadedTextarea expanding>
        <AdaptiveTextarea name="description" className="underlined" />
      </HeadedTextarea>
    </RepeatingSection>
  );
}
