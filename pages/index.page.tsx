import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import DirectionsIcon from "@material-ui/icons/Directions";

import React, { Fragment } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";

const title = "Home | MTs TechnoNatura";
const description =
  "Website resmi Remaja Madrasah Tsanawiyah TechnoNatura Depok. Website buatan para programmer MTs.";

const Buttons = styled.div`
  margin-top: 40px;
`;

export default function Home() {
  return (
    <Fragment>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <NextSeo
        title="QuranKu Website - Read Quran and Meditate with Quran online."
        description="QuranKu Website is a place where you can read quran online and meditate with it!"
        canonical={process.env.PUBLIC_URL}
        openGraph={{
          url: process.env.PUBLIC_URL,
          title: "QuranKu Website Read Quran For Free",
          description:
            "QuranKu Website - Read Quran and Meditate with Quran online"
        }}
      />

      <style jsx global>{`
        html {
          font-family: "Roboto", sans-serif;
          scroll-behavior: smooth;
        }

        @font-face {
          font-family: arabicfont;
          src: url("/LPMQ.ttf");
        }

        html {
          scroll-behavior: smooth;
          padding-top: 50px;
        }

        .arabic {
          font-family: arabicfont;
        }
      `}</style>
      <Toolbar />
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
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Read and Meditate with Quran Online.
          </Typography>
          <Buttons>
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
          </Buttons>
        </Container>
      </div>
    </Fragment>
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
