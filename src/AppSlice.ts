import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store/store';
import axios from './services/axios';

export interface PostData {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    comments: Comment[];
}

export interface PostState {
    posts: Post[];
    loading: boolean;
    error: string;
}

const initialState: PostState = {
    posts: [],
    loading: false,
    error: ''
};

export const appSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoading: (state: PostState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        getPostsSuccess: (state: PostState, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        getPostsFail: (state: PostState, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        addComment: (state: PostState, action: PayloadAction<Comment>) => {
            const comment = action.payload;
            const index = state.posts.findIndex(post => post.id === comment.postId);
            state.posts[index].comments.push(comment);
        }
    },
});

export const {
    setLoading,
    getPostsSuccess,
    getPostsFail,
    addComment
} = appSlice.actions;

export const getPosts = (): AppThunk => (
    dispatch,
    getState
) => {
    dispatch(setLoading(true));
    const promises = [
        axios.get(`https://jsonplaceholder.typicode.com/posts`),
        axios.get(`https://jsonplaceholder.typicode.com/comments`)
    ];
    Promise.all(promises).then(([posts, comments]) => {
        dispatch(setLoading(false));
        const data: Post[] = posts.data.map((post: PostData) => {
            return {
                id: post.id,
                userId: post.userId,
                title: post.title,
                body: post.body,
                comments: comments.data.filter((comment: Comment) => comment.postId === post.id)
            };
        });
        dispatch(getPostsSuccess(data));
    }).catch(err => {
        dispatch(setLoading(false));
        dispatch(getPostsFail(err.response.data.message));
    });
};

export default appSlice.reducer;
