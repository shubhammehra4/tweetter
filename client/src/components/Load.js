import React from "react";
import twitter from "../twitter.svg";

function Load() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: " all 500ms ease-out",
            }}
        >
            <img elevation={4} src={twitter} alt="logo" className="loader" />
        </div>
    );
}

export default Load;
