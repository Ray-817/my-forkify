import View from './View';
// import icons from '../../img/icons.svg';

export default class PreviewView extends View {
  _parentElement = document.querySelectorAll('*');

  _generateMarkup() {
    const previewmarkup = this._data
      .map(d => this._generateMarkupPreview(d))
      .join('');
    // console.log(previewmarkup);
    return previewmarkup;
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    // debugger;
    // if (this._data.result.key) console.log(this._data);
    return ` <li class="preview">
            <a class="preview__link ${
              result.id === id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated ${
                  result.key ? '' : 'hidden'
                }">
                  <i data-feather="user"></i>
                </div>
            </div> 
            </a>
          </li>`;
  }
}
