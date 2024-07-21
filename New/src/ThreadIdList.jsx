import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ThreadIdList = () => {
  const { thread_id } = useParams(); // パラメータからthread_idを取得
  const [posts, setPosts] = useState([]); // 投稿リスト
  const [offset, setOffset] = useState(0); // オフセット
  const [loading, setLoading] = useState(false); // ローディング状態の管理
  const [error, setError] = useState(null); // エラーメッセージ

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // ローディング状態(true)
      setError(null); // エラーメッセージ(null)
      try { // try/catch文
        const response = await axios.get(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
          params: { offset } // axios.getメソッドのオプションとして指定されるクエリパラメータを設定
        });
        setPosts(response.data.posts); // データの更新
      } catch (err) { // エラーが起きた時の処理
        setError(err.message);
      }
      setLoading(false); // データを取得後、ローディング状態を(false)に設定
    };

    fetchPosts(); // fetchPostsの呼び出し
  }, [thread_id, offset]); // thread_idまたはoffsetの値が変更されるたびに、useEffectフックが再度実行

  const handleNext = () => {
    setOffset(prevOffset => prevOffset + 10); // コールバック関数(状態の更新に使用)
  }; // offsetの値を更新 次の10件

  return (
    <div>
      {loading && <p>Loading...</p>} {/* loadingがtrueの場合、"Loading..."を表示 */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* errorがtrueの場合、エラーメッセージを赤色で表示 */}
      <table className="post-table">
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.post}</td>
            </tr>
          ))} {/* posts配列をmap関数でリストアイテムに変換 */}
        </tbody>
      </table>
      <button onClick={handleNext}>次の10件</button>
    </div>
  );
};

export default ThreadIdList;
