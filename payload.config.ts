import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogMedia } from './collections/BlogMedia'
import { Documents } from './collections/Documents'
import { Addresses } from './collections/Addresses'
import { Categories } from './collections/Categories'
import { Products } from './collections/Products'
import { Carts } from './collections/Carts'
import { Coupons } from './collections/Coupons'
import { BlogPosts } from './collections/BlogPosts'
import { Pages } from './collections/Pages'
import { ContactMessages } from './collections/ContactMessages'
import { EmailLogs } from './collections/EmailLogs'
import { Wishlists } from './collections/Wishlists'
import { Reviews } from './collections/Reviews'
import { Orders } from './collections/Orders'
import { OrderCounters } from './collections/OrderCounters'
import { ShippingZones } from './collections/ShippingZones'
import { ProcessingFees } from './collections/ProcessingFees'
import { MilitaryDiscountRequests } from './collections/MilitaryDiscountRequests'
import { AffiliateApplications } from './collections/AffiliateApplications'
import { Affiliates } from './collections/Affiliates'
import { AffiliateClicks } from './collections/AffiliateClicks'
import { AffiliateConversions } from './collections/AffiliateConversions'
import { AffiliatePayouts } from './collections/AffiliatePayouts'
import { PayoutRequests } from './collections/PayoutRequests'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'

import { AffiliateSettings } from './globals/AffiliateSettings'
import { BlogAuthorProfile } from './globals/BlogAuthorProfile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    BlogMedia,
    Documents,
    Addresses,
    Categories,
    Products,
    Carts,
    Wishlists,
    Coupons,
    Orders,
    OrderCounters,
    Reviews,
    ShippingZones,
    ProcessingFees,
    BlogPosts,
    Pages,
    ContactMessages,
    EmailLogs,
    MilitaryDiscountRequests,
    AffiliateApplications,
    Affiliates,
    AffiliateClicks,
    AffiliateConversions,
    AffiliatePayouts,
    PayoutRequests,
    NewsletterSubscribers,
  ],
  globals: [AffiliateSettings, BlogAuthorProfile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
})
