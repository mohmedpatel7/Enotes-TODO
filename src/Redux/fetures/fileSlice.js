import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://enotes-backend-3k2a.onrender.com";

// API call for fetching files...
export const fetchFiles = createAsyncThunk("fetchFiles", async () => {
  try {
    const response = await fetch(`${url}/api/files/getFiles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// API call for uploading files
export const addFile = createAsyncThunk("addFile", async (fileData) => {
  try {
    const formData = new FormData();
    formData.append("file", fileData); // Append the file

    const response = await fetch(`${url}/api/files/addFile`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"), // Send only auth token in headers
      },
      body: formData, // Send the file in formData
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json(); // Return the uploaded file's response
  } catch (error) {
    console.error(error);
    throw error;
  }
});

//API call for deleting file..
export const deleteFile = createAsyncThunk("deleteFile", async (fileId) => {
  try {
    const response = await fetch(`${url}/api/files/delFIle/${fileId}`, {
      method: "DELETE",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
});

//API call for downloading file..
export const dwnFile = createAsyncThunk("dwnFile", async (fileId) => {
  try {
    const response = await fetch(`${url}/api/files/dwnFile/${fileId}`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a URL for the blob and trigger a download
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "downloadedFile"; // Set the file name here, or retrieve it from response headers if available
    document.body.appendChild(link);
    link.click(); // Programmatically click the link to trigger download
    document.body.removeChild(link); // Clean up the DOM

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error; // Ensure errors are properly propagated
  }
});

const fileSlice = createSlice({
  name: "file",
  initialState: {
    isLoading: false,
    data: [], // Initialize data as an array
    error: null,
  },
  extraReducers: (builder) => {
    // Handle file fetching cases
    builder.addCase(fetchFiles.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchFiles.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.error = null;
    });
    builder.addCase(fetchFiles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // Handle file upload cases
    builder.addCase(addFile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addFile.fulfilled, (state, action) => {
      state.isLoading = false;
      // Ensure state.data is always an array before pushing
      if (Array.isArray(state.data)) {
        state.data.push(action.payload); // Append uploaded file data
      } else {
        state.data = [action.payload]; // If it's not an array, convert to array and add the file
      }
      state.error = null;
    });
    builder.addCase(addFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Handle delete file cases
    builder.addCase(deleteFile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteFile.fulfilled, (state, action) => {
      state.isLoading = false;
      // Ensure state.data is an array before filtering
      if (Array.isArray(state.data)) {
        state.data = state.data.filter(
          (file) => file._id !== action.payload._id
        );
      } else {
        console.error("state.data is not an array:", state.data);
      }

      state.error = null;
    });
    builder.addCase(deleteFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Handle cases for dowloading file..
    builder.addCase(dwnFile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(dwnFile.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(dwnFile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default fileSlice.reducer;
