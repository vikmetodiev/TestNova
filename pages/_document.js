import Document, { Html, Head, Main, NextScript } from "next/document";
class MyDocument extends Document {
  //   static async getInitialProps(ctx) {
  //     const initialProps = await Document.getInitialProps(ctx);
  //     return { ...initialProps };
  //   }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <title>Novarto</title>
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="pinterest" content="nopin" />
          <meta
            name="SKYPE_TOOLBAR"
            content="SKYPE_TOOLBAR_PARSER_COMPATIBLE"
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Novarto" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Novarto" />
          <meta name="twitter:site" content="@NovartoLtd" />
          <meta
            name="twitter:image"
            content="https://api.novarto.com/api/images/novarto-logo.jpg"
          />
          <meta name="twitter:creator" content="@NovartoLtd" />
          <meta property="fb:app_id" content="fb_novarto" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto+Slab:300,400,500,700&display=swap"
            rel="stylesheet"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="https://api.novarto.com/api/images/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="https://api.novarto.com/api/images/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="https://api.novarto.com/api/images/favicon-16x16.png"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-GFZSDHRNW2"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-GFZSDHRNW2');`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
