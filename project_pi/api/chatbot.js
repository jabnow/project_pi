document.getElementById("send-button").addEventListener("click", async function() {
    const userMessage = document.getElementById("chat-input").value;

    if (!userMessage) return;

    // Show user message
    document.getElementById("chatlog").innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    // Send message to Gemini API
    const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    });

    const data = await response.json();

    // Show AI response
    document.getElementById("chatlog").innerHTML += `<p><strong>AI:</strong> ${data.response}</p>`;

    // Clear input field
    document.getElementById("chat-input").value = "";
});
