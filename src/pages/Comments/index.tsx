import React, { ReactElement, FC } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import CommentCard from "../../components/Comment";
import { addComment, Comment, Post } from "../../AppSlice";
import AddComment, { CommentFormData } from "../../components/AddComment";

const useStyles = makeStyles({
    root: {
        paddingTop: 30,
        textAlign: 'center',
        minHeight: 'calc(100vh - 158px)'
    }
});

interface ParamTypes {
    postId: string;
}

const CommentsPage: FC<any> = (): ReactElement => {
    const classes = useStyles();
    const { postId } = useParams<ParamTypes>();
    const dispatch = useAppDispatch();
    const posts: Post[] = useAppSelector((state: RootState) => state.post.posts);

    const sendComment = (comment: CommentFormData) => {
        dispatch(addComment({
            postId: parseInt(postId, 10),
            id: comments.length + 1,
            ...comment
        }));
    }

    let comments: Comment[] = [];
    if (posts.length > 0) {
        comments = posts.filter((post: Post) => post.id === parseInt(postId))[0].comments;
    }

    return (
        <div className={classes.root}>
            <React.Fragment>
                {comments.map((comment: Comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
                <AddComment handleClick={sendComment} />
            </React.Fragment>
        </div>
    );
};
export default CommentsPage;