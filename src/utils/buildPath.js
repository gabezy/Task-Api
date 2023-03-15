export const buildPath = (path) => {
  const regex = /:([a-z]+)/g; // () -> group
  const pathWithParamns = path.replaceAll(regex, "(?<$1>[a-z0-9_-]+)");

  const pathRegex = new RegExp(`^${pathWithParamns}(?<query>\\?(.*))?$`);
  return pathRegex;
};
