import { render, screen } from "@testing-library/react";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";

test("Render App component", () => {
  const component = render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});
