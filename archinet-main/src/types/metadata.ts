export interface MetadataField {
  keyName: string;
  response?: string;
  inputType?: string;
  fieldLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  cardJson?: CardItem[] | string;
}

export interface CardFieldItem {
  keyName: string;
  response?: string;
  inputType?: string;
  fieldLabel?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}

export interface CardItem {
  fields?: CardFieldItem[];
  [key: string]: any;
}

export interface MetadataValues {
  hero?: MetadataField[];
  about?: MetadataField[];
  brands?: MetadataField[];
  footer?: MetadataField[];
  contact?: MetadataField[];
  gallery?: MetadataField[];
  leaders?: MetadataField[];
  purpose?: MetadataField[];
  event_hero?: MetadataField[];
  statistics?: MetadataField[];
  testimonials?: MetadataField[];
  archinet_video?: MetadataField[];
  build_over_time?: MetadataField[];
  [key: string]: MetadataField[] | undefined;
}

export interface WebTemplate {
  id: number;
  tenantId: number;
  metadataMasterId: number;
  metadataKey: string;
  metadataValues: MetadataValues;
  createdAt: string;
  updatedAt: string | null;
}
