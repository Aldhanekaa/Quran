import Toolbar from "@material-ui/core/Toolbar";

import React, { Fragment, useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import Head from "next/head";

import Hero from "../components/home/hero";
import ListSurah from "../components/home/listSurah/";
const title = "Home | MTs TechnoNatura";
const description =
  "Website resmi Remaja Madrasah Tsanawiyah TechnoNatura Depok. Website buatan para programmer MTs.";

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
      <Hero />
      <ListSurah />
    </Fragment>
  );
}

/*
<Grid item xs>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Al-Fatihah {bull} <span>الفاتحة</span>
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  The Opener
                </Typography>
                <Typography variant="body2" component="p">
                  This Surah is named Al-Fatihah because of its subject-matter.
                  Fatihah is that which opens a subject or a book or any other
                  thing. In other words, Al-Fatihah is a sort of preface.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleClickOpen}>
                  Read Surah
                </Button>
                <Button size="small">See Info</Button>
              </CardActions>
            </Card>
          </Grid>
*/
