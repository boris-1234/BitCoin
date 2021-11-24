import {useState} from 'react';
import Timeslice from "./Timeslice";
import ColumnTitle from "./ColumnTitle";
import classes from "./History.module.css";


const History = (props) => {
	const {data} = props;
  const [sort, setSort] = useState('Date')
  const [metadata, setMetadata] = useState({
    Date: {order:1, sort:1}, 
    High: {order:2, sort:0}, 
    Low: {order:3, sort:0}, 
    Open: {order:4, sort:0}, 
    Close: {order:5, sort:0}, 
  })
  const numberFormat = Intl.NumberFormat('en-US');
  //const dateOptions = {year:'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit', hour12:false };

  const handleSort = (key, sortType) => {
    const t = {...metadata};
    
    t[sort].sort = 0;
    t[key].sort = sortType;
    console.log(t);
    setSort(key);
    setMetadata( t);
  }
  
  const sortData = (data) => {
    console.log(sort, metadata[sort], metadata[sort].sort === 1, metadata[sort].sort === 2);
    if(metadata[sort].sort === 1)
      return data.sort( (rec1, rec2) => rec1[sort] - rec2[sort])
    else if(metadata[sort].sort === 2)
      return data.sort( (rec1, rec2) => rec2[sort] - rec1[sort])
    else
      return data;
  }

  return (
    <div className={classes.history}>
      <Timeslice handleSliceChange={props.handleSliceChange}/>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {Object.keys(metadata).map( (key) => <th key={key}><ColumnTitle title={key} sorted={metadata[key].sort} setSort={handleSort}/></th>)}
          </tr>
        </thead>
        <tbody>
          {sortData(data).map((rec) => (
            <tr key={rec.Date}>
              <td>{rec.Date}</td>
              <td>{numberFormat.format(rec.High)}</td>
              <td>{numberFormat.format(rec.Low)}</td>
              <td>{numberFormat.format(rec.Open)}</td>
              <td>{numberFormat.format(rec.Close)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
