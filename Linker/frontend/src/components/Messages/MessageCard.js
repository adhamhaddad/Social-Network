import React, { useState } from 'react';
import classes from '../../css/MessageCard.module.css';

const MessageCard = ({ profile, message, timedate, lang, className, message_id }) => {
  const [messageStatus, setMessageStatus] = useState('seen');
  const format = (time) =>
    new Date(time).toLocaleString('en-US', { timeStyle: 'short' });

  // if (messageStatus == 'seen') {
  //   return <img src='./images/mrym.png' alt="" className={messageStatus ? 'active' : 'sent'}/>
  // } else if (messageStatus == 'sent') {
  //   return <i className='fa-solid fa-circle-check'></i>
  // } else if (messageStatus == 'delivered') {
  //   return <i className='fa-regular fa-circle-check'></i>
  // } else if (messageStatus == 'sending') {
  //   return <i className='fa-regular fa-circle'></i>
  // } else {
  //   return <i className='fa-regular fa-error'></i>
  // }
  return (
    <div className={`${classes['message-container']} ${classes[className]}`} id={message_id}>
      <div className={classes['message-profile']}></div>
      <div className={classes['message-info']}>
        <span className={classes['message-content']} lang={lang}>
          {message}
        </span>
        <span className={classes['message-time']}>{format(timedate)}</span>
      </div>
      <div className={classes['message-status']}></div>
    </div>
  );
};
export default MessageCard;
