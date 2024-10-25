import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFiles,
  addFile,
  deleteFile,
  dwnFile,
} from "../../Redux/fetures/fileSlice";

export default function Files({ showAlert }) {
  const isUser = localStorage.getItem("token");
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.fileSliceStore);

  useEffect(() => {
    dispatch(fetchFiles());
  });

  // Handle file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle file input click (to open the file dialog)
  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (selectedFile) {
      // Performing the file upload action
      dispatch(addFile(selectedFile));
      showAlert("File Uploaded.", "success");
      // Reset the selected file to allow "+" to reappear
      setSelectedFile(null);
    } else {
      alert("Please select a file first!");
    }
  };

  //Handle file delete..
  const handleFiledelete = (fileId) => {
    let del = window.confirm("Do you really wants to delete file ?");
    if (del) {
      dispatch(deleteFile(fileId));
      showAlert("File Deleted.", "success");
    }
  };

  const handleDownload = async (fileId) => {
    const downloadResult = await dispatch(dwnFile(fileId));
    if (downloadResult.meta.requestStatus === "fulfilled") {
      showAlert("File downloaded successfully.", "success");
    } else {
      showAlert("Failed to download the file.", "danger");
    }
  };

  return (
    <>
      {isUser && (
        <div className="container">
          <div className="row file-row">
            {/* Empty space to push button to the right */}
            <div className="col-md-10">
              <h2 className="my-2">Upload Files</h2>
              <p>
                <b>Warning:</b>maximum file size 7mb
              </p>
            </div>

            <div className="col-md-2 d-flex justify-content-end align-items-center">
              <input
                type="file"
                ref={fileInputRef}
                className="file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button
                className="modal-btn file-btn btn btn-success my-1"
                onClick={selectedFile ? handleFileUpload : handleUploadClick}
              >
                <span style={{ fontSize: "3vh" }}>
                  {selectedFile ? "Upload" : "+"}
                </span>
              </button>
            </div>
          </div>

          <div className="my-5">
            <h2>Your Files...</h2>
            <div className="container">
              {/*{isLoading && <h4>Loading...</h4>}*/}
              {data && Array.isArray(data.files) && data.files.length > 0 ? ( // converting data object into array..
                data.files.map((data, index) => (
                  <div className="card my-3" key={index}>
                    <div className="card-header mt-1">
                      <h5>
                        <b>Filename:</b> {data.fileName}
                      </h5>
                    </div>
                    <div className="card-body">
                      <div className="card-description">
                        <p>
                          <b>Type:</b>
                          {data.fileType}
                          <br />
                          <b>Size:</b>
                          {(data.fileSize / 1024).toFixed(2)} KB
                        </p>
                        <p className="text-end">
                          <i
                            className="fa-solid fa-trash mx-2"
                            style={{ fontSize: "18px" }}
                            title="delete file"
                            onClick={() => handleFiledelete(data._id)}
                          ></i>
                          <i
                            className="fa-solid fa-file-arrow-down mx-2"
                            style={{ fontSize: "20px" }}
                            title="download file"
                            onClick={() => handleDownload(data._id)}
                          ></i>
                        </p>
                      </div>
                      <div className="card-footer mt-4">
                        <p className="text-end">
                          {new Date(data.uploadedAt).toDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h4>No Files Available...</h4>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
