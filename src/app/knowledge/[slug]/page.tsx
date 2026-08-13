import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ARTICLES, getArticleBySlug } from '@/data/knowledge';
import { ArticleDetail } from './ArticleDetail';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: 'Article not found | HXHD Bangladesh' };

  return {
    title: `${article.title} | HXHD Bangladesh`,
    description: article.summary,
    keywords: article.topics,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: 'article',
      publishedTime: article.iso,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  // Same kind first, then fill up from the rest, so the reader always gets
  // three suggestions even in the smaller Company set.
  const others = ARTICLES.filter((a) => a.slug !== article.slug);
  const related = [
    ...others.filter((a) => a.kind === article.kind),
    ...others.filter((a) => a.kind !== article.kind),
  ].slice(0, 3);

  return <ArticleDetail article={article} related={related} />;
}
