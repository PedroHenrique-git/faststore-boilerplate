import { Container } from '@chakra-ui/react';
import { menuLinks } from '@molecules/Menu';
import { Header } from '@organisms/Header/Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header menuLinks={menuLinks} />
      <Container maxW={'container.xl'}>{children}</Container>
    </>
  );
};
