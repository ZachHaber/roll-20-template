import { HiddenInput, NavButton, RadioInput } from 'k-scaffold-jsx/template.js';
import { sheetTypes, templateName } from '../data/variables.js';
import { MainRollTemplate } from './components/MainRollTemplate.js';
import { Character } from './pages/Character.js';
import { Settings } from './pages/Settings.js';

export const App = () => {
  return (
    <>
      <HiddenInput
        name="template start"
        defaultValue={`@{whisper}&{template:${templateName}} {{character_name=@{character_name}}} {{character_id=@{character_id}}}`}
        // defaultValue={`&{template:${templateName}} {{character_name=@{character_name}}} {{character_id=@{character_id}}}`}
      />
      <HiddenInput name="sheet state" defaultValue="settings" />
      <main id="main">
        <nav id="main-nav" className="sheet-nav">
          {sheetTypes.map((val) => (
            <NavButton
              key={val}
              name={val}
              className={`sheet-nav__tab ${val}`}
              data-i18n={`${val} sheet`}
              data-i18n-title={`${val} sheet button title`}
              role="heading"
              aria-level={5}
              trigger={{ triggeredFuncs: ['navigateSheet'] }}
            />
          ))}
          <NavButton
            name="settings"
            className="sheet-nav__tab pictos active settings"
            data-i18n-title="open the settings page"
            role="heading"
            aria-level={5}
            trigger={{ triggeredFuncs: ['navigateSheet'] }}
          >
            y
          </NavButton>
        </nav>
        <RadioInput name="roll state" value="2d20kh1"></RadioInput>
        <RadioInput name="roll state" value="1d20" defaultChecked></RadioInput>
        <RadioInput name="roll state" value="2d20kl1"></RadioInput>
        <RadioInput
          name="roll state"
          value="?{Roll|Advantage,2d20kh1|Normal,1d20|Disadvantage,2d20kl1}"
        ></RadioInput>
        <Character />
        <Settings />
        {/* <Select name="test" title="test2">
          <Option value="hi"></Option>
        </Select> */}
      </main>
      {/* <HiddenInput name='collapsed'/> */}
      {/* <input type="hidden" name="attr_sheet_version" value="0" />
      <div>
        <Select options={races} name="race" placeholder="Race" />
        <label>
          Level{" "}
          <input
            type="number"
            style="--quick-width: 4ch"
            className="noSpinner"
            min="0"
            max="20"
            value="1"
            name="attr_level"
          />
        </label>
        <Select options={classGroups} name="class" placeholder="Class" />
        <Select options={clericDomains} placeholder="Domain" name="domain" />
        <Select
          options={alignments}
          placeholder="--"
          labelKey="id"
          title="Alignment"
          name="alignment"
        />
        <Attributes />
        <label>
          <span className="mdi" aria-label="Max Health">
            favorite
          </span>
          <input
            type="number"
            className="noSpinner"
            value="10"
            min="0"
            name="attr_hp_max"
          />
        </label>
        <input type="number" inert value="10" name="attr_hp" />
      </div> */}
      <MainRollTemplate></MainRollTemplate>
    </>
  );
};
