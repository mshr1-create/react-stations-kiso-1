import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const ThreadIdList = () => {
  const { thread_id } = useParams(); // パラメータからthread_idを取得
  const [posts, setPosts] = useState([]); // 投稿リスト
  const [offset, setOffset] = useState(0); // オフセット
  const [loading, setLoading] = useState(false); // ローディング状態の管理
  const [error, setError] = useState(null); // エラーメッセージ
  const [newPost, setNewPost] = useState(""); // 新しい投稿内容
  const navigate = useNavigate(); // useNavigateを使用してナビゲートする

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

  const handlePost = async () => {
    if (!newPost) return; //投稿内容がない場合には、何もせずに終了する。 return は、条件が真（true）である場合に関数の実行を中断して終了させるためのもの。
    // ここに到達するのは、newPostが空でない場合のみ
    setLoading(true); // ローディング状態(true)
    setError(null); // エラーメッセージ(null)
    try {
      await axios.post(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        post: newPost //オブジェクトのプロパティ post に値 newPost を設定している。
      }); //try ブロック内で axios.post を使って、新しい投稿を送信
      setNewPost(""); // 投稿後に入力フィールドをクリア
      const response = await axios.get(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
        params: { offset } // 再度投稿リストを取得
      });
      setPosts(response.data.posts); // データの更新
    } catch (err) {
      setError(err.message); // エラーが起きた時の処理
    }
    setLoading(false); // データを取得後、ローディング状態を(false)に設定
  };

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
      <button onClick={handleNext} className='btn'>次の10件</button>
      <button onClick={() => navigate('/')} className='btn'>Topに戻る</button>{/*一覧に戻る */}
    
      <div>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="ここにメッセージを入力"
        ></textarea>
        <button onClick={handlePost} className='btnPost'>投稿</button>
      </div>
    </div>
  );
};

export default ThreadIdList;
