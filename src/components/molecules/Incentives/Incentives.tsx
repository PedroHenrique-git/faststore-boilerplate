import { Flex, Text } from '@chakra-ui/react';
import { BiStore } from 'react-icons/bi';
import { BsCalendar, BsGift, BsTruck } from 'react-icons/bs';
import { TbShieldCheck } from 'react-icons/tb';

type IconsType = 'Truck' | 'Calendar' | 'Gift' | 'Storefront' | 'ShieldCheck';

interface Incentive {
  title: string;
  firstLineText: string;
  icon: string;
}

interface Props {
  incentives: Array<Incentive>;
}

const iconsMap: Record<IconsType, JSX.Element> = {
  Truck: <BsTruck size={25} />,
  Calendar: <BsCalendar size={25} />,
  Gift: <BsGift size={25} />,
  Storefront: <BiStore size={25} />,
  ShieldCheck: <TbShieldCheck size={25} />,
};

export const Incentives = ({ incentives = [] }: Props) => {
  return (
    <Flex
      as={'section'}
      w={'100%'}
      background={'gray.100'}
      padding={'5'}
      margin={'1.25rem 0'}
      justifyContent={'space-between'}
      gap={{ base: '10' }}
      overflowX={'auto'}
      scrollBehavior={'smooth'}
      scrollSnapType={'mandatory'}
      data-testid="incentives"
    >
      {incentives.map((incentive) => (
        <Flex
          key={incentive.icon}
          alignItems={'center'}
          flexShrink={0}
          direction={'row'}
          gap={'3'}
          _notLast={{
            borderRight: '1px solid',
            borderColor: 'gray.300',
            paddingRight: '2rem',
          }}
        >
          {iconsMap[incentive.icon as IconsType]}
          <Flex direction={'column'}>
            <Text>{incentive.title}</Text>
            <Text>{incentive.firstLineText}</Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};
