/**
 * Experimental APIs for the Strands Agents TypeScript SDK.
 *
 * Everything exported here is experimental and subject to change in future
 * revisions without notice.
 */

export { Checkpoint, CHECKPOINT_SCHEMA_VERSION } from './checkpoint.js'
export type { CheckpointPosition, CheckpointData, CheckpointResumeContent } from './checkpoint.js'
export { CheckpointError } from '../errors.js'

// Context management (experimental)
export { ContextManager } from '../context-manager/context-manager.js'
export type { ContextManagerConfig, ContextStrategy, ContextState, StashConfig } from '../context-manager/types.js'
export { Offload } from '../context-manager/strategies/offload/index.js'
export type { OffloadTarget, OffloadConditions } from '../context-manager/strategies/offload/base.js'
export type { TruncateConfig } from '../context-manager/methods/truncate.js'
export type { SummarizeConfig } from '../context-manager/methods/summarize.js'

// Insight prioritization (experimental)
export {
  DEFAULT_STRATEGIC_GLOSSARY,
  adaptLegacyInsight,
  applyQualityGates,
  compareAgainstBaseline,
  computeComponentScores,
  computeLeverageScore,
  createMonitoringSnapshot,
  decideLevel,
  defaultLeverageRolloutPlan,
  defineSignalSourceMap,
  defineStrategicFramework,
  defineUnifiedSchemaSpec,
  detectAlerts,
  mapIntegrationRoute,
  normalizeInsight,
  normalizeScore,
  rankInsights,
  resolveWeights,
} from './insight-prioritization.js'
export type {
  Alert,
  BaselineComparison,
  ComponentScores,
  DecisionLevel,
  FlowType,
  InsightPolarity,
  InsightScope,
  InsightSource,
  InsightType,
  IntegrationPoint,
  IntegrationRoute,
  LegacyInsight,
  LeverageMode,
  LeverageWeights,
  MonitoringSnapshot,
  QualityGateResult,
  QualityIssue,
  QualityIssueCode,
  RankedInsight,
  RankingConfig,
  RolloutStage,
  RolloutSubStage,
  SignalSourceMap,
  StrategicFramework,
  StrategicGlossary,
  TimeHorizon,
  UnifiedInsight,
  UnifiedSchemaSpec,
} from './insight-prioritization.js'
