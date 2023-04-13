import '@splidejs/react-splide/css';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { HeroCard } from '.';

export default {
  title: 'components/molecules/HeroCard',
  component: HeroCard,
} as ComponentMeta<typeof HeroCard>;

export const StoreHeroCard: ComponentStory<typeof HeroCard> = () => {
  return (
    <HeroCard
      imageAlt="office"
      imageSrc="https://storeframework.vtexassets.com/assets/vtex.file-manager-graphql/images/17555ae3-3405-4be6-a19a-e76997a333ea___1fa52ed2b11886ffe215bab9588c345d.jpg"
      link="/technology"
      linkText="See"
      subtitle="At FastStore you can shop the best tech of 2023. Enjoy and get 10% off on your first purchase!"
      title="20% off on first purchase"
    />
  );
};
