import Handlebars from 'handlebars';
import Modal from './modal.js';

export default class Cast {
  constructor({ json, setItems = [], selector, template, trimSpaceKeys, modalSelector, modalTemplate, modalMatchKey, helpers, modalDidMount }) {
    this.state = {
      json,
      selector: selector ? document.querySelector(selector) : null,
      template: template ? document.querySelector(template) : null,
      templateSource: '',
      trimSpaceKeys: trimSpaceKeys || [],
      modalSelector,
      modalTemplate,
      modalMatchKey,
      modalDidMount,
    };

    this.state.templateSource = this.state.template ? this.state.template.innerHTML : '';

    // register Handlebars Helpers
    if (helpers) {
      Handlebars.registerHelper(helpers);
    }

    if (setItems.length) {
      this.render(setItems);
    } else if (json) {
      this.fetchJSON();
    }
  }

  compileTemplate(item) {
    const source = this.state.templateSource;
    const template = Handlebars.compile(source);
    const html = template(item);
    return html;
  }

  renderCastList(items) {
    const castItems = items.map((castItem, index) => {
      const item = castItem;
      item.index = index + 1;
      item.number = (`00${item.index}`).slice(-2);
      item.text = item.text.replace(/\n/g, '<br>');
      this.state.trimSpaceKeys.forEach((key) => {
        item[key] = item[key].replace(/\s/g, '');
      });
      return this.compileTemplate(item);
    });
    this.state.selector.innerHTML = castItems.join('\n');
  }

  trimSpaceItems(items) {
    let trimData;
    if (this.state.trimSpaceKeys.length) {
      const newData = items.map((d) => {
        const item = d;
        this.state.trimSpaceKeys.forEach((key) => {
          item[key] = item[key].replace(/\s/g, '');
        });
        return item;
      });
      trimData = newData;
    }
    return trimData;
  }

  static addTrackingPath(items) {
    return items.map((item) => {
      const newItem = item;
      newItem.trackingPath = 'cast';
      newItem.trackingLabel = `${item.role.replace(/\s/, '')}（${item.cast.replace(/\s/, '')}）`;
      return newItem;
    });
  }

  render(data) {
    const newData = this.state.trimSpaceKeys.length
    ? this.trimSpaceItems(data)
    : data;

    const items = this.constructor.addTrackingPath(newData);

    if (this.state.selector && this.state.templateSource) {
      this.renderCastList(items);
    }

    if (this.state.modalSelector && this.state.modalTemplate) {
      const { modalMatchKey, modalDidMount } = this.state;

      new Modal({
        data,
        template: this.state.modalTemplate,
        selector: this.state.modalSelector,
        modalMatchKey,
        modalDidMount,
      });
    }
  }

  fetchJSON() {
    const init = {
      credentials: 'same-origin',
    };
    fetch(this.state.json, init)
    .then(response => response.json())
    .then((data) => {
      this.render(data);
    });
  }
}
