import React from 'react';
import ChatMessage from './ChatMessage';
import type { ChatMessage as ChatMessageType } from '../../lib/types';

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
}

export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 text-xs mt-4">
          👋 Hello! I'm your crypto legal assistant. How can I help you today?
        </div>
      )}
      
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg px-2.5 py-1.5">
            <div className="flex space-x-1">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}