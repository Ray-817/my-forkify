import PreviewView from './previewView';

class ResultView extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes of your query! Please try again...';
}

export default new ResultView();
