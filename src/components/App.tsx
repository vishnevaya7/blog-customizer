import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from '../constants/articleProps';

import '../styles/index.scss';
import styles from '../styles/index.module.scss';

export const App = () => {
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={setArticleParams} />
			<Article />
		</main>
	);
};
