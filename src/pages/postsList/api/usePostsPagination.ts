"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "@apollo/client/react";
import { POSTS_ALL_QUERY } from "../api/postsAll.mutation";
import { GetAllPostsQuery, GetAllPostsQueryVariables } from "../api/postsAll.mutation.generated";
import { Post, SortDirection } from "@/types";

export const usePostsPagination = () => {
  const observerTarget = useRef<HTMLDivElement>(null);
  const isLoadingMoreRef = useRef(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentCursor, setCurrentCursor] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const addPost = useCallback((newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
  }, []);

  const { data, loading, error, networkStatus, fetchMore } = useQuery<
    GetAllPostsQuery,
    GetAllPostsQueryVariables
  >(POSTS_ALL_QUERY, {
    variables: {
      pageSize: 12,
      endCursorPostId: null,
      sortBy: "createdAt",
      sortDirection: SortDirection.Desc,
      searchTerm: searchTerm || undefined,
    },
    notifyOnNetworkStatusChange: true,
  });

  const isLoadingMore = networkStatus === 3;

  // Обновление списка постов
  useEffect(() => {
    const fetchedPosts = data?.getPosts?.items ?? [];
    const totalCount = data?.getPosts?.totalCount ?? 0;

    console.log("fetchedPosts", fetchedPosts)
    console.log("totalCount",totalCount)

    if (fetchedPosts.length === totalCount) {
      setHasMore(false);
    }

    if (fetchedPosts.length < totalCount) {
      setHasMore(true);
    }

    if (data !== undefined) {
      if (fetchedPosts.length > 0) {
        setPosts(fetchedPosts);
        setCurrentCursor(fetchedPosts[fetchedPosts.length - 1].id);
      } else {
        setPosts([]);
        setHasMore(false);
      }
    }
  }, [data]);

  const loadMore = useCallback(async () => {
    if (isLoadingMoreRef.current || isLoadingMore || !hasMore) return;

    const endCursorPostId = currentCursor;
    if (!endCursorPostId) return;

    isLoadingMoreRef.current = true;

    try {
      await fetchMore({
        variables: {
          endCursorPostId: Number(endCursorPostId),
          pageSize: 9,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const oldPosts = prev.getPosts?.items ?? [];
          const newPosts = fetchMoreResult.getPosts?.items ?? [];

          const uniqueNewPosts = newPosts.filter(
            (post) => !oldPosts.some((p) => p.id === post.id)
          );

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
  }, [isLoadingMore, hasMore, currentCursor, fetchMore]);

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

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, loading, isLoadingMore, hasMore]);

  return {
    posts,
    loading,
    error,
    isLoadingMore,
    hasMore,
    loadMore: { triggerRef: observerTarget },
    setSearchTerm,
    addPost
  };
};