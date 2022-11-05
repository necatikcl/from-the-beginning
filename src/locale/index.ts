import { ref } from 'vue';
import en from './messages/en';
import type { MessageKey, Messages } from './messages/en';
import tr from './messages/tr';

type Language = 'en' | 'tr';

const messages: { [K in Language]: Messages } = {
  en,
  tr,
};

export const locale = ref<Language>('en');

export const translate = (key: MessageKey, n?: unknown): string => {
  const message = messages[locale.value][key];

  if (!n) return message;

  return message.replace('{n}', String(n));
};
