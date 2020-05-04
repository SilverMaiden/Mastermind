// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { store } from '../store';

import LandingPage from '../components/LandingPage';


test('Landing page renders correctly', () => {
  const history = createMemoryHistory();
  const { getByText, getByTestIdr } = render(
    <Provider store={store}>
      <Router history={history}>
        <LandingPage />
      </Router>
    </Provider>
  );

  const gameTitle = getByText('Mastermind');
  expect(gameTitle).toBeInTheDocument();

  const difficultyText = getByText('Choose your difficulty');
  expect(difficultyText).toBeInTheDocument();

  const easyButton = getByText('Easy');
  expect(easyButton).toBeInTheDocument();

  const hardButton = getByText('Hard');
  expect(hardButton).toBeInTheDocument();

});


test('Easy button on landing page lead to game page', () => {
  const history = createMemoryHistory();
  const { getByText, getByTestId,container } = render(
    <Provider store={store}>
      <Router history={history}>
        <LandingPage />
      </Router>
    </Provider>
  );
  const easyButton = getByText('Easy');
  fireEvent.click(easyButton);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/game');
});

test('Hard button on landing page leads to game page', () => {
  const history = createMemoryHistory();
  const { getByText, getByTestId,container } = render(
    <Provider store={store}>
      <Router history={history}>
        <LandingPage />
      </Router>
    </Provider>
  );

  const hardButton = getByText('Hard');
  fireEvent.click(hardButton);
  const currentUrl = history.entries[1].pathname;
  expect(currentUrl).toMatch('/game')
})


