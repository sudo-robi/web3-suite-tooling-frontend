import { config } from '../config/index.js';
import type { ApiResponse, PriceFeed, ContractMetric, MetricSummary, Proposal } from '../types/index.js';

async function fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${config.apiBaseUrl}${endpoint}`);
    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      timestamp: Date.now(),
    };
  }
}

export async function getOracleFeeds(): Promise<ApiResponse<string[]>> {
  return fetchApi('/oracle/feeds');
}

export async function getOraclePrice(feedId: string): Promise<ApiResponse<PriceFeed>> {
  return fetchApi(`/oracle/price/${feedId}`);
}

export async function getAnalyticsCount(): Promise<ApiResponse<number>> {
  return fetchApi('/analytics/metrics/count');
}

export async function getMetricSummary(metricName: string): Promise<ApiResponse<MetricSummary>> {
  return fetchApi(`/analytics/summary/${metricName}`);
}

export async function getTrackedContracts(): Promise<ApiResponse<string[]>> {
  return fetchApi('/analytics/tracked');
}

export async function getProposals(page = 1, limit = 10): Promise<ApiResponse<Proposal[]>> {
  return fetchApi(`/governance/proposals?page=${page}&limit=${limit}`);
}

export async function getProposal(id: number): Promise<ApiResponse<Proposal>> {
  return fetchApi(`/governance/proposals/${id}`);
}

export async function getProposalCount(): Promise<ApiResponse<number>> {
  return fetchApi('/governance/proposals/count');
}
