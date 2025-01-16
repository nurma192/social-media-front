import React from 'react';
import {useLazyCurrentUserQuery} from "../app/features/user/userApi";

const Posts = () => {
    const [currentQuery] = useLazyCurrentUserQuery()
    const current = async () => {
        const res = await currentQuery()
        console.log(res)
    }
    return (
        <div>
            Posts

            <button onClick={current}>Current</button>
        </div>
    );
};

export default Posts;