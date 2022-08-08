/**
 * 
 * @param x 
 * @param y 
 * 
 * @returns approximate length of the vector [x y]
 * 
 */
export default function fastLength(x: number, y: number) {
  const ax = Math.abs(x)
  const ay = Math.abs(y)
  const manhattan = ax + ay
  const chebychev = Math.max(ax, ay)
  return (manhattan + chebychev) / 2
}