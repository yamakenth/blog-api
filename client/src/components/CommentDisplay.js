import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import moment from "moment";
import _ from "underscore";

function CommentDisplay(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/articles/${props.articleid}/comments`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.articleid]);

  return (
    <>
      <h6>Comments ({comments.length})</h6>
      <hr className="mt-1" />
      {comments.map((comment) => {
        return (
          <Card key={comment._id} className="mb-2">
            <Card.Body className="py-2">
              <Card.Text className="text-muted mb-1">
                {_.unescape(comment.author)} |{" "}
                {moment(comment.createdAt).format("MMMM Do YYYY")}
              </Card.Text>
              <Card.Text>{_.unescape(comment.text)}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );
}

export default CommentDisplay;
