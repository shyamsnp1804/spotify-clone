import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
