// import icons from 'url:../../img/icons.svg';
import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');
  _rearchField = this._parentElement.querySelector('.search__field');

  getQuery() {
    const query = this._rearchField.value;
    this._clearInput();

    return query;
  }

  _clearInput() {
    this._rearchField.value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
