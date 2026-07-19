export const parseOptionalNumber = (value: string) => {
  if (!value) {
    return undefined;
  }

  return Number(value);
};
