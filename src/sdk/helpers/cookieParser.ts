export const cookieParser = (cookie: string) => {
  return cookie
    .split(';')
    .map((str) => str.trim())
    .reduce<Record<string, string>>((prev, current) => {
      const [key, value] = current.split('=');

      return {
        ...prev,
        ...(key === 'secure' || key === 'httponly' || key === 'httpOnly'
          ? { [key]: 'true' }
          : { [key]: value }),
      };
    }, {});
};
