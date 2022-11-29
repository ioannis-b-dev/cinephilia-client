import { createRoot } from "react-dom/client";
import React from "react";
import "./reset.css";
import "./index.scss";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux/reducers";
import App from "./App";
import { AppProvider } from "./hooks/GlobalContext";

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <AppProvider>
            <App />
        </AppProvider>
    </Provider>
);
