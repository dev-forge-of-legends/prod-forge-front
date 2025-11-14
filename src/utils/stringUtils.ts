export const capitalizeFirstLetter = (str: string) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const generateSeed = () => {
  return Math.random().toString(36).substring(2, 15);
};

export const getValidImageUrl = (url: string) => {
  if (!url) return '';
  // Get CloudFront base URL from environment variables
  const CLOUDFRONT_BASE_URL = import.meta.env.VITE_CLOUDFRONT_ASSETS_BASE_URL;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url; // Already a valid URL
  }

  if (url.startsWith('data:')) {
    return url; // Data URL, return as is
  }

  if (url.startsWith('blob:')) {
    return url; // Blob URL, return as is
  }

  if (url.startsWith('/')) {
    return `${CLOUDFRONT_BASE_URL}${url}`; // Relative path
  }

  return `${CLOUDFRONT_BASE_URL}/${url}`;
}