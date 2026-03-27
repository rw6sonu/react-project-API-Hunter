import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import ApiForm from "./components/ApiForm";

function App() {
  return (
    <Provider store={store}>
      <ApiForm />
    </Provider>
  );
}

export default App;