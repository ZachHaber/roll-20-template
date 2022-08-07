import {
  AdaptiveTextarea,
  Collapse,
  CustomControlRepeater,
  HeadedTextarea,
  TextInput,
} from "k-scaffold-jsx/template.js";

export function Lineage() {
  return (
    <section
      id="lineage"
      className="lineage paper-background repeating-container"
      aria-labelledby="lineage-header"
    >
      <h3 data-i18n="lineage abilities" id="lineage-header" />
      <CustomControlRepeater name="lineage">
        <Collapse />
        <TextInput
          name="name"
          className="underlined"
          data-i18n-placeholder="ability name"
        />
        <HeadedTextarea expanding>
          <AdaptiveTextarea name="description" className="underlined" />
        </HeadedTextarea>
      </CustomControlRepeater>
    </section>
  );
}
