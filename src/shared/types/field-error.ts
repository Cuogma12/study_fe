/** required = chưa nhập (đỏ), invalid = đã nhập nhưng sai (vàng) */
export type FieldErrorTone = 'required' | 'invalid';

export interface FieldError {
  message: string;
  tone: FieldErrorTone;
}
