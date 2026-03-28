"use client";

import styles from "./PostList.module.scss";
import {useState} from "react";
import { useQuery } from "@apollo/client/react";
import { POSTS_ALL_QUERY } from "../api/postsAll.mutation";
import {
  GetAllPostsQuery,
  GetAllPostsQueryVariables,
} from "../api/postsAll.mutation.generated";
import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import { setErrorMessageHandler } from "@apollo/client/dev";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";

export const PostList = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleSearch = (userName: string) => {
        setSearchTerm(userName);
    };

  const { data, loading, error, networkStatus } = useQuery<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >(POSTS_ALL_QUERY, {
      variables: {
          searchTerm: searchTerm || undefined,
      },
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

  console.log('Query state:', { loading, error, data });

  if (loading) return <div className={styles.loading}>Loading posts...</div>;
  if (error) return <div className={styles.loading}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
        <div className={styles.userTop}>
            <SearchInput placeholder={"Search input"} onSearch={handleSearch}/>
        </div>
        {(!posts || posts.length === 0) && <PostWithTextSkeleton />}
        {posts && posts.length > 0 && <PostsWithText posts={posts} />}
    </div>
  );
};