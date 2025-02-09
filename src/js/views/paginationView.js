import View from './View.js';

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
        <i data-feather="arrow-right" class="search__icon"></i>
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
          <i data-feather="arrow-left" class="search__icon"></i>
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
               <i data-feather="arrow-left" class="search__icon"></i>
        <span>Page ${data.page - 1}</span>
      </button>

      <button data-goto="${
        data.page + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${data.page + 1}</span>
        <i data-feather="arrow-right" class="search__icon"></i>
      </button>`;
    }
    return markup;
  }
}

export default new PaginationView();
