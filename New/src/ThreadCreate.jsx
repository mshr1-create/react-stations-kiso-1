import React, { useState } from 'react';
import axios from 'axios';

const ThreadCreate = () => {
  const [title, setTitle] = useState(''); //スレッドのタイトル
  const [loading, setLoading] = useState(false); //ローディング状態の管理
  const [error, setError] = useState(null); //エラーメッセージ
  const [success, setSuccess] = useState(null); //成功メッセージ

  //handleSubmit関数を非同期関数として宣言。(e)はイベントオブジェクトを表し、イベントハンドラ関数の引数として渡される。
  const handleSubmit = async (e) => { 
    e.preventDefault(); //フォームのデフォルトの送信動作を防ぐ（ページがリロードされるのを防ぐ）
    setLoading(true); //ローディング状態(true)
    setError(null); //エラーメッセージ(null)
    setSuccess(null); //成功メッセージ(null)

    try {
      const response = await axios.post('https://railway.bulletinboard.techtrain.dev/threads', {
        title // ここでtitleをAPIに送信
      });//APIエンドポイントにPOSTリクエストを送信。`title`はユーザーが入力したスレッドのタイトルをAPIに送信する役割を果たす  
      //非同期関数内ではawaitを使用して、非同期処理（例えば、APIリクエストの完了）を待つことが出来る
      setSuccess('スレッドが作成されました！');
      setTitle(''); //入力フィールドをクリア
    } catch (err) {
      setError('スレッドの作成に失敗しました。');
    }
    setLoading(false); //ローディング状態を(false)に設定
  };

  return (
    <div>
      <h2>新規スレッド作成</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>タイトル:</label>
          <input
            type="text"
            value={title} //titleステートの値を使用
            onChange={(e) => setTitle(e.target.value)} //入力値が変更された時にtitleステートを更新
            //eはイベントオブジェクトで、e.target.valueは入力フィールドの現在の値を取得する。
            //e.target は、イベントが発生したDOM要素を指す。この場合、ユーザーが文字を入力している <input> 要素のこと。
            required //空のまま送信できないように制限する
          />
        </div>
        <button type="submit" disabled={loading}>新規スレッド作成</button> {/*disabled={loading}：ローディング中はボタンを無効化*/}
      </form>
      {loading && <p>作成中...</p>}{/* //loadingがtrueの場合、"Loading..."を表示 */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/*errorがtrueの場合、エラーメッセージを赤色で表示*/}
      {success && <p style={{ color: 'green' }}>{success}</p>} {/*successがtrueの場合、メッセージを緑色で表示*/}
    </div>
  );
};

export default ThreadCreate;