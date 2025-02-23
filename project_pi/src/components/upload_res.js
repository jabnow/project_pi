import React, { useState, forwardRef, useImperativeHandle } from 'react';

const ResumeUploader = forwardRef((props, ref) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            localStorage.setItem('uploadedResume', JSON.stringify({
                name: file.name,
                type: file.type,
                data: URL.createObjectURL(file),
            }));
        } else {
            setSelectedFile(null);
            localStorage.removeItem('uploadedResume');
        }
    };

    const handleUpload = () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('resume', selectedFile);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Upload failed');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    useImperativeHandle(ref, () => ({
        triggerFileInput: () => {
            document.getElementById('file-input').click();
        },
        triggerUpload: handleUpload,
    }));

    return (
        <div>
            <input
                id="file-input"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
            <button onClick={handleUpload} disabled={!selectedFile}>
                Upload Resume
            </button>
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
});

export default ResumeUploader;