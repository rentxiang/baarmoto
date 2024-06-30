'use client'
import React, { useEffect, useState } from 'react';
import PostCard from "./PostCard";
import { Button } from './ui/button';

interface Post {
    id: number;
    title: string;
    username: string;
    content: string;
    pic_url: string;
    created_at: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            let response = await fetch('/api/get-posts',{ next: { revalidate: 1000 } });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            console.log('data', data.res);
            setPosts(data.res);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleRefresh = () => {
        fetchPosts();
    };

    return (
        <div className='flex flex-col gap-4'>
            {posts.map((post, key) => (
                <PostCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    username={post.username}
                    content={post.content}
                    pic_url={post.pic_url}
                    created_at={post.created_at}
                />
            ))}
            <Button
                onClick={handleRefresh}
            >
                Refresh (test)
            </Button>
        </div>
    );
};

export default Posts;
