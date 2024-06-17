import { useState } from 'react';
import { firestore } from '../firebase/firebase';

const useCreatePost = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreatePost = async (caption) => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            // Example logic to add a post to Firestore
            await firestore.collection('posts').add({
                caption,
                createdAt: new Date(),
            });

            console.log('Post created successfully!');
        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    return { isLoading, handleCreatePost };
};

export default useCreatePost;
