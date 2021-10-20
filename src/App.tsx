import React, { Suspense, useEffect } from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { useAppDispatch } from './store/hooks';
import { getPosts } from './AppSlice';

const PostsPage = React.lazy(() => import('./pages/Posts'));
const CommentsPage = React.lazy(() => import('./pages/Comments'));
const Header = React.lazy(() => import('./components/Header'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Switch>
                <Route exact path="/">
                    <PostsPage />
                </Route>
                <Route exact path="/:postId">
                    <CommentsPage />
                </Route>
            </Switch>
            <Footer />
        </Suspense>
    );
}

export default App;
