export const postResolvers = {
  addPost: async (parent: any, { post }: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "User not authenticated",
        post: null,
      };
    }

    if (!post.title || !post.content) {
      return {
        userError: "Title and content is required",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },
  updatePost: async (
    parent: any,
    { postId, post }: any,
    { prisma, userInfo }: any
  ) => { 
    if (!userInfo) {
      return {
        userError: "User not authenticated",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where : { id : userInfo.userId },
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

    if(isExistPost.authorId !== userInfo.userId) {
      return {
        userError: "You are not authorized to update this post",
        post: null,
      };
    }

    console.log("post", post, "user", user);

  },
};
