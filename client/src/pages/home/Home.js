import React from "react";
import Tweetbox from "../../components/Tweetbox";
import Feed from "./Feed";

function Home({ currentUser }) {
    return (
        <div className="flex flex-col max-w-xl border-r-2 border-gray-100 h-full">
            <span className="sticky z-10 top-0 bg-white border-b-2 w-full text-lg font-bold p-4">
                Home
            </span>
            <Tweetbox currentUser={currentUser} />
            <hr />
            <Feed />
        </div>
    );
}

export default Home;
