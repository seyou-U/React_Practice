import { ErrorBoundary } from '../../pages/ErrorBoundary';
import { Bomb } from '../Bomb';

export function CrashDemoView({ boom, onCrash }) {
  return (
    <div>
      <button onClick={onCrash}>クラッシュさせる</button>

      <ErrorBoundary>
        <Bomb shouldBoom={boom} />
      </ErrorBoundary>
    </div>
  );
}
