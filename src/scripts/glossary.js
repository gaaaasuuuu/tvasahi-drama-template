import Handlebars from 'handlebars';
import Modal from './modal.js';

export default class Glossary {
  // constructor({ json, setItems = [], selector, guestSelector, guestTemplate, modalTemplate, trimSpaceKeys, helpers, customExpressions = [] }) {
  constructor(...args) {
    this.allItems = [];
    this.jsonList = [];
    this.states = [];
    args.forEach(({ jsonList, setItems = [], selector, guestSelector, guestTemplate, modalTemplate, modalMatchKey, modalDidMount, trimSpaceKeys, helpers, customExpressions = [], trackingPath }, index) => {
      const state = {
        glossaryClass: `glossary-dataId-${crypto.randomUUID()}`,
        jsonList,
        setItems,
        selector: selector ? document.querySelector(selector) : null,
        modalTemplate,
        modalMatchKey,
        modalDidMount,
        trimSpaceKeys: trimSpaceKeys || [],
        customExpressions,
        replacementItems: [],
        dataItems: [],
        dataIndex: 0,
        trackingPath,
      };

      state.templateSource = state.template ? state.template.innerHTML : '';
      if (helpers) {
        Handlebars.registerHelper(helpers);
      }
      if (setItems.length) {
        this.allItems.concat(setItems);
      }
      if (state.selector) {
        state.origin = state.selector.innerHTML;
        state.temporaryHTML = state.origin;
      }
      jsonList.forEach((url) => {
        this.jsonList.push({
          url,
          index,
          isCustomReplacement: customExpressions.length > 0,
          jsonName: url.match(/\/(.+?)\.json$/)[1],
        });
      });
      this.states.push(state);
    });

    if (this.jsonList.length) {
      this.fetchJSON();
    }
  }

  compileTemplate(item) {
    const source = this.states.templateSource;
    const template = Handlebars.compile(source);
    const html = template(item);
    return html;
  }

  addTrackingPath(jsonIndex, stateIndex) {
    const index = stateIndex || this.jsonList[jsonIndex].index;
    const state = this.states[index];
    const trackingPath = state.trackingPath;
    return trackingPath;
  }

  customExpressions(items, jsonIndex, stateIndex) {
    const index = stateIndex || this.jsonList[jsonIndex].index;
    const state = this.states[index];
    const { customExpressions, selector } = state;
    let temporaryHTML = selector.innerHTML;
    const newItems = items.map((item) => {
      const newItem = item;
      customExpressions.forEach((exp) => {
        const source = `<span class="popup-content ${state.glossaryClass}" data-index="${state.dataIndex}">${exp}</span>`;
        const template = Handlebars.compile(source);
        const after = template(item);
        const plainTemplate = Handlebars.compile(exp);
        const before = plainTemplate(item);
        const regExp = new RegExp(before);
        if (regExp.test(temporaryHTML)) {
          const id = crypto.randomUUID();
          temporaryHTML = temporaryHTML.replace(before, `{{${id}}}`);
          state.replacementItems.push({
            before: `{{${id}}}`,
            after,
          });
        }
        newItem.trackingPath = this.addTrackingPath(jsonIndex, index);
        newItem.trackingLabel = before;
      });
      state.dataIndex += 1;
      return newItem;
    });
    selector.innerHTML = temporaryHTML;
    state.dataItems = state.dataItems.concat(newItems);
  }

  defaultExpressions(items, jsonIndex, stateIndex) {
    const index = stateIndex || this.jsonList[jsonIndex].index;
    const state = this.states[index];
    const { selector } = state;
    let temporaryHTML = selector.innerHTML;
    const newItems = items.map((item) => {
      const newItem = item;
      const role = item.role.split(/\s/);
      const firstName = role[0];
      const lastName = role[role.length - 1];
      const cast = item.cast ? item.cast.replace(/\s/g, '') : '';
      const className = item.className || '';
      const before = `((${item.role.replace(/\s/g, '').replace(/／.+?$/, '')}|${firstName}|${lastName})(（|\\()${cast}(\\)|）))`;
      const regExp = new RegExp(before);
      const matchWordList = temporaryHTML.match(regExp);

      if (matchWordList !== null) {
        const matchWord = matchWordList[0];
        const id = crypto.randomUUID();
        temporaryHTML = temporaryHTML.replace(matchWord, `{{${id}}}`);
        state.replacementItems.push({
          // before: `{{#${state.dataIndex}}}`,
          before: `{{${id}}}`,
          after: `<span class="popup-content ${state.glossaryClass} ${className}" data-index="${state.dataIndex}">${matchWord}</span>`,
        });
      }

      if (item.matchPatterns && item.matchPatterns.length) {
        item.matchPatterns.forEach((matchString) => {
          if (matchString) {
            const id = crypto.randomUUID();
            temporaryHTML = temporaryHTML.replace(matchString, `{{${id}}}`);
            state.replacementItems.push({
              before: `{{${id}}}`,
              after: `<span class="popup-content ${state.glossaryClass} ${className}" data-index="${state.dataIndex}">${matchString}</span>`,
            });
          }
        });
      }
      state.dataIndex += 1;
      newItem.trackingPath = this.addTrackingPath(jsonIndex, index);
      newItem.trackingLabel = `${item.role.replace(/\s/g, '')}（${cast}）`;
      return newItem;
    });
    selector.innerHTML = temporaryHTML;
    state.dataItems = state.dataItems.concat(newItems);
  }

  static contextReplacements(state) {
    const { selector, replacementItems } = state;
    let temporaryHTML = selector.innerHTML;
    replacementItems.forEach((item) => {
      temporaryHTML = temporaryHTML.replace(item.before, item.after);
    });
    selector.innerHTML = temporaryHTML;
  }

  trimSpaceItems(index) {
    const items = this.states[index].dataItems;
    const newData = items.map((d) => {
      const item = d;
      this.states[index].trimSpaceKeys.forEach((key) => {
        item[key] = item[key].replace(/\s/g, '');
      });
      return item;
    });
    return newData;
  }

  fetchJSON() {
    const init = {
      credentials: 'same-origin',
    };
    Promise.all(this.jsonList.map(option => fetch(option.url, init)))
      .then(response => Promise.all(response.map(r => r.json())))
      .then((data) => {
        data.forEach((items, jsonIndex) => {
          if (this.jsonList[jsonIndex].isCustomReplacement) {
            this.customExpressions(items, jsonIndex);
          } else {
            this.defaultExpressions(items, jsonIndex);
          }
        });

        this.states.forEach((state, stateIndex) => {
          if (state.setItems.length) {
            if (state.customExpressions.length > 0) {
              this.customExpressions(state.setItems, null, stateIndex);
            } else {
              this.defaultExpressions(state.setItems, null, stateIndex);
            }
          }
        });
        this.states.forEach((state, i) => {
          this.constructor.contextReplacements(state);
        });
        this.states.forEach((state, index) => {
          new Modal({
            data: state.trimSpaceKeys.length ? this.trimSpaceItems(index) : state.dataItems,
            template: state.modalTemplate,
            selector: `.${state.glossaryClass}`,
            modalMatchKey: state.modalMatchKey,
            modalDidMount: state.modalDidMount,
          });
        });
      });
  }
}

function removeDuplicates(myArr, prop) {
  const newArr = myArr.reverse().filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
  return newArr.reverse();
}
