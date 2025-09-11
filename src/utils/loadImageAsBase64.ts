export async function loadImageAsBase64(url: string): Promise<{ base64: string; width: number; height: number }> {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        resolve({
          base64: reader.result as string,
          width: img.width,
          height: img.height,
        });
      };
    };
    reader.readAsDataURL(blob);
  });
}