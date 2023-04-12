export const createUserName = function (name) {
  if (name) {
    const username = name
      .toLowerCase()
      .split(' ')
      .map(elem => elem[0])
      .join('');

    return username;
  }
  return name;
};
