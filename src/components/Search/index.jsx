import React, { useContext, useState, useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../layouts/MainLayout';
import styles from './Search.module.scss';

const Search= () => {
	const [value, setValue] = useState('');
	const {
		setSearchValue,
	} = useContext(SearchContext);

	const inputRef = useRef(null);

	const onClickClear = (event) => {
		setSearchValue('');
		setValue('');
		inputRef.current?.focus?.();
	};

	const updateSearchValue = useCallback(
		debounce((str) => { 
			setSearchValue(str);
		}, 1000),
		[]
	);

	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth='2'
				className={styles.searchIcon}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
				/>
			</svg>
			<input
				ref={inputRef}
				value={value} 
				className={styles.input}
				placeholder='Поиск пицы...'
				onChange={onChangeInput}
			/>
			{value && (
				<svg
					onClick={onClickClear}
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth='2'
					className={styles.closeIcon}
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			)}
		</div>
	);
};

export default Search;
