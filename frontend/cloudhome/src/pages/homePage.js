import { useEffect, useState, useRef } from "react";
import Navbar from "../components/navbar/index1";
import useCreateFolder from "../hooks/useCreateFolder";
import useGetFileFolders from "../hooks/useGetFileFolders";
import useUploadFile from "../hooks/useUploadFile";


const getFileIcon = (fileType) => {
    switch (fileType) {
        case "pdf":
            return "/assets/icons/pdf-icon.png";
        case "image":
            return "/assets/icons/image-icon.png";
        case "document":
            return "/assets/icons/document-icon.png";
        case "folder":
            return "/assets/icons/folder-icon.png";
        default:
            return "/assets/icons/file-icon.png";
    }
};

const HomePage = () => {
    const inputRef = useRef();
    const [newFolder, setNewFolder] = useState("");
    const [showCreateFolder, setShowCreateFolder] = useState(false);
    const { createFolder } = useCreateFolder();
    const [folderStructure, setFolderStructure] = useState([{ _id: null, name: "Home" }]);
    const { getFileFolders, fileFolders } = useGetFileFolders();

    const parentFolder = folderStructure[folderStructure.length - 1];

    const handleDoubleClick = (elem) => {
        if (elem.type === "folder") {
            setFolderStructure([...folderStructure, elem]);
        }
    };

    const handleAllowCreateFolder = () => {
        setShowCreateFolder(true);
    };

    const handleCreateFolder = async () => {
        if (newFolder.length > 0) {
            await createFolder({
                name: newFolder,
                parentId: parentFolder._id,
            });
            getFileFolders(parentFolder._id);
            setShowCreateFolder(false);
        }
    };

    useEffect(() => {
        getFileFolders(parentFolder._id);
    }, [folderStructure]);

    const handleBackClick = (clickIdx) => {
        const newFolderStructure = folderStructure.filter((elem, idx) => idx <= clickIdx);
        setFolderStructure(newFolderStructure);
    };

    const { uploadFile, isUploadAllowed } = useUploadFile();
    const handleFileUpload = async (e) => {
        if (isUploadAllowed) {
            const file = e.target.files;
            await uploadFile({
                file: file[0],
                parentId: parentFolder._id,
            });
        } else {
            alert("Uploading is already in progress. Please wait...");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="homepage-main-container">
                <h3>Welcome to Cloud Home</h3>
                <div className="path-shower">
                    <ul>
                        {folderStructure.flatMap((elem, idx) => {
                            return <li key={idx} onClick={() => handleBackClick(idx)}> {elem.name}</li>;
                        })}
                    </ul>
                </div>
                <button onClick={handleAllowCreateFolder}>Create Folder</button>
                <h1>Upload File</h1>
                <input className="file-upload-input" ref={inputRef} type="file" onChange={handleFileUpload} />
                <h4>Cloud Home</h4>
                <div>
                    {showCreateFolder && (
                        <div className="create-folder-container">
                            <input value={newFolder} onChange={(e) => setNewFolder(e.target.value)} />
                            <button onClick={handleCreateFolder}>Create</button>
                            <button onClick={() => setShowCreateFolder(false)}>Cancel</button>
                        </div>
                    )}
                </div>
                <div>
                    {fileFolders.map((elem) => {
                        const fileType = elem.type === "folder" ? "folder" : elem.name.split('.').pop();
                        const icon = getFileIcon(fileType);
                        return (
                            <div
                                key={elem._id}
                                className="file-item"
                                onDoubleClick={() => handleDoubleClick(elem)}
                            >
                                <img src={icon} alt={fileType} />
                                <p>{elem.name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default HomePage;