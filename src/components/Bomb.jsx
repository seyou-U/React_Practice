// Error Boundaryの検証を行うためわざとエラーを出すコンポーネントを作成
export function Bomb({ shouldBoom }) {
  if (shouldBoom) {
    throw new Error('Boom!');
  }
  return <div>正常です</div>;
}
