import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  updateLoggedUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

export default function SuggestedProfile({
  username,
  userId,
  profileId,
  profileDocId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);
  async function handleFollowers() {
    setFollowed(true);
    await updateLoggedUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full flex w-8 mt-3 mr-3"
          alt=""
          src={`/images/avatars/${username}.jpg`}
        />
        <Link to={`/p/${username}`} className="text-sm font-bold">
          {username}
        </Link>
      </div>
      <button
        className="text-xs text-blue-medium font-bold"
        type="button"
        onClick={() => {
          handleFollowers();
        }}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  username: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  profileDocId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
