import { config } from '@config/store';
import GoogleTagManager from './GoogleTagManager';
import Vtex from './Vtex';

const gtmContainerId = config.base.analytics?.gtmContainerId;

const includeGTM = typeof gtmContainerId === 'string';
const includeVTEX = config.base.platform === 'vtex';

if (process.env.NODE_ENV === 'development' && !includeGTM) {
  console.warn(
    'No GTM container id found. Check the analytics section on your config file for enhanced observability of your store.',
  );
}

function ThirdPartyScripts() {
  return (
    <>
      {includeGTM && <GoogleTagManager containerId={gtmContainerId} />}
      {includeVTEX && <Vtex />}
    </>
  );
}

export default ThirdPartyScripts;
