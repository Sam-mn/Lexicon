export  const downloadFile = async (fileContent: string, contentType: string) => {
    try {
    //   const res = await axios.get(`${BASE_URL}/Artifacts/${documentId}`);
      if (fileContent) {
        const byteCharacters = atob(fileContent);
        const byteNumbers = Array.from(byteCharacters, (char) =>
          char.charCodeAt(0)
        );
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {
          type: contentType,
        });
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl);
        URL.revokeObjectURL(blobUrl);
      } else {
        console.error("File content not available");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };