import database from '../database';
import Messages from '../types/Message';
const getDate = () => {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  const suffix = hour >= 12 ? 'PM' : 'AM';
  return `${day}/${
    month + 1
  }/${year} - ${hour}:${minutes}:${seconds} ${suffix}`;
};
class Message {
  async newMessage(m: Messages, user_id: string): Promise<Messages> {
    try {
      const connection = await database.connect();
      const sql =
        'INSERT INTO messages (time, message, user_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(sql, [
        getDate(),
        m.message,
        user_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create a new message. Error ${(err as Error).message}`
      );
    }
  }

  async getAllMessages(user_id: string): Promise<Messages[]> {
    try {
      const connection = await database.connect();
      const sql = 'SELECT * FROM messages WHERE user_id=$1';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get the messages. Error ${(err as Error).message}`
      );
    }
  }

  async updateMessage(m: Messages, user_id: string): Promise<Messages> {
    try {
      const connection = await database.connect();
      const sql = 'UPDATE messages SET message=$2 WHERE user_id=$1 RETURNING *';
      const result = await connection.query(sql, [user_id, m.message]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not update the message. Error ${(err as Error).message}`
      );
    }
  }

  async deleteMessage(id: string): Promise<Messages> {
    try {
      const connection = await database.connect();
      const sql = 'DELETE FROM messages WHERE id=$1';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not create a new message. Error ${(err as Error).message}`
      );
    }
  }
}
export default Message;