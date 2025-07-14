# Durolt Luggage PWA

Durolt Luggage PWA is a progressive web application used for the **Luggage Use Case**.  

It is developed using **React.js** and interacts with the backend developed using **Python**.

---

## Getting Started

### Project Prerequisites

It is necessary to have **Node.js** and **npm (Node Package Manager)** installed before proceeding.
Skip this step if both are already installed.

#### Node.js and npm installation
- Visit the official website: [Node.js] (https://nodejs.org/)
- Download and install the latest LTS (Long Term Support) version suitable for your operating system.
- Once installed, open a terminal or command prompt and execute following commands to verify that Node.js and npm are installed correctly.
    > ```node -v```  
    > ```npm -v```  

### Installation

#### Clone the repository
- Go to Azure DevOps Repositories, select **Durolt-PWAApp** and clone **development** branch to your local machine.  

#### Install dependencies
- Open the project folder in Visual Studio Code or any other IDE.
- Open terminal and navigate to the project directory.
- Install dependencies by executing following command.
    > ```npm install```
- If there are any dependency errors, execute the following command.
    > ```npm install --force```

#### Start the frontend server
- To run the PWA, execute the following command.
    > ```npm start```

---

## Development And Deployment Process

### Development

- Create a task or a bug in Azure DevOps Board.
- Create a new branch in Azure DevOps Repositories based on **development** branch.
    - Follow the naming standard below for branch name.
        - feature branch:
            > feature/pwa/taskNumber/task-name-in-brief  
            > Eg: feature/pwa/1234/increse-home-page-logo-size
        - bugfix branch:
            > bugfix/pwa/bugNumber/bug-name-in-brief  
            > Eg: bugfix/pwa/5678/logo-not-visible-in-login-page
    - Make sure to link work item (task or bug) when creating a branch.
- Switch to newly created branch in Visual Studio Code.
- Make code changes.
- Verify the code changes, stage the files, write appropriate commit message and commit the changes.
- Create a new pull request (PR) to merge the changes from new branch to **development** branch.
    - Make sure to add a fellow developer as reviewer and wait for the approval.
- Once PR is approved, merge it to **development** branch.

### Deployment

- [Development-Site] (https://pwadev.durolt.in)
- [Production-Site] (https://luggage.durolt.com)

#### Deploying on development site
- Create a new pull request to merge **development** branch to **uat** branch.
- Once PR is approved, merge it to **uat** branch.
- Switch to **uat** branch in Visual Studio Code.
- For debugging, make following changes in **.env.dev** file.
    > ```GENERATE_SOURCEMAP = true```
- In terminal execute following command to deploy on the development site.
    > ```npm run deploydev```

#### Deploying on production site
- Create a new pull request to merge **uat** branch to **main** branch.
- Once PR is approved, merge it to **main** branch.
- Switch to **main** branch in Visual Studio Code.
- Always make sure the GENERATE_SOURCEMAP flag is false in **.env.prod** file.
    > ```GENERATE_SOURCEMAP = false```
- In terminal execute following command to deploy on the production site.
    > ```npm run deployprod```

---

## File Structure

```
Durolt-PWAApp/
.
+-- build/
+-- node_modules/
+-- public/
|   +-- assets/
|   |   +-- locales/
|   |   |   +-- en/
|   |   |   |   +-- translation.json
|   |   |   +-- hi/
|   |   |   |   +-- translation.json
|   |   |   +-- kn/
|   |   |   |   +-- translation.json
|   |   |   +-- mr/
|   |   |   |   +-- translation.json
|   +-- favicon.ico
|   +-- index.html
|   +-- manifest.json
|   +-- robots.txt
+-- src/
|   +-- assets/
|   |   +-- constants/
|   |   |   +-- BrowserStorageKeys.js
|   |   |   +-- Colors.js
|   |   |   +-- Constants.js
|   |   |   +-- Icons.js
|   |   |   +-- LanguageOptions.js
|   |   +-- css/
|   |   |   +-- main.css
|   |   +-- fonts/
|   |   |   +-- Segoe UI Bold.ttf
|   |   |   +-- Segoe UI.ttf
|   |   +-- images/
|   |   |   +-- durolt_app_logo.png
|   |   +-- scss/
|   |   |   +-- partials/
|   |   |   |   +-- _authentication-page.scss
|   |   |   |   +-- _footer.scss
|   |   |   |   +-- _help-page.scss
|   |   |   |   +-- _home-page.scss
|   |   |   |   +-- _locker-opened-page.scss
|   |   |   |   +-- _locker-released-page.scss
|   |   |   |   +-- _locker-size-page.scss
|   |   |   |   +-- _mixin.scss
|   |   |   |   +-- _my-lockers-page.scss
|   |   |   |   +-- _payment-completion-page.scss
|   |   |   |   +-- _payment-details-page.scss
|   |   |   |   +-- _style-contants.scss
|   |   |   |   +-- _terms-and-conditions-page.scss
|   |   |   |   +-- _user-modal.scss
|   |   |   +-- main.scss
|   +-- components/
|   |   +-- Footer.js
|   |   +-- ProtectedRoute.js
|   |   +-- RemainingTimeDonutChart.js
|   |   +-- RouterComponent.js
|   |   +-- ToastComponent.js
|   |   +-- UserModal.js
|   +-- lib/
|   |   +-- AuthUtils.js
|   |   +-- BackendUtils.js
|   |   +-- BrowserStorageAccessMiddleware.js
|   |   +-- Utils.js
|   +-- pages/
|   |   +-- AuthenticationPage.js
|   |   +-- ErrorPage.js
|   |   +-- HelpPage.js
|   |   +-- HomePage.js
|   |   +-- LandingPage.js
|   |   +-- LockerOpenedPage.js
|   |   +-- LockerReleasedPage.js
|   |   +-- LockerSizePage.js
|   |   +-- MyLockersPage.js
|   |   +-- PaymentCompletionPage.js
|   |   +-- PaymentDetailsPage.js
|   |   +-- TermsAndConditionsPage.js
|   +-- App.js
|   +-- index.js
+-- .env.dev
+-- .env.local
+-- .env.prod
+-- .gitignore
+-- package-lock.json
+-- package.json
+-- README.md
```

### Folder and File Explanation

- `public/`
    > This folder contains the publicly accessible files of the application.
    - `assets/`
        > This folder contains various assets used in the application.
        - `locales/`
            > This folder contains the language translation files.
            - `en/`
                > English language folder containing the translation file.
                - `translation.json`
                    > This JSON file contains English translations for the application.
    - `favicon.ico`
        > The icon displayed in the browser tab or bookmark bar.
    - `index.html`
        > Main HTML file of the app.
    - `manifest.json`
        > This file is used for configuring how the app appears when installed on a user's device.
- `src/`
    > This folder contains all the source code of the application.
    - `assets/`
        > This folder contains static assets such as constants, styles, fonts, images or any other files that need to be imported into the application.
        - `constants/`
            > This folder contains various constants used throughout the project.
            - `BrowserStorageKeys.js`
                > This file contains the keys for the data stored in the browser storage.
            - `Colors.js`
                > This file contains the standard colors utilised throughout the project.
            - `Constants.js`
            - `Icons.js`
                > This file contains the standard icons that are utilised in the project.
            - `LanguageOptions.js`
                > This file contains the list of the languages that are available in the PWA.
        - `css/`
            - `main.css`
                > Main CSS file for the project. This is autogenerated after compiling SCSS files.
        - `fonts/`
            > This folder contains fonts used in the project.
            - `Segoe UI Bold.ttf`
            - `Segoe UI.ttf`
        - `images/`
            > This folder contains static images used in the project.
            - `durolt_app_logo.png`
        - `scss/`
            > This folder contains SCSS files for styling.
            - `partials/`
                > This folder contains partial SCSS files for different components or pages.
                - `_authentication-page.scss`
                - `_footer.js`
                - `_help-page.js`
                - `_home-page.js`
                - `_locker-opened-page.scss`
                - `_locker-released-page.scss`
                - `_locker-size-page.scss`
                - `_mixin.scss`
                - `_my-lockers-page.scss`
                - `_payment-completion-page.scss`
                - `_payment-details-page.scss`
                - `_style-constants.scss`
                - `_terms-and-conditions-page.scss`
                - `_user-modal.scss`
            - `main.scss`
                > Main SCSS file importing all partials and defining global styles.
    - `components/`
        > This folder contains reusable React components used throughout the application.
        - `Footer.js`
            > React component for the footer section of the application.
        - `ProtectedRoute.js`
            > React component for defining protected routes.
        - `RemainingTimeDonutChart.js`
            > React component for displaying remaining time as a donut chart.
        - `RouterComponent.js`
            > React component for routing within the application.
        - `ToastComponent.js`
            > React component for displaying toast notifications.
        - `UserModal.js`
            > React component for user modal interactions.
    - `lib/`
        > This folder contains utility functions and middleware used in the application.
        - `AuthUtils.js`
            > Utility functions related to authentication.
        - `BackendUtils.js`
            > Utility functions for making the API calls.
        - `BrowserStorageAccessMiddleware.js`
            > Middleware for accessing browser storage data.
        - `Utils.js`
            > General utility functions.
    - `pages/`
        > This folder contains React components representing different pages of the application.
        - `AuthenticationPage.js`
            > React component for the authentication/login page.  
            > The user is authenticated here using OTP or OTPless login methods.
        - `ErrorPage.js`
            > React component for the error page.
        - `HelpPage.js`
            > React component for the help page.
        - `HomePage.js`
            > React component for the home page.
        - `LandingPage.js`
            > React component for the landing page.
        - `LockerOpenedPage.js`
            > React component for the locker opened page.
        - `LockerReleasedPage.js`
            > React component for the locker released page.
        - `LockerSizePage.js`
            > React component for the locker size page.
        - `MyLockersPage.js`
            > React component for the my lockers page.
        - `PaymentCompletionPage.js`
            > React component for the payment completion page.
        - `PaymentDetailsPage.js`
            > React component for the payment page.
        - `TermsAndConditionsPage.js`
            > React component for the terms and conditions page.
- `App.js`
    > The main React component that serves as the entry point to the application.
- `index.js`
    > The main JavaScript file that renders the React application into the DOM.
- `.env.dev`
    > Environment configuration file for development environment.  
    > [Development-Site] (https://pwadev.durolt.in)
- `.env.local`
    > Environment configuration file for local environment.
- `.env.prod`
    > Environment configuration file for production environment.  
    > [Production-Site] (https://luggage.durolt.com)
- `.gitignore`
    > Configuration file used to specify intentionally untracked files that Git should ignore.  
    > List the folders or files that must be excluded when committing to the version control system.
- `package-lock.json`
    > Auto-generated file specifying exact versions of the dependencies installed.
- `package.json`
    > File containing metadata and dependecies of the project.
- `README.md`
    > File containing information about the project and how to use it.

---

## Dependencies

The following are the **pre-installed** and **external** dependencies used in this PWA.  
*Update the following list whenever a new dependency is installed or an existing dependency is uninstalled.*

1. `@testing-library/jest-dom (^5.17.0)` (pre-installed)
    > Provides custom Jest matchers for DOM elements, making it easier to write assertions in Jest tests.  
    > [@testing-library/jest-dom] (https://testing-library.com/docs/ecosystem-jest-dom/)
2. `@testing-library/react (^13.4.0)` (pre-installed)
    > A simple and complete testing utility for React components, used for testing React applications.  
    > [@testing-library/react] (https://testing-library.com/docs/react-testing-library/intro/)
3. `@testing-library/user-event (^13.5.0)` (pre-installed)
    > A library for simulating user events like click, type, etc., in testing scenarios using the DOM.  
    > [@testing-library/user-event] (https://testing-library.com/docs/user-event/intro/)
4. `crypto-js (4.1.1)` (external)
    > A JavaScript library for cryptographic operations such as encryption, decryption, hashing, etc.  
    > [crypto-js] (https://www.npmjs.com/package/crypto-js)
5. `env-cmd (^10.1.0)` (external)
    > A utility for executing commands with environment variables from an .env file.  
    > [env-cmd] (https://www.npmjs.com/package/env-cmd)
6. `i18next (^21.10.0)` (external)
    > A language internationalization framework for JavaScript applications.  
    > [i18next] (https://www.i18next.com/)
7. `i18next-browser-languagedetector (^7.1.0)` (external)
    > A plugin for `i18next` that detects and sets the user's language based on the browser's language settings.  
    > [i18next-browser-languagedetector] (https://www.npmjs.com/package/i18next-browser-languagedetector)
8. `i18next-http-backend (^2.2.1)` (external)
    > A plugin for `i18next` that allows loading translations from a backend server using HTTP requests.  
    > [i18next-http-backend] (https://www.npmjs.com/package/i18next-http-backend)
9. `moment (^2.29.4)` (external)
    > A JavaScript library for parsing, validating, manipulating, and formatting dates and times.  
    > [moment] (https://momentjs.com/)
10. `react (^18.2.0)` (pre-installed)
    > A JavaScript library for building user interfaces, particularly single-page applications, using component-based architecture.  
    > [react] (https://react.dev/)  
    > [create-react-app] (https://create-react-app.dev/)
11. `react-dom (^18.2.0)` (pre-installed)
    > Provides DOM-specific methods that can be used at the top level of React application.  
    > [react-dom] (https://www.npmjs.com/package/react-dom)
12. `react-i18next (^11.18.6)` (external)
    > Integration of `i18next` with React, providing components and hooks for language internationalization.  
    > [react-i18next] (https://react.i18next.com/)
13. `react-icons (^4.12.0)` (external)
    > A collection of SVG icons as React components.  
    > [react-icons] (https://react-icons.github.io/react-icons/)
14. `react-modal (^3.16.1)` (external)
    > A simple and accessible modal component for React applications.  
    > [react-modal] (https://www.npmjs.com/package/react-modal)
15. `react-qr-reader (^2.2.1)` (external)
    > A React component for reading QR codes from the user's device camera.  
    > [react-qr-reader] (https://www.npmjs.com/package/react-qr-reader)
16. `react-router-dom (^5.3.4)` (external)
    > Declarative routing for React applications using the DOM.  
    > [react-router-dom] (https://v5.reactrouter.com/web/guides/quick-start)
17. `react-scripts (5.0.1)` (pre-installed)
    > Scripts and configuration used by Create React App.  
    > [react-scripts] (https://www.npmjs.com/package/react-scripts)
18. `react-select (^5.7.7)` (external)
    > A dropdown select component for React applications.  
    > [react-select] (https://react-select.com/home)
19. `react-slide-button (^2.0.0)` (external)
    > A customisable slide button component for React.  
    > [react-slide-button] (https://www.npmjs.com/package/react-slide-button)
20. `react-toastify (^9.1.3)` (external)
    > A React library for toast notifications.  
    > [react-toastify] (https://www.npmjs.com/package/react-toastify)
21. `web-vitals (^2.1.4)` (pre-installed)
    > Library for measuring and reporting real user website performance metrics.  
    > [web-vitals] (https://www.npmjs.com/package/web-vitals)

---

## Coding Standards

- Consistent Code Formatting:
    - Use tools like **Prettier** to maintain consistent code formatting across the project.
- Follow React Best Practices:
    - Use class components when necessary, but prefer functional components where possible.
    - Utilize lifecycle methods like componentDidMount, componentDidUpdate, and ComponentWillUnmount for managing component state and side effects.
- File Structure:
    - Use file structure mentioned above and follow a similar component-based structure.
        - Group files based on their functionality or feature.
        - Organise components into directories named after their purpose or feature.
        - Keep utility/helper functions in a separate directory.
        - Store static assets (images, fonts, etc.) in a dedicated directory.
- Source Code:
    - Indentation and Formatting:
        - Use consistent indentation (1 tab or 4 spaces).
    - Component Naming:
        - Use descriptive names for components.
        - Use **PascalCase** for component names.
        - Use **lowercase** for directory names.
    - Comments and Documentation:
        - Add comments to clarify complex logic or tricky parts.
        - Document props, functions, and important components.
    - State Management:
        - Follow a consistent pattern for state management.
        - Separate stateful logic from presentational components.
    - Hooks Usage:
        - Follow the Rules of Hooks.
        - Keep hooks near the top level of the component.
        - Avoid conditional hook calls.
    - Error Handling:
        - Implement error boundaries for better error handling.
    - Conditional Rendering:
        - Use ternary operators or logical AND (&&) for simple rendering.
        - Extract complex conditional logic into separate functions.
- Responsive Design:
    - **Durolt Luggage PWA** is mainly intended to use on mobile devices - either on the browser or as an installed app.
    However, since it can also be used on tablet and personal computers with webcam, the UI content is shown in the middle of the screen by defining a maximum width.
    Use appropriate styling and media queries to continue similar UI.
    - This project uses SCSS for styling. Use SCSS features such as defining style **variables**, **nesting**, reusable style blocks using **mixin**,
    **built-in functions**, **partials** to split stylesheets to create more maintainable and organized CSS code.