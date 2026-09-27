/**
 * Leverage-oriented insight integration primitives.
 *
 * This module implements a full lifecycle surface for:
 * - strategic framework definition
 * - unified data/signal normalization and quality gates
 * - leverage-based ranking with explainability
 * - integration flow mapping and phased rollout planning
 *
 * @experimental
 */

export type InsightType = 'risk' | 'opportunity' | 'demand' | 'behavior' | 'quality' | 'cost' | 'performance'
export type InsightSource = 'modelOutput' | 'eventLog' | 'metric' | 'userFeedback'
export type InsightScope = 'global' | 'team' | 'productLine' | 'geography' | 'process'
export type TimeHorizon = 'immediate' | 'shortTerm' | 'midTerm' | 'longTerm'
export type DecisionLevel = 'urgentApply' | 'watch' | 'hold' | 'reject'
export type LeverageMode = 'growth' | 'security' | 'efficiency' | 'cost'
export type InsightPolarity = 'positive' | 'negative' | 'neutral'
export type FlowType = 'synchronous' | 'asynchronous'
export type IntegrationPoint = 'operations' | 'planning' | 'automation' | 'reporting'
export type QualityIssueCode =
  | 'missingRequiredField'
  | 'invalidRange'
  | 'expiredInsight'
  | 'contradiction'
  | 'duplicate'

export interface UnifiedInsight {
  id: string
  timestamp: string
  type: InsightType
  source: InsightSource
  scope: InsightScope
  confidence: number
  impact: number
  implementationCost: number
  timeCriticality: number
  horizon: TimeHorizon
  polarity: InsightPolarity
  subject: string
  entityKey?: string
  expiresAt?: string
  metadata?: Record<string, string | number | boolean>
}

export interface StrategicGlossary {
  insight: string
  confidenceScore: string
  impactScore: string
  timeHorizon: string
  criticalThreshold: string
}

export interface StrategicFramework {
  inventory: InsightType[]
  glossary: StrategicGlossary
  leverageFormula: string
  decisionLevels: Record<DecisionLevel, string>
}

export interface SignalSourceMap {
  modelOutput: string[]
  eventLog: string[]
  metric: string[]
  userFeedback: string[]
}

export interface UnifiedSchemaSpec {
  requiredFields: string[]
  ranges: Record<'confidence' | 'impact' | 'implementationCost' | 'timeCriticality', { min: number; max: number }>
}

export interface QualityIssue {
  code: QualityIssueCode
  insightId: string
  field?: string
  message: string
}

export interface QualityGateResult {
  accepted: UnifiedInsight[]
  rejected: UnifiedInsight[]
  issues: QualityIssue[]
}

export interface LeverageWeights {
  impact: number
  confidence: number
  timeCriticality: number
  implementationCost: number
}

export interface ComponentScores {
  impact: number
  confidence: number
  timeCriticality: number
  implementationCost: number
}

export interface RankedInsight {
  insight: UnifiedInsight
  leverageScore: number
  decisionLevel: DecisionLevel
  components: ComponentScores
  explanation: string
}

export interface RankingConfig {
  mode: LeverageMode
  decisionThresholds?: Partial<Record<DecisionLevel, number>>
  customWeights?: Partial<LeverageWeights>
}

export interface IntegrationRoute {
  insightId: string
  flow: FlowType
  points: IntegrationPoint[]
}

export interface LegacyInsight {
  identifier: string
  createdAt: string
  source: InsightSource
  scope: InsightScope
  type: InsightType
  confidence: number
  impact: number
  cost: number
  urgency: number
  horizon: TimeHorizon
  polarity?: InsightPolarity
  subject: string
}

export interface BaselineComparison {
  top1Changed: boolean
  top3OverlapRatio: number
  averageScoreDelta: number
}

export interface MonitoringSnapshot {
  totalInsights: number
  rejectedInsights: number
  averageConfidence: number
  decisionDistribution: Record<DecisionLevel, number>
}

export interface Alert {
  code: 'confidenceDrop' | 'sourceDrift' | 'rankingVolatility'
  message: string
}

export interface RolloutSubStage {
  id: string
  title: string
}

export interface RolloutStage {
  phase: 'phase1' | 'phase2' | 'phase3' | 'phase4'
  title: string
  items: RolloutSubStage[]
}

const SCORE_MIN = 0
const SCORE_MAX = 1

const DEFAULT_THRESHOLDS: Record<DecisionLevel, number> = {
  urgentApply: 0.75,
  watch: 0.5,
  hold: 0.25,
  reject: 0,
}

const DEFAULT_WEIGHTS: Record<LeverageMode, LeverageWeights> = {
  growth: { impact: 0.35, confidence: 0.25, timeCriticality: 0.25, implementationCost: 0.15 },
  security: { impact: 0.3, confidence: 0.35, timeCriticality: 0.25, implementationCost: 0.1 },
  efficiency: { impact: 0.25, confidence: 0.25, timeCriticality: 0.2, implementationCost: 0.3 },
  cost: { impact: 0.2, confidence: 0.25, timeCriticality: 0.15, implementationCost: 0.4 },
}

export const DEFAULT_STRATEGIC_GLOSSARY: StrategicGlossary = {
  insight: 'A decision-support signal generated from model outputs, telemetry, or user feedback.',
  confidenceScore: 'Normalized reliability level of an insight between 0 and 1.',
  impactScore: 'Normalized expected business or operational effect between 0 and 1.',
  timeHorizon: 'Expected realization window of an insight outcome.',
  criticalThreshold: 'Minimum leverage score required to trigger high-priority action.',
}

export function defineStrategicFramework(): StrategicFramework {
  return {
    inventory: ['risk', 'opportunity', 'demand', 'behavior', 'quality', 'cost', 'performance'],
    glossary: DEFAULT_STRATEGIC_GLOSSARY,
    leverageFormula: '(impact * confidence * timeCriticality) / max(implementationCost, 0.05)',
    decisionLevels: {
      urgentApply: 'Apply immediately through automated or manually approved action.',
      watch: 'Track actively and evaluate in short review intervals.',
      hold: 'Keep in backlog and reassess when context changes.',
      reject: 'Discard due to weak confidence, low value, or invalid quality.',
    },
  }
}

export function defineSignalSourceMap(): SignalSourceMap {
  return {
    modelOutput: ['llm-inference', 'classifier', 'predictive-analytics'],
    eventLog: ['application-log', 'audit-log', 'workflow-log'],
    metric: ['latency', 'error-rate', 'cost-metric', 'quality-metric'],
    userFeedback: ['nps', 'support-ticket', 'survey', 'operator-note'],
  }
}

export function defineUnifiedSchemaSpec(): UnifiedSchemaSpec {
  return {
    requiredFields: [
      'id',
      'timestamp',
      'type',
      'source',
      'scope',
      'confidence',
      'impact',
      'implementationCost',
      'timeCriticality',
      'horizon',
      'subject',
    ],
    ranges: {
      confidence: { min: SCORE_MIN, max: SCORE_MAX },
      impact: { min: SCORE_MIN, max: SCORE_MAX },
      implementationCost: { min: 0.01, max: SCORE_MAX },
      timeCriticality: { min: SCORE_MIN, max: SCORE_MAX },
    },
  }
}

export function normalizeScore(
  value: number,
  min = SCORE_MIN,
  max = SCORE_MAX,
  fallback = SCORE_MIN
): number {
  if (!Number.isFinite(value)) {
    return fallback
  }
  if (max <= min) {
    return fallback
  }
  if (value <= min) {
    return SCORE_MIN
  }
  if (value >= max) {
    return SCORE_MAX
  }
  return (value - min) / (max - min)
}

export function normalizeInsight(insight: UnifiedInsight): UnifiedInsight {
  return {
    ...insight,
    confidence: normalizeScore(insight.confidence),
    impact: normalizeScore(insight.impact),
    implementationCost: Math.max(insight.implementationCost, 0.01),
    timeCriticality: normalizeScore(insight.timeCriticality),
  }
}

export function applyQualityGates(insights: UnifiedInsight[], now: Date = new Date()): QualityGateResult {
  const schema = defineUnifiedSchemaSpec()
  const issues: QualityIssue[] = []
  const accepted: UnifiedInsight[] = []
  const rejected: UnifiedInsight[] = []
  const seen = new Set<string>()
  const latestByEntityAndType = new Map<string, UnifiedInsight>()

  const reject = (insight: UnifiedInsight, issue: QualityIssue): void => {
    rejected.push(insight)
    issues.push(issue)
  }

  for (const insight of insights) {
    let hasError = false

    for (const field of schema.requiredFields) {
      const value = insight[field as keyof UnifiedInsight]
      if (value === undefined || value === null || value === '') {
        hasError = true
        reject(insight, {
          code: 'missingRequiredField',
          insightId: insight.id,
          field,
          message: `Missing required field: ${field}`,
        })
      }
    }

    if (hasError) {
      continue
    }

    const duplicateKey = `${insight.id}:${insight.timestamp}`
    if (seen.has(duplicateKey)) {
      reject(insight, {
        code: 'duplicate',
        insightId: insight.id,
        message: 'Duplicate insight id/timestamp tuple',
      })
      continue
    }
    seen.add(duplicateKey)

    const rangeFields: Array<keyof UnifiedSchemaSpec['ranges']> = [
      'confidence',
      'impact',
      'implementationCost',
      'timeCriticality',
    ]
    for (const field of rangeFields) {
      const value = insight[field]
      const range = schema.ranges[field]
      if (value < range.min || value > range.max) {
        hasError = true
        reject(insight, {
          code: 'invalidRange',
          insightId: insight.id,
          field,
          message: `Field out of range: ${field}`,
        })
      }
    }

    if (hasError) {
      continue
    }

    if (insight.expiresAt !== undefined && new Date(insight.expiresAt).getTime() < now.getTime()) {
      reject(insight, {
        code: 'expiredInsight',
        insightId: insight.id,
        field: 'expiresAt',
        message: 'Insight expired',
      })
      continue
    }

    const entityKey = insight.entityKey ?? `${insight.type}:${insight.subject}`
    const mapKey = `${entityKey}:${insight.type}`
    const previous = latestByEntityAndType.get(mapKey)
    if (
      previous !== undefined &&
      previous.polarity !== 'neutral' &&
      insight.polarity !== 'neutral' &&
      previous.polarity !== insight.polarity
    ) {
      reject(insight, {
        code: 'contradiction',
        insightId: insight.id,
        message: `Contradiction detected with insight ${previous.id}`,
      })
      continue
    }

    latestByEntityAndType.set(mapKey, insight)
    accepted.push(normalizeInsight(insight))
  }

  return { accepted, rejected, issues }
}

export function resolveWeights(config: RankingConfig): LeverageWeights {
  const base = DEFAULT_WEIGHTS[config.mode]
  if (config.customWeights === undefined) {
    return base
  }
  return {
    impact: config.customWeights.impact ?? base.impact,
    confidence: config.customWeights.confidence ?? base.confidence,
    timeCriticality: config.customWeights.timeCriticality ?? base.timeCriticality,
    implementationCost: config.customWeights.implementationCost ?? base.implementationCost,
  }
}

export function computeComponentScores(insight: UnifiedInsight): ComponentScores {
  return {
    impact: normalizeScore(insight.impact),
    confidence: normalizeScore(insight.confidence),
    timeCriticality: normalizeScore(insight.timeCriticality),
    implementationCost: Math.max(insight.implementationCost, 0.01),
  }
}

export function computeLeverageScore(insight: UnifiedInsight, weights: LeverageWeights): number {
  const components = computeComponentScores(insight)
  const numerator =
    components.impact * weights.impact +
    components.confidence * weights.confidence +
    components.timeCriticality * weights.timeCriticality
  const denominator = components.implementationCost * weights.implementationCost + 0.001
  return normalizeScore(numerator / denominator, 0, 10, 0)
}

export function decideLevel(
  leverageScore: number,
  thresholds: Partial<Record<DecisionLevel, number>> = {}
): DecisionLevel {
  const merged: Record<DecisionLevel, number> = { ...DEFAULT_THRESHOLDS, ...thresholds }
  if (leverageScore >= merged.urgentApply) {
    return 'urgentApply'
  }
  if (leverageScore >= merged.watch) {
    return 'watch'
  }
  if (leverageScore >= merged.hold) {
    return 'hold'
  }
  return 'reject'
}

function mergeSimilarInsights(insights: UnifiedInsight[]): UnifiedInsight[] {
  const grouped = new Map<string, UnifiedInsight[]>()
  for (const insight of insights) {
    const key = `${insight.type}:${insight.scope}:${insight.subject.toLowerCase().trim()}`
    const bucket = grouped.get(key)
    if (bucket === undefined) {
      grouped.set(key, [insight])
    } else {
      bucket.push(insight)
    }
  }

  const merged: UnifiedInsight[] = []
  for (const group of grouped.values()) {
    if (group.length === 1) {
      merged.push(group[0]!)
      continue
    }
    const newest = group
      .slice()
      .sort((first, second) => new Date(second.timestamp).getTime() - new Date(first.timestamp).getTime())[0]!
    const confidence = group.reduce((sum, item) => sum + item.confidence, 0) / group.length
    const impact = group.reduce((sum, item) => sum + item.impact, 0) / group.length
    const timeCriticality = group.reduce((sum, item) => sum + item.timeCriticality, 0) / group.length
    const implementationCost = group.reduce((sum, item) => sum + item.implementationCost, 0) / group.length
    merged.push(
      normalizeInsight({
        ...newest,
        confidence,
        impact,
        timeCriticality,
        implementationCost,
      })
    )
  }
  return merged
}

export function rankInsights(insights: UnifiedInsight[], config: RankingConfig): RankedInsight[] {
  const weights = resolveWeights(config)
  const merged = mergeSimilarInsights(insights)
  const ranked = merged.map((insight) => {
    const components = computeComponentScores(insight)
    const leverageScore = computeLeverageScore(insight, weights)
    const decisionLevel = decideLevel(leverageScore, config.decisionThresholds)
    const explanation =
      `mode=${config.mode}, leverage=${leverageScore.toFixed(3)} | ` +
      `impact=${components.impact.toFixed(3)}, confidence=${components.confidence.toFixed(3)}, ` +
      `timeCriticality=${components.timeCriticality.toFixed(3)}, implementationCost=${components.implementationCost.toFixed(3)}, ` +
      `decision=${decisionLevel}`
    return { insight, leverageScore, decisionLevel, components, explanation }
  })

  ranked.sort((first, second) => {
    if (second.leverageScore !== first.leverageScore) {
      return second.leverageScore - first.leverageScore
    }
    if (second.insight.confidence !== first.insight.confidence) {
      return second.insight.confidence - first.insight.confidence
    }
    return new Date(second.insight.timestamp).getTime() - new Date(first.insight.timestamp).getTime()
  })
  return ranked
}

export function mapIntegrationRoute(insight: UnifiedInsight, syncThresholdMs = 30_000): IntegrationRoute {
  const points: IntegrationPoint[] = ['reporting']
  if (insight.timeCriticality >= 0.8) {
    points.unshift('operations')
  } else {
    points.unshift('planning')
  }
  if (insight.confidence >= 0.85 && insight.impact >= 0.75) {
    points.push('automation')
  }

  const horizonToLatency: Record<TimeHorizon, number> = {
    immediate: 5_000,
    shortTerm: 30_000,
    midTerm: 300_000,
    longTerm: 600_000,
  }
  const flow: FlowType = horizonToLatency[insight.horizon] <= syncThresholdMs ? 'synchronous' : 'asynchronous'
  return { insightId: insight.id, flow, points }
}

export function adaptLegacyInsight(input: LegacyInsight): UnifiedInsight {
  return normalizeInsight({
    id: input.identifier,
    timestamp: input.createdAt,
    source: input.source,
    scope: input.scope,
    type: input.type,
    confidence: input.confidence,
    impact: input.impact,
    implementationCost: input.cost,
    timeCriticality: input.urgency,
    horizon: input.horizon,
    polarity: input.polarity ?? 'neutral',
    subject: input.subject,
  })
}

export function compareAgainstBaseline(newRanking: RankedInsight[], baselineInsightIds: string[]): BaselineComparison {
  const newTopIds = newRanking.slice(0, 3).map((item) => item.insight.id)
  const baselineTopIds = baselineInsightIds.slice(0, 3)
  const overlapCount = newTopIds.filter((id) => baselineTopIds.includes(id)).length
  const averageScore =
    newRanking.length === 0 ? 0 : newRanking.reduce((sum, item) => sum + item.leverageScore, 0) / newRanking.length

  return {
    top1Changed: (newRanking[0]?.insight.id ?? '') !== (baselineInsightIds[0] ?? ''),
    top3OverlapRatio: overlapCount / Math.max(1, baselineTopIds.length),
    averageScoreDelta: averageScore - 0.5,
  }
}

export function createMonitoringSnapshot(ranked: RankedInsight[], rejectedInsights: number): MonitoringSnapshot {
  const totalInsights = ranked.length + rejectedInsights
  const averageConfidence =
    ranked.length === 0 ? 0 : ranked.reduce((sum, entry) => sum + entry.insight.confidence, 0) / ranked.length
  const decisionDistribution: Record<DecisionLevel, number> = {
    urgentApply: 0,
    watch: 0,
    hold: 0,
    reject: 0,
  }
  for (const entry of ranked) {
    decisionDistribution[entry.decisionLevel] += 1
  }
  return {
    totalInsights,
    rejectedInsights,
    averageConfidence,
    decisionDistribution,
  }
}

export function detectAlerts(current: MonitoringSnapshot, previous?: MonitoringSnapshot): Alert[] {
  if (previous === undefined) {
    return []
  }
  const alerts: Alert[] = []
  if (current.averageConfidence + 0.15 < previous.averageConfidence) {
    alerts.push({ code: 'confidenceDrop', message: 'Average confidence dropped more than 0.15.' })
  }
  const previousUrgentRatio =
    previous.totalInsights === 0 ? 0 : previous.decisionDistribution.urgentApply / previous.totalInsights
  const currentUrgentRatio = current.totalInsights === 0 ? 0 : current.decisionDistribution.urgentApply / current.totalInsights
  if (Math.abs(currentUrgentRatio - previousUrgentRatio) > 0.3) {
    alerts.push({ code: 'rankingVolatility', message: 'Urgent decision ratio changed beyond 0.3.' })
  }
  const previousRejectRatio = previous.totalInsights === 0 ? 0 : previous.rejectedInsights / previous.totalInsights
  const currentRejectRatio = current.totalInsights === 0 ? 0 : current.rejectedInsights / current.totalInsights
  if (Math.abs(currentRejectRatio - previousRejectRatio) > 0.25) {
    alerts.push({ code: 'sourceDrift', message: 'Rejected insight ratio indicates source drift.' })
  }
  return alerts
}

export function defaultLeverageRolloutPlan(): RolloutStage[] {
  return [
    {
      phase: 'phase1',
      title: 'Strategic framework + unified signal layer + ranking engine',
      items: [
        { id: '1.1', title: 'Insight inventory definition' },
        { id: '1.2', title: 'Shared glossary standardization' },
        { id: '1.3', title: 'Single leverage formula definition' },
        { id: '1.4', title: 'Decision level standardization' },
        { id: '2.1', title: 'Signal source mapping' },
        { id: '2.2', title: 'Unified schema and required fields' },
        { id: '2.3', title: 'Quality gate implementation' },
        { id: '2.4', title: 'Cross-source normalization' },
        { id: '3.1', title: 'Component scoring modules' },
        { id: '3.2', title: 'Business-mode weight strategies' },
        { id: '3.3', title: 'Conflict resolution and tie-breaks' },
        { id: '3.4', title: 'Ranking explainability output' },
      ],
    },
    {
      phase: 'phase2',
      title: 'Integration architecture + pilot validation',
      items: [
        { id: '4.1', title: 'Integration point mapping' },
        { id: '4.2', title: 'Sync/async flow partitioning' },
        { id: '4.3', title: 'Backward compatibility adapters' },
        { id: '4.4', title: 'Security and authorization controls' },
        { id: '5.1', title: 'Pilot scenario scoping' },
        { id: '5.2', title: 'Baseline vs leverage ranking comparison' },
        { id: '5.3', title: 'Success metric tracking' },
        { id: '5.4', title: 'Fast tuning loops for thresholds/weights' },
      ],
    },
    {
      phase: 'phase3',
      title: 'Operationalization + governance + enterprise rollout',
      items: [
        { id: '6.1', title: 'Monitoring dashboard feeds' },
        { id: '6.2', title: 'Early warning alerts' },
        { id: '6.3', title: 'Policy change governance' },
        { id: '6.4', title: 'Versioned scoring rules and models' },
        { id: '7.1', title: 'Gradual rollout controls' },
        { id: '7.2', title: 'Training and interpretation playbooks' },
        { id: '7.3', title: 'SLA/SLO targets' },
        { id: '7.4', title: 'Feedback loop closure' },
      ],
    },
    {
      phase: 'phase4',
      title: 'Continuous optimization',
      items: [
        { id: '8.1', title: 'Adaptive weights from observed performance' },
        { id: '8.2', title: 'Scenario-based leverage profiles' },
        { id: '8.3', title: 'Causal contribution analysis' },
        { id: '8.4', title: 'Portfolio-level strategic optimization' },
      ],
    },
  ]
}
