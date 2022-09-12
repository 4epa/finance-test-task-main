import listEmpty from "../../../assets/img/empty_list.png";
import style from "./ListsEmpty.module.css";

const ListsEmpty = () => {
  return (
    <div className={style.container}>
      <div className={style.img}>
        <img src={listEmpty} alt="list Empty" />
      </div>
      <p className={style.text}>There is nothing here yet</p>
    </div>
  );
};

export default ListsEmpty;
