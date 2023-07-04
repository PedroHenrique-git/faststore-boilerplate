import { config } from '@config/store';

export default function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat(config.base.session.locale, {
    dateStyle: 'full',
  }).format(typeof date === 'string' ? new Date(date) : date);
}
