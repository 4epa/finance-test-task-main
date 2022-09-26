import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getShares } from "./redux/selectors/sharesSelectors";
import { getSharesDataThunk, getTargetTicketThunk } from "./redux/sharesSlice";
import UserSharesList from "./pages/UserSharesTable/UserSharesList";
import { connectToServer, startShowQuote } from "./api/api";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  const dispatch = useDispatch();

  const sharesList = useSelector((state) => getShares(state));
  const [isConnected, setIsConnected] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);

  // Connect to server and data request
  useEffect(() => {
    connectToServer();
    startShowQuote();
    setIsConnected(true);
    setShowQuotes(true);
    dispatch(getTargetTicketThunk());
  }, []);

  // Receiving data from the server
  useEffect(() => {
    if (showQuotes) {
      dispatch(getSharesDataThunk());
    }
  }, [showQuotes]);

  if (!isConnected) return <div>...Connect to server</div>;

  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <div className="header__container">
            <h1 className="logo">Financial analyst</h1>
          </div>
        </header>
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage sharesList={sharesList} />} />
            <Route
              path="/target-list"
              element={<UserSharesList sharesList={sharesList} />}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
