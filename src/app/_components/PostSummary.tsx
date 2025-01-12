"use client";
import type { Post } from "@/app/_types/Post";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import React, { useState } from 'react';

type Props = {
  post: Post;
};

const PostSummary: React.FC<Props> = (props) => {
  const { post } = props;
  const dtFmt = "YYYY-MM-DD";
  const [likes, setLikes] = useState(post.likes);
  const safeHTML = post.content; // Assuming content is already sanitized

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        const updatedPost = await response.json();
        setLikes(updatedPost.likes);
      } else {
        console.error('Failed to update likes');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg border border-gray-700">
      <div className="mb-2 flex justify-between items-center">
        <div className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</div>
        <div className="flex space-x-2">
          {post.categories.map((category) => (
            <div
              key={category.id}
              className={twMerge(
                "rounded-md px-2 py-0.5",
                "text-xs font-bold",
                "border border-slate-400 text-slate-500",
                "bg-gray-800"
              )}
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
      <Link href={`/posts/${post.id}`}>
        <div className="mb-1 text-lg font-bold text-indigo-400 hover:text-indigo-300">{post.title}</div>
        <div
          className="line-clamp-3 text-gray-300"
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />
      </Link>
      <div className="mt-2 flex items-center">
        <button
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleLike}
        >
          いいね
        </button>
        <span>{likes} いいね</span>
      </div>
    </div>
  );
};

export default PostSummary;
