import React, { useState, useRef, useContext, useEffect } from 'react';
import AuthenticateContext from '../../utils/authentication';
import useHttp from '../../hooks/use-http';
import classes from '../../css/PostBottom.module.css';

const PostBottom = ({ post_id, likesList, setLikesList, socket }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [commentContent, setCommentContent] = useState('');
  const commentContentRef = useRef();
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();

  const commentContentHandler = (e) => {
    setCommentContent(e.target.value);
  };

  const toggleLikehandler = () => {
    if (likesList.length === 0) {
      sendRequest(
        'post/like',
        'POST',
        {
          post_id: post_id,
          user_id: authCtx.user.user_id
        },
        null
      );
      setLikesList((prev) => [
        ...prev,
        {
          user_id: authCtx.user.user_id,
          username: authCtx.user.username,
          first_name: authCtx.user.first_name,
          last_name: authCtx.user.last_name,
          timedate: new Date()
        }
      ]);
      setIsLiked(true);
    } else {
      likesList.map((like) => {
        if (like.user_id === authCtx.user.user_id) {
          sendRequest(
            'post/like',
            'DELETE',
            {
              post_id: post_id,
              user_id: authCtx.user.user_id
            },
            null
          );
          setLikesList((prev) =>
            prev.filter((like) => like.user_id !== authCtx.user.user_id)
          );
          setIsLiked(false);
        } else {
          sendRequest(
            'post/like',
            'POST',
            {
              post_id: post_id,
              user_id: authCtx.user.user_id
            },
            null
          );
          setLikesList((prev) => [
            ...prev,
            {
              user_id: authCtx.user.user_id,
              username: authCtx.user.username,
              first_name: authCtx.user.first_name,
              last_name: authCtx.user.last_name,
              timedate: new Date()
            }
          ]);
          setIsLiked(true);
        }
      });
    }
  };

  // const onSharePost = () => {
  //   sendRequest(
  //     'post/share',
  //     'POST',
  //     {
  //       post_id: post_id,
  //       user_id: authCtx.user.user_id
  //     },
  //     () => {
  //       setSharesList((prev) => [
  //         {
  //           user_id: authCtx.user.user_id,
  //           username: authCtx.user.username,
  //           first_name: authCtx.user.first_name,
  //           last_name: authCtx.user.last_name,
  //           timedate: new Date()
  //         },
  //         ...prev
  //       ]);
  //     }
  //   );
  // };

  const createComment = (e) => {
    e.preventDefault();
    if (commentContentRef.current.value.trim().length === 0) {
      return;
    }
    sendRequest(
      'comment',
      'POST',
      {
        post_id: post_id,
        user_id: authCtx.user.user_id,
        comment_caption: commentContentRef.current.value,
        comment_img: null,
        comment_video: null
      },
      null
    );
    setCommentContent('');
  };
  const createShare = () => {
    sendRequest(
      'share',
      'POST',
      {
        user_id: authCtx.user.user_id,
        post_id: post_id
      },
      null
    );
  };
  useEffect(() => {
    socket.on('comments', (data) => {
      if (data.action === 'CREATE_COMMENT') {
        console.log(data.data);
      }
    });
  }, []);

  return (
    <div className={classes['post-bottom']} id='post-bottom'>
      <button
        className={classes['like-button']}
        title='Like'
        onClick={toggleLikehandler}
      >
        {isLiked ? 'liked' : 'like'}
      </button>
      <div className={classes['comment-box']}>
        <form onSubmit={createComment}>
          <input
            ref={commentContentRef}
            type='text'
            placeholder='Comment ...'
            title='Comment'
            value={commentContent}
            onChange={commentContentHandler}
            className={classes['comment-input']}
          />
          <button className={classes['send-button']} onClick={createComment}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='#323232'
              viewBox='0 0 512 512'
            >
              <path d='M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L277.3 424.9l-40.1 74.5c-5.2 9.7-16.3 14.6-27 11.9S192 499 192 488V392c0-5.3 1.8-10.5 5.1-14.7L362.4 164.7c2.5-7.1-6.5-14.3-13-8.4L170.4 318.2l-32 28.9 0 0c-9.2 8.3-22.3 10.6-33.8 5.8l-85-35.4C8.4 312.8 .8 302.2 .1 290s5.5-23.7 16.1-29.8l448-256c10.7-6.1 23.9-5.5 34 1.4z' />
            </svg>
          </button>
        </form>
      </div>
      <button title='Share' onClick={createShare}>
        share
      </button>
    </div>
  );
};
export default PostBottom;
