import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BookmarkItem from './BookmarkItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BookmarkItem 
        title='Test Title' 
        url='http://wwww.testurl.com' 
      />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
