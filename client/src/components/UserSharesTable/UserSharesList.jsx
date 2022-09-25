import { useSelector, useDispatch } from "react-redux";
import SharesTable from "../SharesTable/SharesTable";
import { getSharesTrackedTicker } from "../../redux/selectors/sharesSelectors";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { NavLink } from "react-router-dom";
import style from "./UserSharesTable.module.css";

const UserSharesList = ({ sharesList }) => {
  // Tickers that are tracked
  const sharesTrackedTicker = useSelector((state) =>
    getSharesTrackedTicker(state)
  );

  // Filter the shares by tracked
  const userShares = sharesList.filter((share) =>
    sharesTrackedTicker.includes(share.ticker)
  );

  return (
    <div>
      <div className={style.breadcrumb} role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className={style.link} to="/">
            Main page
          </NavLink>
          <Typography color="#555">Your list</Typography>
        </Breadcrumbs>
      </div>
      <h2 className={style.title}>Your list</h2>
      <SharesTable sharesList={userShares} />
    </div>
  );
};

export default UserSharesList;
