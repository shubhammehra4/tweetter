import React from "react";
import { Center } from "@chakra-ui/react";
import twitter from "../images/twitter.svg";

function Load() {
    return (
        <Center height="100vh">
            <img className="animate-bounce" src={twitter} alt="loading" />
        </Center>
    );
}

export default Load;
