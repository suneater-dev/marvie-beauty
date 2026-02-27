/**
 * ChatBot.jsx
 *
 * AI-powered customer service chatbot for Marvie Beauty.
 * Features:
 * - Auto-opens after 4 seconds (once per session)
 * - AI-generated greeting (multi-language)
 * - Conversational booking flow (no form)
 * - Booking token detection → sends to /api/booking
 * - Session-persisted messages
 * - Mobile-responsive (full-width on small screens)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

const CHAT_API_URL = '/api/chat';
const BOOKING_API_URL = '/api/booking';

const FALLBACK_GREETING = "Hi! Welcome to Marvie Beauty Clinic ✨ I'm Marvie, your virtual assistant. I can help you in any language — just chat with me! How can I help you today?";

const BOOKING_TOKEN_REGEX = /\[BOOKING_CONFIRMED:([\s\S]*?)\]/;

// --- Sub-components ---

const TypingIndicator = () => (
  <div className="flex items-start gap-2 mb-3">
    <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
      <span className="text-white text-xs font-bold">M</span>
    </div>
    <div className="bg-white border border-gray-100 rounded-xl rounded-tl-sm px-4 py-3 shadow-sm">
      <div className="flex gap-1.5">
        <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-end gap-2 mb-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-primary flex-shrink-0 flex items-center justify-center">
          <span className="text-white text-xs font-bold">M</span>
        </div>
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 shadow-sm whitespace-pre-wrap text-sm leading-relaxed ${
          isUser
            ? 'bg-accent text-primary rounded-xl rounded-br-sm'
            : 'bg-white text-text border border-gray-100 rounded-xl rounded-tl-sm'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

const BookingConfirmation = ({ bookingData }) => (
  <div className="mb-3 mx-2">
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm font-semibold text-green-800">Booking Submitted!</p>
      </div>
      <div className="text-sm text-green-700 space-y-1">
        {bookingData?.name && <p><span className="font-medium">Name:</span> {bookingData.name}</p>}
        {bookingData?.treatment && <p><span className="font-medium">Treatment:</span> {bookingData.treatment}</p>}
        {bookingData?.date && <p><span className="font-medium">Date:</span> {bookingData.date}</p>}
      </div>
      <p className="text-xs text-green-600 mt-2">
        Our admin will contact you via WhatsApp to confirm.
      </p>
    </div>
  </div>
);

// --- Main ChatBot Component ---

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [greetingLoaded, setGreetingLoaded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load messages from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('marvie-chat-messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setMessages(parsed);
          setGreetingLoaded(true);
        }
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  // Auto-open chat after 4 seconds (once per session)
  useEffect(() => {
    const dismissed = sessionStorage.getItem('marvie-chat-dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsChatOpen(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Fetch AI greeting when chat opens for the first time with no messages
  useEffect(() => {
    if (!isChatOpen || greetingLoaded) return;

    const fetchGreeting = async () => {
      setGreetingLoaded(true);
      setIsLoading(true);

      try {
        const response = await fetch(CHAT_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: [] }),
        });

        if (!response.ok) throw new Error('Network error');

        const data = await response.json();
        const greeting = data.reply || FALLBACK_GREETING;

        setMessages([{ role: 'assistant', content: greeting, type: 'text' }]);
      } catch {
        setMessages([{ role: 'assistant', content: FALLBACK_GREETING, type: 'text' }]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGreeting();
  }, [isChatOpen, greetingLoaded]);

  // Save messages to sessionStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem('marvie-chat-messages', JSON.stringify(messages));
      } catch {
        // sessionStorage full or unavailable
      }
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  // Process booking token from AI reply
  const processBookingToken = useCallback(async (reply) => {
    const match = reply.match(BOOKING_TOKEN_REGEX);
    if (!match) return { cleanReply: reply, hasBooking: false };

    const cleanReply = reply.replace(BOOKING_TOKEN_REGEX, '').trim();

    try {
      const bookingData = JSON.parse(match[1]);

      // Send booking to API (non-blocking)
      fetch(BOOKING_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      }).catch((err) => console.error('Booking API error:', err));

      return { cleanReply, hasBooking: true, bookingData };
    } catch {
      return { cleanReply, hasBooking: false };
    }
  }, []);

  // Send message to AI
  const sendMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim() || isLoading) return;

    const userMsg = { role: 'user', content: userMessage.trim(), type: 'text' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for API (only text messages)
      const conversationHistory = [...messages, userMsg]
        .filter((m) => m.type === 'text')
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!response.ok) throw new Error('Network error');

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      const rawReply = data.reply || 'Sorry, I could not process your request. Please try again.';

      // Check for booking token
      const { cleanReply, hasBooking, bookingData } = await processBookingToken(rawReply);

      const assistantMsg = { role: 'assistant', content: cleanReply, type: 'text' };
      setMessages((prev) => [...prev, assistantMsg]);

      if (hasBooking && bookingData) {
        const confirmMsg = {
          role: 'assistant',
          type: 'booking-confirmation',
          content: '',
          bookingData,
        };
        setMessages((prev) => [...prev, confirmMsg]);
      }

      // Notify if chat is closed
      if (!isChatOpen) {
        setHasNewMessage(true);
      }
    } catch {
      const errorMsg = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again or contact us directly via WhatsApp at +6287729138734.',
        type: 'text',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, isChatOpen, processBookingToken]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => {
      const willClose = prev;
      if (willClose) {
        sessionStorage.setItem('marvie-chat-dismissed', 'true');
      }
      return !prev;
    });
    setHasNewMessage(false);
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-4 sm:right-6 z-50 transition-all duration-300 ease-in-out ${
          isChatOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        role="dialog"
        aria-label="Customer service chat"
        aria-hidden={!isChatOpen}
      >
        <div className="w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] sm:h-[520px] bg-bg rounded-2xl shadow-card-hover flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Marvie Beauty</p>
                <p className="text-white/70 text-xs">AI Customer Service</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white/80 hover:text-white p-1 transition-colors"
              aria-label="Close chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0" style={{ scrollBehavior: 'smooth' }}>
            {messages.map((msg, idx) => (
              msg.type === 'booking-confirmation' ? (
                <BookingConfirmation key={idx} bookingData={msg.bookingData} />
              ) : (
                <MessageBubble key={idx} message={msg} />
              )
            ))}

            {/* Typing Indicator */}
            {isLoading && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows={1}
                className="flex-1 px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none max-h-20 overflow-y-auto"
                disabled={isLoading}
                aria-label="Chat message input"
              />
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-24 right-4 sm:right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
          isChatOpen
            ? 'bg-gray-500 hover:bg-gray-600'
            : 'bg-primary hover:bg-primary/90'
        }`}
        aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
      >
        {isChatOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Notification badge */}
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
            )}
          </>
        )}
      </button>
    </>
  );
};

export default ChatBot;
