import { Container } from '@chakra-ui/react';
import { Header } from '@organisms/Header/Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Container maxW={'container.xl'}>{children}</Container>
    </>
  );
};
