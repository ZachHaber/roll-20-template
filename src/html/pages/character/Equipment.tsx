import {
  AdaptiveTextarea,
  Collapse,
  CustomControlRepeater,
  HeadedTextarea,
  InputLabel,
  NumberInput,
  TextInput,
} from "k-scaffold-jsx/template.js";

const coins = ["gp", "sp", "cp"];
export function Equipment() {
  return (
    <section
      aria-labelledby="equipment-header"
      id="equipment"
      className="equipment paper-background repeating-container"
    >
      <h3 data-i18n="equipment" id="equipment-header"></h3>
      <div className="wealth">
        {coins.map((coin) => (
          <InputLabel key={coin}>
            <InputLabel.Label>
              <span className="uppercase" />
            </InputLabel.Label>
            <NumberInput name={coin} className="underlined" />
          </InputLabel>
        ))}
        <HeadedTextarea className="other-treasures">
          <AdaptiveTextarea name="other treasures" className="underlined" />
        </HeadedTextarea>
      </div>
      <CustomControlRepeater name="equipment">
        <Collapse />
        <TextInput
          name="name"
          className="underlined"
          role="heading"
          aria-level={5}
        />
        <HeadedTextarea expanding>
          <AdaptiveTextarea name="description"></AdaptiveTextarea>
        </HeadedTextarea>
      </CustomControlRepeater>
    </section>
  );
}
