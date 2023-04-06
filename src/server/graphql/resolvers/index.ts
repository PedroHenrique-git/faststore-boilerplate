import { config } from '@config/store';
import { getResolvers } from '@faststore/api';

export default {
  ...getResolvers(config.apiOptions),
};
