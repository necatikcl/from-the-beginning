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

export const translate = (key: MessageKey, n?: unknown): MessageValue => {
  const message = messages[locale.value][key];

  if (!n || Array.isArray(message)) return message;

  return message.replace('{n}', String(n));
};
