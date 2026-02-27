/**
 * ChatBot.jsx
 *
 * AI-powered customer service chatbot for Marvie Beauty.
 * Features:
 * - Floating chat button (bottom-right, above WhatsApp)
 * - Chat window with message history
 * - Bilingual support (Indonesian/English)
 * - Inline booking form
 * - Session-persisted messages
 * - Mobile-responsive (full-width on small screens)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

const CHAT_API_URL = '/api/chat.php';
const BOOKING_API_URL = '/api/booking.php';

const TREATMENT_OPTIONS = [
  'Facial Treatments',
  'Acne Skin Treatment',
  'Anti-Aging Solutions (Botox, Filler, Threadlift)',
  'Face Contouring Solutions',
  'Laser Solutions (Pico Laser, DPL Laser)',
  'Body Contouring Solutions',
  'Consultation Only',
  'Other',
];

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    'Hi! Welcome to Marvie Beauty Clinic \u2728\n\nI\'m here to help you learn about our treatments, answer questions, or book a consultation with Dr. Winayani.\n\nHow can I help you today?\n\nHalo! Selamat datang di Marvie Beauty Clinic \u2728\n\nSaya siap membantu Kakak untuk informasi treatment, menjawab pertanyaan, atau menjadwalkan konsultasi.\n\nAda yang bisa saya bantu?',
  type: 'text',
};

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

const BookingForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    treatment: '',
    date: '',
    notes: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    onSubmit(form);
  };

  // Min date = today
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="mb-3 mx-2">
      <div className="bg-white border border-accent/40 rounded-xl p-4 shadow-sm">
        <p className="text-sm font-semibold text-primary mb-3">Book a Consultation</p>
        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="text"
            name="name"
            placeholder="Your name *"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
          <input
            type="tel"
            name="phone"
            placeholder="WhatsApp number *"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
          />
          <select
            name="treatment"
            value={form.treatment}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text"
          >
            <option value="">Select treatment interest</option>
            {TREATMENT_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={today}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent text-text"
          />
          <textarea
            name="notes"
            placeholder="Additional notes (optional)"
            value={form.notes}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Booking'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm text-muted border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BookingConfirmation = () => (
  <div className="mb-3 mx-2">
    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-sm font-semibold text-green-800">Booking Submitted!</p>
      </div>
      <p className="text-sm text-green-700">
        Our admin will contact you via WhatsApp to confirm your appointment. Thank you!
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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Load messages from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('marvie-chat-messages');
      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        setMessages([WELCOME_MESSAGE]);
      }
    } catch {
      setMessages([WELCOME_MESSAGE]);
    }
  }, []);

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
  }, [messages, isLoading, showBookingForm]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

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

      let reply = data.reply || 'Sorry, I could not process your request. Please try again.';

      // Check if AI wants to show booking form
      const shouldShowForm = reply.includes('[SHOW_BOOKING_FORM]');
      reply = reply.replace(/\[SHOW_BOOKING_FORM\]/g, '').trim();

      const assistantMsg = { role: 'assistant', content: reply, type: 'text' };
      setMessages((prev) => [...prev, assistantMsg]);

      if (shouldShowForm) {
        setShowBookingForm(true);
      }

      // Notify if chat is closed
      if (!isChatOpen) {
        setHasNewMessage(true);
      }
    } catch (error) {
      const errorMsg = {
        role: 'assistant',
        content: 'Sorry, I\'m having trouble connecting right now. Please try again or contact us directly via WhatsApp at +6287729138734.',
        type: 'text',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, isChatOpen]);

  // Handle booking form submission
  const handleBookingSubmit = async (formData) => {
    setIsSubmittingBooking(true);

    try {
      const response = await fetch(BOOKING_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setShowBookingForm(false);

      // Add confirmation message
      const confirmMsg = {
        role: 'assistant',
        content: data.message || 'Your booking request has been submitted! Our admin will contact you via WhatsApp to confirm your appointment.',
        type: 'booking-confirmation',
      };
      setMessages((prev) => [...prev, confirmMsg]);
    } catch {
      const errorMsg = {
        role: 'assistant',
        content: 'Sorry, there was an issue submitting your booking. Please contact us directly via WhatsApp at +6287729138734.',
        type: 'text',
      };
      setMessages((prev) => [...prev, errorMsg]);
      setShowBookingForm(false);
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
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
                <BookingConfirmation key={idx} />
              ) : (
                <MessageBubble key={idx} message={msg} />
              )
            ))}

            {/* Booking Form */}
            {showBookingForm && (
              <BookingForm
                onSubmit={handleBookingSubmit}
                onCancel={() => setShowBookingForm(false)}
                isSubmitting={isSubmittingBooking}
              />
            )}

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
