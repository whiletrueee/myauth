export const generateUsername = (name: string) => {
  if (name.split(" ").length > 1) {
    return (
      name.split(" ")[0].slice(0, 1).toLowerCase() +
        name.split(" ")[1].slice(0, 1).toLowerCase() ??
      name.split(" ")[0].slice(1, 2)
    ).toLowerCase();
  } else {
    return name.slice(0, 2).toLowerCase();
  }
};
