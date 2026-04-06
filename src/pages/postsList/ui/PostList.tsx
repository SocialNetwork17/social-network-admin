"use client";

import styles from "./PostList.module.scss";
import {useEffect, useState} from "react";
import {useQuery, useSubscription} from "@apollo/client/react";
import { POSTS_ALL_QUERY } from "../api/postsAll.mutation";
import {
    GetAllPostsQuery,
    GetAllPostsQueryVariables, OnPostAddedSubscription,
} from "../api/postsAll.mutation.generated";
import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";
import styles from "./PostList.module.scss";
import { usePostsPagination } from "../api/usePostsPagination";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";
import {POSTS_SUBSCRIPTION} from "@/pages/postsList/api/postsAll.mutation";

export const PostList = () => {
  const {
    posts,
    loading,
    error,
    isLoadingMore,
    hasMore,
    loadMore,
  } = usePostsPagination();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [allPosts, setAllPosts] = useState<GetAllPostsQuery['getPosts']['items']>([]);

  if (loading && posts.length === 0) {
    return (
      <div className={styles.container}>
        <PostWithTextSkeleton />
      </div>
    );
  }
    const handleSearch = (userName: string) => {
        setSearchTerm(userName);
    };

  const { data: postsData, loading, error } = useQuery<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >(POSTS_ALL_QUERY, {
      variables: {
          searchTerm: searchTerm || undefined,
      },
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const posts = (postsData as GetAllPostsQuery)?.getPosts?.items;

  console.log('Query state:', { loading, error, posts });

    useEffect(() => {
        if (posts) {
            setAllPosts(posts);
        }
    }, [posts]);

    useSubscription<OnPostAddedSubscription>(POSTS_SUBSCRIPTION, {
        onData: ({ data }) => {
            const newPost = data.data?.postAdded;
            if (newPost) {
                // Add new post at the TOP of the list
                setAllPosts((prev) => [newPost, ...prev]); // add to top
            }
        },
        skip: !postsData, // Don't start subscription until we have initial data
    });

    // Loading & Error states
    if (loading && allPosts.length === 0) {
        return <div className={styles.loading}>Loading posts...</div>;
    }
    if (error) return <div className={styles.loading}>Error: {error.message}</div>;

  return (
    <div className={styles.container}>
      {posts.length > 0 && <PostsWithText posts={posts} />}
      {isLoadingMore && (
        <div className={styles.loader}>Загрузка постов...</div>
      )}
      {hasMore && posts.length > 0 && (
        <div ref={loadMore.triggerRef} className={styles.observerTrigger} />
      )}
      {!hasMore && posts.length === 0 && (
        <div className={styles.endMessage}>
          🎉 Вы просмотрели все посты!
        </div>
      )}
        <div className={styles.userTop}>
            <SearchInput placeholder={"Search input"} onSearch={handleSearch}/>
        </div>
        {allPosts.length === 0 && <PostWithTextSkeleton />}
        {allPosts.length > 0 && <PostsWithText posts={allPosts} />}
    </div>
  );
};