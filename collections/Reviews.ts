import type { CollectionConfig, Where } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews',
  admin: {
    defaultColumns: ['product', 'user', 'rating', 'status', 'verifiedPurchase'],
    description: 'Customer reviews – verification ties to delivered orders.',
  },
  access: {
    // Public read only for approved reviews, admins see all
    read: ({ req }) => {
      if (req.user?.role === 'admin' || req.user?.role === 'staff') return true
      return { status: { equals: 'approved' } }
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (req.user?.role === 'admin' || req.user?.role === 'staff') return true
      if (!req.user) return false
      return { and: [{ user: { equals: req.user.id } }, { status: { equals: 'pending' } }] } as Where
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'product',
      type: 'relationship',
      relationTo: 'products',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'order',
      type: 'relationship',
      relationTo: 'orders',
      required: false,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      validate: (val: number | null | undefined) => (!!val && val >= 1 && val <= 5) || 'Rating must be between 1 and 5',
    },
    {
      name: 'comment',
      type: 'text',
    },
    {
      name: 'verifiedPurchase',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Auto-set to true when linked order is delivered' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'pending',
    },
  ],
}
