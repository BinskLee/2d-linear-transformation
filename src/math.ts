// | a b | i-hat = (a, c)
// | c d | j-hat = (b, d)
export type Mat2 = {
  a: number;
  b: number;
  c: number;
  d: number;
};

export function identity(): Mat2 {
  return { a: 1, b: 0, c: 0, d: 1 };
}

export function apply(matrix: Mat2, v: [number, number]): [number, number] {
  return [matrix.a * v[0] + matrix.b * v[1], matrix.c * v[0] + matrix.d * v[1]];
}
