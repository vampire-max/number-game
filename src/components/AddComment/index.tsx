import React, { FC } from "react";
import { Button, Card, CardContent, Input, makeStyles, TextField } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { CardActions } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
    root: {
        maxWidth: 450,
        margin: '0 auto',
        marginBottom: 20
    }
});

export interface CommentFormData {
    email: string;
    name: string;
    body: string;
}

interface AddCommentProps {
    handleClick: (comment: CommentFormData) => void;
}

const AddComment: FC<AddCommentProps> = ({ handleClick }) => {
    const classes = useStyles();
    const [comment, setComment] = useState<CommentFormData>({
        email: "",
        name: "",
        body: ""
    });

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        setComment((prev: CommentFormData) => ({ ...prev, [field]: e.target.value }));
    };

    const sendComment = () => {
        handleClick(comment);
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Input type="email" placeholder="Email" fullWidth onChange={e => handleChangeInput(e, 'email')} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <Input type="text" placeholder="Name" fullWidth onChange={e => handleChangeInput(e, 'name')} />
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            variant="outlined"
                            placeholder="Comment here..."
                            onChange={e => handleChangeInput(e, 'body')}
                            multiline
                            rows="5"
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} sm={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={sendComment}
                            data-test-id="add-comment"
                        >Send</Button>
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default AddComment;
