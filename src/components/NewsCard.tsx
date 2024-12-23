import React from 'react';
import { formatDate } from '../lib/utils/formatDate';

interface NewsCardProps {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  source: string;
}

export default function NewsCard({ 
  title, 
  description, 
  url, 
  imageUrl, 
  source, 
  publishedAt 
}: NewsCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
      {imageUrl && (
        <div className="relative pt-[56.25%]">
          <img 
            src={imageUrl} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-news.jpg';
            }}
          />
        </div>
      )}
      <div className="p-3 flex-1 flex flex-col">
        <h3 className="text-sm font-bold mb-2 line-clamp-2 flex-none">
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-primary transition-colors"
          >
            {title}
          </a>
        </h3>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-1">
          {description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 flex-none">
          <span>{source}</span>
          <time dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
        </div>
      </div>
    </article>
  );
}