import React from "react";
import type { Image } from "../types";

const CoverImage = ({
  pageUrl,
  src,
  userName,
}: Pick<Image, "pageUrl" | "src" | "userName">) => {
  return (
    <a href={pageUrl} target="_blank">
      <img
        draggable={false}
        alt={userName}
        src={src}
        style={{ objectFit: "cover" }}
      />
    </a>
  );
};

export default CoverImage;
