export type Post = {
  id: string;
  title: string;
  content: string;
  coverImageURL: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  likes: number; // いいねの数を追加
};

export type Category = {
  id: string;
  name: string;
};