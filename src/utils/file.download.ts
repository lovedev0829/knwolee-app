export async function downloadFile(sourceUrl: string, downloadFileName = "knowlee-file") {
    const response = await fetch(sourceUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
