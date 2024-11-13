import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import  { Header }  from "./header.jsx";
import ThreadList from './ThreadList.jsx';
import ThreadCreate from './ThreadCreate.jsx';
import ThreadIdList from './ThreadIdList.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>{/*React Routerを使ってルーティングを設定*/}
          <Route path="/" element={<ThreadList />} /> 
          <Route path="/threads/new" element={<ThreadCreate />} /> 
          <Route path="/threads/:thread_id" element={<ThreadIdList />} /> {/* 新しいルートを追加 */}
        </Routes>
      </div>
    </Router>
  )
};

export default App;