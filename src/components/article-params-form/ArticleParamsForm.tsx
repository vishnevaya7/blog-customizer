import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';

import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useState } from 'react';
import { StyleFormData } from 'src/index';

export type ArticleParamsFormProps = {
	isOpen: boolean;
	onClickArrow: () => void;
	onApply: (formData: StyleFormData) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOptions[0]);
	const [selectedFontFamily, setSelectedFontFamily] = useState(
		fontFamilyOptions[0]
	);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColors[0]);
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
		backgroundColors[0]
	);
	const [selectedContentWidth, setSelectedContentWidth] = useState(
		contentWidthArr[0]
	);
	const handleApply = () => {
		const formData = {
			fontFamily: selectedFontFamily.value,
			fontSize: selectedFontSize.value,
			fontColor: selectedFontColor.value,
			backgroundColor: selectedBackgroundColor.value,
			containerWidth: selectedContentWidth.value,
		};
		props.onApply(formData);
	};
	const handleReset = () => {
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontFamily(defaultArticleState.fontFamilyOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBackgroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);

		props.onApply({
			fontFamily: defaultArticleState.fontFamilyOption.value,
			fontSize: defaultArticleState.fontSizeOption.value,
			fontColor: defaultArticleState.fontColor.value,
			backgroundColor: defaultArticleState.backgroundColor.value,
			containerWidth: defaultArticleState.contentWidth.value,
		});
	};
	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={props.onClickArrow} />
			<aside
				className={`${styles.container} ${
					props.isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<div className={styles.content}>
						<Select
							selected={selectedFontFamily}
							options={fontFamilyOptions}
							onChange={setSelectedFontFamily}
							title={'Размер шрифта'}
							placeholder={'Размер шрифта'}
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={setSelectedFontSize}
							title={'Размер шрифта'}
						/>
						<Select
							selected={selectedFontColor}
							options={fontColors}
							onChange={setSelectedFontColor}
							title={'Цвет шрифта'}
							placeholder={'Цвет шрифта'}
						/>
						<Separator />
						<Select
							selected={selectedBackgroundColor}
							options={backgroundColors}
							onChange={setSelectedBackgroundColor}
							title={'Цвет фона'}
							placeholder={'Цвет фона'}
						/>
						<Select
							selected={selectedContentWidth}
							options={contentWidthArr}
							onChange={setSelectedContentWidth}
							title={'Ширина контента'}
							placeholder={'Ширина контента'}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							onClick={handleReset}
							title='Сбросить'
							htmlType='reset'
							type='clear'
						/>
						<Button
							onClick={handleApply}
							title='Применить'
							htmlType='button'
							type='apply'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
