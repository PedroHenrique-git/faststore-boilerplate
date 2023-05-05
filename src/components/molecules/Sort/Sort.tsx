import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useFilter, useSearchParams } from 'src/sdk/search';

const OptionsMap = {
  price_desc: 'Price, descending',
  price_asc: 'Price, ascending',
  orders_desc: 'Top sales',
  name_asc: 'Name, A-Z',
  name_desc: 'Name, Z-A',
  release_desc: 'Release date',
  discount_desc: 'Discount',
  score_desc: 'Relevance',
};

const keys = Object.keys(OptionsMap) as Array<keyof typeof OptionsMap>;

export const Sort = () => {
  const { sort } = useSearchParams();
  const { changeSort } = useFilter();

  return (
    <Menu>
      <MenuButton as={Button}>{OptionsMap[sort]}</MenuButton>
      <MenuList>
        {keys.map((key) => (
          <MenuItem key={key} onClick={() => changeSort(key)}>
            {OptionsMap[key]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
