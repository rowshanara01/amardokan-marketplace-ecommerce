import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { generateAIChatResponse } from '../services/aiService';

interface AIChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose, language }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text:
        language === 'bn'
          ? 'আসসালামু আলাইকুম! আমি আমারদোকান এআই শপিং অ্যাসিস্ট্যান্ট। আজ আপনাকে সঠিক খাঁটি দেশি পণ্য বা সাইজ বাছাইয়ে কিভাবে সাহায্য করতে পারি?'
          : 'Assalamu Alaikum! I am AmarDokan AI Shopping Assistant. How can I help you pick authentic products today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateAIChatResponse(userText, language);
      setMessages((prev) => [...prev, { sender: 'ai', text: responseText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text:
            language === 'bn'
              ? 'ধন্যবাদ আপনার প্রশ্নের জন্য! আমাদের কাছে রূপগঞ্জের ১০০ কাউন্ট জামদানি, রাজশাহী সিল্ক, সুন্দরবনের মধু সহ সকল খাঁটি দেশি পণ্য ক্যাশ অন ডেলিভারিতে এভেইলেবল আছে।'
              : 'Thank you! We have authentic Jamdani, Rajshahi Silk, and Sundarban Honey available with Cash on Delivery.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-emerald-600 rounded-xl">
                <Bot className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm">আমারদোকান এআই অ্যাসিস্ট্যান্ট</h3>
                <p className="text-[10px] text-emerald-300">অনলাইন • তাত্ক্ষণিক কেনাকাটার সমাধান</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-800 text-slate-400 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-none font-medium'
                      : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                </div>
                <div className="p-3 bg-white rounded-2xl rounded-bl-none border border-slate-200 shadow-sm text-slate-500 text-xs flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                  <span>{language === 'bn' ? 'এআই চিন্তা করছে...' : 'AI is thinking...'}</span>
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখুন (যেমন: আসল জামদানি চিনব কিভাবে?)..."
              className="flex-1 px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
