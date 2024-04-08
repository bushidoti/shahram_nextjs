import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';

const MyDocument = () => (
  <Html lang="fa">
      <Head>
          <meta name="author" content="Bushidoti"/>
          <link rel="manifest" href="/manifest.json"/>
          <link rel="icon" href="/favicon.ico"/>
          <meta property="og:image" content="/favicon.ico"/>
          <link rel="apple-touch-icon" href="/icon-512.png"></link>
          <meta name="theme-color" content="#000"/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;