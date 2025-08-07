import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

export type StyleFormData = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	containerWidth: string;
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const mainRef = useRef<HTMLElement>(null);
	const applyStyles = (formData: StyleFormData) => {
		if (mainRef.current) {
			mainRef.current.style.setProperty('--font-family', formData.fontFamily);
			mainRef.current.style.setProperty('--font-size', formData.fontSize);
			mainRef.current.style.setProperty('--font-color', formData.fontColor);
			mainRef.current.style.setProperty(
				'--container-width',
				formData.containerWidth
			);
			mainRef.current.style.setProperty('--bg-color', formData.backgroundColor);
		}
	};
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
				onApply={applyStyles}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
