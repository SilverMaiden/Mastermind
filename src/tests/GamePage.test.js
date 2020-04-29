// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import { render, fireEvent, waitForElement, waitFor} from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { store } from '../store';

import Game from '../components/Game/Game';
import LandingPage from '../components/LandingPage';

test('Game page renders rune cards and Attempts History component', async () => {
  const history = createMemoryHistory();
  const { getAllByText, getByText, getAllByTestId, } = render(
    <Provider store={store}>
      <Router history={history}>
        <Game  />
      </Router>
    </Provider>
  );

  let reduxStore;

  const cards = await waitForElement(() => getAllByText('a')) ;
  expect(cards.length === 4)

  const attemptsHistoryCard = await waitForElement(() => getByText('Attempts History')) ;
  expect(attemptsHistoryCard).toBeInTheDocument();

});

test('Game page renders arrow buttons for rune cards changes current guess on click', async () => {
  const history = createMemoryHistory();
  const { getAllByText, getByText, getAllByTestId, currentGuess } = render(
    <Provider store={store}>
      <Router history={history}>
        <Game currentGuess={[0,0,0,0]}/>
      </Router>
    </Provider>
  );

  let reduxStore;

  const upArrows = await waitForElement(() => getAllByTestId('up')) ;
  expect(upArrows.length).toEqual(4)
  fireEvent.click(upArrows[0])

  setTimeout(() => {
      const updatedCard =  getByText('b')
      expect(updatedCard.length).toEqual(1)
  }, 1000);


});



test('Game page renders Instructions component on right when easy mode is selected', async () => {
  const history = createMemoryHistory();
  const { getByText, getByTestId, } = render(
    <Provider store={store}>
      <Router history={history}>
        <LandingPage />
      </Router>
    </Provider>
    )

  const easyButton = getByText('Easy');
  fireEvent.click(easyButton);

  const reduxStore = store.getState().gameReducer;
  expect(reduxStore.easyMode).toEqual(true);

  const { findByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Game />
      </Router>
    </Provider>
    )

  const componentRight = await waitForElement(() => findByText('Instructions:'));
  expect(componentRight).toBeInTheDocument();

})

test('Game page renders Timer component on right when hard mode is selected', async () => {
  const history = createMemoryHistory();
  const { getByText, getByTestId, } = render(
    <Provider store={store}>
      <Router history={history}>
        <LandingPage />
      </Router>
    </Provider>
    )

  const hardButton = getByText('Hard');
  fireEvent.click(hardButton);

  const reduxStore = store.getState().gameReducer;
  expect(reduxStore.hardMode).toEqual(true);

  const { findByText } = render(
    <Provider store={store}>
      <Router history={history}>
        <Game />
      </Router>
    </Provider>
    )

  const componentRight = await waitForElement(() => findByText('Time remaining:'));
  expect(componentRight).toBeInTheDocument();

})



