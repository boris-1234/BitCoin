import { useState, useEffect } from "react";
import btc_img from '../assets/btc.png'
import up_img from '../assets/arrow-up.png'
import down_img from '../assets/arrow-down.png'

import classes from './Header.module.css';

const wsClient = new WebSocket("wss://wstest.fxempire.com?token=btctothemoon");

const Header = (props) => {
	const [realtimePrice, setRealtimePrice] = useState(0);
	
	const changeClass= () => realtimePrice.change < 0 ? classes.down : classes.up;
	const changeSign = () =>  realtimePrice.change > 0 ? '+' : '';

	const handleRealtimePrice = (wsin) => {
    const result = JSON.parse(wsin.data);
    setRealtimePrice(result["cc-btc-usd-cccagg"]);
  };
	useEffect(() => {
    wsClient.onopen = () =>
      wsClient.send(
        JSON.stringify({
          type: "SUBSCRIBE",
          instruments: ["cc-btc-usd-cccagg"],
        })
      );
    wsClient.onmessage = (wsin) => handleRealtimePrice(wsin);
    
    return(
      
      wsClient.onclose = () =>
      wsClient.send(
        JSON.stringify({
          type: "UNSUBSCRIBE",
          instruments: ["cc-btc-usd-cccagg"],
        })
      )
    )
  }, []);

	if(!realtimePrice || !realtimePrice.change){
		return <div>No data</div>
	}
	return(
		<div className={classes.container}>
			<div className={classes.row}>
				<div className={classes.row}>
					<img src={btc_img} alt="bitcoin" />
					<h2>Bitcoin</h2>
				</div>
				<div className={classes.row}>
					<img src={realtimePrice.change > 0? up_img : down_img} alt="bitcoin" />
					<h2>${realtimePrice.last}</h2>
				</div>
			</div>
			<div className={classes.row}>
				<div>
					as of {new Date(realtimePrice.lastUpdate).toUTCString()}
				</div>
				<div className={classes.row}>
					<div className={changeClass()}>{changeSign() + realtimePrice.change.toFixed(2)}</div>
					<div className={changeClass()}>({changeSign() + (realtimePrice.change/realtimePrice.last * 100).toFixed(2)}%)</div>
				</div>
			</div>
		</div>
	)
}


export default Header;