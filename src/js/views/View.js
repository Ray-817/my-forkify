import feather from 'feather-icons';

export default class View {
  _data;

  _renderMessage(mess, func) {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', func(mess));
    console.error(mess);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkupError(error = this._errorMessage) {
    return `<div class="error">
                  <div>
                    <i data-feather="alert-triangle"></i>
                  </div>
                  <p>${error}</p>
                </div>`;
  }

  _generateMarkupSuccess(mess = this._succMessage) {
    return `<div class="error">
                  <div>
                    <i data-feather="alert-smile"></i>
                  </div>
                  <p>${mess}</p>
                </div>`;
  }

  renderSpinner() {
    const markup = `<div class="spinner">
                      <div>
                        <i data-feather="loader" class="spinner"></i>
                      </div>
                    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(err = this._errorMessage) {
    this._renderMessage(err, this._generateMarkupError);
  }

  renderSuccess(succ = this._succMessage) {
    this._renderMessage(succ, this._generateMarkupSuccess);
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    try {
      this._clear();
      this._parentElement.insertAdjacentHTML(
        'afterbegin',
        this._generateMarkup(this._data)
      );
    } catch (error) {
      this.renderError(error);
    }
  }

  update(data) {
    // debugger;
    this._data = data;
    console.log(data);
    const newMarkup = this._generateMarkup(this._data);

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));

    console.log(this._parentElement);
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    console.log(newElements);
    console.log(curElements);
    if (false)
      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];
        // console.log(`old`);
        // console.log(newEl);
        // console.log(`new`);
        // console.log(curEl);
        // console.log(
        //   `////////////////////////////////////////////////////////////////////`
        // );
        if (
          (newEl.tagName === 'i' || newEl.tagName === 'svg') &&
          (curEl.tagName === 'i' || curEl.tagName === 'svg')
        ) {
          return;
        }

        if (
          newEl.firstChild?.nodeValue.trim() !== '' &&
          !newEl.isEqualNode(curEl)
        ) {
          curEl.textContent = newEl.textContent;
        }

        if (!newEl.isEqualNode(curEl)) {
          Array.from(newEl.attributes).forEach(attr => {
            curEl.setAttribute(attr.name, attr.value);
          });
        }
      });
    // console.log(
    //   `over!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1`
    // );
  }

  addObserver(parentEl = this._parentElement) {
    // console.dir(parentEl);
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // console.log(mutation);
        // console.dir(parentEl);

        // console.dir(mutation.addedNodes);

        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            const icons = node.querySelectorAll('i[data-feather]');
            if (icons.length > 0) {
              // console.log(icons);
              // console.log(`Detected icons: ${icons.length}`);
              requestAnimationFrame(() => {
                feather.replace({ selector: `.${parentEl} i` });
              });
            }
          }
        });
      });
    });
    observer.observe(parentEl, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-feather'],
    });
  }
}
