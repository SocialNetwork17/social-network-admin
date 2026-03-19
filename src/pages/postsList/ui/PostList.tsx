"use client";

import { PostsWithText } from "@/shared/ul/PostsWithText/PostsWithText";
import styles from "./PostList.module.scss";
import { useQuery } from "@apollo/client/react";
import { POSTS_ALL_QUERY } from "../api/postsAll.mutation";
import {
  GetAllPostsQuery,
  GetAllPostsQueryVariables,
} from "../api/postsAll.mutation.generated";
import { GET_USER } from "@/pages/postsList/api/users";
import {GetUserQuery, GetUserQueryVariables} from "../api/users.generated";
import { useEffect, useState } from "react";

// export const PostList = () => {
//   console.log('PostList rendering');

//   const { data, loading, error, networkStatus } = useQuery<
//     GetAllPostsQuery,
//     GetAllPostsQueryVariables
//   >(POSTS_ALL_QUERY, {
//     notifyOnNetworkStatusChange: true,
//     onError: (error) => {
//       console.error("Query error details:", {
//         message: error.message,
//         graphQLErrors: error.graphQLErrors,
//         networkError: error.networkError,
//         clientErrors: error.clientErrors,
//       });
//     },
//     onCompleted: (data) => {
//       console.log("Query completed:", data);
//       console.log("Network status:", networkStatus);
//     },
//   });

//   console.log('Query state:', { loading, error, data, networkStatus });

//   // Добавляем обработку состояний загрузки и ошибок
//   if (loading) return <div>Loading posts...</div>;
//   if (error) {
//     console.log('Full error object:', JSON.stringify(error, null, 2));
//     return (
//       <div>
//         <h3>Error loading posts</h3>
//         <p>Message: {error.message}</p>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <p>Total posts: {data?.getPosts?.totalCount}</p>
//       {/* <PostsWithText posts={posts} /> */}
//     </div>
//   );
// };

export const PostList = () => {
  console.log('PostList rendering');

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId: 404 },
  })
  
  // const { data, loading, error } = useQuery<
  //   GetAllPostsQuery,
  //   GetAllPostsQueryVariables
  // >(POSTS_ALL_QUERY, {
  //   notifyOnNetworkStatusChange: true,
  //   onError: (error) => {
  //     console.error("Query error details:", {
  //       message: error.message,
  //       graphQLErrors: error.graphQLErrors,
  //       networkError: error.networkError,
  //     });
  //   },
  //   onCompleted: (data) => {
  //     console.log("Query completed:", data);
  //   },
  // });

  console.log('Query state:', { loading, error, data });

  if (loading) return <div>Loading posts...</div>;
  
  if (error) {
    return (
      <div>
        <h3>Error loading posts</h3>
        <p>Message: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/*<p>Total posts: {data?.getPosts?.totalCount}</p>*/}
      <p>{data?.getUser?.userName}</p>
    </div>
  );
};