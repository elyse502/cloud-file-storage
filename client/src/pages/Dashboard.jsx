import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      fetchFiles();
    }
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await API.get("/files");
      setFiles(res.data.files || []);
    } catch (error) {
      setMessage("❌ Failed to fetch files.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return setMessage("⚠️ Please select a file first.");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setLoading(true);
      await API.post("/files/upload", formData);
      setMessage("✅ File uploaded successfully!");
      setSelectedFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      await API.delete(`/files/${id}`);
      setFiles(files.filter((f) => f._id !== id));
      setMessage("🗑 File deleted.");
    } catch (error) {
      console.error("Delete failed:", error);
      setMessage("❌ Could not delete file.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📁 Your Cloud Files</h1>
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Login
          </button>
        )}
      </div>

      {isAuthenticated ? (
        <>
          {/* Upload Form */}
          <form
            onSubmit={handleUpload}
            className="flex items-center space-x-4 mb-6"
          >
            <input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </form>

          {message && <p className="text-sm text-gray-700 mb-4">{message}</p>}

          {/* File List */}
          {loading ? (
            <p className="text-center text-gray-500">Loading files...</p>
          ) : files.length === 0 ? (
            <p className="text-center text-gray-500">No files uploaded yet.</p>
          ) : (
            <ul className="space-y-3">
              {files.map((file) => (
                <li
                  key={file._id}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded"
                >
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all"
                  >
                    {file.name}
                  </a>
                  <button
                    onClick={() => handleDelete(file._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    🗑 Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          🔒 Please login to view or manage your files.
        </p>
      )}
    </div>
  );
}
