import { InputLabel, Select, varObjects } from 'k-scaffold-jsx/template.js';
import { sheetTypes } from '../../data/variables.js';

export function Settings() {
  return (
    <article id="settings" className="settings paper-background nav-display">
      <h2 data-i18n="settings"></h2>
      <InputLabel label="whisper to gm">
        <InputLabel.Label>
          <h4 />
        </InputLabel.Label>
        <Select name="whisper" className="underlined" defaultValue="">
          <option value="" data-i18n="never"></option>
          <option value="/w gm" data-i18n="always"></option>
          <option
            value="?{Whisper to GM|No, |Yes,/w gm }"
            data-i18n="ask"
          ></option>
        </Select>
      </InputLabel>
      <InputLabel label="sheet type">
        <InputLabel.Label>
          <h4 />
        </InputLabel.Label>
        <Select
          name="sheet type"
          className="underlined"
          defaultValue="character"
          trigger={{ triggeredFuncs: ['displayArticles'] }}
        >
          {Array.from(sheetTypes).map((t) => (
            <option
              key={t}
              value={t}
              data-i18n={t}
              className={t === 'npc' ? 'uppercase' : undefined}
            ></option>
          ))}
        </Select>
      </InputLabel>
    </article>
  );
}
