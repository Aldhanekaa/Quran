import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

export default function HomeHero() {
  return (
    <div>
      <Container maxWidth="sm">
        <Typography
          className="arabic"
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          القرآن الكريم
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Read and Meditate with Quran Online.
        </Typography>
        <div>
          <Grid container spacing={2} justify="center">
            <CustomizedInputBase />
          </Grid>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                Read Quran
              </Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" color="primary">
                Recitations
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      marginBottom: "30px",
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      width: "100%"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    }
  })
);

function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Surah"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
