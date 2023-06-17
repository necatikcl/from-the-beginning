export const getObjectEntries = <T extends {}>(obj: T) => Object.entries(obj) as {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
