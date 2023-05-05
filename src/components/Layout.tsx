import { Container } from '@chakra-ui/react';
import { menuLinks } from '@molecules/Menu';
import { Footer } from '@organisms/Footer';
import { Header } from '@organisms/Header';
import { Fragment } from 'react';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Header menuLinks={menuLinks} />
      <Container as={'main'} maxW={'container.xl'}>
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};
