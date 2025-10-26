import React, { useContext } from "react";
import { Avatar, Card, Tag } from "antd";
import type { Image } from "../types";
import { SearchContext } from "./providers/SearchContextProvider";

const ImageCard = ({ image }: { image: Image }) => {
  const { isPending } = useContext(SearchContext);
  const { src, userImageURL, userUrl, userName, pageUrl, tags } = image;

  return (
    <Card
      className="image-card"
      cover={
        !isPending ? (
          <a href={pageUrl} target="_blank">
            <img
              draggable={false}
              alt={userName}
              src={src}
              style={{ objectFit: "cover" }}
            />
          </a>
        ) : null
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
        <div className="card-tags">
          <p>Tags:</p>
          {tags?.map((tag: string) => (
            <Tag color="blue" key={tag}>
              #{tag}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ImageCard;
