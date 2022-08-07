import { Input, InputLabel } from "k-scaffold-jsx/template.js";

const sections: {
  label?: string;
  wrapperClass?: string;
  labelClass?: string;
  name: string;
  type?: "number" | "text";
}[] = [
  { label: "name", name: "character name", wrapperClass: "span-all" },
  { name: "lineage", wrapperClass: "span-2" },
  { name: "level", type: "number" },
  { name: "xp", labelClass: "uppercase", type: "number" },
  { name: "archetype", wrapperClass: "span-2" },
  { name: "profession", wrapperClass: "span-2" },
];
export function Header() {
  return (
    <header
      id="character-header"
      data-i18n-aria-label="character header"
      className="header span-all"
    >
      <img
        src="https://s3.amazonaws.com/files.d20.io/images/269781785/NLg9vcFOn6o_0dLEFcTDLg/original.png"
        className="header__image"
      />
      <div className="character-details paper-background">
        {sections.map(
          ({ name, label = name, labelClass, wrapperClass, type = "text" }) => (
            <InputLabel key={label} label={label} className={wrapperClass}>
              <InputLabel.Label>
                <h5 className={labelClass} />
              </InputLabel.Label>
              <Input name={name} type={type} className="underlined" />
            </InputLabel>
          )
        )}
      </div>
    </header>
  );
}
