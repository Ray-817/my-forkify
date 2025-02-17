import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup(data) {
    const allPages = Math.ceil(data.results.length / data.resultsPerPage);
    // console.log(`Math.ceil(data.results.length / data.resultsPerPage)`);
    let markup = '';

    // 1. at page 1, and still have other pages
    if (data.page === 1 && allPages > 1) {
      markup = `
      <button data-goto="${
        data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${data.page + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
      `;
    }
    // 2. at page 1, no other pages

    // 3. last page
    if (data.page === allPages && allPages > 1) {
      markup = `
        <button data-goto="${
          data.page - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${allPages - 1}</span>
        </button>
      `;
    }
    // 4. other pages
    if (data.page !== 1 && data.page < allPages) {
      markup = `
      <button data-goto="${
        data.page - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${data.page - 1}</span>
      </button>

      <button data-goto="${
        data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${data.page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>`;
    }
    return markup;
  }
}

export default new PaginationView();
