export default interface IComment {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    fullName: string;
    username: string;
  };
}
