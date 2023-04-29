import { Box, Button, List, ListItem } from '@chakra-ui/react';
import { useRef } from 'react';
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from 'react-icons/hi';
import { usePagination } from 'src/sdk/search';

export const Pagination = () => {
  const {
    changePage,
    currentPage,
    slicedPages,
    shouldDisableNextButton,
    shouldDisablePrevButton,
    currentStart,
    currentEnd,
    firstPage,
    lastPage,
  } = usePagination();

  const slice = useRef({
    start: currentStart,
    end: currentEnd,
  });

  const { end, start } = slice.current;

  return (
    <Box
      as="section"
      gridColumn={{ base: 'span 2', lg: '2 / 2' }}
      marginTop={'3'}
    >
      <List display={'flex'} gap={'3'}>
        <ListItem>
          <Button
            onClick={() => {
              if (currentPage === firstPage) {
                slice.current = {
                  start: start - 1,
                  end: end - 1,
                };
              }

              changePage(currentPage - 1, slice.current);
            }}
            disabled={shouldDisablePrevButton}
          >
            <HiOutlineArrowSmLeft size={20} />
          </Button>
        </ListItem>
        {slicedPages.map((page) => (
          <ListItem key={page}>
            <Button
              onClick={() => changePage(page)}
              disabled={page === currentPage}
            >
              {page}
            </Button>
          </ListItem>
        ))}
        <ListItem>
          <Button
            onClick={() => {
              if (currentPage === lastPage) {
                slice.current = {
                  start: start + 1,
                  end: end + 1,
                };
              }

              changePage(currentPage + 1, slice.current);
            }}
            disabled={shouldDisableNextButton}
          >
            <HiOutlineArrowSmRight size={20} />
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};
