import { postgresAdapter } from '@payloadcms/db-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig, type CollectionConfig } from 'payload'
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
import { Trash } from './collections/Trash'

import { AffiliateSettings } from './globals/AffiliateSettings'
import { BlogAuthorProfile } from './globals/BlogAuthorProfile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Fail fast instead of silently signing every session/CSRF token (and the military
// one-click-action JWTs, which reuse this same secret) with an empty string — that
// would make them trivially forgeable rather than just breaking the app outright.
if (!process.env.PAYLOAD_SECRET) {
  throw new Error('PAYLOAD_SECRET environment variable is required and must not be empty.')
}

// Collections whose deletes are copied to the Trash first. Skipped: Users (passwords can't be restored),
// upload collections (files live in R2), and high-volume / system data.
const NO_TRASH = new Set([
  'trash',
  'users',
  'media',
  'blog-media',
  'documents',
  'email-logs',
  'affiliate-clicks',
  'order_counters',
  'carts',
])

const withTrash = (collection: CollectionConfig): CollectionConfig =>
  NO_TRASH.has(collection.slug)
    ? collection
    : {
        ...collection,
        hooks: {
          ...collection.hooks,
          beforeDelete: [
            ...(collection.hooks?.beforeDelete ?? []),
            async ({ req, id }) => {
              // Never block a delete because the trash copy failed (e.g. its table isn't created yet).
              try {
                const doc: any = await req.payload.findByID({
                  collection: collection.slug as any,
                  id,
                  depth: 0,
                  overrideAccess: true,
                })
                await req.payload.create({
                  collection: 'trash' as any,
                  data: {
                    label: `${collection.slug}: ${doc?.orderNumber ?? doc?.name ?? doc?.title ?? doc?.code ?? doc?.email ?? id}`,
                    originalCollection: collection.slug,
                    originalId: String(id),
                    deletedBy: req.user?.email ?? null,
                    data: doc,
                  },
                  overrideAccess: true,
                })
              } catch (err) {
                console.error(`Could not copy ${collection.slug}/${id} to trash:`, err)
              }
            },
          ],
        },
      }

export default buildConfig({
  admin: {
    user: Users.slug,
    components: {
      // "Needs attention" counters above the sidebar links.
      beforeNavLinks: ['/components/admin/NavBadges#default'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: '/pb-console',
  },
  // Order here sets the order of the admin sidebar groups (Store → Customers → Affiliates → Content → System).
  collections: [
    // Store
    Orders,
    Products,
    Categories,
    Coupons,
    Reviews,
    ShippingZones,
    ProcessingFees,
    Carts,
    Wishlists,
    // Customers
    Users,
    Addresses,
    MilitaryDiscountRequests,
    NewsletterSubscribers,
    ContactMessages,
    // Affiliates
    Affiliates,
    AffiliateApplications,
    AffiliateConversions,
    AffiliatePayouts,
    PayoutRequests,
    AffiliateClicks,
    // Content
    BlogPosts,
    Pages,
    Media,
    BlogMedia,
    Documents,
    // System
    EmailLogs,
    Trash,
    OrderCounters,
  ].map(withTrash),
  globals: [AffiliateSettings, BlogAuthorProfile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET,
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'support@primetimebiolabs.com',
    defaultFromName: 'Prime Time Bio Labs',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    s3Storage({
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${process.env.R2_PUBLIC_URL}/${prefix ? `${prefix}/` : ''}${filename}`,
        },
        'blog-media': {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${process.env.R2_PUBLIC_URL}/${prefix ? `${prefix}/` : ''}${filename}`,
        },
        documents: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${process.env.R2_PUBLIC_URL}/${prefix ? `${prefix}/` : ''}${filename}`,
        },
      },
      bucket: process.env.R2_BUCKET || '',
      config: {
        endpoint: process.env.R2_ENDPOINT,
        region: 'auto',
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
        },
        forcePathStyle: true,
      },
    }),
  ],
  sharp,
})
