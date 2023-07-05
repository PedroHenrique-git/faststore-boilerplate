import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  Stack,
  StackDivider,
} from '@chakra-ui/react';

export const ProfileSkeleton = () => {
  return (
    <>
      <Skeleton w={'15%'} h={'40px'} margin={'2rem 0'} />

      <Card>
        <CardHeader>
          <Skeleton w={'15%'} h={'25px'} />
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Skeleton w={'15%'} h={'24px'} marginBottom={'2'} />
              <Skeleton w={'100%'} h={'40px'} />
            </Box>

            <Box>
              <Skeleton w={'15%'} h={'24px'} marginBottom={'2'} />
              <Skeleton w={'100%'} h={'40px'} />
            </Box>

            <Box>
              <Skeleton w={'15%'} h={'24px'} marginBottom={'2'} />
              <Skeleton w={'100%'} h={'40px'} />
            </Box>

            <Box>
              <Skeleton w={'15%'} h={'24px'} marginBottom={'2'} />
              <Skeleton w={'100%'} h={'40px'} />
            </Box>

            <Box>
              <Skeleton w={'15%'} h={'24px'} marginBottom={'2'} />
              <Skeleton w={'100%'} h={'40px'} />
            </Box>

            <Box>
              <Skeleton w={'15%'} h={'24px'} marginBottom={'2'} />
              <Skeleton w={'100%'} h={'40px'} marginBottom={'4'} />
            </Box>
          </Stack>

          <Skeleton w={'15%'} h={'40px'} />
        </CardBody>
      </Card>
    </>
  );
};
