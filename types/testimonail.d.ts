export interface ITestimony {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export type TestimonyForm = {
  name: string;
  role: string;
  content: string;
  avatar: string;
};
