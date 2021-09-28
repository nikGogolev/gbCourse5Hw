import React, {useCallback, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import {getNewsList, getNewsErrorStatus, getNewsErrorMessage, getNewsRequestStatus} from '../../store/selectors/newsSelectors';
import {getNewsWithSaga} from '../../store/actions/getNews';
import {STATUSES} from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
	root: {
		listStyle: 'none',
	},
	newsItem: {
		display: 'block',
		textDecoration: 'none',
		color: theme.palette.primary.main,
		marginBottom: '10px',
		
		'&:visited':{
			color: theme.palette.secondary.main,
		},
	},
}));

function News(props) {
	/*styles*/
	const classes = useStyles();
	
	const newsList = useSelector(getNewsList);
	const isError = useSelector(getNewsErrorStatus);
	const newsErrorMessage = useSelector(getNewsErrorMessage);
	const newsRequestStatus = useSelector(getNewsRequestStatus);
	const dispatch = useDispatch();
	
	const handleFetchNews = useCallback(() => {
		dispatch(getNewsWithSaga());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	useEffect(() => {
		handleFetchNews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	
	const renderNews = useCallback(
    (newsItem) => <li key={newsItem.id}><a href={newsItem.url} target="_blank" rel="noreferrer" className={classes.newsItem}>{newsItem.title || 'No description'}</a></li>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	, []);
  
	if (isError) {
		return (
			<>
				<p>{newsErrorMessage}</p>
				<button onClick={handleFetchNews}>reload</button>
			</>
		)
	};
	if (newsRequestStatus === STATUSES.REQUEST){
		return(
			<>
				<p>Loading...</p>
			</>
		)
	}
	return (
	<>
		
		<ul className={classes.root}>{newsList.map(renderNews)}</ul>
	</>
	);
};

export default News;