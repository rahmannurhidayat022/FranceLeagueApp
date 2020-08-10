export default (url) => {
  if (!url) return "./asset/images/ballLogo.png";
  return url.replace(/^http:\/\//i, "https://");
};
