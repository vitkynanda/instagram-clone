import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import AddComments from "./add-comment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  const [sliceComment, setSliceComment] = useState(2);
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length >= 0 && (
          <p
            className="text-sm text-gray-base  mb-1 cursor-pointer"
            onClick={() => {
              setExpanded((setExpanded) => !setExpanded);
              if (!expanded) {
                setSliceComment(comments.length);
              } else {
                setSliceComment(2);
              }
            }}
          >
            {expanded && comments.length > 2
              ? "Less comments"
              : comments.length <= 2
              ? "All comments loaded"
              : "View all comments"}
          </p>
        )}

        {comments.slice(0, sliceComment).map((item) => (
          <p key={`${item.comment}-${item.displayName}`} className="mb-1">
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}

        <p className="text-gray-base text-xs my-2">
          Posted {formatDistance(posted, new Date())} ago
        </p>
        <AddComments
          docId={docId}
          setComments={setComments}
          commentInput={commentInput}
          comments={comments}
        />
      </div>
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
