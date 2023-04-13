import { Home as HomeTemplate } from '@templates/Home';
import { CmsPage } from 'src/services/cms/types';

interface Props {
  cmsHome: CmsPage | null;
}

export const Home = ({ cmsHome }: Props) => {
  console.log(cmsHome);

  return <HomeTemplate cmsHome={cmsHome} />;
};
