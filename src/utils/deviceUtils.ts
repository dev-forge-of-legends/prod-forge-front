export const getDeviceType = (): 'desktop' | 'mobile' => {
  // Check user agent for mobile indicators
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    'android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'
  ];
  
  const isMobileUserAgent = mobileKeywords.some(keyword => userAgent.includes(keyword));
  
  // Check screen width (mobile typically < 768px)
  const isMobileScreen = window.innerWidth < 768;
  
  // Check for touch support
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Combine checks: if any mobile indicator is true, consider it mobile
  return (isMobileUserAgent || (isMobileScreen && isTouchDevice)) ? 'mobile' : 'desktop';
};