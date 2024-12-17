/*
<ai_context>
Contains the general server action types.
</ai_context>
*/

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never }
