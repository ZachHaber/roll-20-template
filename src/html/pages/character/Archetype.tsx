import {
  AdaptiveTextarea,
  Collapse,
  CustomControlRepeater,
  HeadedTextarea,
  NumberInput,
  TextInput,
} from "k-scaffold-jsx/template.js";

export function Archetype() {
  return (
    <section
      aria-labelledby="archetype-header"
      id="archetype"
      className="archetype paper-background repeating-container"
    >
      <h3 id="archetype-header" data-i18n="archetype abilities"></h3>
      <CustomControlRepeater name="archetype">
        <Collapse />
        <TextInput
          name="name"
          className="underlined"
          data-i18n-placeholder="ability name"
        />
        <NumberInput name="rating" className="underlined" />
        <HeadedTextarea expanding>
          <AdaptiveTextarea name="description" className="underlined" />
        </HeadedTextarea>
      </CustomControlRepeater>
    </section>
  );
}
