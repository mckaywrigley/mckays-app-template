export type ActionState<T> = {
  isSuccess: boolean;
  message: string;
  data?: T;
};
