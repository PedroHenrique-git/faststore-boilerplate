import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@containers/Layout/Layout';
import type { AppProps } from 'next/app';
import theme from 'src/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}
