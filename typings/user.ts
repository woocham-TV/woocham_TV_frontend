export type UserIcon =
  | '👨'
  | '👩'
  | '🧑'
  | '👧'
  | '👨‍🦲'
  | '👶'
  | '👵'
  | '👴'
  | '🧔'
  | '👼';

export interface User {
  icon: UserIcon;
  name: string | null;
}
