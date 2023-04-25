interface Params {
  term: string;
}

export function useSearchLink() {
  const getLinkProps = ({ term }: Params) => {
    return {
      href: `/s?term=${term}`,
    };
  };

  return {
    getLinkProps,
  };
}
