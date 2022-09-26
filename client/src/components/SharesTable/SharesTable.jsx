import style from "./SharesTable.module.css";
import TableSharesItem from "./SharesTableItem/SharesTableItem";
import ListIcon from "@mui/icons-material/List";
import ListsEmpty from "./ListsEmpty/ListsEmpty";
import { getSharesTrackedTicker } from "../../redux/selectors/sharesSelectors";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SortButton from "./SortButton/SortButton";
import { useEffect } from "react";
import { setTargetTicket } from "../../api/api";

const SharesTable = ({ sharesList }) => {
  // Tickers that are tracked
  const sharesTrackedTicker = useSelector((state) =>
    getSharesTrackedTicker(state)
  );
  const [sort, setSort] = useState(false);
  const [sortSetting, setSortSetting] = useState(false);
  const [sortParam, setSortParam] = useState(null);

  console.log(sharesTrackedTicker);

  useEffect(() => {
    if (sortParam !== null) {
      setSort(true);
      setSortSetting("down");
    }
  }, [sortParam]);

  useEffect(() => {
    setTargetTicket(sharesTrackedTicker);
  }, [sharesTrackedTicker]);

  if (sharesList === undefined || sharesList === null) {
    return <div>data loading error</div>;
  }

  // function to sort an array
  const sortArray = (arr) => {
    let copiedArray = arr.map((item) => ({ ...item }));
    if (sort) {
      if (isNaN(+copiedArray[0][sortParam])) {
        copiedArray = copiedArray.sort((a, b) => {
          if (a[sortParam].toLowerCase() < b[sortParam].toLowerCase())
            return -1;
          if (a[sortParam].toLowerCase() > b[sortParam].toLowerCase()) return 1;
          return 0;
        });
      } else {
        copiedArray = copiedArray.sort((a, b) => {
          return b[sortParam] - a[sortParam];
        });
      }
      if (sortSetting === "down") {
        return copiedArray;
      } else {
        return copiedArray.reverse();
      }
    } else {
      return arr;
    }
  };

  // change sort setting
  const changeSortSetting = (param) => {
    setSortParam(param);
    if (!sort) {
      setSort(true);
    } else {
      if (sortSetting === "down") {
        return setSortSetting("up");
      } else if (sortSetting === "up") {
        setSortSetting("down");
        return setSort(false);
      }
    }
  };

  const sortedSharesList = sortArray(sharesList);

  // Made lists of shares
  const shares = sortedSharesList.map((share, index) => (
    <TableSharesItem
      sharesTrackedTicker={sharesTrackedTicker}
      key={index}
      share={share}
    />
  ));

  return (
    <div className={style.section}>
      <div className={style.table}>
        <header className={style.table_header}>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"ticker"}
              currenSortParam={sortParam}
              handleClick={changeSortSetting}
              name={"ticker"}
              sortSetting={sortSetting}
              sharesList={sharesList}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"fullName"}
              currenSortParam={sortParam}
              handleClick={changeSortSetting}
              name={"name"}
              sortSetting={sortSetting}
              sharesList={sharesList}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"price"}
              currenSortParam={sortParam}
              handleClick={changeSortSetting}
              name={"price"}
              sortSetting={sortSetting}
              sharesList={sharesList}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"change_percent"}
              currenSortParam={sortParam}
              handleClick={changeSortSetting}
              name={"percent"}
              sortSetting={sortSetting}
              sharesList={sharesList}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"dividend"}
              currenSortParam={sortParam}
              handleClick={changeSortSetting}
              name={"dividend"}
              sortSetting={sortSetting}
              sharesList={sharesList}
            />
          </div>
        </header>
        <div className={style.list}>
          {sharesList.length !== 0 ? <div>{shares}</div> : <ListsEmpty />}
        </div>
        <footer className={style.footer}>
          <NavLink className={style.list_link} to="/target-list">
            <ListIcon sx={{ fontSize: "1.3rem" }} />
            <span>{`View list ${
              sharesTrackedTicker === null ? 0 : sharesTrackedTicker.length
            }`}</span>
          </NavLink>
        </footer>
      </div>
    </div>
  );
};

export default SharesTable;
