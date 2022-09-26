import SharesTable from "../../components/SharesTable/SharesTable";
import style from "./HomePage.module.css"
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const HomePage = ({ sharesList }) => {
  return (
    <div>
      <div className={style.breadcrumb} role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="#555">Main page</Typography>
        </Breadcrumbs>
      </div>
      <h2 className={style.title}>You may be interested</h2>
      <SharesTable sharesList={sharesList} />
    </div>
  );
};

export default HomePage;
