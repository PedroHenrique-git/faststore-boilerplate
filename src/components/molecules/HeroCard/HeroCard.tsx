import { Box } from '@chakra-ui/react';
import { CardItem } from './CardItem';

interface Props {
  imageAlt: string;
  imageSrc: string;
  link: string;
  linkText: string;
  subtitle: string;
  title: string;
  renderAsSection?: boolean;
}

export const HeroCard = ({
  imageAlt = '',
  imageSrc = '',
  link = '',
  linkText = '',
  subtitle = '',
  title = '',
  renderAsSection = false,
}: Props) => {
  if (renderAsSection) {
    return (
      <Box as="section" data-testid="hero-card">
        <CardItem
          imageAlt={imageAlt}
          imageSrc={imageSrc}
          link={link}
          linkText={linkText}
          subtitle={subtitle}
          title={title}
        />
      </Box>
    );
  }

  return (
    <CardItem
      data-testid="hero-card"
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      link={link}
      linkText={linkText}
      subtitle={subtitle}
      title={title}
    />
  );
};
