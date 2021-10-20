import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Comment } from '../../AppSlice';

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

interface CommentCardProps {
    comment: Comment;
}

const CommentCard: FC<CommentCardProps> = ({ comment }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {comment.name}
                    </Typography>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="caption">
                                {comment.body}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Typography>
                    {comment.email}
                </Typography>
            </CardActions>
        </Card >
    );
}

export default CommentCard;