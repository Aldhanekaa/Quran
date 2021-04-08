import Document, { Html, Head, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../utils/gtag";
import { ServerStyleSheets } from "@material-ui/core/styles";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <script
            type="text/javascript"
            async
            src="https://www.google-analytics.com/analytics.js"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',${GA_TRACKING_ID});
              `
            }}
          ></script>
          <link rel="icon" href={process.env.PUBLIC_URL + "/favicon.ico"} />
          <link
            rel="apple-touch-icon"
            href={process.env.PUBLIC_URL + "/logo192-apple-touch.png"}
          />
          <meta name="application-name" content="QuranWebApp" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="Qurann WebApp" />
          <meta
            name="description"
            content="WebApp Quran, Read and Meditate with Quran Online."
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#FFFFFF" />
          {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
          {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `
            }}
          />

          <meta
            name="keywords"
            content="Madrasah Tsanawiyah Techno Natura,karya ilmiah remaja,karya ilmiah remaja Madrasah Tsanawiyah Techno Natura,indonesia,madrasah,techno natura depok,madrasah tsanawiyah,madrasah tsanawiyah techno natura,madrasah tsanawiyah techno natura depok,MTs Technonatura,MTS Depok,MTS Techno,SMP Technonatura,smp technonatura,smp techno"
          />
          <meta name="geo.region" content="ID" />
          <meta name="geo.placename" content="Depok, Jawa Barat" />
          <link rel="shortlink" href={process.env.PUBLIC_URL} />
          <link rel="canonical" href={process.env.PUBLIC_URL} />

          <meta name="og:url" content={process.env.PUBLIC_URL} />
          <meta name="og:type" content="website" />

          <meta
            name="og:image"
            content={`${process.env.PUBLIC_URL}/open-graph/og-img-small.png`}
          />
          <meta
            property="og:image:alt"
            content="Alqurann Website Application Log Open Graph Big Version"
          />
          <meta property="og:image:width" content="1280" />
          <meta property="og:image:height" content="640" />

          <meta
            property="og:image:alt"
            content="Alqurann Website Application Log Open Graph Small Version"
          />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta
            property="og:site_name"
            content="Alqurann Website Application"
          />

          <meta name="cannonical" content={process.env.PUBLIC_URL} />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MGMF2TJ"
              height="0"
              width="0"
              style="display: none; visibility: hidden"
            ></iframe>
            `
            }}
          ></noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement()
    ]
  };
};
