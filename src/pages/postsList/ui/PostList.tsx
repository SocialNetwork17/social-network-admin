"use client";

import styles from "./PostList.module.scss";
import {useLazyQuery} from "@apollo/client/react";
import { GET_USER } from "@/pages/postsList/api/users";
import {SearchInput} from "@/shared/ul/SearchInput/SearchInput";
import {GetUserQuery, GetUserQueryVariables} from "@/pages/postsList/api/users.generated";
import {useState} from "react";

export const PostList = () => {

const [searchUserId, setSearchUserId] = useState<number | null>(null);

const [getUser, { data, loading, error }] = useLazyQuery<GetUserQuery, GetUserQueryVariables>(GET_USER);

const handleSearch = (userId: number) => {
    setSearchUserId(userId);
    getUser({ variables: { userId } });
};

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
        <div className={styles.userTop}>
            <SearchInput placeholder={"Search input"} onSearch={handleSearch}/>
        </div>
      <p>{searchUserId}</p>
    </div>
  );
};