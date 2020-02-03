import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import LandingPage from './components/LandingPage';
import Game from './components/Game/Game';

test('renders main header', () => {
    const{getByText} = render(<App />);
    const linkElement = getByText(/mastermind/i);
    expect(linkElement).toBeInTheDocument();
})


test('renders buttons for modes', async() => {
    const{getByText} = render(<App />);
    const easy = getByText(/easy/i);
    const hard = getByText(/hard/i);
    expect(easy).toBeInTheDocument();
    expect(hard).toBeInTheDocument();
})

test('renders 4 NumberSlides on Game component', () => {
    const{getByText, getAllByText, findByText, findAllByText, fireEvent} = render(<Game />);
    const data={hardMode: false, easyMode:false}
    expect(getAllByText('Attempts').length).toEqual(1);
})
