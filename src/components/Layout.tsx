import { Container } from '@chakra-ui/react';
import { menuLinks } from '@molecules/Menu';
import { Footer } from '@organisms/Footer';
import { Header } from '@organisms/Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header menuLinks={menuLinks} />
      <Container as={'main'} maxW={'container.xl'}>
        {children}
      </Container>
      <Footer />
    </>
  );
};
