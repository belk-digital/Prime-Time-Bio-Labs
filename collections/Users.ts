import type { CollectionConfig, Where } from 'payload'
import { generateForgotPasswordEmail } from '../lib/email/templates/forgotPassword'

const staffOnly = ({ req: { user } }: any) => !!user && ['admin', 'staff'].includes(user.role)

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200,
    forgotPassword: {
      generateEmailSubject: () => generateForgotPasswordEmail('').subject,
      generateEmailHTML: (args) => generateForgotPasswordEmail(args?.token || '').html,
    },
  },
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin' || req.user?.role === 'staff') return true
      if (req.user) return { id: { equals: req.user.id } }
      return false
    },
    create: () => true,
    update: ({ req }) => {
      if (!req.user) return false
      if (['admin', 'staff'].includes(req.user.role as string)) return true
      return { id: { equals: req.user.id } }
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    // default fields added by Payload: email, password
    {
      name: 'firstName',
      type: 'text',
      required: false,
    },
    {
      name: 'lastName',
      type: 'text',
      required: false,
    },
    {
      name: 'googleId',
      type: 'text',
      unique: true,
      index: true,
      access: {
        read: () => false,
        update: () => false,
      },
    },
    {
      name: 'authProvider',
      type: 'select',
      defaultValue: 'credentials',
      options: [
        { label: 'Email/Password', value: 'credentials' },
        { label: 'Google', value: 'google' },
      ],
      access: {
        update: () => false,
      },
    },
    {
      name: 'phone',
      type: 'text',
      validate: (val: string | null | undefined) => {
        if (!val) return true
        const regex = /^\+?[1-9]\d{1,14}$/
        return regex.test(val) || 'Phone must be in E.164 format'
      },
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'customer',
      options: [
        { label: 'Customer', value: 'customer' },
        { label: 'Admin', value: 'admin' },
        { label: 'Staff', value: 'staff' },
      ],
      // A customer's own update access only lets them PATCH their own record — without this,
      // that's enough to self-promote to admin. Only admins/staff may change this field.
      access: { update: staffOnly },
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      access: { update: staffOnly },
    },
    {
      name: 'acceptsMarketing',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'orderSmsUpdates',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Send SMS notifications for order status updates.',
      },
    },
    {
      name: 'dateOfBirth',
      type: 'date',
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      admin: {
        readOnly: true,
      },
      access: { update: staffOnly },
    },
    {
      name: 'defaultShippingAddress',
      type: 'relationship',
      relationTo: 'addresses',
      hasMany: false,
      filterOptions: ({ id, data }): Where => {
        const userId = id || (data && data.id)
        if (userId) {
          return {
            user: {
              equals: userId,
            },
          }
        }
        return {
          id: {
            equals: 'none',
          },
        }
      },
    },
    {
      name: 'defaultBillingAddress',
      type: 'relationship',
      relationTo: 'addresses',
      hasMany: false,
      filterOptions: ({ id, data }): Where => {
        const userId = id || (data && data.id)
        if (userId) {
          return {
            user: {
              equals: userId,
            },
          }
        }
        return {
          id: {
            equals: 'none',
          },
        }
      },
    },
    {
      name: 'lastLoginAt',
      type: 'date',
      admin: {
        readOnly: true,
      },
      access: { update: staffOnly },
    },
    {
      name: 'metadata',
      type: 'json',
      access: { update: staffOnly },
    },
    {
      name: 'hbPoints',
      label: 'HB Points',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'HB Points ($1 per point). Can be used by users at checkout.',
      },
      // Only server-side code (checkout, refund hooks) using overrideAccess may change this —
      // never a customer's own PATCH request, or they could mint free store credit for themselves.
      access: { update: staffOnly },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.email) {
          data.email = String(data.email).toLowerCase()
        }
        return data
      },
    ],
  },
}
