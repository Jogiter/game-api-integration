import { customAlphabet } from 'nanoid';

export const uuid = customAlphabet(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
  64,
);
