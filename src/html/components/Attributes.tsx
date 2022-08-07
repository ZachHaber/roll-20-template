import { NumberInput, Roller, SheetSection } from 'k-scaffold-jsx/template.js';
import { Fragment } from 'react';
import { attributes } from '../../data/attributes.js';

export function Attributes() {
  return (
    <SheetSection name="attributes" className="paper-background">
      <h5 data-i18n="score" className="score-head"></h5>
      <h5 data-i18n="modifier" className="modifier-head"></h5>
      {attributes.map((attr) => (
        <Fragment key={attr}>
          <Roller
            name={attr}
            role="heading"
            aria-level={4}
            data-i18n={attr}
            trigger={{ listenerFunc: 'initiateRoll' }}
          />
          <NumberInput
            name={attr}
            className="underlined"
            trigger={{ affects: [`${attr}_mod`] }}
          />
          <NumberInput
            name={`${attr} mod`}
            readOnly
            className="underlined"
            trigger={{
              calculation: 'calcAttribute',
              affects: [
                'repeating_weapon_$X_attack_bonus',
                ...(attr === 'finesse' ? ['defense_total'] : []),
              ],
            }}
          />
        </Fragment>
      ))}
    </SheetSection>
  );
}
