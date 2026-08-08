import { useState } from "react";

function BenjyChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "benjy",
      text: "Hi! I'm Benjy 👋 Ask me about your spending."
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5233/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            message: userMessage
          })
        }
      );

      if (!response.ok) {
        throw new Error("Failed to contact Benjy");
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "benjy",
          text: data.response
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "benjy",
          text: "Sorry, I couldn't connect right now."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50
                   w-13 h-13 rounded-full
                   bg-black text-white
                   shadow-xl
                   flex items-center justify-center
                   text-2xl
                   hover:scale-105 transition-transform cursor-pointer"
      >
        {open ? "×" : "💬"}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50
                     w-80 h-[450px]
                     bg-white
                     rounded-2xl
                     shadow-2xl
                     border
                     flex flex-col
                     overflow-hidden"
        >
          {/* Header */}
          <div className="bg-black text-white px-4 py-3">
            <div className="font-semibold">
              Benjy
            </div>

            <div className="text-xs text-gray-300">
              Your FinSight AI assistant
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-500">
                Benjy is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-3 flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Benjy..."
              className="flex-1 border rounded-xl px-3 py-2
                         text-sm outline-none
                         focus:ring-2 focus:ring-black"
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="bg-black text-white
                         px-4 rounded-xl
                         disabled:opacity-50 cursor-pointer"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BenjyChat;

