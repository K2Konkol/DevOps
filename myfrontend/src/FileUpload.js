import http from "./http-common";

class FileUploadService {
  upload(file, category, onUploadProgress) {
    let formData = new FormData();
    formData.set("category", category);
    formData.append("file", file);

    console.log(formData)
    return http.post("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return http.get("/images");
  }
}

export default new FileUploadService();