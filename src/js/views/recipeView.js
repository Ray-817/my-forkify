import Fraction from 'fraction.js';

import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find the recipe! Please try another one...';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const servingBtn = e.target.closest('.btn--tiny');

      if (!servingBtn) return;

      const { update } = servingBtn.dataset;
      if (+update > 0) handler(+update);
    });
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const bookmarkBtn = e.target.closest('.btn--bookmark');

      if (!bookmarkBtn) return;

      handler();
    });
  }

  _generateMarkup(recipe) {
    return `      
        <figure class="recipe__fig">
          <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <i data-feather="clock" class="recipe__info-icon"></i>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <i data-feather="user" class="recipe__info-icon"></i>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-update="${
                recipe.servings - 1
              }" class="btn--tiny btn--decrease-servings">
                <i data-feather="minus-circle"></i>
              </button>
              <button data-update="${
                recipe.servings + 1
              }" class="btn--tiny btn--increase-servings">
                <i data-feather="plus-circle"></i>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <i data-feather="user"></i>
          </div>

          <button class="btn--round btn--bookmark ">
            <i data-feather="bookmark" class="${
              recipe.bookmarked ? 'btn--round__marked' : ''
            }"></i>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(this._generateMarkupIngridients).join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <i data-feather="arrow-right" class="search__icon"></i>
          </a>
        </div>`;
  }

  _generateMarkupIngridients(ing) {
    return `
            <li class="recipe__ingredient">
              <i data-feather="check" class="recipe__icon"></i>
              <div class="recipe__quantity">${
                ing.quantity ? new Fraction(ing.quantity).toFraction(true) : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
              </div>
            </li>`;
  }
}

export default new RecipeView();
