import { Head, Html, Main, NextScript } from 'next/document';
import ThirdPartyScripts from 'src/components/ThirdPartyScripts/ThirdPartyScripts';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <ThirdPartyScripts />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
