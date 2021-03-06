/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */

const dotEnv = require('dotenv')
const withSourceMaps = require('@zeit/next-source-maps')

dotEnv.config()

const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_AUTH_TOKEN = process.env.SANITY_AUTH_TOKEN
const SANITY_READ_TOKEN = process.env.SANITY_READ_TOKEN

module.exports = withSourceMaps({
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  publicRuntimeConfig: {
    SANITY_PROJECT_ID,
    SANITY_DATASET,
    SANITY_READ_TOKEN,
    SANITY_AUTH_TOKEN,
  },
})
