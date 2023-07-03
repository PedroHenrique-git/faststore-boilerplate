export default function getFilledFields<T extends Record<string, unknown>>(
  object: T,
  initialValue?: T,
): T {
  return Object.entries(object).reduce<T>((prev, current) => {
    const [key, value] = current;

    return value ? { ...prev, [key]: value } : { ...prev };
  }, initialValue ?? ({} as T));
}
