import { CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../constants/articleProps';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const mainRef = useRef<HTMLElement>(null);
	const [barOpen, setBarOpen] = useState(false);

	return (
		<main
			ref={mainRef}
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={barOpen}
				onClickArrow={() => setBarOpen(!barOpen)}
				mainRef={mainRef}
			/>
			<Article />
		</main>
	);
};
