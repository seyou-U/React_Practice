import { apiRequest } from './apiClient';

/**
 * 非同期処理の開始
 * @returns apiRequest
 */
export function startMemosExport() {
  return apiRequest('/memos/export', { method: 'POST' });
}

/**
 * job状態の取得
 * @param jobId
 * @param signal
 * @returns apiRequest
 */
export function fetchJob(jobId, { signal } = {}) {
  return apiRequest(`/jobs/${jobId}`, { signal });
}
