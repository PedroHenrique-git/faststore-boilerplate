import { Logo } from '@atoms/Logo';
import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import { BsGithub } from 'react-icons/bs';

export const Footer = () => {
  return (
    <Box
      as="footer"
      borderTop={'1px solid'}
      borderColor={'gray.100'}
      marginTop={'20'}
      padding={'2.5rem 0'}
    >
      <Container maxWidth={'container.xl'}>
        <Flex justifyContent={'space-between'}>
          <Logo />
          <Link
            href="https://github.com/PedroHenrique-git/faststore-boilerplate"
            _hover={{ textDecoration: 'none' }}
            isExternal
          >
            <BsGithub size={25} />
          </Link>
        </Flex>
        <Flex
          borderTop={'1px solid'}
          borderColor={'gray.100'}
          paddingTop={'1.5rem'}
          marginTop={'5'}
          justifyContent={'space-between'}
          flexWrap={'wrap'}
          gap={'10'}
        >
          <Text>
            © {new Date().getFullYear()} faststore boilerplate, Inc. All rights
            reserved.
          </Text>
          <Text>
            Create by{' '}
            <Text as={'span'} fontWeight={'bold'}>
              @PedroHenrique-git
            </Text>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};
