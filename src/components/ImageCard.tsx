import React, { useContext } from "react";
import { Avatar, Card, Tag } from "antd";
import type { Image } from "../types";
import { SearchContext } from "./providers/SearchContextProvider";
import CoverImage from "./CoverImage";

const ImageCard = ({ image }: { image: Image }) => {
  const { isPending } = useContext(SearchContext);
  const { src, userImageURL, userUrl, userName, pageUrl, tags } = image;

  return (
    <Card
      className="image-card"
      cover={
        !isPending && (
          <CoverImage pageUrl={pageUrl} src={src} userName={userName} />
        )
      }
      loading={isPending}
    >
      <div className="card-meta">
        <div className="card-header">
          <h3>By {userName}</h3>
          <a href={userUrl} target="_blank">
            <Avatar src={userImageURL} />
          </a>
        </div>
        <div className="card-tags-container">
          <p>Tags:</p>
          <div className="card-tags">
            {tags?.map((tag: string) => (
              <Tag color="red" key={tag}>
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
