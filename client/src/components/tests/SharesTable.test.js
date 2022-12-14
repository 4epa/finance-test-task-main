import { render, screen } from "@testing-library/react";
import SharesTable from "../SharesTable/SharesTable";
import * as reduxHooks from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-redux");

const shares = [
  {
    ticker: "AAPL",
    exchange: "NASDAQ",
    price: 279.29,
    change: 64.52,
    change_percent: 0.84,
    dividend: 0.56,
    yield: 1.34,
    last_trade_time: "2021-04-30T11:53:21.000Z",
  },
  {
    ticker: "GOOGL",
    exchange: "NASDAQ",
    price: 237.08,
    change: 154.38,
    change_percent: 0.1,
    dividend: 0.46,
    yield: 1.18,
    last_trade_time: "2021-04-30T11:53:21.000Z",
  },
  {
    ticker: "MSFT",
    exchange: "NASDAQ",
    price: 261.46,
    change: 161.45,
    change_percent: 0.41,
    dividend: 0.18,
    yield: 0.98,
    last_trade_time: "2021-04-30T11:53:21.000Z",
  },
  {
    ticker: "AMZN",
    exchange: "NASDAQ",
    price: 260.34,
    change: 128.71,
    change_percent: 0.6,
    dividend: 0.07,
    yield: 0.42,
    last_trade_time: "2021-04-30T11:53:21.000Z",
  },
  {
    ticker: "FB",
    exchange: "NASDAQ",
    price: 266.77,
    change: 171.92,
    change_percent: 0.75,
    dividend: 0.52,
    yield: 1.31,
    last_trade_time: "2021-04-30T11:53:21.000Z",
  },
  {
    ticker: "TSLA",
    exchange: "NASDAQ",
    price: 272.13,
    change: 158.76,
    change_percent: 0.1,
    dividend: 0.96,
    yield: 1.0,
    last_trade_time: "2021-04-30T11:53:21.000Z",
  },
];

describe("SharesTable", () => {
  it("Render component with shares data", () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue(["TSLA", "NASDAQ"]);
    render(
      <Router>
        <SharesTable sharesList={shares} />
      </Router>
    );
    const buttonText = screen.getByText(/view list 2/i);

    expect(buttonText).toBeInTheDocument();
  });

  it("Render component with undefined", () => {
    jest.spyOn(reduxHooks, "useSelector").mockReturnValue([]);
    render(<SharesTable sharesList={undefined} />);

    const buttonText = screen.getByText(/data loading error/i);

    expect(buttonText).toBeInTheDocument();
  });
});
