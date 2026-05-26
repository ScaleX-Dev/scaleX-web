'use client'
import { useEffect } from 'react';

interface MetadataProps {
    title?: string;
    description?: string;
    twitterCard?: string;
}

const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
};

const Metadata: React.FC<MetadataProps> = ({
  title = 'ScaleX - Your Partner in Digital Marketing',
  description = 'ScaleX combines AI-driven insights with expert marketing solutions to drive exponential business growth, spanning all stages of business from idea to implementation.',
  twitterCard = 'summary_large_image',
}) => {
  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setMeta('twitter:card', twitterCard);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
  }, [title, description, twitterCard]);

  return null;
};

export default Metadata;
