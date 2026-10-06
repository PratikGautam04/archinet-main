export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://ecom-admin.actifyzone.com/ECOM-ADMIN-PROD',
  GROUP_COMPANY_ID: process.env.NEXT_PUBLIC_GROUP_COMPANY_ID || '13',
  METADATA_KEY: process.env.NEXT_PUBLIC_METADATA_KEY || 'Archinet Website',
  METADATA_VALUES_ENDPOINT: '/api/metadata/group-admin/values',
};