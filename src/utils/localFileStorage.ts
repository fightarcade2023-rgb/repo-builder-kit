// Utilitários para armazenamento local de arquivos

export async function saveFileToLocalStorage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function getFileFromLocalStorage(base64: string): string {
  return base64;
}
