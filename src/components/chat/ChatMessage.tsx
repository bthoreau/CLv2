import React from 'react';
import type { ChatMessage as ChatMessageType } from '../../lib/types';

export default function ChatMessage({ role, content }: ChatMessageType) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-lg px-2.5 py-1.5 text-xs ${
          role === 'user'
            ? 'bg-primary text-white'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {content}
      </div>
    </div>
  );
}