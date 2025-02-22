// import React, { useState } from 'react';

// function ResumeUploader() {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       return;
//     }

//     // Implement upload logic here (e.g., using fetch or axios)
//     const formData = new FormData();
//     formData.append('resume', selectedFile);

//     // Example using fetch:
//     fetch('/upload', {
//       method: 'POST',
//       body: formData,
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log('Success:', data);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   };

//   return (
//     <div>
//       <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!selectedFile}>Upload Resume</button>
//       {selectedFile && <p>Selected file: {selectedFile.name}</p>}
//     </div>
//   );
// }

// export default ResumeUploader;