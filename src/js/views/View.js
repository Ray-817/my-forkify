import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  _renderMessage(mess, func) {
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', func(mess));
    // console.error(mess);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _generateMarkupError(error = this._errorMessage) {
    return `<div class="error">
                  <div>
                    <svg>
                      <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                  </div>
                  <p>${error}</p>
                </div>`;
  }

  _generateMarkupSuccess(mess = this._succMessage) {
    return `<div class="error">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>${mess}</p>
                </div>`;
  }

  renderSpinner() {
    const markup = `<div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
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
    this._data = data;
    const newMarkup = this._generateMarkup(this._data);

    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

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
  }
}
