import Handlebars from 'handlebars';

function getCategory() {
  const el = document.querySelector("meta[name='category']");
  if (el) {
    const category = el.getAttribute('content');
    return category || 'other';
  }
  return 'other';
}

export default class Modal {
  constructor({ selector = '', data = '', template, modalMatchKey, modalDidMount }) {
    this.state = {
      baseDir: location.pathname.substring(1).split('/')[0],
      selector,
      data,
      template: template ? document.querySelector(template) : null,
      templateSource: '',
      isShowed: false,
      cardContent: '',
      modalMatchKey,
      modalDidMount,
    };

    this.state.templateSource = this.state.template ? this.state.template.innerHTML : '';

    this.wrapper = this.createWrapper();
    this.card = this.createCard();
    this.overlay = this.createOverlay();
    this.pathname = location.pathname;
    this.params = `category=${getCategory()}`;
    this.bodyOverflow = '';
    this.isDefaultBodyOverflow = true;
    this.bodyPosition = '';
    this.bodyWidth = '';

    document.body.appendChild(this.overlay);
    this.wrapper.appendChild(this.card);
    document.body.appendChild(this.wrapper);

    this.overlayVisibilityHidden = this.overlayVisibilityHidden.bind(this);

    const selectorItems = document.querySelectorAll(this.state.selector);
    this.onClickSelector(selectorItems);
  }

  createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-wrapper';
    wrapper.addEventListener('click', () => {
      document.body.style.overflow = '';
      this.hideOverlay();
      this.hideCard();
    });
    return wrapper;
  }

  createCard() {
    const card = document.createElement('div');
    card.className = 'modal-card';
    card.setAttribute('id', 'modal-card');
    card.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    return card;
  }

  createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    return overlay;
  }

  onClickSelector(selectorItems) {
    if (selectorItems.length) {
      Array.prototype.slice.call(selectorItems).forEach((el) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.showDialog(e.target);
        });
      });
    }
  }

  getIndexFromHref(el) {
    const { data, modalMatchKey } = this.state;
    const href = el.getAttribute('href');
    const index = data.findIndex((item) => {
      const isMatched = item[modalMatchKey].replace(/\s/g, '') === href.replace(/^(#\/|#)/, '').replace(/\s/g, '');
      return isMatched;
    });
    return index;
  }

  getRenderData(index) {
    const { data, modalMatchKey } = this.state;
    const renderData = data[index];
    const prevIndex = index === 0 ? data.length - 1 : index - 1;
    const nextIndex = index + 1 === data.length ? 0 : index + 1;
    renderData.prevItem = data[prevIndex];
    renderData.nextItem = data[nextIndex];
    renderData.isFirstItem = index === 0;
    renderData.isLastItem = index + 1 === data.length;
    if (modalMatchKey) {
      renderData.prevURL = `#/${renderData.prevItem[modalMatchKey]}`;
      renderData.nextURL = `#/${renderData.nextItem[modalMatchKey]}`;
    }
    return renderData;
  }

  compileTemplate(item) {
    const source = this.state.templateSource;
    const template = Handlebars.compile(source);
    const html = template(item);
    return html;
  }

  showDialog(el) {
    const hasHref = el.hasAttribute('href');
    const index = hasHref ? this.getIndexFromHref(el) : parseInt(el.getAttribute('data-index'), 10);
    const renderData = this.getRenderData(index);
    this.state.cardContent = this.compileTemplate(renderData);
    this.showOverlay();
    this.showCard(index);
  }

  showOverlay() {
    this.overlay.style.opacity = 1;
    this.overlay.style.left = 0;
    this.overlay.style.transition = 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
    this.overlay.style.visibility = 'visible';

    if (this.isDefaultBodyOverflow) {
      this.bodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      this.isDefaultBodyOverflow = false;
    }
  }

  onClickOtherItem() {
    const selectorItems = this.card.querySelectorAll('a');
    if (selectorItems.length) {
      this.onClickSelector(selectorItems);
    }
  }

  showCard(index) {
    this.card.innerHTML = this.state.cardContent;
    this.card.style.left = 0;
    this.card.style.transform = 'translate(0px, 0px)';
    this.card.style.opacity = 1;
    this.card.style.visibility = 'visible';
    this.wrapper.style.visibility = 'visible';
    this.onClickOtherItem();
    const { modalDidMount } = this.state;
    if (typeof modalDidMount === 'function') {
      modalDidMount();
    }
  }

  overlayVisibilityHidden() {
    this.overlay.style.visibility = 'hidden';
    this.overlay.removeEventListener('transitionend', this.overlayVisibilityHidden, false);
    this.overlay.removeEventListener('WebkitTransitionend', this.overlayVisibilityHidden, false);
  }

  hideOverlay() {
    this.overlay.style.left = '-100%';
    this.overlay.style.opacity = 0;
    this.overlay.style.transition = 'left 0ms cubic-bezier(0.23, 1, 0.32, 1) 400ms, opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
    this.overlay.addEventListener('transitionend', this.overlayVisibilityHidden, false);
    this.overlay.addEventListener('WebkitTransitionend', this.overlayVisibilityHidden, false);

    document.body.style.overflow = this.bodyOverflow;
    this.isDefaultBodyOverflow = true;
    // document.body.style.position = this.bodyPosition;
    // document.body.style.width = this.bodyWidth;
  }

  hideCard() {
    this.card.style.left = '-100%';
    this.card.style.transform = 'translate(0px, -64px)';
    this.card.style.opacity = 0;
    this.card.style.visibility = 'hidden';
    this.card.scrollTop = 0;
    this.wrapper.style.visibility = 'hidden';
  }
}
