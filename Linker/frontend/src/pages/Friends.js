import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import classes from '../css/Friends.module.css';

const Friends = ({
  username,
  friendsList,
  onDeleteFriend,
  isLoading,
  isError
}) => {
  const [listSize, setListSize] = useState(false);

  const showFriendsHandler = () => {
    setListSize((prev) => !prev);
  };
  
  const List =
    friendsList.length > 0 &&
    friendsList.map((friend) => (
      <li key={friend.user_id}>
        <Link
          to={`/profile/${friend.username}`}
          className={
            listSize ? classes.max : `${classes.profile} ${classes.min}`
          }
        >
          <div className={classes.profile}></div>
          <div className={classes.username}>
            {friend.first_name} {friend.last_name}
          </div>
          <button
            onClick={() => onDeleteFriend(friend)}
            className={classes['delete-friend']}
          ></button>
        </Link>
      </li>
    ));

  return (
    <section className={classes.friends}>
      <h3>
        <i className='fa-solid fa-users'></i>
        friends {friendsList.length}
        {friendsList.length > 0 && (
          <button className={classes['show-all']} onClick={showFriendsHandler}>
            {listSize ? 'hide' : 'show'}
          </button>
        )}
      </h3>
      {isLoading && <SpinnerLoading color='light' />}
      {isError !== null && <Error message={isError} />}
      {friendsList.length > 0 && (
        <ul
          className={`${classes['friends-list']} ${
            listSize ? classes.max : classes.min
          }`}
        >
          {List}
        </ul>
      )}
    </section>
  );
};
export default Friends;
