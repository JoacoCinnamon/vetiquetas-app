interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationLinks {
  first: PaginationLink | null;
  prev: PaginationLink | null;
  next: PaginationLink | null;
  last: PaginationLink | null;
}

export interface PaginationData<T> {
  data: T[];
  meta: PaginationMeta;
  links: PaginationLinks;
}