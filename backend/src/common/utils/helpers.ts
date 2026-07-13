import slugifyLib from 'slugify';
import { v4 as uuidv4 } from 'uuid';

export function generateSlug(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

export function generateUniqueSlug(text: string): string {
  return `${generateSlug(text)}-${uuidv4().slice(0, 8)}`;
}

export function generateUuid(): string {
  return uuidv4();
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export function parsePagination(params: {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}): {
  skip: number;
  take: number;
  search: string | undefined;
  orderBy: Record<string, 'asc' | 'desc'> | undefined;
} {
  const page = params.page || 1;
  const limit = params.limit || 10;
  const skip = (page - 1) * limit;

  let orderBy: Record<string, 'asc' | 'desc'> | undefined;
  if (params.sortBy) {
    orderBy = { [params.sortBy]: params.sortOrder || 'desc' };
  }

  return {
    skip,
    take: limit,
    search: params.search,
    orderBy,
  };
}

export function buildPaginationMeta(total: number, page: number, limit: number) {
  const totalPages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}

export function excludeFields<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

export function toDecimal(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}
