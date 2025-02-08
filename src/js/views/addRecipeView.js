import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _errorMessage = 'Wrong format! Please use the correct format =)';
  _succMessage = 'Recipe was successfully uploaded!';

  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  constructor() {
    super();
    // this._addHandlerShowandCloseWindow();
    this._addHandlerShowAndCloseWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowAndCloseWindow() {
    [this._openBtn, this._closeBtn].forEach(btn => {
      btn.addEventListener('click', () => {
        this.toggleWindow();
      });
    });
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('click');
      // debugger;
      // const uploadBtn = e.target.closest('.upload__btn');

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
