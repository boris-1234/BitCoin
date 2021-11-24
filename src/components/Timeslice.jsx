import {useState} from 'react';
import * as apiConsts from '../apiConsts';
import classes from './Timeslice.module.css';

const Timeslice = (props) => {
	const [timeSlice, setTimeSlice] = useState(apiConsts.SLICE_1MINUTE);

	const handleClick = (slice) => {
		setTimeSlice(slice);
		props.handleSliceChange(slice);
	}
	const setStyle = state => state === timeSlice ? {borderBottom: '1px solid #8f8f8f'} : {};

	return(
		<div className={classes.row}>
			
			<div style={setStyle(apiConsts.SLICE_1MINUTE)} onClick={() => handleClick(apiConsts.SLICE_1MINUTE)}>1 Minute</div>
			<div style={setStyle(apiConsts.SLICE_5MINUTES)} onClick={() => handleClick(apiConsts.SLICE_5MINUTES)}>5 Minutes</div>
			<div style={setStyle(apiConsts.SLICE_1HOUR)} onClick={() => handleClick(apiConsts.SLICE_1HOUR)}>1 Hour</div>
			<div style={setStyle(apiConsts.SLICE_1WEEK)} onClick={() => handleClick(apiConsts.SLICE_1WEEK)}>1 Week</div>
		</div>
	)
}

export const Slice = (state, label, value, handler) =>{
	const style = state === value ? {borderBottom: '1px solid black'} : {};
	return (<div style={style} onClick={() => handler(value)}>{label}</div>)
}

export default Timeslice;