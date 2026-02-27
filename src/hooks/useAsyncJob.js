import { useQuery } from '@tanstack/react-query';
import { fetchJob } from '../api/jobs';

export function useAsyncJob(jobId, { enabled = true } = {}) {
  return useQuery({
    queryKey: ['asyncJob', jobId],
    queryFn: ({ signal }) => fetchJob(jobId, { signal }),
    enabled: enabled && !!jobId,

    // ステータスがdoneもしくはfailedになるまで1秒ごとに再取得する
    refetchInterval: query => {
      const status = query.state.data?.status;
      if (!status) return 1000;
      if (status === 'done' || status === 'failed') return false;
      return 1000;
    },
  });
}
