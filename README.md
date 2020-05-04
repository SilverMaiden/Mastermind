This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure and Design

Whimsical: https://whimsical.com/6qpnosZyuq167AfFZ1HwvV

 * Note: The assignment required using the Random Numbers API to generate the combination of numbers.

For this project, I created a web application, using React, to create an interactive Mastermind experience. The application has four pages: a landing page, a game page, a win page, and a lose page. 

When a user launches the application, they are brought to the landing page, where they make their initial selection of either easy or hard mode. I designed the landing page with the intention of creating a certain amount of intrigue that the user would carry with them into the game. To create this sense of mystery, I kept the page very simple (only a title and the easy/hard mode options) and used a greyscale, blurred background. I also chose to incorporate Nordic elements — including using Nordic fonts, a forested background, an animated snow storm component for the landing page and, later, Nordic runes (instead of numbers) for the mastermind combination — to add to this enigmatic atmosphere that I felt was fitting for a game of Mastermind. 

Once the user has selected their desired mode, they are taken to the game page. After adding a component on the left to display the history of guesses the user had made, I wanted the page to be balanced so I also added a component on the right side of the screen to display either the instructions for the game or an animated timer with a countdown depending on the difficulty selected.

When requesting data from the random numbers api (used to generate the ‘correct’ answer to the Mastermind game) there was a bit of a lag, which detracted from the experience. I resolved this by implementing an animated loading screen (a rotating eclipse) while that initial request was being made.

When the user correctly guesses the combination, the Win page is rendered with a random prize and tagline selected. While the aesthetic of the game so far has been very muted and mysterious, I wanted to surprise the user with a fun reward — “from the Gods”, to tie into the overarching theme — at the end of the game.

On losing, the user is shown a simple losing page with a “message from the Norse Gods and Goddesses”, along with a button giving them the option to replay the game.




## Creative Extensions Implemented
* Use can choose from both an easy and a hard mode.

* Hard mode incorporates a one minute timer.
    * To make the hard mode more difficult, I incorporated a one minute timer that would end the game when it ran out. To add to the sense of urgency, I used an online tool called loading.io to create an animated SVG of an hourglass which spins every few seconds.

* Numbers are displayed as Norse runes.

* Responsive design.
    * I utilized the responsive units available in Javascript (VW, VH) in order to make the application resize appropriately when viewed on different screen sizes.

* Cross-browser support
    * After developing the project on Chrome, I discovered when testing on Safari that Safari wasn’t rendering the page styles as expected. After determine that this was due to how Safari renders CSS for nested divs vs Chrome, I went back and simplified the html and css as much as possible to provide a compatible experience for both browsers.

* Dynamic winning pages:
    * As mentioned above, I wanted to provide a fun ending to the game, so I created several prizes with taglines that a user could win (such as a cute cat, or a mini dragon). One of these is randomly selected and presented to the user when they win. I used the built in Javascript method to generate random numbers to avoid the loading delay seen when using the random numbers api (required for this project to generate the ‘correct’ answer). ## Available Scripts

## Running the Application


To install all project dependencies, run:

### `yarn install` or `npm install`

Once dependencies are installed, in the project directory you can run either:

### `yarn start` or  `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test` or `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
