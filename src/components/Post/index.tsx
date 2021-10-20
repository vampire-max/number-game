import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Post } from '../../AppSlice';

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
        margin: '0 auto',
        marginBottom: 20,
    },
    media: {
        height: 140,
    },
});

interface PostCardProps {
    post: Post;
    handleClick: (postId: number) => void;
}

const PostCard: FC<PostCardProps> = ({ post, handleClick }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => handleClick(post.id)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {post.title}
                    </Typography>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="caption">
                                {post.body}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                        handleClick(post.id);
                    }}
                    data-test-id="action-button"
                >
                    show comments
                </Button>
            </CardActions>
        </Card>
    );
}

export default PostCard;