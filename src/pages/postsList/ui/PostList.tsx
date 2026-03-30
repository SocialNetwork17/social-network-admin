"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import styles from "./PostList.module.scss";
import { useQuery } from "@apollo/client/react";
import { POSTS_ALL_QUERY } from "../api/postsAll.mutation";
import {
  GetAllPostsQuery,
  GetAllPostsQueryVariables,
} from "../api/postsAll.mutation.generated";
import { PostWithTextSkeleton } from "@/shared/ul/PostsWithText/PostWithTextSkeleton/PostWithTextSkeleton";
import { SortDirection } from "@/types";

export const PostList = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentCursor, setCurrentCursor] = useState<number | null>(null);

  const { data, loading, error, networkStatus, fetchMore } = useQuery<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >(POSTS_ALL_QUERY, {
    variables: {
      pageSize: 8,
      endCursorPostId: null,
      sortBy: "createdAt",
      sortDirection: SortDirection.Desc,
    },
    notifyOnNetworkStatusChange: true,
  });

  const posts = (data as GetAllPostsQuery)?.getPosts?.items;
  const totalCount = data?.getPosts?.totalCount || 0;
  const isLoadingMore = networkStatus === 3;

  // Проверяем, есть ли еще посты для загрузки
  useEffect(() => {
    if (posts.length >= totalCount && totalCount > 0) {
      setHasMore(false);
      console.log("✅ Все посты загружены! Всего:", posts.length);
    } else if (posts.length > 0) {
      const lastPost = posts[posts.length - 1];
      setCurrentCursor(lastPost?.id);
      console.log(`📊 Прогресс: ${posts.length}/${totalCount} (${Math.round(posts.length / totalCount * 100)}%)`);
    }
  }, [posts, totalCount]);

  const loadMore = useCallback(async () => {
    // Защита от множественных вызовов
    if (isLoadingMoreRef.current || isLoadingMore || !hasMore) {
      return;
    }

    if (!posts.length) {
      return;
    }

    // Используем сохраненный cursor
    const endCursorPostId = currentCursor;

    if (!endCursorPostId) {
      return;
    }

    console.log(`🔄 Загрузка страницы ${Math.floor(posts.length / 8) + 1}...`);

    isLoadingMoreRef.current = true;

    try {
      await fetchMore({
        variables: {
          endCursorPostId: Number(endCursorPostId),
          pageSize: 8,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const oldPosts = prev.getPosts?.items || [];
          const newPosts = fetchMoreResult.getPosts?.items || [];
          
          if (newPosts.length === 0) {
            console.log("🏁 Новых постов нет, пагинация завершена");
            setHasMore(false);
            return prev;
          }

          // Проверяем дубликаты
          const existingIds = new Set(oldPosts.map(p => p.id));
          const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id));
          
          console.log(`✨ Добавлено ${uniqueNewPosts.length} новых постов`);
          
          return {
            ...prev,
            getPosts: {
              ...fetchMoreResult.getPosts,
              items: [...oldPosts, ...uniqueNewPosts],
            },
          };
        },
      });
      
    } catch (err) {
      console.error("❌ Ошибка при загрузке:", err);
    } finally {
      isLoadingMoreRef.current = false;
    }
  }, [posts.length, fetchMore, isLoadingMore, hasMore, currentCursor]);

  // Настройка Intersection Observer для бесконечного скролла
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !isLoadingMore && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore, loading, isLoadingMore, hasMore]);

  if (loading && posts.length === 0) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      {posts.length > 0 && <PostsWithText posts={posts} />}

      {/* Индикатор загрузки */}
      {isLoadingMore && (
        <div className={styles.loader}>
          <PostWithTextSkeleton />
        </div>
      )}

      {/* Триггер для бесконечного скролла */}
      {hasMore && posts.length < totalCount && (
        <div ref={observerTarget} className={styles.observerTrigger} />
      )}

      {/* Сообщение о завершении списка */}
      {!hasMore && posts.length === totalCount && totalCount > 0 && (
        <div className={styles.endMessage}>
          🎉 Вы просмотрели все {totalCount} постов!
        </div>
      )}
    </div>
  );
};