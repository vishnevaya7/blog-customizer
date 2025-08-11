import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import React, { useRef, useState } from 'react';

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
	onSubmit: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onSubmit }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formStyles, setFormStyles] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formStyles);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormStyles(defaultArticleState);
		onSubmit(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleToggle} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={rootRef}>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.content}>
						<Text as='h2' weight={800} size={31} uppercase>
							Задайте параметры
						</Text>
						<Select
							selected={formStyles.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								setFormStyles((prev) => ({
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
							selected={formStyles.fontSizeOption}
							onChange={(option) =>
								setFormStyles((prev) => ({ ...prev, fontSizeOption: option }))
							}
							title={'Размер шрифта'}
						/>
						<Select
							selected={formStyles.fontColor}
							options={fontColors}
							onChange={(option) =>
								setFormStyles((prev) => ({ ...prev, fontColor: option }))
							}
							title={'Цвет шрифта'}
							placeholder={'Цвет шрифта'}
						/>
						<Separator />
						<Select
							selected={formStyles.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								setFormStyles((prev) => ({ ...prev, backgroundColor: option }))
							}
							title={'Цвет фона'}
							placeholder={'Цвет фона'}
						/>
						<Select
							selected={formStyles.contentWidth}
							options={contentWidthArr}
							onChange={(option) =>
								setFormStyles((prev) => ({ ...prev, contentWidth: option }))
							}
							title={'Ширина контента'}
							placeholder={'Ширина контента'}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
