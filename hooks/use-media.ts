import { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

const getInitialState = (query: string) =>
  isBrowser ? window.matchMedia(query).matches : false;

export const useMedia = (query: string) => {
  const [state, setState] = useState(getInitialState(query));

  useEffect(() => {
    if (!isBrowser) return;

    const mql = window.matchMedia(query);
    const onChange = () => setState(mql.matches);

    mql.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, [query]);

  return state;
};
