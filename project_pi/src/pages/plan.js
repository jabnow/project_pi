import React, { useState, useEffect } from "react";

const Plan = () => {
    const [showResume, setShowResume] = useState(true);
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");

    // Function to send message to Gemini AI API
    const sendMessage = async () => {
    if (!userMessage.trim()) return;  // Check for empty message

    // Show user message
    const newMessages = [...messages, { user: userMessage }];
    setMessages(newMessages);
    setUserMessage(""); // Clear input field

    try {
        const response = await fetch("http://127.0.0.1:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();

        // Update messages with AI response
        setMessages([...newMessages, { ai: data.response }]);
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages([...newMessages, { ai: "Error connecting to AI. Please try again." }]);
    }
};


    return (
        <div>
            <h1>PLAN</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>

                {/* Left: Toggle Resume / Chatbot */}
                <div style={{ width: "45%", background: "#ddd", padding: "20px" }}>
                    <h2>Toggle Between Two Tabs</h2>
                    <button onClick={() => setShowResume(true)}>Show Resume</button>
                    <button onClick={() => setShowResume(false)}>Show Chatbot</button>

                    {showResume ? (
                        <div>
                            <h3>Resume Display</h3>
                            <p>Your resume content here...</p>
                        </div>
                    ) : (
                        <div>
                            <h3>Career Chatbot</h3>
                            <div
                                style={{
                                    height: "200px",
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
                                placeholder="Ask about your career..."
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                style={{ width: "80%", padding: "10px", marginRight: "10px" }}
                            />
                            <button onClick={sendMessage} style={{ padding: "10px" }}>Send</button>
                        </div>
                    )}
                </div>

                {/* Right: Job Node Visualization */}
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
