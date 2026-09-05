import type { CollectionConfig } from 'payload'

/**
 * Addresses collection – stores shipping and billing addresses per user.
 * References the Users collection via a relationship field.
 */
export const Addresses: CollectionConfig = {
  slug: 'addresses',
  admin: {
    useAsTitle: 'label',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'company', type: 'text' },
    { name: 'line1', type: 'text', required: true },
    { name: 'line2', type: 'text' },
    { name: 'city', type: 'text', required: true },
    { name: 'state', type: 'text', required: true },
    { name: 'postalCode', type: 'text', required: true },
    { name: 'country', type: 'text', defaultValue: 'US', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'isDefaultShipping', type: 'checkbox', defaultValue: false },
    { name: 'isDefaultBilling', type: 'checkbox', defaultValue: false },
  ],
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin' || req.user?.role === 'staff') return true
      if (req.user) return { user: { equals: req.user.id } }
      return false
    },
    create: ({ req }) => !!req.user,
    update: ({ req }) => {
      if (req.user?.role === 'admin' || req.user?.role === 'staff') return true
      if (req.user) return { user: { equals: req.user.id } }
      return false
    },
    delete: ({ req }) => {
      if (req.user?.role === 'admin' || req.user?.role === 'staff') return true
      if (req.user) return { user: { equals: req.user.id } }
      return false
    },
  },
}
