import classes from './ColumnTitle.module.css'

const ColumnTitle = (props) => {

	const handleUpClick = () => {
		props.setSort(props.title, 2);
	}
	const handleDownClick = () => {
		console.log(props.title);
		props.setSort(props.title, 1);
	}

	const getUpClass = () =>  props.sorted === 2 ? classes.arrowUpSelected : classes.arrowUp;
	const getDownClass = () =>  props.sorted === 1 ? classes.arrowDownSelected : classes.arrowDown;

	return(
		<div className={classes.row}>
		{props.title}
		<div>
			<div className={getUpClass()} onClick={handleUpClick}></div>
			
			<div className={getDownClass()} onClick={handleDownClick}></div>
		</div>
	</div>
	)
}

export default ColumnTitle;