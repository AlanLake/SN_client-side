import React, { useContext } from "react";
import { Button, Card, Icon, Label, Popup, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import LikeButton from "./LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "./DeleteButton";

function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }}></LikeButton>
        <Popup
          content="Comment on post"
          inverted
          trigger={
            <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
              <Button color="teal" basic>
                <Icon name="comment" />
                Comment
              </Button>
              <Label basic color="teal" pointing="left">
                {commentCount}
              </Label>
            </Button>
          }
        />
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
