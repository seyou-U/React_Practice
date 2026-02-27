import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { startMemosExport } from '../api/jobs';
import { useAsyncJob } from '../hooks/useAsyncJob';

export function CheckJob() {
  const [jobId, setJobId] = useState(null);

  const startExport = useMutation({
    mutationFn: () => startMemosExport(),
    onSuccess: data => {
      setJobId(data.jobId);
    },
  });

  const jobQuery = useAsyncJob(jobId);

  return (
    <div style={{ padding: 16 }}>
      <h1>ジョブ確認ページ</h1>
      <section style={{ marginTop: 16 }}>
        <button onClick={() => startExport.mutate()} disabled={startExport.isPending}>
          {startExport.isPending ? '開始中...' : 'メモをエクスポート'}
        </button>

        {startExport.isError && (
          <p style={{ color: 'crimson' }}>開始に失敗: {startExport.error?.message}</p>
        )}

        {jobId && (
          <div style={{ marginTop: 12 }}>
            <p>jobId: {jobId}</p>

            {jobQuery.isPending && <p>状況取得中...</p>}

            {jobQuery.data && (
              <>
                <p>status: {jobQuery.data.status}</p>

                {jobQuery.data.status === 'done' && jobQuery.data.resultUrl && (
                  <p>
                    完了: <a href={jobQuery.data.resultUrl}>ダウンロード</a>
                  </p>
                )}

                {jobQuery.data.status === 'failed' && (
                  <p style={{ color: 'crimson' }}>失敗: {jobQuery.data.error ?? 'unknown error'}</p>
                )}
              </>
            )}

            {jobQuery.isError && (
              <p style={{ color: 'crimson' }}>状況取得に失敗: {jobQuery.error?.message}</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
