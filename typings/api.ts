export interface ApiActionState<T> {
  loading: boolean;
  error: Error;
  data: T;
}
