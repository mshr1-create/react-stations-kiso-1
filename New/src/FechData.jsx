import React from "react";
import { useEffect, useState } from 'react'

const FecthData = () => {
    const [data, setData] = useState({}); //データを受け取るためのstate

    useEffect(() => {
           fetch("https://railway.bulletinboard.techtrain.dev"  )
     .then((res) => res.json())
     .then((json) => setData(json))
     .catch(() => alert("error")); 
    }, []);

    console.log(data);
    return <div>FecthData</div>;
};

export default FecthData;