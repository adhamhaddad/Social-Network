import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentController from './CommentController';
import useHttp from '../../hooks/use-http';
import AuthenticateContext from '../../utils/authentication';
import apiUrlContext from '../../utils/api-urls';
import PostDate from '../../Validation/PostDate';
import LikesController from './LikesController';
import classes from '../../css/CommentCard.module.css';

const CommentCard = ({ comment, onChangeComment, socket }) => {
  const apiCtx = useContext(apiUrlContext);
  const authCtx = useContext(AuthenticateContext);
  const [showLikes, setShowLikes] = useState(false);
  const [commentLikes, setCommentLikes] = useState([]);
  const { sendRequest, isLoading } = useHttp();

  const getCommentLikes = () => {
    sendRequest(
      `comment-like?comment_id=${comment.comment_id}`,
      'GET',
      {},
      setCommentLikes
    );
  };

  const addLike = () => {
    sendRequest(
      'comment-like',
      'POST',
      {
        comment_id: comment.comment_id,
        user_id: authCtx.user.user_id
      },
      null
    );
  };

  const showLikesToggle = () => {
    setShowLikes((prev) => !prev);
  };

  const newLikeAdded = (data) => {
    console.log(data);
    setCommentLikes((prev) => [...prev, data]);
  };

  useEffect(() => {
    getCommentLikes();
    socket.on('likes', (data) => {
      if (data.action === 'COMMENT_CREATE_LIKE') {
        newLikeAdded(data.data);
      }
    });

    return () => {
      setCommentLikes([]);
      setShowLikes(false);
    };
  }, []);

  return (
    <>
      <li className={classes['comment-card']}>
        <div className={classes['comment-header']}>
          <Link
            to={`/profile/${comment.username}`}
            className={classes['comment-profile']}
          >
            {comment.profile_picture !== null && (
              <img
                crossOrigin='anonymous'
                src={`${apiCtx.url}/${comment.profile_picture}`}
                alt={comment.username}
              />
            )}
          </Link>
          <Link
            to={`/profile/${comment.username}`}
            className={classes['comment-username']}
          >
            {comment.first_name} {comment.last_name}
          </Link>
          <span className={classes['comment-date']}>
            <PostDate timedate={comment.timedate} />
          </span>
          <CommentController
            comment_id={comment.comment_id}
            comment_user_id={comment.user_id}
            onChangeComment={onChangeComment}
          />
        </div>
        <div className={classes['comment-content']}>
          {comment.comment_caption}
        </div>
        <div className={classes['comment-footer']}>
          <button onClick={addLike}>like</button>
          <i className={`fa-solid fa-circle period ${classes['dot']}`}></i>
          {commentLikes.length > 0 && (
            <span
              onClick={showLikesToggle}
              className={classes['comment-likes']}
            >
              {commentLikes.length} <i className='fa-solid fa-heart'></i>
            </span>
          )}
          <button>reply</button>
        </div>
      </li>

      {showLikes && (
        <LikesController likes={commentLikes} onHide={showLikesToggle} />
      )}
    </>
  );
};
export default CommentCard;
