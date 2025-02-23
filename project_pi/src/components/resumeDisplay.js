import React from 'react';

const ResumeDisplay = () => {
    const storedResume = JSON.parse(localStorage.getItem('uploadedResume'));

    if (!storedResume) {
        return <p>No resume uploaded for now.</p>;
    }

    const { name, type, data } = storedResume;

    return (
        <div style={styles.container}>
            <h2>Uploaded Resume</h2>
            <p>File Name: {name}</p>
            {type === 'application/pdf' ? (
                <embed src={data} type="application/pdf" style={styles.embed} />
            ) : (
                <a href={data} download={name} style={styles.downloadLink}>
                    Download {name}
                </a>
            )}
        </div>
    );
};

export default ResumeDisplay;

// CSS Styles
const styles = {
    container: {
        width: '50%',
        float: 'left',
        padding: '20px',
        boxSizing: 'border-box',
        borderRight: '1px solid #ccc',
    },
    embed: {
        width: '100%',
        height: '600px',
        border: '1px solid #ccc',
    },
    downloadLink: {
        display: 'inline-block',
        padding: '10px 20px',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '10px',
    },
};