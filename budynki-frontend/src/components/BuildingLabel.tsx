import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#f0f0f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "25px",
  },
  buildingName: {
    marginBottom: theme.spacing(1),
  },
}));

interface BuildingLabelProps {
  name: string;
  address: string;
  id: number;
}

const BuildingLabel = ({ name, address, id }: BuildingLabelProps) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <div>
        <Typography variant="subtitle1" className={classes.buildingName}>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {address}
        </Typography>
      </div>
      <Link to={`${id}`}>
        <Button variant="contained" endIcon={<ArrowForwardIcon />}>
          Szczegóły
        </Button>
      </Link>
    </Paper>
  );
};

export default BuildingLabel;
