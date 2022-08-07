import {
  AdaptiveTextarea,
  CheckboxInput,
  Collapse,
  CustomControlRepeater,
  HeadedTextarea,
  InputLabel,
  NumberInput,
  Repeater,
  TextInput,
} from "k-scaffold-jsx/template.js";

export function Armor() {
  return (
    <section
      id="armor"
      aria-labelledby="armor-header"
      className="armor paper-background repeating-container"
    >
      <h3 data-i18n="armor and shield"></h3>
      {/* <div className="repeat-columns">
        {["reduction value", "defense bonus", "traits", "aspects"].map(
          (label) => (
            <h5 key={label} data-i18n={label}></h5>
          )
        )}
      </div> */}
      <CustomControlRepeater
        name="armor"
        trigger={{ affects: ["defense_total", "reduction_value"] }}
      >
        <Collapse />
        <div className="span-all name">
          {/* This checkbox will mark this piece of armor or shield as being equipped or not,
              and will trigger a recalc of the defense score and reduction value.  */}
          <CheckboxInput
            name="equipped"
            defaultChecked
            trigger={{ affects: ["defense_total", "reduction_value"] }}
          />
          <TextInput
            name="name"
            className="underlined"
            data-i18n-placeholder="armor name"
          />
        </div>
        <InputLabel>
          <InputLabel.Label>
            <h5 />
          </InputLabel.Label>
          <NumberInput
            name="reduction"
            className="underlined"
            trigger={{ affects: ["reduction_value"] }}
          />
        </InputLabel>
        <InputLabel>
          <InputLabel.Label>
            <h5 />
          </InputLabel.Label>
          <NumberInput
            name="defense"
            className="underlined"
            trigger={{ affects: ["defense_total"] }}
          />
        </InputLabel>
        {["traits", "aspects"].map((name) => (
          <InputLabel key={name} className="span-all expanded">
            <InputLabel.Label>
              <h5 />
            </InputLabel.Label>
            <TextInput name={name} className="underlined" />
          </InputLabel>
        ))}
        <HeadedTextarea className="span-all" expanding>
          <AdaptiveTextarea name="defense" className="underlined" />
        </HeadedTextarea>
        {/* <div className="headed-textarea notes expanded span-all">
            <h5 data-i18n="notes"></h5>
            <AdaptiveTextarea
              name="notes"
              wrapperProps={{ className: "underlined" }}
            />
          </div> */}
      </CustomControlRepeater>
    </section>
  );
}
