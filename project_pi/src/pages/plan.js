import React, { useState, useEffect } from "react";

const Plan = () => {
    const [showResume, setShowResume] = useState(false); // Chatbot shown first
    const [pdf, setPdf] = useState(null);
    const [messages, setMessages] = useState([
        { ai: "👋 Welcome! I'm your Career AI. Ask me anything about your career!" }
    ]);
    const [userMessage, setUserMessage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "application/pdf") {
            setPdf(URL.createObjectURL(file));
        } else {
            alert("Please upload a valid PDF file.");
        }
    };

    const sendMessage = async () => {
        if (!userMessage.trim()) return;

        const newMessages = [...messages, { user: userMessage }];
        setMessages(newMessages);
        setUserMessage("");

        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            setMessages([...newMessages, { ai: data.response }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages([...newMessages, { ai: "Sorry, something went wrong." }]);
        }
    };

    return (
        <div>
            <h1>PLAN</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>

                {/* Left Side: Chatbot & Resume Toggle */}
                <div style={{ width: "45%", background: "#ddd", padding: "20px" }}>
                    <h2>Choose View</h2>
                    <button onClick={() => setShowResume(false)}>Chatbot</button>
                    <button onClick={() => setShowResume(true)}>Resume</button>

                    {showResume ? (
                        <div>
                            <h3>Your Resume</h3>
                            <input
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                            />
                            {pdf ? (
                                <iframe
                                    src={pdf}
                                    title="Resume PDF"
                                    style={{ width: "100%", height: "500px", marginTop: "10px" }}
                                />
                            ) : (
                                <p>No PDF uploaded yet.</p>
                            )}
                        </div>
                    ) : (
                        <div>
                            <h3>Career Chatbot</h3>
                            <div
                                style={{
                                    height: "250px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    padding: "10px",
                                    background: "#fff",
                                    marginBottom: "10px",
                                }}
                            >
                                {messages.map((msg, index) => (
                                    <React.Fragment key={index}>
                                        {msg.user && <p><strong>You:</strong> {msg.user}</p>}
                                        {msg.ai && <p><strong>AI:</strong> {msg.ai}</p>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Ask me about your career..."
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                style={{ width: "80%", padding: "10px", marginRight: "10px" }}
                            />
                            <button onClick={sendMessage} style={{ padding: "10px" }}>Send</button>
                        </div>
                    )}
                </div>

                {/* Right Side: Visualization */}
                <div style={{ width: "45%", background: "#ddd", padding: "20px" }}>
                    <h2>Job Node Visualization</h2>
                    <iframe
                        src="/job_graph.html"
                        width="100%"
                        height="400px"
                        title="Job Ontology Graph"
                    />
                </div>
            </div>
        </div>
    );
};

export default Plan;
