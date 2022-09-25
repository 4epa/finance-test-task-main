import style from "./SharesTableItem.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  setSharesTrackedTicker,
  deleteSharesTrackedTicker,
} from "../../../redux/sharesSlice";
import { useDispatch } from "react-redux";

const TableSharesItem = ({ share, sharesTrackedTicker }) => {
  const dispatch = useDispatch();

  // Add or remove a share from tracking
  const targetShares = (ticker) => {
    if (sharesTrackedTicker.includes(share.ticker)) {
      dispatch(deleteSharesTrackedTicker(ticker));
    } else {
      dispatch(setSharesTrackedTicker(ticker));
    }
  };

  return (
    <div className={style.row}>
      <div className={style.ticker}>{share.ticker}</div>
      <div className={style.name}>{share.fullName}</div>
      <div className={style.price}>{`${share.price}$`}</div>
      <div className={style.change_percent}>{`${share.change_percent}%`}</div>
      <div className={style.dividend}>{`${share.dividend}$`}</div>
      <button
        onClick={() => targetShares(share.ticker)}
        className={style.button}
      >
        {sharesTrackedTicker.includes(share.ticker) ? (
          <RemoveCircleOutlineIcon />
        ) : (
          <AddCircleOutlineIcon />
        )}
      </button>
    </div>
  );
};

export default TableSharesItem;
