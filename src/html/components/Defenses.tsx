import {
  InputLabel,
  NumberInput,
  Roller,
  SheetSection,
} from 'k-scaffold-jsx/template.js';

export function Defenses() {
  return (
    <SheetSection name="defenses" label="defense" className="paper-background">
      <label
        htmlFor="defense-bonus"
        data-i18n="defense"
        role="heading"
        aria-level={4}
      ></label>
      <NumberInput
        name="defense total"
        readOnly
        className="underlined"
        defaultValue={10}
        trigger={{ calculation: 'calcDefense' }}
      />
      <NumberInput
        id="defense-bonus"
        name="defense mod"
        className="underlined"
        trigger={{ affects: ['defense_total'] }}
      />
      <label
        htmlFor="reduction-bonus"
        data-i18n="reduction"
        role="heading"
        aria-level={4}
      ></label>
      <NumberInput
        name="reduction value"
        readOnly
        className="underlined"
        defaultValue={10}
        trigger={{ calculation: 'calcDefense' }}
      />
      <NumberInput
        id="reduction-bonus"
        name="reduction mod"
        className="underlined"
        trigger={{ affects: ['reduction_value'] }}
      />
      {/* The next few lines relate to the endurance. We're going to adjust the endurance format from what it is on the paper sheet */}
      <label
        htmlFor="endurance"
        className="endurance-label"
        data-i18n="endurance"
        role="heading"
        aria-level={4}
      ></label>
      <div className="boxed span-2">
        <NumberInput name="endurance" id="endurance" defaultValue={0} />
        <span className="slash">/</span>
        <NumberInput
          name="endurance max"
          trigger={{ affects: ['defence'], triggeredFuncs: ['calcHealth'] }}
        />
      </div>
      <Roller
        name="saving throw"
        className="span-2"
        role="heading"
        aria-level={4}
        data-i18n="saving throw"
        trigger={{ listenerFunc: 'initiateRoll' }}
      />
      <NumberInput name="saving throw" className="underlined" />
      {/* <RollerLabel
        inputType="number"
        inputProps={{
          name: "saving throw",
          className: "underlined",
        }}
        name="saving throw"
        role="heading"
        aria-level={4}
        data-i18n="saving throw"
      /> */}
      {/*  We're removing the attack modifier summary here because we'll incorporate it directly into the weapons section. */}
      <InputLabel style={{ display: 'contents' }}>
        <InputLabel.Label>
          <h4 className="span-2" />
        </InputLabel.Label>
        <NumberInput name="myth points" className="underlined" />
      </InputLabel>
    </SheetSection>
  );
}
