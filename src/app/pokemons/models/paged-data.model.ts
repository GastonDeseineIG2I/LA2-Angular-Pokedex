export interface PagedData<T> {
  offset: number;
  limit: number;
  data: T[];
}
