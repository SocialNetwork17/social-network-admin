"use client";

import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import styles from "./PostList.module.scss";
import { useQuery } from "@apollo/client/react";
import { POSTS_ALL_QUERY } from "../api/postsAll.mutation";
import {
  GetAllPostsQuery,
  GetAllPostsQueryVariables,
} from "../api/postsAll.mutation.generated";
import { setErrorMessageHandler } from "@apollo/client/dev";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";

export const PostList = () => {

  const { data, loading, error, networkStatus } = useQuery<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >(POSTS_ALL_QUERY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: GetAllPostsQuery) => {
      console.log("Query completed:", data);
      console.log("Network status:", networkStatus);
    },
    onError: (error) => {
      setErrorMessageHandler(error.message);
    },
  });

  const posts = (data as GetAllPostsQuery)?.getPosts?.items;

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      {(!posts || posts.length === 0) && <PostWithTextSkeleton />}
      {posts && posts.length > 0 && <PostsWithText posts={posts} />}
    </div>
  );
};
