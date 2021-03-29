import Toolbar from "@material-ui/core/Toolbar";
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
import { QuranulKarim } from "../../assets/data/Gambar";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

import {
  fetchChapters,
  chapter,
  chapters,
  surahInfoType,
  surahListDialog
} from "@/ts/interfaces";

interface HomeHeroProps {
  data?: chapters;
  error?: any;
}

export default function HomeHero(dataFetchChapters: HomeHeroProps) {
  return (
    <div>
      <Box
        w="100%"
        style={{ textAlign: "center" }}
        marginBottom={5}
        bgImage="url('https://holyquran.vercel.app/static/media/QuranBanner.f6797099.png ')"
      >
        <Image
          src={QuranulKarim}
          alt="Picture of the author"
          width="auto"
          height="auto"
        />
      </Box>
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Read and Meditate with Quran Online.
        </Typography>
        <div>
          <Grid container spacing={2} justify="center">
            <CustomizedInputBase
              chapters={dataFetchChapters.data?.chapters}
              error={dataFetchChapters.error}
            />
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

interface CustomizedInputBaseComponentProps {
  chapters?: chapter[];
  error?: any;
}
function CustomizedInputBase(
  dataFetchChapters: CustomizedInputBaseComponentProps
) {
  const classes = useStyles();
  const { chapters, error } = dataFetchChapters;
  return (
    <Paper component="form" className={classes.root}>
      {!chapters && (
        <InputBase
          className={classes.input}
          placeholder="Search Surah"
          inputProps={{ "aria-label": "search google maps" }}
        />
      )}

      {chapters && (
        <Autocomplete
          id="country-select-demo"
          className={classes.input}
          options={chapters as chapter[]}
          autoHighlight
          getOptionLabel={(option) => option.name_simple}
          renderOption={(option) => {
            return (
              <>
                <span>{option.name_simple}</span>
              </>
            );
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password" // disable autocomplete and autofill
                }}
                className={classes.input}
                placeholder="Search Surah"
              />
            );
          }}
        />
      )}
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
