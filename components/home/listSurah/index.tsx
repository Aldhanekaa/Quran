import {
  chapter,
  chapters,
  surahInfoType,
  surahListDialog
} from "../../../ts/interfaces";

/* ======================= UI ======================= */
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import Link from "next/link";
/* ======================= END UI ======================= */

import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
  makeStyles,
  useTheme
} from "@material-ui/core/styles";
import { styles, useStyles, ChapterCard } from "./styles";
import NoData from "./noData";
import useSWR from "swr";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";

const StyledDialogContent = styled(DialogContent)`
  ol,
  ul {
    padding-left: 30px;
    margin-top: 20px;
  }

  h2 {
    margin-top: 30px;
    font-size: 25px;
    font-weight: 500;
  }

  p {
    margin-top: 10px;
  }
`;

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <Box boxShadow={2}>
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    </Box>
  );
});

// Fetcher for the SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface ListSurahProps {
  data?: chapter[];
  error?: any;
}
export default function ListSurah({ data, error }: ListSurahProps) {
  // Dialogs; Use Interface surahListDialog
  const [dialogs, setDialog] = useState<
    surahListDialog[] | undefined | boolean
  >();

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  // width for dialog or modal
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // width for dialog or modal

  // click event to open dialog
  const handleClickOpen = (id: number) => {
    setDialog((prevState: boolean | surahListDialog[] | undefined) => {
      if (Array.isArray(prevState)) {
        let newState = [...prevState];
        newState[newState.findIndex((element) => element.id == id)].open = true;
        return newState;
      }
    });
  };

  // click event to close dialog
  const handleClose = (id: number) => {
    setDialog((prevState: boolean | surahListDialog[] | undefined) => {
      if (Array.isArray(prevState)) {
        let newState = [...prevState];
        newState[
          newState.findIndex((element) => element.id == id)
        ].open = false;
        return newState;
      }
    });
  };

  useEffect(() => {
    if (data) {
      // Surah Dialog
      let surahDialog: surahListDialog[] = [];

      //   Iterate surah. Fetch the surah Info for content of the dialog
      data.forEach(async (chapter) => {
        //   since this is promise, we use foreach, otherwise if we use map the return will be promise object
        let surahInfo: surahInfoType = {};
        try {
          const data = await axios({
            method: "GET",
            url: `https://api.quran.com/api/v4/chapters/${chapter.id}/info?language=en`
          });

          surahInfo = data.data.chapter_info;
        } catch (err) {
          console.error("ERROR!! ERROR WHEN FETCHING THE SURAH INFO", err);
          surahInfo = {
            message: "error! see console to see the error."
          };
        }

        const Surah = {
          surahInfo: surahInfo,
          surah: chapter
        };

        //   We push the data info of the surah
        surahDialog.push({
          id: chapter.id,
          open: false,
          surah: Surah
        });
      });
      // console.log(surahDialog);

      setDialog(surahDialog);
    } else {
      setDialog(false);
    }
  }, [data]);

  return (
    <>
      <Container
        style={{
          flexGrow: 1,
          marginTop: "100px"
        }}
      >
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Surahs (Chapters)</Tab>
            <Tab>Juz</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid container spacing={3}>
                {!dialogs &&
                  !error &&
                  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => {
                    return <NoData classes={classes} />;
                  })}
                {Array.isArray(dialogs) &&
                  data &&
                  dialogs.map((dialog: surahListDialog) => {
                    return (
                      <Dialog
                        fullScreen={fullScreen}
                        open={dialog.open}
                        onClose={() => handleClose(dialog.id)}
                        aria-labelledby="responsive-dialog-title"
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={() => handleClose(dialog.id)}
                        >
                          {dialog.surah.surah.name_simple} {bull}{" "}
                          <span className={`icon-surah${dialog.id}`}></span>
                        </DialogTitle>
                        <StyledDialogContent>
                          <DialogContentText>
                            {dialog.surah.surahInfo.text && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: dialog.surah.surahInfo.text
                                }}
                              ></div>
                            )}
                          </DialogContentText>
                        </StyledDialogContent>
                      </Dialog>
                    );
                  })}
                {dialogs &&
                  data &&
                  data.map((chapter) => {
                    return (
                      <Grid item xs key={chapter.id}>
                        <ChapterCard>
                          <CardContent>
                            <Typography variant="h5" component="h2">
                              {chapter.name_simple} {bull}{" "}
                              <span
                                className={`icon-surah${chapter.id}`}
                              ></span>
                            </Typography>
                            <Typography
                              className={classes.pos}
                              color="textSecondary"
                            >
                              {chapter.translated_name.name}
                            </Typography>
                          </CardContent>
                          <CardActions>
                            <Link
                              href={{
                                pathname: "/[surah]",
                                query: { surah: chapter.id }
                              }}
                            >
                              <Button size="small">Read Surah</Button>
                            </Link>
                            <Button
                              size="small"
                              onClick={() => handleClickOpen(chapter.id)}
                            >
                              See Info
                            </Button>
                          </CardActions>
                        </ChapterCard>
                      </Grid>
                    );
                  })}

                {!dialogs && error && <p>Eror!</p>}
              </Grid>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
}
