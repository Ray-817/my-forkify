import PreviewView from './previewView';
// import icons from 'url:../../img/icons.svg';

class ResultView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes of your query! Please try again...';
}

export default new ResultView();
