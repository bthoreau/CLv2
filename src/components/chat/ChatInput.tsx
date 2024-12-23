import React, { useState } from 'react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    onSubmit(trimmedInput);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-2 border-t">
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 px-2 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-3 py-1.5 bg-primary text-white text-xs rounded-lg hover:bg-secondary transition-colors disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </form>
  );
}