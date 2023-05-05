import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useAtom } from 'jotai';
import { paginationAtom } from 'src/sdk/state';
import { Pagination } from '.';

export default {
  title: 'components/molecules/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const config = {
  hasNextPage: true,
  hasPrevPage: true,
  totalPages: 50,
  totalProducts: 500,
};

export const StorePagination: ComponentStory<typeof Pagination> = () => {
  const [pagination, setPagination] = useAtom(paginationAtom);

  if (pagination !== config) {
    setPagination(config);
  }

  return <Pagination />;
};
