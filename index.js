/**
 * @format
 */

import React from 'react';
import { AppRegistry, } from 'react-native';
import {
    NavigationContainer,
} from '@react-navigation/native';
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import App from './src/routes';
import { name as appName } from './app.json';


const Main = () => {
    return (
        <NavigationContainer >
            <App />
        </NavigationContainer>
    );
}

const Root = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Main />
            </PersistGate>
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Root);