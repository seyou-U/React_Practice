import { useState } from 'react';
import { CrashDemoView } from './CrashDemoView';

export function CrashDemoContainer() {
  const [boom, setBoom] = useState(false);

  return <CrashDemoView boom={boom} onCrash={() => setBoom(true)} />;
}
