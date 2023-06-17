import { useStorage } from '@vueuse/core';

import type { LawArticle, LawKey } from './types';

const createLaw = (key: LawKey, articles: (props: LawArticle) => void) => () => {
  const active = useStorage(`${key}.active`, false);

  articles({ key, active });

  const toggle = () => {
    active.value = !active.value;
  };

  return {
    key,
    active,
    toggle,
  } as const;
};

export default createLaw;
