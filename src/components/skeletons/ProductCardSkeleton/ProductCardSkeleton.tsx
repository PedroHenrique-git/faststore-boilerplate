import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

export const ProductCardSkeleton = () => {
  return (
    <Card boxShadow={0} border={'1px solid'} borderColor={'gray.200'}>
      <CardBody>
        <Skeleton w={'100%'} h={'180px'} />

        <Stack mt="6" spacing="3">
          <Skeleton w={'100%'} h={'25px'} />
          <Skeleton w={'100%'} h={'25px'} />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter></CardFooter>
    </Card>
  );
};
