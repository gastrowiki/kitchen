export interface Media {
  id: string;
  created_at?: Date;
  updated_at?: Date;
  mime_type: string;
  url: string;
  duration?: number;
  height?: number;
  width?: number;
  thumbnail?: string;
  caption: string;
  order: number;
  recipe_step_id?: string;
  recipe_id?: string;
  equipment_id?: string;
  method_id?: string;
  ingredient_id?: string;
}
