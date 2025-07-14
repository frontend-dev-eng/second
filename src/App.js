import { useEffect, useState} from "react";
/*
useTranslation is a React hook provided by the react-i18next library
 for adding internationalization (i18n) and localization (l10n) in your React app.
It gives you access to the translation function t and additional i18n utilities (like current language, change language, etc.).
*/
import {useTranslation} from "react-i18next";
import {BrowserRouter} from "react-router-dom";
import {initializeI18nAndThenAppendCustomerSpecificStylesheet, clearLocalStorageForUser} from "./lib/Utils";
import RouterComponent from "./components/RouterComponent";
import ConnectionLost from "./components/ConnectionLost";
import { ThemeProvider,createTheme } from "@mui/material/styles";
import CssBaseLine from '@mui/material/CssBaseline';
import { APP_DARK_PURPLE_COLOR, APP_ENGLISH_VIOLET_COLOR, APP_WHITE_COLOR } from "./assets/constants/Colors";
// import { useMediaQuery } from "@mui/material";
// this is for date and time format
import moment from "moment";
import { IS_LOGGED_IN, LOCAL_STORAGE, REFRESH_TOKEN_EXPIRY_TIME } from "./assets/constants/BrowserStorageKeys";
import { getSecureItemFromSpecificStorage } from "./lib/BrowserStorageAccessMiddleware";
import ShowToast from "./components/ToastComponent";
import { DARK, LIGHT, TOAST_ERROR } from "./assets/constants/Constants";
import CircularProgressLoader from "./components/CircularProgressLoader";


initializeI18nAndThenAppendCustomerSpecificStylesheet();

const App = () =>  {
  // Check if the user is offline or online 
  const [isOffline, setIsOffline] = useState( !navigator.onLine );
  const prefersDarkMode = false; //useMediaQuery('(prefers-color-scheme: dark)');
  const [showLoader, setShowLoader] = useState(false);
  const { t } = useTranslation();

  const handleOnlineStatus = () => setIsOffline(false);
  const handleOfflineStatus = () => setIsOffline(true);

  

  const handleBackButton = (event) => {
    const currentPage = window.location.pathname;
    if (currentPage === '/locker-size') {
      window.location.reload();
    }
  };

  useEffect(() => {
    window.addEventListener('popstate', handleBackButton);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
    window.addEventListener('click', checkLoginAndTokenExpiry);

    return () => { // Cleanup function for event listeners
      window.removeEventListener('popstate', handleBackButton);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
      window.removeEventListener('click', checkLoginAndTokenExpiry);
    };
  }, []); // Empty dependency array to run effect only once


  const darkTheme = createTheme({
    palette: {
      mode: prefersDarkMode ? DARK : LIGHT, // Handle dark mode state on toggle
      background: {
        default: prefersDarkMode ? APP_DARK_PURPLE_COLOR : APP_WHITE_COLOR,
        primary: prefersDarkMode ? APP_ENGLISH_VIOLET_COLOR : APP_WHITE_COLOR,

      },
      text : {
        primary: prefersDarkMode ? APP_WHITE_COLOR : APP_DARK_PURPLE_COLOR, 
        secondary : prefersDarkMode ? APP_DARK_PURPLE_COLOR : APP_WHITE_COLOR
      },
    }
  });

  const checkLoginAndTokenExpiry = async () => {
    const isLoggedIn = getSecureItemFromSpecificStorage(LOCAL_STORAGE,IS_LOGGED_IN);
    const refreshExpiryAt = await getSecureItemFromSpecificStorage(LOCAL_STORAGE, REFRESH_TOKEN_EXPIRY_TIME);
    const now = moment.utc();
    const refreshTokenExpiryTime = moment.utc(refreshExpiryAt);
  
    if (isLoggedIn && now.isAfter(refreshTokenExpiryTime)) {
        clearLocalStorageForUser();
        ShowToast(t('sessionExpired'), TOAST_ERROR);
        setShowLoader(true);
        setTimeout(() => {
            setShowLoader(false);
            window.location.href = '/';
        }, 3000); // Adjust the delay as necessary (3000ms = 3 seconds)
    }
  };
  

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseLine />
      <BrowserRouter>
        <RouterComponent theme={darkTheme} />
      </BrowserRouter>

      { isOffline && <ConnectionLost /> }
      {showLoader && <CircularProgressLoader message={t('redirectToLogin')} />}
      
    </ThemeProvider>
  );
}

export default App;



/*

Your `App.js` file is well-structured and integrates multiple key features: i18n, routing, offline detection, theme support, and token/session management. Below are **detailed comments and suggestions**, section-by-section:

---

### ✅ **Top-Level Imports**

```js
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { initializeI18nAndThenAppendCustomerSpecificStylesheet, clearLocalStorageForUser } from "./lib/Utils";
import RouterComponent from "./components/RouterComponent";
import ConnectionLost from "./components/ConnectionLost";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseLine from '@mui/material/CssBaseline';
import { APP_DARK_PURPLE_COLOR, APP_ENGLISH_VIOLET_COLOR, APP_WHITE_COLOR } from "./assets/constants/Colors";
import moment from "moment";
import { IS_LOGGED_IN, LOCAL_STORAGE, REFRESH_TOKEN_EXPIRY_TIME } from "./assets/constants/BrowserStorageKeys";
import { getSecureItemFromSpecificStorage } from "./lib/BrowserStorageAccessMiddleware";
import ShowToast from "./components/ToastComponent";
import { DARK, LIGHT, TOAST_ERROR } from "./assets/constants/Constants";
import CircularProgressLoader from "./components/CircularProgressLoader";
```

✅ **Comments**:

* Clean import structure.
* Good separation of constants, utilities, and components.
* `moment` is used correctly for UTC-safe date checks.
* `createTheme` + `ThemeProvider` ensures Material UI theming is centralized.

---

### 🌐 **i18n + Customer Styles Initialization**

```js
initializeI18nAndThenAppendCustomerSpecificStylesheet();
```

✅ **Comment**:
Great that you're initializing internationalization and then applying customer-specific styling. This is a good point for branding and localization separation.

---

### 💡 **Component State Setup**

```js
const [isOffline, setIsOffline] = useState(!navigator.onLine);
const prefersDarkMode = false;
const [showLoader, setShowLoader] = useState(false);
const { t } = useTranslation();
```

✅ `isOffline`: Properly initialized to `!navigator.onLine`.
⚠️ `prefersDarkMode`: Hardcoded to `false`. Consider enabling `useMediaQuery('(prefers-color-scheme: dark)')` in the future.
✅ `showLoader`: Controls redirect loading spinner.
✅ `t`: `useTranslation()` hook from `react-i18next` — used appropriately.

---

### 🔄 **Back Button Handling**

```js
const handleBackButton = (event) => {
  const currentPage = window.location.pathname;
  if (currentPage === '/locker-size') {
    window.location.reload();
  }
};
```

✅ Custom handling of browser's back button.
💡 Could expand this logic later with more routes or add confirmation modals.

---

### 🌐 **Network and Event Listeners Setup**

```js
useEffect(() => {
  window.addEventListener('popstate', handleBackButton);
  window.addEventListener('online', handleOnlineStatus);
  window.addEventListener('offline', handleOfflineStatus);
  window.addEventListener('click', checkLoginAndTokenExpiry);

  return () => {
    window.removeEventListener('popstate', handleBackButton);
    window.removeEventListener('online', handleOnlineStatus);
    window.removeEventListener('offline', handleOfflineStatus);
    window.removeEventListener('click', checkLoginAndTokenExpiry);
  };
}, []);
```

✅ Good cleanup via return function in `useEffect`.
⚠️ **Minor optimization tip**: `checkLoginAndTokenExpiry` could be throttled/debounced if clicks are frequent.

---

### 🎨 **Theme Creation**

```js
const darkTheme = createTheme({
  palette: {
    mode: prefersDarkMode ? DARK : LIGHT,
    background: {
      default: prefersDarkMode ? APP_DARK_PURPLE_COLOR : APP_WHITE_COLOR,
      primary: prefersDarkMode ? APP_ENGLISH_VIOLET_COLOR : APP_WHITE_COLOR,
    },
    text: {
      primary: prefersDarkMode ? APP_WHITE_COLOR : APP_DARK_PURPLE_COLOR,
      secondary: prefersDarkMode ? APP_DARK_PURPLE_COLOR : APP_WHITE_COLOR
    },
  }
});
```

✅ Material UI theming handled well with dark/light fallback.
💡 Once `prefersDarkMode` becomes dynamic, you could persist user theme preference in local storage.

---

### 🛡️ **Token Expiry & Auto Logout**

```js
const checkLoginAndTokenExpiry = async () => {
  const isLoggedIn = getSecureItemFromSpecificStorage(LOCAL_STORAGE, IS_LOGGED_IN);
  const refreshExpiryAt = await getSecureItemFromSpecificStorage(LOCAL_STORAGE, REFRESH_TOKEN_EXPIRY_TIME);
  const now = moment.utc();
  const refreshTokenExpiryTime = moment.utc(refreshExpiryAt);

  if (isLoggedIn && now.isAfter(refreshTokenExpiryTime)) {
    clearLocalStorageForUser();
    ShowToast(t('sessionExpired'), TOAST_ERROR);
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
      window.location.href = '/';
    }, 3000);
  }
};
```

✅ Token check compares UTC times using `moment.utc()`.
✅ Graceful handling: show loader, toast, clear data, then redirect.
💡 **Suggestion**: Instead of using `window.location.href`, prefer `history.push('/')` if available via `react-router-dom`.

---

### 📦 **Main JSX Render**

```jsx
return (
  <ThemeProvider theme={darkTheme}>
    <CssBaseLine />
    <BrowserRouter>
      <RouterComponent theme={darkTheme} />
    </BrowserRouter>

    {isOffline && <ConnectionLost />}
    {showLoader && <CircularProgressLoader message={t('redirectToLogin')} />}
  </ThemeProvider>
);
```

✅ `CssBaseLine`: Normalizes UI styles.
✅ `RouterComponent`: Gets theme injected (nice).
✅ Offline state and loader conditionals are cleanly separated.

---

### ✅ **Final Thoughts**

| Aspect                   | Status      | Notes                                                           |
| ------------------------ | ----------- | --------------------------------------------------------------- |
| Code Structure           | ✅ Clean     | Well-modularized, readable.                                     |
| Error Handling           | ✅ Good      | Gracefully handles session expiry and connection loss.          |
| Styling & Theme Support  | ✅ Themed    | Great use of Material UI and custom colors.                     |
| Optimization Opportunity | ⚠️ Moderate | Throttle `checkLoginAndTokenExpiry` and allow dark mode toggle. |
| Code Redundancy          | ✅ Minimal   | Mostly DRY and maintainable.                                    |
| React Best Practices     | ✅ Followed  | Functional components, hooks, and cleanup all used properly.    |

---

If you'd like, I can help you:

* Enable `useMediaQuery` for real dark mode support.
* Use `useNavigate()` instead of `window.location.href`.
* Implement token expiry as a global interceptor (e.g., in Axios).
* Migrate from `moment` to `date-fns` (if desired for bundle size).

Let me know what you'd like to improve or expand!


*/