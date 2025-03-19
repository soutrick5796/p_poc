# Investment Portfolio App

## Overview

This project is an **Investment Portfolio** app developed using **React Native** and **Expo**. The app allows users to log in, input their PAN code, and view their investment portfolio, including current values and profits/losses.

## Pre-requisites

- Install **Android Studio** and **Xcode** for Android and iOS simulators.
- Follow the steps mentioned in the official [Expo documentation](https://docs.expo.dev/get-started/installation/) for setting up the environment.

## Project Setup Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/soutrick5796/p_poc.git
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the app**:
    ```bash
    npx expo start
    ```

    After running the above command, Expo will start the development server, and you will have options to open the app on:
    - **Android emulator**
    - **iOS simulator**
    - **Expo Go** (for testing on a physical device)

4. **Opening the app**:
    - You can use **Expo Go** on your phone or an emulator to run the app.

## Sample Login Credentials

You can use the following sample credentials to log in to the app:

- **Username**: `admin`
- **Password**: `admin`

These credentials allow you to access the home screen, where you can input your PAN code and view your investment portfolio.

## Libraries Used

- **React Native**: Core library for building native apps.
- **Expo**: Provides tools and libraries for easier React Native development.
- **Expo Router**: For handling navigation between screens in the app.
- **React Native Paper**: A UI library that provides Material Design components like buttons, text inputs, etc.
- **Redux**: For state management of user data (user ID, username, PAN code).
- **React-Redux**: To connect the app with the Redux store and manage global states.
- **Snackbar**: To show feedback messages like success or error notifications.

## Design Decisions

- **UI Components**:
  - The app uses **React Native Paper** for Material Design components like buttons, text fields, and snackbars to provide a clean and modern user interface.
  - The **portfolio screen** uses a **FlatList** to display investments, which is efficient for rendering large lists of items.
  - The app highlights profit in **green** and loss in **red**, making it visually easy for users to track the status of their investments.

- **State Management**:
  - The app uses **Redux** for managing global state such as user authentication and PAN code.
  - Actions like **setUser**, **setPanCode**, and **logout** are handled through Redux slices.

- **Routing**:
  - The app uses **file-based routing** through **Expo Router**, enabling automatic routing based on file structure.
  - **useRouter** is used for navigation, and users can navigate between the login, home, and portfolio screens.

- **Optimizations**:
  - The app uses **`useMemo`** for performance optimization, memoizing expensive computations like the total portfolio value, current value, and investment calculations.

## Snackbar Notifications

The app uses a **Snackbar Context** to manage global snackbars, which provide feedback to users about success or error events.

### SnackbarContext

- **SnackbarProvider** is used to wrap the app and manage the context for snackbars.
- **showSnackbar** is the method used to display a message on the screen (error, success, etc.).
- The snackbar appears at the bottom of the screen and automatically hides after 3 seconds.

## Screens

- **Login Screen**:
  - Users can input their username and password to log in.
  - Invalid login attempts trigger a snackbar error message.
  
- **Home Screen**:
  - Once logged in, users can input their **PAN Code** and proceed to the portfolio screen.
  - A logout button is provided to clear the user session and return to the login screen.

- **Portfolio Screen**:
  - Displays the user’s investments with their details, including the invested amount, quantity, NAV, and current value.
  - Users can click on individual investments for more details, which are displayed in a styled card.
  - The total invested and current value of the portfolio are shown at the top, with profit/loss displayed in green/red.

## Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [React Navigation Documentation](https://reactnavigation.org/)
- [React Native Paper Documentation](https://callstack.github.io/react-native-paper/)
- [Redux Documentation](https://redux.js.org/)

