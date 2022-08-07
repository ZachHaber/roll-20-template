import {
  CharacterLink,
  RollTemplateWrapper,
  TemplateConditional,
  TemplateAttr,
  TemplateHelper,
  TemplateConditionalRow,
} from "k-scaffold-jsx/template.js";
import { templateName } from "../../data/variables.js";

export function MainRollTemplate() {
  return (
    <RollTemplateWrapper name={templateName}>
      <div className="header">
        <TemplateConditional fieldBool="name">
          <h3>
            <TemplateAttr>name</TemplateAttr>
          </h3>
        </TemplateConditional>
        <CharacterLink />
      </div>
      <TemplateConditional fieldBool="roll">
        <div className="template-row">
          <TemplateConditional fieldBool="roll_name">
            <h5>
              <TemplateAttr>roll_name</TemplateAttr>
            </h5>
          </TemplateConditional>
          <TemplateConditional fieldBool="roll_name" invert>
            <h5 data-i18n="roll"></h5>
          </TemplateConditional>
          <span className="description">
            <TemplateAttr>roll</TemplateAttr>
            <TemplateConditional fieldBool="target">
              <div className="template-row template-row--summary">
                <TemplateHelper
                  func="rollBetween"
                  values="computed::result 1 1"
                >
                  <span
                    data-i18n="success"
                    className="capitalize result-display-true"
                  ></span>
                  <TemplateHelper.Else>
                    <span
                      data-i18n="failure"
                      className="capitalize result-display-false"
                    ></span>
                  </TemplateHelper.Else>
                </TemplateHelper>
              </div>
            </TemplateConditional>
          </span>
        </div>
      </TemplateConditional>
      <TemplateConditional fieldBool="damage">
        <div className="template-row">
          <TemplateConditional fieldBool="damage_type">
            <h5>
              <TemplateAttr>roll_name</TemplateAttr>
            </h5>
            <TemplateConditional.Else>
              <h5 data-i18n="damage"></h5>
            </TemplateConditional.Else>
          </TemplateConditional>
          <span className="description">
            <TemplateAttr>damage</TemplateAttr>
          </span>
        </div>
      </TemplateConditional>
      <TemplateConditionalRow fieldBool="range" />
      <TemplateConditionalRow fieldBool="traits" />
      <TemplateConditionalRow fieldBool="aspects" />
      <TemplateConditionalRow
        fieldBool="description"
        className="template-row--text"
      />
      <TemplateConditionalRow
        fieldBool="effect"
        className="template-row--text"
      />
      {[1, 2, 3].map((num) => (
        <TemplateConditionalRow
          key={num}
          fieldBool={`effect_${num}`}
          label={`effect ${num}`}
        />
      ))}

      {/* This template will be user extensible. User defined field/value combos will be displayed using the same format as other rows */}
      <TemplateHelper
        func="allprops"
        values="character_name character_id name roll_name roll damage damage_type effect effect_1 effect_2 effect_3 description range traits aspects target result"
      >
        <div className="template-row template-row--text">
          <h5>
            <TemplateAttr>key</TemplateAttr>
          </h5>
          <span className="description">
            <TemplateAttr>value</TemplateAttr>
          </span>
        </div>
      </TemplateHelper>
    </RollTemplateWrapper>
  );
}
