export const convertImageToWebP = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Resize to 64x64 pixels
      canvas.width = 64;
      canvas.height = 64;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, 64, 64);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const webpFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.webp'), {
              type: 'image/webp',
            });
            resolve(webpFile);
          } else {
            reject(new Error('Failed to convert image to WebP'));
          }
        }, 'image/webp', 0.8);
      } else {
        reject(new Error('Could not get canvas context'));
      }
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(file);
  });
};
