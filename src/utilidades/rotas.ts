export const formatarRotaSlug = (string: string) => {
  return string.toLocaleLowerCase().replace(/[' ']+/g, '-');
};
