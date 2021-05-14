import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";

export default function Header({
  photosCount,
  followerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername,
  },
  setFollowerCount,
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeBtnFollow = user.username && user.username !== profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  useEffect(() => {
    async function isLoggedUserFollowingProfile() {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    }

    if (user.username && profileUserId) {
      isLoggedUserFollowingProfile();
    }
  }, [profileUserId, user.username]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center items-center">
        {profileUsername && (
          <img
            src={`/images/avatars/${profileUsername}.jpg`}
            alt={`${profileUsername} profile-pict`}
            className="rounded-full h-40 w-40 flex"
          />
        )}
      </div>

      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUsername}</p>

          {activeBtnFollow && (
            <button
              className="bg-blue-medium font-bold text-small rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {!followers || !following ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold">{followerCount}</span>
                {` `}
                {followerCount === 1 ? `follower` : `followers`}
              </p>
              <p className="mr-10">
                <span className="font-bold">{following.length}</span> following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">
            {!fullName ? <Skeleton count={1} height={24} /> : fullName}
          </p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  // profile: PropTypes.shape({
  //   docId: PropTypes.string.isRequired,
  //   userId: PropTypes.string.isRequired,
  //   fullName: PropTypes.string.isRequired,
  //   following: PropTypes.array.isRequired,
  //   followers: PropTypes.array.isRequired,
  //   username: PropTypes.string.isRequired,
  // }),
};
