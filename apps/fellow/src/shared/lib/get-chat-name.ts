export const getChatName = (members: string[], userName: string): string => {
  if (members.length > 2) {
    return members.join(', ');
  }

  if (members.every((x) => x === userName)) {
    return userName;
  }

  return members.filter((x) => x !== userName)[0];
};
