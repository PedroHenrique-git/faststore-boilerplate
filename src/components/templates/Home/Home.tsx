import { Carousel } from '@molecules/Carousel';
import { RenderCmsSections } from 'src/components/cms';
import { mockImages } from 'src/mocks';
import { CmsPage } from 'src/services/cms/types';

interface Props {
  cmsHome: CmsPage | null;
}

export const Home = ({ cmsHome }: Props) => {
  return (
    <>
      <Carousel images={mockImages} />

      <RenderCmsSections sections={cmsHome?.sections ?? null} />
    </>
  );
};
