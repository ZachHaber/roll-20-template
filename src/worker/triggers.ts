import {
  attributeSets,
  debug,
  parseTriggerName,
  registerFunc,
} from 'k-scaffold-jsx/script.js';
import { sheetTypes } from '../data/variables.js';

registerFunc(
  function navigateSheet({ trigger, attributes }) {
    let name = trigger ? trigger.name : String(attributes.sheet_state);
    let [, , page] = parseTriggerName(name);
    page = page.replace(/^nav-|-action$/g, '');
    attributeSets.navButtons.forEach((button) => {
      let element = button.replace(/-action/, '');
      $20(`.${element}`).removeClass('active');
    });
    $20(`.${page}`).addClass('active');
    attributes.sheet_state = page;
  },
  { type: ['opener'] }
);

registerFunc(
  function displayArticles({ attributes }) {
    sheetTypes.forEach((type) => {
      const action = attributes.sheet_type === type ? 'remove' : 'add';
      debug({ action, type });
      $20(`.${type}`)[`${action}Class`]('inactive');
    });
  },
  { type: ['opener'] }
);
