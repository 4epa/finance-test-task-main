import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const SortButtonIcon = ({ sortSetting }) => {
  if (sortSetting === "up") {
    return <KeyboardArrowUpIcon />;
  }
  return <KeyboardArrowDownIcon />;
};

const SortButton = ({
  sort,
  buttonSortParam,
  currenSortParam,
  handleClick,
  sortSetting,
  name,
  sharesList,
}) => {
  return (
    <Button
      disabled={sharesList.length === 0}
      onClick={() => handleClick(buttonSortParam)}
    >
      <span>{name}</span>
      {sort && currenSortParam === buttonSortParam ? (
        <SortButtonIcon sortSetting={sortSetting} />
      ) : (
        <span></span>
      )}
    </Button>
  );
};

export default SortButton;