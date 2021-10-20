import React, { useState, ReactElement, FC } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Post } from '../../AppSlice';
import PostCard from "../../components/Post";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        paddingTop: 30,
        textAlign: 'center',
        minHeight: 'calc(100vh - 158px)'
    },
    pagination: {
        display: 'inline-block',
        marginTop: 20,
        marginBottom: 20,
    }
});

const EVENTS_PER_PAGE = 10;

const PostsPage: FC<any> = (): ReactElement => {
    const classes = useStyles();
    const history = useHistory();
    const posts: Post[] = useAppSelector((state: RootState) => state.post.posts);
    const loading: boolean = useAppSelector((state: RootState) => state.post.loading);
    const [page, setPage] = useState(0);

    const handleShowComments = (postId: number) => {
        history.push(`/${postId}`);
    }

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setPage(page - 1);
    }

    const data: Post[] = posts.slice(page * EVENTS_PER_PAGE, (page + 1) * EVENTS_PER_PAGE);

    return (
        <div className={classes.root}>
            {loading ? <CircularProgress /> : (
                <React.Fragment>
                    <Pagination
                        count={Math.ceil(posts.length / EVENTS_PER_PAGE)}
                        page={page + 1}
                        variant="outlined"
                        shape="rounded"
                        classes={{ root: classes.pagination }}
                        onChange={handlePageChange}
                    />
                    {data.map((post: Post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            handleClick={() => handleShowComments(post.id)}
                        />
                    ))}
                    <Pagination
                        count={Math.ceil(posts.length / EVENTS_PER_PAGE)}
                        page={page + 1}
                        variant="outlined"
                        shape="rounded"
                        classes={{ root: classes.pagination }}
                        onChange={handlePageChange}
                    />
                </React.Fragment>
            )}
        </div>
    );
};
export default PostsPage;