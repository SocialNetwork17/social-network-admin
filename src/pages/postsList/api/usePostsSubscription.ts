"use client";

import { useSubscription } from "@apollo/client/react";
import { POSTS_SUBSCRIPTION } from "./postsAll.mutation";
import { OnPostAddedSubscription } from "./postsAll.mutation.generated";

type UsePostsSubscriptionParams = {
    enabled?: boolean;
    onPostAdded: (post: NonNullable<OnPostAddedSubscription["postAdded"]>) => void;
};

export const usePostsSubscription = ({
                                         enabled = true,
                                         onPostAdded,
                                     }: UsePostsSubscriptionParams) => {
    useSubscription<OnPostAddedSubscription>(POSTS_SUBSCRIPTION, {
        skip: !enabled,
        onData: ({ data }) => {
            const newPost = data.data?.postAdded;
            if (newPost) {
                onPostAdded(newPost);
            }
        },
    });
};