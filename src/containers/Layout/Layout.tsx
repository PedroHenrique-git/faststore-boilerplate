import { Container } from '@chakra-ui/react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Container maxW="1080px">{children}</Container>;
};
