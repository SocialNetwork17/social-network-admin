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
import {useLazyQuery} from "@apollo/client/react";
import { GET_USER } from "@/pages/postsList/api/users";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";
import {GetUserQuery, GetUserQueryVariables} from "@/pages/postsList/api/users.generated";
import {useState} from "react";

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

const [searchUserId, setSearchUserId] = useState<number | null>(null);

  const posts = (data as GetAllPostsQuery)?.getPosts?.items;
const [getUser, { data, loading, error }] = useLazyQuery<GetUserQuery, GetUserQueryVariables>(GET_USER);

const handleSearch = (userId: number) => {
    setSearchUserId(userId);
    getUser({ variables: { userId } });
};

  console.log('Query state:', { loading, error, data });

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      {(!posts || posts.length === 0) && <PostWithTextSkeleton />}
      {posts && posts.length > 0 && <PostsWithText posts={posts} />}
        <div className={styles.userTop}>
            <SearchInput placeholder={"Search input"} onSearch={handleSearch}/>
        </div>
      <p>{searchUserId}</p>
    </div>
  );
};