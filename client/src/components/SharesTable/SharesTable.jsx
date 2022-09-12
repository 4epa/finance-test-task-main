import style from "./SharesTable.module.css";
import TableSharesItem from "./TableSharesItem/TableSharesItem";
import ListIcon from "@mui/icons-material/List";
import ListsEmpty from "./ListsEmpty/ListsEmpty";
import { getaSharesTrackedTicker } from "../../redux/selectors/sharesSelectors";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useEffect } from "react";
import { setTargetTicket } from "../../api/api";

const SortButtonIcon = ({ sortSetting }) => {
  if (sortSetting === "up") {
    return <KeyboardArrowUpIcon />;
  }
  return <KeyboardArrowDownIcon />;
};

const SharesTable = ({ sharesList }) => {
  // Tickers that are tracked
  const sharesTrackedTicker = useSelector((state) =>
    getaSharesTrackedTicker(state)
  );
  const [sort, setSort] = useState(false);
  const [sortSetting, setSortSetting] = useState(false);
  const [sortParam, setSortParam] = useState(null);

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
  const sortArr = (arr) => {
    let sortArr = arr.map((item) => ({ ...item }));
    if (sort) {
      if (isNaN(+sortArr[0][sortParam])) {
        sortArr = sortArr.sort((a, b) => {
          if (a[sortParam].toLowerCase() < b[sortParam].toLowerCase())
            return -1;
          if (a[sortParam].toLowerCase() > b[sortParam].toLowerCase()) return 1;
          return 0;
        });
      } else {
        sortArr = sortArr.sort((a, b) => {
          return b[sortParam] - a[sortParam];
        });
      }
      if (sortSetting === "down") {
        return sortArr;
      } else {
        return sortArr.reverse();
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

  const sortSharesList = sortArr(sharesList);

  // Made lists of shares
  const shares = sortSharesList.map((share, index) => (
    <TableSharesItem
      sharesTrackedTicker={sharesTrackedTicker}
      key={index}
      share={share}
    />
  ));

  const SortButton = ({
    sort,
    buttonSortParam,
    currenSortParam,
    handlCkick,
    sortSeting,
    name,
  }) => {
    return (
      <Button onClick={() => handlCkick(buttonSortParam)}>
        <span>{name}</span>
        {sort && currenSortParam === buttonSortParam ? (
          <SortButtonIcon sortSetting={sortSeting} />
        ) : (
          <span></span>
        )}
      </Button>
    );
  };

  return (
    <div className={style.section}>
      <div className={style.table}>
        <header className={style.table_header}>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"ticker"}
              currenSortParam={sortParam}
              handlCkick={changeSortSetting}
              name={"ticker"}
              sortSeting={sortSetting}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"fullName"}
              currenSortParam={sortParam}
              handlCkick={changeSortSetting}
              name={"name"}
              sortSeting={sortSetting}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"price"}
              currenSortParam={sortParam}
              handlCkick={changeSortSetting}
              name={"price"}
              sortSeting={sortSetting}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"change_percent"}
              currenSortParam={sortParam}
              handlCkick={changeSortSetting}
              name={"percent"}
              sortSeting={sortSetting}
            />
          </div>
          <div className={style.header_item}>
            <SortButton
              sort={sort}
              buttonSortParam={"dividend"}
              currenSortParam={sortParam}
              handlCkick={changeSortSetting}
              name={"dividend"}
              sortSeting={sortSetting}
            />
          </div>
        </header>
        <div className={style.list}>
          {sharesList.length !== 0 ? <div>{shares}</div> : <ListsEmpty />}
        </div>
        <footer className={style.footer}>
          <NavLink className={style.list_link} to="/target-list">
            <ListIcon sx={{ fontSize: "1.3rem" }} />
            <span>View list</span>
            <span>{sharesTrackedTicker.length}</span>
          </NavLink>
        </footer>
      </div>
    </div>
  );
};

export default SharesTable;
