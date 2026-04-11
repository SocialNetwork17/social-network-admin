"use client";

import styles from "./PostList.module.scss";
import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";
import { usePostsPagination } from "../api/usePostsPagination";
import { SearchInput } from "@/shared/ul/SearchInput/SearchInput";
import { usePostsSubscription } from "../api/usePostsSubscription";
import { Post } from "@/types";

export const PostList = () => {
    const {
        posts,
        loading,
        error,
        isLoadingMore,
        hasMore,
        loadMore,
        setSearchTerm,
        addPost
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
                <SearchInput placeholder={"Search input"} onSearch={handleSearch} />
            </div>

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