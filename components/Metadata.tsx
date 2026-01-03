'use client'
import { Helmet } from 'react-helmet-async';

interface MetadataProps {
    title?: string;
    description?: string;
    twitterCard?: string;
}

const Metadata: React.FC<MetadataProps> = ({
  title = 'ScaleX - Your Partner in Digital Marketing',
  description = 'ScaleX combines AI-driven insights with expert marketing solutions to drive exponential business growth, spanning all stages of business from idea to implementation.',
  twitterCard = 'summary_large_image',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Twitter metadata */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default Metadata;
