import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />

        <>
          {/* // Portales: // NO BORRAR!!! */}
          <div id="modal"></div>
          <div id="alert"></div>
        </>

        <NextScript />
      </body>
    </Html>
  )
}
