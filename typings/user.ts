export type UserIcon =
  | 'ðĻ'
  | 'ðĐ'
  | 'ð§'
  | 'ð§'
  | 'ðĻâðĶē'
  | 'ðķ'
  | 'ðĩ'
  | 'ðī'
  | 'ð§'
  | 'ðž';

export interface User {
  icon: UserIcon;
  name: string | null;
}
