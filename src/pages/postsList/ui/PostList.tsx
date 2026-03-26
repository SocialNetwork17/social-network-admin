"use client";

import styles from "./PostList.module.scss";
import {useState} from "react";
import { useQuery, useLazyQuery } from "@apollo/client/react";
import { POSTS_ALL_QUERY } from "../api/postsAll.mutation";
import { GET_USER } from "@/pages/postsList/api/users";
import {
  GetAllPostsQuery,
  GetAllPostsQueryVariables,
} from "../api/postsAll.mutation.generated";
import {GetUserQuery, GetUserQueryVariables} from "@/pages/postsList/api/users.generated";
import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import { setErrorMessageHandler } from "@apollo/client/dev";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";

export const PostList = () => {
    const [searchUserId, setSearchUserId] = useState<number | null>(null);

    const [getUser, {
        data: userData,
        loading: userLoading,
        error: userError
    }] = useLazyQuery<GetUserQuery, GetUserQueryVariables>(GET_USER);

    const handleSearch = (userId: number) => {
        setSearchUserId(userId);
        getUser({ variables: { userId } });
    };

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

  console.log('Query state:', { loading, error, data });

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
        <div className={styles.userTop}>
            <SearchInput placeholder={"Search input"} onSearch={handleSearch}/>
            {userError && <div>User search error: {userError.message}</div>}
            {searchUserId}
        </div>
        {(!posts || posts.length === 0) && <PostWithTextSkeleton />}
        {posts && posts.length > 0 && <PostsWithText posts={posts} />}
    </div>
  );
};