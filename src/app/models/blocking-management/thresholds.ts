export interface ThresholdRange {
  id: string;
  min: number;
  max: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  decision: string;
}

export interface ThresholdConfiguration {
  low: ThresholdRange;
  medium: ThresholdRange;
  high: ThresholdRange;
}

export interface ActionOption {
  label: string;
  value: string;
}
