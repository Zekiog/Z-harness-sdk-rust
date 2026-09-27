import { describe, expect, it } from 'vitest'

import {
  adaptLegacyInsight,
  applyQualityGates,
  defaultLeverageRolloutPlan,
  detectAlerts,
  mapIntegrationRoute,
  rankInsights,
} from '../insight-prioritization.js'
import type { MonitoringSnapshot, UnifiedInsight } from '../insight-prioritization.js'

function makeInsight(overrides: Partial<UnifiedInsight> = {}): UnifiedInsight {
  return {
    id: 'i-1',
    timestamp: '2026-01-01T00:00:00.000Z',
    type: 'risk',
    source: 'metric',
    scope: 'global',
    confidence: 0.9,
    impact: 0.8,
    implementationCost: 0.3,
    timeCriticality: 0.85,
    horizon: 'immediate',
    polarity: 'negative',
    subject: 'latency spike',
    ...overrides,
  }
}

describe('insight prioritization', () => {
  it('filters contradictory and expired insights in quality gates', () => {
    const valid = makeInsight({ id: 'a', polarity: 'positive', entityKey: 'service:payments' })
    const contradictory = makeInsight({
      id: 'b',
      polarity: 'negative',
      entityKey: 'service:payments',
      timestamp: '2026-01-02T00:00:00.000Z',
    })
    const expired = makeInsight({
      id: 'c',
      entityKey: 'service:orders',
      expiresAt: '2025-01-01T00:00:00.000Z',
    })

    const result = applyQualityGates([valid, contradictory, expired], new Date('2026-06-01T00:00:00.000Z'))

    expect(result.accepted.map((item) => item.id)).toEqual(['a'])
    expect(result.rejected.map((item) => item.id).sort()).toEqual(['b', 'c'])
    expect(result.issues.some((issue) => issue.code === 'contradiction')).toBe(true)
    expect(result.issues.some((issue) => issue.code === 'expiredInsight')).toBe(true)
  })

  it('ranks insights by leverage and emits explanation', () => {
    const high = makeInsight({ id: 'high', impact: 0.95, confidence: 0.95, implementationCost: 0.2, subject: 'incident risk' })
    const low = makeInsight({
      id: 'low',
      impact: 0.4,
      confidence: 0.45,
      implementationCost: 0.9,
      timeCriticality: 0.3,
      subject: 'minor trend',
    })

    const ranked = rankInsights([low, high], { mode: 'security' })

    expect(ranked[0]?.insight.id).toBe('high')
    expect(ranked[0]?.decisionLevel).toBe('urgentApply')
    expect(ranked[0]?.explanation).toContain('mode=security')
    expect(ranked[0]?.leverageScore).toBeGreaterThan(ranked[1]?.leverageScore ?? 0)
  })

  it('maps integration route to synchronous operations when urgent', () => {
    const route = mapIntegrationRoute(
      makeInsight({ id: 'sync', horizon: 'immediate', confidence: 0.9, impact: 0.9, timeCriticality: 0.95 }),
      30_000
    )

    expect(route.flow).toBe('synchronous')
    expect(route.points).toContain('operations')
    expect(route.points).toContain('automation')
  })

  it('adapts legacy insights to unified insights', () => {
    const adapted = adaptLegacyInsight({
      identifier: 'legacy-1',
      createdAt: '2026-05-01T00:00:00.000Z',
      source: 'modelOutput',
      scope: 'team',
      type: 'opportunity',
      confidence: 0.7,
      impact: 0.6,
      cost: 0.5,
      urgency: 0.8,
      horizon: 'shortTerm',
      subject: 'upsell potential',
    })

    expect(adapted.id).toBe('legacy-1')
    expect(adapted.polarity).toBe('neutral')
    expect(adapted.timeCriticality).toBe(0.8)
  })

  it('detects confidence drop and volatility alerts', () => {
    const previous: MonitoringSnapshot = {
      totalInsights: 10,
      rejectedInsights: 1,
      averageConfidence: 0.8,
      decisionDistribution: {
        urgentApply: 7,
        watch: 2,
        hold: 1,
        reject: 0,
      },
    }
    const current: MonitoringSnapshot = {
      totalInsights: 10,
      rejectedInsights: 4,
      averageConfidence: 0.55,
      decisionDistribution: {
        urgentApply: 1,
        watch: 3,
        hold: 4,
        reject: 2,
      },
    }

    const alerts = detectAlerts(current, previous)
    expect(alerts.map((item) => item.code).sort()).toEqual(['confidenceDrop', 'rankingVolatility', 'sourceDrift'])
  })

  it('returns all rollout phases with expected order', () => {
    const plan = defaultLeverageRolloutPlan()
    expect(plan.map((phase) => phase.phase)).toEqual(['phase1', 'phase2', 'phase3', 'phase4'])
    expect(plan[0]?.items.some((item) => item.id === '1.1')).toBe(true)
    expect(plan[3]?.items.some((item) => item.id === '8.4')).toBe(true)
  })
})
