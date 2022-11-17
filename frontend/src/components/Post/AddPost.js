import React, { useRef } from 'react';
import Modal from '../Modal';
import classes from '../../css/AddPost.module.css';

const AddPost = ({
  user_id,
  profile,
  first_name,
  last_name,
  onCreatePost,
  onClosePost
}) => {
  const caption = useRef('');
  const img = useRef('');
  const video = useRef('');

  const postFormHandler = (e) => {
    e.preventDefault();
    const captionValue = caption.current.value;
    const imgValue = img.current.value;
    const videoValue = video.current.value;
    if (
      captionValue.trim().length == 0 &&
      img.trim().length == 0 &&
      video.trim().length == 0
    ) {
      return;
    }
    onCreatePost({
      user_id: user_id,
      post_caption: captionValue,
      post_img: imgValue,
      post_video: videoValue
    });
    onClosePost();
  };

  return (
    <Modal>
      <div className={classes['create-post']}>
        <div className={classes['create-post__header']}>
          <div className={classes['profile-picture']}>
            {profile !== null && profile.length > 0 && (
              <img
                crossOrigin='anonymous'
                src={`http://192.168.1.6:4000/${profile}`}
              />
            )}
          </div>
          <h4 className={classes.username}>
            {first_name} {last_name}
          </h4>
          <button className={classes['discard-button']} onClick={onClosePost}>
            discard
          </button>
        </div>

        <form method='POST' onSubmit={postFormHandler}>
          <div className={classes['create-post__content']}>
            <textarea
              type='text'
              placeholder='What do you want to talk about?'
              ref={caption}
            ></textarea>
            <label htmlFor='video' className={classes['video-input']}></label>
            <label htmlFor='image' className={classes['image-input']}></label>
            <input type='file' id='image' name='video' ref={img} />
            <input type='file' id='video' ref={video} />
          </div>

          <div className={classes['create-post__footer']}>
            <button type='submit' className={classes['post-button']}>
              Post
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
export default AddPost;