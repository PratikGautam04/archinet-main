import { MetadataField, CardItem } from '../types/metadata';

/**
 * Normalizes a key name for fuzzy matching (removes whitespace, underscores, dashes, and converts to lowercase).
 */
export const normalizeKey = (key?: string): string => {
  return (key || '').toLowerCase().replace(/[\s_-]/g, '');
};

/**
 * Finds a metadata field by its keyName (supports multiple candidate keys and normalized fuzzy matching).
 */
export function getField(
  fields?: MetadataField[],
  ...candidateKeys: string[]
): MetadataField | undefined {
  if (!fields || !Array.isArray(fields) || candidateKeys.length === 0) return undefined;

  const targetKeys = candidateKeys.map(normalizeKey);

  return fields.find((f) => {
    const k = normalizeKey(f.keyName);
    return targetKeys.includes(k);
  });
}

/**
 * Extracts the trimmed string response of a field if present.
 */
export function getFieldValue(
  fields?: MetadataField[],
  ...candidateKeys: string[]
): string | undefined {
  const field = getField(fields, ...candidateKeys);
  if (field && typeof field.response === 'string' && field.response.trim().length > 0) {
    return field.response.trim();
  }
  if (field && field.response !== undefined && field.response !== null) {
    const str = String(field.response).trim();
    if (str.length > 0) return str;
  }
  return undefined;
}

/**
 * Parses button response text which may contain a label or optionally a "LABEL | URL" or "LABEL-#url" pair.
 * Preserves the complete label without truncating hyphenated words like "E-BROCHURE".
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

  // If separated by pipe: "LABEL | URL"
  if (trimmed.includes('|')) {
    const pipeIdx = trimmed.indexOf('|');
    const textPart = trimmed.substring(0, pipeIdx).trim();
    const linkPart = trimmed.substring(pipeIdx + 1).trim();
    return {
      text: textPart || defaultText,
      link: linkPart || defaultLink,
    };
  }

  // If separated by dash specifically followed by an anchor, path, or URL protocol: "-#", "-/", "-http://", "-https://"
  const linkPrefixMatch = trimmed.match(/-([#/]|https?:\/\/|mailto:|tel:)/i);
  if (linkPrefixMatch && linkPrefixMatch.index !== undefined) {
    const splitIdx = linkPrefixMatch.index;
    const textPart = trimmed.substring(0, splitIdx).trim();
    const linkPart = trimmed.substring(splitIdx + 1).trim();
    return {
      text: textPart || defaultText,
      link: linkPart || defaultLink,
    };
  }

  // Otherwise, the entire response is the button label
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
          const val =
            typeof subField.response === 'string'
              ? subField.response.trim()
              : subField.response !== undefined && subField.response !== null
              ? String(subField.response).trim()
              : '';
          mapped[subField.keyName] = val;
          mapped[normalizeKey(subField.keyName)] = val;
        }
      });
      return mapped as unknown as T;
    }

    const mapped: Record<string, string> = {};
    for (const [k, v] of Object.entries(item)) {
      const val = typeof v === 'string' ? v.trim() : v !== undefined && v !== null ? String(v).trim() : '';
      mapped[k] = val;
      mapped[normalizeKey(k)] = val;
    }
    return mapped as unknown as T;
  });
}

/**
 * Extracts section fields by section name, supporting fuzzy key matching (spaces vs underscores).
 */
export function getSection(
  metadataValues?: Record<string, any>,
  ...sectionNames: string[]
): MetadataField[] | undefined {
  if (!metadataValues || sectionNames.length === 0) return undefined;
  const targetNames = sectionNames.map(normalizeKey);

  for (const [key, value] of Object.entries(metadataValues)) {
    if (targetNames.includes(normalizeKey(key)) && Array.isArray(value)) {
      return value as MetadataField[];
    }
  }
  return undefined;
}

