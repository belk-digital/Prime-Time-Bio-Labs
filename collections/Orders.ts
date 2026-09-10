import type { CollectionConfig } from 'payload'
import { handleOrderChangeEmails } from '../lib/email/orderNotifications'

// TODO: port order numbering, inventory/coupon/points processing in the
// checkout-implementation phase. Status/invoice emails are handled below.
export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    defaultColumns: ['orderNumber', 'status', 'paymentStatus', 'paymentMethod', 'orderSource', 'fulfillmentStatus', 'owner'],
    description: 'Customer orders – generated server-side only.',
  },
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return { owner: { equals: req.user?.id } }
    },
    create: () => false,
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  hooks: {
    afterChange: [
      ({ doc, previousDoc, operation, req }) => {
        void handleOrderChangeEmails({ doc, previousDoc, operation, payload: req.payload }).catch((err) =>
          console.error('Order email hook failed:', err)
        )
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'orderNumber',
      type: 'text',
      admin: { readOnly: true, description: 'Auto-generated order identifier (e.g., 7000).' },
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: false,
      admin: { description: 'User who placed the order (null for guests).' },
    },
    {
      name: 'customerFirstName',
      type: 'text',
    },
    {
      name: 'customerLastName',
      type: 'text',
    },
    {
      name: 'customerPhone',
      type: 'text',
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'product', type: 'relationship', relationTo: 'products', required: false },
        { name: 'variantTitle', type: 'text' },
        { name: 'variant', type: 'text' },
        { name: 'price', type: 'number' },
        { name: 'quantity', type: 'number', required: true },
        {
          type: 'collapsible',
          label: 'Product Snapshot Data',
          admin: { initCollapsed: true },
          fields: [{ name: 'productSnapshot', type: 'json' }],
        },
      ],
    },
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text' },
        { name: 'line2', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    {
      name: 'billingAddress',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text' },
        { name: 'line2', type: 'text' },
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'postalCode', type: 'text' },
        { name: 'country', type: 'text' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: ['pending', 'paid', 'fulfilled', 'shipped', 'completed', 'refunded', 'cancelled'].map((v) => ({
        label: v[0].toUpperCase() + v.slice(1),
        value: v,
      })),
      required: true,
      defaultValue: 'pending',
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: ['unpaid', 'authorized', 'captured', 'refunded'].map((v) => ({
        label: v[0].toUpperCase() + v.slice(1),
        value: v,
      })),
      required: true,
      defaultValue: 'unpaid',
    },
    {
      name: 'fulfillmentStatus',
      type: 'select',
      options: ['unfulfilled', 'partial', 'fulfilled'].map((v) => ({
        label: v[0].toUpperCase() + v.slice(1),
        value: v,
      })),
      required: true,
      defaultValue: 'unfulfilled',
    },
    {
      name: 'refunds',
      type: 'array',
      fields: [
        { name: 'amount', type: 'number' },
        { name: 'reason', type: 'text' },
        { name: 'createdAt', type: 'date', admin: { readOnly: true } },
      ],
    },
    { name: 'subtotal', type: 'number', admin: { position: 'sidebar' } },
    { name: 'discountTotal', type: 'number', admin: { position: 'sidebar' } },
    { name: 'redeemedPoints', type: 'number', defaultValue: 0, admin: { position: 'sidebar', description: 'HB Points used ($1/point)' } },
    { name: 'shippingTotal', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
    {
      name: 'taxTotal',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'feeTotal',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'appliedFees',
      type: 'array',
      fields: [
        { name: 'feeId', type: 'relationship', relationTo: 'processing-fees' },
        { name: 'feeName', type: 'text' },
        { name: 'amount', type: 'number' },
        { name: 'feeType', type: 'select', options: ['percentage', 'fixed_amount'] },
        { name: 'percentage', type: 'number' },
      ],
    },
    { name: 'shippingMethod', type: 'text', admin: { position: 'sidebar' } },
    { name: 'trackingLink', type: 'text', admin: { position: 'sidebar' } },
    { name: 'sendTrackingEmail', type: 'checkbox', admin: { position: 'sidebar' } },
    {
      name: 'paymentMethod',
      type: 'select',
      defaultValue: 'stripe',
      options: [
        { label: 'Card (Stripe)', value: 'stripe' },
        { label: 'Zelle', value: 'zelle' },
        { label: 'Venmo', value: 'venmo' },
        { label: 'Cash App', value: 'cashapp' },
        { label: 'American Express', value: 'amex' },
        { label: 'Card (CircoFlows)', value: 'circoflows' },
        { label: 'Stripe (Payment Link)', value: 'stripe_link' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'circoflowsTransactionId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
        condition: (data) => data?.paymentMethod === 'circoflows',
      },
    },
    { name: 'couponCode', type: 'text', admin: { position: 'sidebar' } },
    { name: 'affiliateId', type: 'text', admin: { position: 'sidebar' } },
    { name: 'clickId', type: 'text', admin: { position: 'sidebar' } },
    { name: 'orderSource', type: 'text', admin: { position: 'sidebar', readOnly: true } },
    { name: 'customerNote', type: 'textarea' },
    { name: 'guestEmail', type: 'text', admin: { position: 'sidebar' } },
    {
      name: 'isFinalized',
      type: 'checkbox',
      defaultValue: false,
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'notes',
      type: 'array',
      label: 'Order Notes',
      fields: [
        {
          name: 'type',
          type: 'radio',
          required: true,
          defaultValue: 'internal',
          options: [
            { label: 'Internal Note', value: 'internal' },
            { label: 'Message to Customer', value: 'customer' },
          ],
        },
        { name: 'note', type: 'textarea', required: true },
        { name: 'date', type: 'date', admin: { readOnly: true } },
        { name: 'isEmailed', type: 'checkbox', label: 'Dispatched to Customer', admin: { readOnly: true } },
      ],
    },
  ],
}
