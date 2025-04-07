import ReactDOM from "react-dom/client";
import App from "./Components/App/App";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.querySelector("body"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
