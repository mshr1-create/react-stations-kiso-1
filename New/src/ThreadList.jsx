import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ThreadList = () => {
  const [threads, setThreads] = useState([]); //スレッドリスト
  const [offset, setOffset] = useState(0); //オフセット
  const [loading, setLoading] = useState(false); //ローディング状態の管理
  const [error, setError] = useState(null); //エラーメッセージ

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true); //ローディング状態(true)
      setError(null);//エラーメッセージ(null)
      try { //try/catch文
        const response = await axios.get('https://railway.bulletinboard.techtrain.dev/threads', {
          params: { offset } //axios.getメソッドのオプションとして指定されるクエリパラメータを設定（axios.getメソッドのオプションとして指定されるクエリパラメータを設定）
        });
        setThreads(response.data); //データの更新
      } catch (err) { //エラーが起きた時の処理
        setError(err.message);
      }
      setLoading(false);//データを取得後、ローディング状態を(false)に設定。その後、LOodingが消えてスレッド一覧が表示される。
    };

    fetchThreads(); //fetchThreadsの呼び出し
  }, [offset]);//offsetの値が変更されるたびに、useEffectフックが再度実行

  const handleNext = () => {
    setOffset(prevOffset => prevOffset + 10); //コールバック関数(状態の更新に使用)
  }; //offsetの値を更新 次の10件

  return (
    <div>
      
      {loading && <p>Loading...</p>} {/* //loadingがtrueの場合、"Loading..."を表示 */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/*errorがtrueの場合、エラーメッセージを赤色で表示*/}
      <ul>
        {threads.map(thread => (
          <li key={thread.id}>{thread.title}</li>
        ))} {/*threads配列をmap関数でリストアイテムに変換*/}
      </ul>
      <button onClick={handleNext}>次の10件</button>
    </div>
  );
};

export default ThreadList;