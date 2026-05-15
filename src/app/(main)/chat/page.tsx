"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { IoMdArrowBack } from "react-icons/io";
import ProtectedRoutes from "../../../../components/auth/ProtectedRoutes";

// Mock data - replace with API/WebSocket data later
const mockChats = [
  { id: 1, name: "John Doe", lastMessage: "Hey there!" },
  { id: 2, name: "Jane Smith", lastMessage: "How are you?" },
  { id: 3, name: "Mike Johnson", lastMessage: "See you tomorrow" },
  { id: 4, name: "Sara Wilson", lastMessage: "Thanks for your help!" },
  { id: 5, name: "Alex Brown", lastMessage: "Meeting at 3pm" },
  { id: 6, name: "Emily Davis", lastMessage: "Got the files" },
  { id: 7, name: "Tom Harris", lastMessage: "Project update" },
  { id: 8, name: "Lucy Martinez", lastMessage: "Great work!" },
  { id: 9, name: "David Kim", lastMessage: "Lunch tomorrow?" },
  { id: 10, name: "Rachel Green", lastMessage: "Perfect, thanks!" },
];

const mockMessages = {
  1: [
    { id: 1, text: "Hey there!", sent: true },
    { id: 2, text: "Hi! How are you?", sent: false },
    { id: 3, text: "I'm good, thanks for asking!", sent: true },
    { id: 4, text: "What's new?", sent: false },
    { id: 5, text: "Not much, just working", sent: true },
    { id: 6, text: "Same here!", sent: false },
  ],
  2: [
    { id: 1, text: "How are you?", sent: true },
    { id: 2, text: "I'm good, thanks!", sent: false },
    { id: 3, text: "Did you check the latest updates?", sent: true },
    { id: 4, text: "Yes, looking good!", sent: false },
    { id: 5, text: "Great to hear that", sent: true },
  ],
  3: [
    { id: 1, text: "See you tomorrow", sent: true },
    { id: 2, text: "Sure, bye!", sent: false },
    { id: 3, text: "What time should we meet?", sent: true },
    { id: 4, text: "How about 10am?", sent: false },
    { id: 5, text: "Perfect!", sent: true },
  ],
  4: [
    { id: 1, text: "Thanks for your help!", sent: true },
    { id: 2, text: "Anytime!", sent: false },
    { id: 3, text: "Really appreciate it", sent: true },
    { id: 4, text: "No problem at all", sent: false },
  ],
  5: [
    { id: 1, text: "Meeting at 3pm", sent: true },
    { id: 2, text: "I'll be there", sent: false },
    { id: 3, text: "Conference room A", sent: true },
    { id: 4, text: "Got it", sent: false },
  ],
  6: [
    { id: 1, text: "Got the files", sent: true },
    { id: 2, text: "Perfect timing", sent: false },
    { id: 3, text: "Need anything else?", sent: true },
    { id: 4, text: "That's all, thanks!", sent: false },
  ],
  7: [
    { id: 1, text: "Project update", sent: true },
    { id: 2, text: "All on track", sent: false },
    { id: 3, text: "Great progress", sent: true },
    { id: 4, text: "Thanks team!", sent: false },
  ],
  8: [
    { id: 1, text: "Great work!", sent: true },
    { id: 2, text: "Thank you!", sent: false },
    { id: 3, text: "Keep it up", sent: true },
    { id: 4, text: "Will do!", sent: false },
  ],
  9: [
    { id: 1, text: "Lunch tomorrow?", sent: true },
    { id: 2, text: "Sure!", sent: false },
    { id: 3, text: "12:30 work for you?", sent: true },
    { id: 4, text: "Perfect time", sent: false },
  ],
  10: [
    { id: 1, text: "Perfect, thanks!", sent: true },
    { id: 2, text: "You're welcome", sent: false },
    { id: 3, text: "See you soon", sent: true },
    { id: 4, text: "Looking forward to it", sent: false },
  ],
};

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(true);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Add message sending logic here
    setMessage("");
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    setShowMobileMenu(false);
  };
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat, mockMessages]);

  return (
    <ProtectedRoutes>
      <div className="mt-2 w-full mx-auto max-w-6xl flex h-[85dvh] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
        {/* Chat List Sidebar */}
        <div
          className={`${
            showMobileMenu ? "w-full" : "hidden"
          } md:w-1/3 lg:w-1/4 md:block border-r border-gray-200`}
        >
          <div className="w-full p-[26px] bg-primary text-white">
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
          <div className="overflow-y-auto h-[calc(80vh-4rem)]">
            {mockChats.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 cursor-pointer transition-all duration-200 hover:bg-primary/5 border-b border-gray-100 ${
                  selectedChat === chat.id
                    ? "bg-primary/10 border-l-4 border-primary"
                    : ""
                }`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white font-semibold text-lg shadow-md">
                    {chat.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                    <p className="text-sm text-gray-500 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div
          className={`flex-1 w-full flex flex-col bg-gray-50/50 h-full ${
            !showMobileMenu ? "block" : "hidden"
          } md:block`}
        >
          {selectedChat ? (
            <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="p-4 bg-primary border-b border-gray-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <button
                    className="md:hidden p-2 hover:bg-primary/10 rounded-full transition-colors text-primary"
                    onClick={() => setShowMobileMenu(true)}
                  >
                    <IoMdArrowBack size={24} />
                  </button>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black font-semibold text-lg shadow-md">
                    {mockChats
                      .find((c) => c.id === selectedChat)
                      ?.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-400">
                      {mockChats.find((c) => c.id === selectedChat)?.name}
                    </h2>
                    <p className="text-sm text-gray-200">Online</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div
                className="flex-1 overflow-y-auto p-6 space-y-6"
                ref={chatContainerRef}
              >
                {mockMessages[selectedChat as keyof typeof mockMessages].map(
                  (message) => (
                    <div
                      key={message.id}
                      className={`w-full flex ${
                        message.sent ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div className={`max-w-[85%] md:max-w-[70%]`}>
                        <div
                          className={`p-4 rounded-2xl shadow-sm ${
                            message.sent
                              ? "bg-gradient-to-br from-primary to-primary/95 text-white rounded-tr-none"
                              : "bg-white rounded-tl-none"
                          }`}
                        >
                          <p className="text-[15px] leading-relaxed">
                            {message.text}
                          </p>
                        </div>
                        <div
                          className={`text-xs mt-2 text-gray-400 flex items-center gap-2 ${
                            message.sent ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span>12:34 PM</span>
                          {message.sent && (
                            <span className="text-primary">✓✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-3 items-center bg-gray-50 rounded-2xl p-2 focus-within:ring-2 focus-within:ring-primary/20">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-3 bg-transparent focus:outline-none text-gray-700"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center shadow-sm"
                  >
                    <IoSend size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <IoSend size={24} className="text-primary" />
              </div>
              <p className="text-xl font-semibold text-gray-600">
                Select a chat to start messaging
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoutes>
  );
};

export default ChatPage;
