// https://forkify-api.herokuapp.com/v2
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { TIMEOUT_SEC_UPLOAD } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) module.hot.accept();

// 5ed6604591c37cdc054bc90b
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    // spinner
    // console.log(recipeView);
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
    // debugger;

    // loading recipes
    await model.loadRecipe(id);

    // rendering recepies
    recipeView.render(model.state.recipe);
  } catch (error) {
    // redering errors
    recipeView.renderError();
  }
};

const controlSerach = async function () {
  try {
    resultView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    model.state.search.page = 1;
    resultView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error + '⛔⛔⛔');
    resultView.renderError();
  }
};

const controlPagination = function (page) {
  // console.log(`this is controlPagination`);
  // model.state.search.page = page;
  // console.log(model.state.search.page);
  resultView.render(model.getSearchResultsPage(page));

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  model.updateServing(newServings);

  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);

  bookmarkView.render(model.state.bookmarks);
};

const controlInitBookmarks = function () {
  if (!model.state.bookmarks) return;
  bookmarkView.render(model.state.bookmarks);
};

const contrlUploadRecipe = async function (newRecipe) {
  try {
    await model.uploadRecipt(newRecipe);

    addRecipeView.renderSpinner();

    recipeView.render(model.state.recipe);

    addRecipeView.renderSuccess();

    bookmarkView.render(model.state.bookmarks);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, TIMEOUT_SEC_UPLOAD);
  } catch (error) {
    console.error('⛔⛔⛔' + error);
    addRecipeView.renderError();
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlInitBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSerach);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(contrlUploadRecipe);
};
init();
