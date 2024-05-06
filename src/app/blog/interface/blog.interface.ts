
export interface Blog {
  id:         number;
  title:      string;
  content:    string;
  category:   string;
  img?:       string;
  author:     string;
  created_at: Date;
  updated_at: Date | null;
}
