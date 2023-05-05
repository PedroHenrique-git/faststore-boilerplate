import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react';
import { Filter_FacetsFragment } from '@generated/graphql';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { useFilter } from 'src/sdk/search';
import { filterSideBarAtom } from 'src/sdk/state';
import { SearchFilters } from '../SearchFilters';

interface Props {
  facets: Filter_FacetsFragment[];
}

export const FiltersSideBar = ({ facets }: Props) => {
  const { clearFilters } = useFilter();
  const [filterSideBar, setFilterSideBar] = useAtom(filterSideBarAtom);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const onOpen = () => setFilterSideBar(true);
  const onClose = () => setFilterSideBar(false);

  return (
    <>
      <Button
        ref={btnRef}
        colorScheme="gray"
        onClick={onOpen}
        display={{ base: 'block', lg: 'none' }}
      >
        Filters
      </Button>

      <Drawer
        isOpen={filterSideBar}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={'sm'}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody>
            <SearchFilters filters={facets} />
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme="gray" w={'100%'} onClick={clearFilters}>
              Clear filters
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
