import { MetadataField, CardItem } from '../types/metadata';

/**
 * Finds a metadata field by its keyName.
 */
export function getField(
  fields?: MetadataField[],
  keyName?: string
): MetadataField | undefined {
  if (!fields || !Array.isArray(fields) || !keyName) return undefined;
  return fields.find(
    (f) => f.keyName?.toLowerCase() === keyName.toLowerCase()
  );
}

/**
 * Extracts the trimmed string response of a field if present.
 */
export function getFieldValue(
  fields?: MetadataField[],
  keyName?: string
): string | undefined {
  const field = getField(fields, keyName);
  if (field && typeof field.response === 'string' && field.response.trim().length > 0) {
    return field.response.trim();
  }
  return undefined;
}

/**
 * Parses button response text which may contain "LABEL-URL" or just "LABEL".
 * Example: "EXPLORE ARCHINET-#" => { text: "EXPLORE ARCHINET", link: "#" }
 */
export function parseButtonValue(
  buttonValue?: string,
  defaultText = '',
  defaultLink = '#contact'
): { text: string; link: string } {
  if (!buttonValue || typeof buttonValue !== 'string' || buttonValue.trim().length === 0) {
    return { text: defaultText, link: defaultLink };
  }

  const trimmed = buttonValue.trim();
  if (trimmed.includes('-')) {
    const lastDashIdx = trimmed.lastIndexOf('-');
    const text = trimmed.substring(0, lastDashIdx).trim();
    const link = trimmed.substring(lastDashIdx + 1).trim();
    return {
      text: text || defaultText,
      link: link || defaultLink,
    };
  }

  return {
    text: trimmed,
    link: defaultLink,
  };
}

/**
 * Extracts card items from a card field.
 * Handles cardJson as an array of objects with fields array or direct attributes.
 */
export function getCardJsonData<T = Record<string, string>>(
  field?: MetadataField
): T[] {
  if (!field) return [];

  let cardList: CardItem[] = [];

  if (Array.isArray(field.cardJson)) {
    cardList = field.cardJson;
  } else if (typeof field.cardJson === 'string' && field.cardJson.trim().length > 0) {
    try {
      const parsed = JSON.parse(field.cardJson);
      if (Array.isArray(parsed)) {
        cardList = parsed;
      }
    } catch {
      return [];
    }
  }

  if (cardList.length === 0) return [];

  return cardList.map((item) => {
    if (Array.isArray(item.fields)) {
      const mapped: Record<string, string> = {};
      item.fields.forEach((subField) => {
        if (subField.keyName) {
          mapped[subField.keyName] = subField.response || '';
        }
      });
      return mapped as unknown as T;
    }
    return item as unknown as T;
  });
}
