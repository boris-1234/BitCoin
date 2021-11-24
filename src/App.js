import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import History from "./components/History";
import Overview from "./components/Overview";

import * as apiConsts from "./apiConsts";


//const numberFormat = Intl.NumberFormat('en-US');
const dateOptions = {year:'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12:false };

function App() {
  const [tab, setTab] = useState(apiConsts.TAB_OVERVIEW);
  const [data, setData] = useState([]);
  

  const setStyle = (state) =>
    state === tab
      ? { borderBottom: "1px solid #406f93", color: "#406f93" }
      : {};



  const handleSliceChange = (slice) => {
    let api;
    switch (slice) {
      case 1:
        api = apiConsts.API_MINUTE;
        break;
      case 2:
        api = apiConsts.API_5MINUTE;
        break;
      case 3:
        api = apiConsts.API_HOUR;
        break;
      case 4:
        api = apiConsts.API_WEEK;
        break;
      default:
        return;
    }
    getData(api);
  };

  const getData = (slice = apiConsts.API_MINUTE) => {
    fetch(slice)
      .then((resp) => resp.json())
      .then((resp) => {
        if(slice === apiConsts.API_5MINUTE){
          const tmp = resp.data.filter( (rec, index) => index % 5 === 0)
          handleData(tmp)
        }else{
          handleData(resp.data)
        }
      });
  };

  const handleData = (rawData) => {
    const data = rawData.map( rec => {
      return {
        Date: Date.parse(rec.Date).toLocaleString([], dateOptions),
        ...rec
      }
    })
    setData(data)
  }

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="App">
      <Header/>
      <div className="row">
        <h3
          style={setStyle(apiConsts.TAB_OVERVIEW)}
          onClick={() => setTab(apiConsts.TAB_OVERVIEW)}
        >
          Overview
        </h3>
        <h3
          style={setStyle(apiConsts.TAB_HISTORY)}
          onClick={() => setTab(apiConsts.TAB_HISTORY)}
        >
          History
        </h3>
      </div>

      {tab === apiConsts.TAB_HISTORY && (
        <History handleSliceChange={handleSliceChange} data={data} />
      )}
      {tab === apiConsts.TAB_OVERVIEW && (
        <Overview handleSliceChange={handleSliceChange} data={data} />
      )}
    </div>
  );
}

export default App;
