"use client";

import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";
import styles from "./PostList.module.scss";
import { usePostsPagination } from "../api/usePostsPagination";

export const PostList = () => {
  const {
    posts,
    loading,
    error,
    isLoadingMore,
    hasMore,
    loadMore,
  } = usePostsPagination();

  if (loading && posts.length === 0) {
    return (
      <div className={styles.container}>
        <PostWithTextSkeleton />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
    </div>
  );
};