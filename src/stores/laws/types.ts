import type { Ref } from 'vue';

export type LawKey = 'diligence' | 'land' | 'urbanization' | 'happiness';

export interface Law {
  key: LawKey,
  active: boolean,
  toggle: () => void
}

export interface LawArticle {
  key: LawKey,
  active: Ref<boolean>,
}
