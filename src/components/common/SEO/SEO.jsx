import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../../../config/site.config'

const SEO = ({
  title,
  description = 'Екологічно чисті гливи з власної ферми',
  keywords = ['гливи', 'гриби', 'ферма', 'екологічно чисті']
}) => {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.fullName

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords.join(', ')} />

      <meta property='og:title' content={fullTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={fullTitle} />
      <meta name='twitter:description' content={description} />
    </Helmet>
  )
}

export default SEO
