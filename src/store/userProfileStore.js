import { create } from "zustand";


const useUserProfileStore = create((set) => ({
	userProfile: null,
    setUserProfile: (userProfile) => set({ userProfile }),
    addPost: (post) =>
        set((state) => ({
            userProfile: { ...state.userProfile, posts: [post.id, ...state.userProfile.posts] },
        })),
        deletePost: (postId) =>
            set((state) => {
                if (!state.userProfile) return state;
                    const updatedPosts = (state.userProfile.posts || []).filter((id) => id !== postId);
                return {
                    userProfile: {
                    ...state.userProfile,
                    posts: updatedPosts,
                },
            };
        }),
}));

export default useUserProfileStore;