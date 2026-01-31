
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  tag?: string;
  sales: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  target?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Banner {
  id: number;
  image: string;
  link: string;
}

export interface GuideItem {
  id: string;
  title: string;
  author: string;
  authorAvatar: string;
  cover: string;
  likes: string;
  category: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  importance: 'primary' | 'secondary';
  content?: string;
}

// 支持递归嵌套的节点：二级文章本身也是节点，可包含三级子文章
export interface GuideNode extends GuideArticle {
  children?: GuideArticle[]; 
}

export interface GuideTreeSection {
  id: string;
  title: string;
  icon: string;
  nodes: GuideNode[]; 
}
