"use client";

import styles from "./PostList.module.scss";
import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";
import { usePostsPagination } from "../api/usePostsPagination";
import { SearchInput } from "@/shared/ul/SearchInput/SearchInput";
import { usePostsSubscription } from "../api/usePostsSubscription";
import { Post } from "@/types";
import { Spinner } from "@/shared/ul/Spinner/Spinner";

export const PostList = () => {
    const {
        posts,
        loading,
        error,
        isLoadingMore,
        hasMore,
        loadMore,
        setSearchTerm,
        addPost, 
        refetch 
    } = usePostsPagination();

    const handleSearch = (userName: string) => {
        setSearchTerm(userName);
    };

    usePostsSubscription({
        enabled: posts.length > 0,
        onPostAdded: (newPost) => {
            addPost(newPost as Post);
        },
    });

    const handleUserAction = () => {
        refetch();
    };

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
      <div className={styles.userTop}>
                <SearchInput placeholder={"Search input"} onValueChange={handleSearch} />
            </div>
            
      {posts.length > 0 && <PostsWithText posts={posts} onBanButtonAction={handleUserAction} />}
      {!loading && !isLoadingMore && posts.length === 0 && (
                <div className={styles.notFound}>No users found</div>
            )}
      {isLoadingMore && (
        <div className={styles.loader}>
          <Spinner width={50} height={50} />
        </div>
      )}
      {hasMore && posts.length > 0 && (
        <div ref={loadMore.triggerRef} className={styles.observerTrigger} />
      )}
      {!hasMore && !isLoadingMore && posts.length !== 0 && (
        <div className={styles.endMessage}>🎉 Вы просмотрели все посты!</div>
      )}
    </div>
  );
};
