import { ref } from 'vue';

import en from './messages/en';
import type { Messages } from './messages/en';

type Language = 'en';
export type MessageKey = keyof Messages;
type MessageValue = Messages[MessageKey];

const messages: { [K in Language]: Messages } = {
  en,
};

export const locale = ref<Language>('en');

export const translate = (key: MessageKey, n?: unknown): string => {
  const message = messages[locale.value][key];

  if (Array.isArray(message)) {
    return key;
  }

  if (!n) return message;

  return message.replace('{n}', String(n));
};

export const translateArray = (key: MessageKey): string[] => {
  const message = messages[locale.value][key];

  if (!Array.isArray(message)) return [key];

  return message;
};
