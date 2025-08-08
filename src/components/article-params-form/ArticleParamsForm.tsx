import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import React, { RefObject, useRef, useState } from 'react';

import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

export type ArticleParamsFormProps = {
	isOpen: boolean;
	onClickArrow: () => void;
	mainRef: RefObject<HTMLElement>;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [applyStyles, setApplyStyles] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: props.isOpen,
		rootRef,
		onClose: props.onClickArrow,
		onChange: props.onClickArrow,
	});
	const applyStylesToMain = (styles: ArticleStateType) => {
		if (props.mainRef.current) {
			props.mainRef.current.style.setProperty(
				'--font-family',
				styles.fontFamilyOption.value
			);
			props.mainRef.current.style.setProperty(
				'--font-size',
				styles.fontSizeOption.value
			);
			props.mainRef.current.style.setProperty(
				'--font-color',
				styles.fontColor.value
			);
			props.mainRef.current.style.setProperty(
				'--container-width',
				styles.contentWidth.value
			);
			props.mainRef.current.style.setProperty(
				'--bg-color',
				styles.backgroundColor.value
			);
		}
	};
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		applyStylesToMain(applyStyles);
	};

	const handleReset = () => {
		setApplyStyles(defaultArticleState);
		applyStylesToMain(defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={props.isOpen} onClick={props.onClickArrow} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: props.isOpen,
				})}
				ref={rootRef}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}>
					<div className={styles.content}>
						<Text as='h2' weight={800} size={31} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={applyStyles.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								setApplyStyles((prev) => ({
									...prev,
									fontFamilyOption: option,
								}))
							}
							title={'Шрифт'}
							placeholder={'Шрифт'}
						/>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={applyStyles.fontSizeOption}
							onChange={(option) =>
								setApplyStyles((prev) => ({ ...prev, fontSizeOption: option }))
							}
							title={'Размер шрифта'}
						/>
						<Select
							selected={applyStyles.fontColor}
							options={fontColors}
							onChange={(option) =>
								setApplyStyles((prev) => ({ ...prev, fontColor: option }))
							}
							title={'Цвет шрифта'}
							placeholder={'Цвет шрифта'}
						/>
						<Separator />
						<Select
							selected={applyStyles.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								setApplyStyles((prev) => ({ ...prev, backgroundColor: option }))
							}
							title={'Цвет фона'}
							placeholder={'Цвет фона'}
						/>
						<Select
							selected={applyStyles.contentWidth}
							options={contentWidthArr}
							onChange={(option) =>
								setApplyStyles((prev) => ({ ...prev, contentWidth: option }))
							}
							title={'Ширина контента'}
							placeholder={'Ширина контента'}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
