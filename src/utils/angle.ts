const TAU = 2 * Math.PI

export default function angle(v1: [number, number], v2?: [number, number]) {
  const [x1, y1] = v1
  const a1 = Math.atan2(y1, x1)
  if (!v2) return a1
  const [x2, y2] = v2
  const a2 = Math.atan2(y2, x2)
  const a = Math.abs(a1 - a2)
  return Math.min(TAU-a, a)
}
