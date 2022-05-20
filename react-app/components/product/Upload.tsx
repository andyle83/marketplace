import * as React from "react";
import {useState} from "react";
import {UseFormRegister, UseFormWatch} from "react-hook-form/dist/types/form";
import axios from "axios";
import {FieldErrors} from "react-hook-form/dist/types/errors";
import Image from "next/image";

interface UploadProps {
  register: UseFormRegister<any>,
  errors: FieldErrors<any>,
  watch: UseFormWatch<any>,
  onCompleted: (filePath: string) => void,
}

export default function Upload({ onCompleted, register, watch, errors } : UploadProps) {
  const [previewImage, setPreviewImage] = useState<string>('');
  const [fileImage, setFileImage] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploadCompleted, setIsUploadCompleted] = useState<boolean>(false);

  const onPreviewImageChange = (event) => {
    setIsUploadCompleted(false);
    let file = event.target.files[0];
    if (file) {
      // Reset upload progress
      setUploadProgress(0);
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setPreviewImage(reader.result.toString());
        setFileImage(file);
      }
    }
  }

  const uploadFile = async () => {
    if (fileImage == null) return;
    // Generate a signed URL for file upload with aws-sdk
    let { data } = await axios.post("/api/s3/uploadFile", {
      name: fileImage.name,
      type: fileImage.type,
    });

    // Get the signed URL
    const url = data.url;

    // Upload local file
    await axios.put(url, fileImage, {
      headers: {
        "Content-type": fileImage.type,
        "Access-Control-Allow-Origin": "*",
      },
      onUploadProgress: progressEvent => {
        let uploadPercentage = (progressEvent.loaded * 100) / progressEvent.total;
        setUploadProgress(uploadPercentage);

        if (uploadPercentage == 100) {
          setIsUploadCompleted(true);
          onCompleted(url.split("?")[0]);
        }
      }
    });
  };

  return (
    <>
      <label htmlFor="imageUrl" className="col-form-label">Image URL</label>
      <div className="row">
        <div className="col-12 col-sm-4 pb-2">
          {
            !previewImage ? (
              <img src="https://via.placeholder.com/200" alt="Placeholder"/>
            ) : <Image src={previewImage} alt="Preview Image" width="200" height="200" />
          }
        </div>
        <div className="col-12 col-sm-8">
          <input type="file" className="form-control" id="imageUrl"
                 {...register("imageUrl", { required: true , onChange: onPreviewImageChange})} />
          <progress id="uploadProgress" max="100" style={{width: "100%", marginTop: "8px", marginBottom: "8px"}} value={uploadProgress}></progress>
          <div>
            { (isUploadCompleted) ? (
              <button type="button" className="btn btn-secondary disabled">
                <i className="bi bi-cloud-upload-fill" style={{marginRight: "0.5rem"}}></i>
                Done
              </button>
            ) : (
              <button type="button" className="btn btn-outline-primary" onClick={uploadFile}>
                <i className="bi bi-cloud-upload" style={{marginRight: "0.5rem"}}></i>
                Upload
              </button>
            )
            }
          </div>
        </div>
      </div>
      <div role="alert" className="mt-2 text-danger">{errors.imageUrl?.message}</div>
    </>
  )
}