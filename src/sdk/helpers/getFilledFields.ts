export default function getFilledFields(object: Record<string, unknown>) {
  return Object.entries(object).reduce<Record<string, unknown>>(
    (prev, current) => {
      const [key, value] = current;

      return value ? { ...prev, [key]: value } : { ...prev };
    },
    {},
  );
}
