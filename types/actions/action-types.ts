export type ActionState = {
  status: "success" | "error";
  message: string;
  data?: any;
};
