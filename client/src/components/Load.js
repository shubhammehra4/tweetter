import React from "react";
import { Center, Image } from "@chakra-ui/react";
import twitter from "../twitter.svg";

function Load() {
    return (
        <Center height="100vh">
            <Image className="animate-bounce" src={twitter} />
        </Center>
    );
}

export default Load;
