export const generateAvatar = (name) => {
  const arr = name.split(" ");
  const username = `${arr[0]}+${arr[1]}`;
  const avatar = `https://ui-avatars.com/api/?name=${username}`;
  return avatar;
};
