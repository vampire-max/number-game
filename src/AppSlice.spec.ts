import appReducer, {
  setLoading,
  getPostsSuccess,
  getPostsFail,
  addComment,
  Post,
  PostState,
  Comment
} from './AppSlice';

const post: Post = {
  id: 1,
  userId: 1,
  title: "post title 1",
  body: "post body 1",
  comments: [
      {
          postId: 1,
          id: 1,
          name: "post 1 comment name 1",
          email: "comment@mail.com",
          body: "post 1 comment body 1"
      },
      {
          postId: 1,
          id: 2,
          name: "post 1 comment name 2",
          email: "comment@mail.com",
          body: "post 1 comment body 2"
      }
  ]
};

const comment: Comment = {
  id: 3,
  postId: 1,
  name: 'comment test name 3',
  body: 'comment test body 3',
  email: 'comment@mail.com'
};

describe('app reducer', () => {
  const initialState: PostState = {
    posts: [],
    loading: false,
    error: ''
  };

  it('should handle setLoading', () => {
    const actual = appReducer(initialState, setLoading(true));
    expect(actual.loading).toEqual(true);
  });
  it('should handle getPostsSuccess', () => {
    const actual = appReducer(initialState, getPostsSuccess([post]));
    expect(actual.posts).toHaveLength(1);
  });
  it('should handle getPostsError', () => {
    const actual = appReducer(initialState, getPostsFail('server timeout'));
    expect(actual.error).toEqual('server timeout');
  });
  it('should handle addComment', () => {
    const updatedState = appReducer(initialState, getPostsSuccess([post]));
    const actual = appReducer(updatedState, addComment(comment));
    expect(actual.posts[0].comments).toHaveLength(3);
  });
});