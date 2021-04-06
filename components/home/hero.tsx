import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { QuranulKarim } from "../../assets/data/Gambar";
import Image from "next/image";
import { Box, Text } from "@chakra-ui/react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField, {
  StandardTextFieldProps,
  TextFieldProps
} from "@material-ui/core/TextField";

import { useToast, Code } from "@chakra-ui/react";
import { chapter, chapters } from "@/ts/interfaces";
import { useRef, useState } from "react";
import { useRouter } from "next/router";

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
  const Router = useRouter();
  const inptRef = useRef<StandardTextFieldProps>();
  const toast = useToast();
  const [inputValue, setInputValue] = useState<string>("");

  const classes = useStyles();
  const { chapters, error } = dataFetchChapters;

  function handleOnChange() {
    toast({
      title: "Chapter Selected",
      description: (
        <p>
          Press <Code>Enter</Code> or submit to go to the chapter
        </p>
      ),
      status: "info",
      duration: 2500,
      isClosable: true,
      position: "top-right"
    });
  }

  function handleSubmitForm(event: React.FormEvent<HTMLDivElement>) {
    event.preventDefault();
    const sorted = chapters?.map((chapter) => {
      return Object.assign(
        {},
        { ...chapter },
        {
          name_simple: chapter.name_simple.toLowerCase(),
          translated_name: {
            name: chapter.translated_name.name.toLowerCase()
          }
        }
      );
    });

    // @ts-ignore
    const findChapterByName = sorted.findIndex(
      // @ts-ignore
      (e) => e.name_simple == inptRef.current?.value.toLowerCase()
    );
    if (findChapterByName + 1 != 0) {
      Router.push(`/${findChapterByName + 1}`);
    }
  }

  return (
    <Paper
      component="form"
      onSubmit={handleSubmitForm}
      className={classes.root}
    >
      {!chapters && (
        <InputBase
          className={classes.input}
          placeholder="Search Chapter"
          inputProps={{ "aria-label": "search surah " }}
        />
      )}

      {chapters && (
        <Autocomplete
          id="country-select-demo"
          className={classes.input}
          options={chapters as chapter[]}
          disableClearable
          autoHighlight
          freeSolo
          onChange={handleOnChange}
          getOptionLabel={(option) => {
            return option.name_simple;
          }}
          renderOption={(props, option) => {
            return (
              <>
                {/* @ts-ignore */}
                <li {...props}>
                  <span>{props.name_simple}</span>
                  <Box>
                    <Text color="gray.500" isTruncated>
                      {props.translated_name.name}
                    </Text>
                  </Box>
                </li>
              </>
            );
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off", // disable autocomplete and autofill
                  autoCorrect: "off"
                }}
                inputRef={inptRef}
                autoComplete="off"
                autoCorrect="off"
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
