import React from "react";
import { render } from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./components/reducers";
import Filter from "./components/Filter";
import Cities from "./components/Cities";

const store = createStore(rootReducer);
console.log(store.getState());
//store.subscribe(() => console.log(store.getState()));

render(
  <Provider store={store}>
    <Cities />
    <br />
    <hr />
    <Filter />
  </Provider>,
  document.getElementById("root")
);
