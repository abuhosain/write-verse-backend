export const checkUserAccess = async (prisma : any, userId : any, postId : any) => {
    const user = await prisma.user.findUnique({
        where : { id :  userId },
      });
  
      if(!user) {
        return {
          userError: "User not found",
          post: null,
        };
      }
  
      const isExistPost = await prisma.post.findUnique({
        where : { id: Number(postId) },
      })
  
      if(!isExistPost) {
        return {
          userError: "Post not found",
          post: null,
        };
      }
  
      if(isExistPost.authorId !==  userId) {
        return {
          userError: "You are not authorized to update this post",
          post: null,
        };
      }
}