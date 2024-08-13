import { useState } from 'react';
import { useSelector } from 'react-redux';

const useUploadFile = () => {
    const [isUploadAllowed, setIsUploadAllowed] = useState(true); // Initialize isUploadAllowed state
    const token = useSelector(state => state.auth.token); // Assuming token is stored in auth state

    const uploadFile = async ({ file, parentId }) => {
        try {
            setIsUploadAllowed(false);
            let formData = new FormData();
            formData.append("file", file);
            formData.append("parentId", parentId);

            const res = await fetch(`http://localhost:1400/api/v1/file`, {
                method: "POST",
                body: formData,
                headers: { // Corrected syntax
                    authorization: "Bearer " + token,
                },
            });
            // Your upload logic here
            console.log("........,",res);
        } catch (err) {
            alert(err);
        } finally {
            setIsUploadAllowed(true);
        }
    };

    return { uploadFile, isUploadAllowed };
};
export default useUploadFile;