export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'https://ecom-admin-uat.actifyzone.com/ecom-admin-uat',
  GROUP_COMPANY_ID: process.env.NEXT_PUBLIC_GROUP_COMPANY_ID || '43',
  METADATA_KEY: process.env.NEXT_PUBLIC_METADATA_KEY || 'Archinet Website',
  METADATA_VALUES_ENDPOINT: '/api/metadata/group-admin/values',
};
