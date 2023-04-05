import { apiOptions } from '@config/store';
import { getResolvers } from '@faststore/api';

export default { ...getResolvers(apiOptions) };
