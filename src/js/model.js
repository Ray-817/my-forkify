import { async } from 'regenerator-runtime';
import { API_URL, RESULT_PER_PAGE, API_KEY } from './config';
import { AJAX } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

/**
 *Create the pecipe object base on the data we recieve
 * @param {Object} data
 * @returns
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
    sourceUrl: recipe.source_url,
    imageUrl: recipe.image_url,
    bookmarked: false,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const recipeData = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);

    state.recipe = createRecipeObject(recipeData);

    if (state.bookmarks.some(bookmark => bookmark.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const serachData = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    let searchResult = await serachData.data.recipes;

    state.search.results = searchResult.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = start + state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServing = function (servings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * servings;
  });

  state.recipe.servings = servings;
};

const presisBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe) {
  state.bookmarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  presisBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  presisBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks()

export const uploadRecipt = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) {
          throw new Error();
        }

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const uploadRecipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: newRecipe.cookingTime,
      servings: newRecipe.servings,
      ingredients,
      bookmarked: true,
    };

    const sendBackData = await AJAX(`${API_URL}?key=${API_KEY}`, uploadRecipe);
    state.recipe = createRecipeObject(sendBackData);

    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
