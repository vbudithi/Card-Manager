import React from 'react';
import ReactDOM from 'react-dom';
import SearchInput from './SearchInput';

function App() {
  return <SearchInput />;
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
