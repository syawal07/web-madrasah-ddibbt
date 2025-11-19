export type Teacher = {
  _id: string;
  name: string;
  subject: string;
  photo?: {
    asset: {
      url: string;
    };
  };
  sortOrder?: number;
}