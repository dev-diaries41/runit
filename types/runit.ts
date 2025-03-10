
export interface Settings {
  weight: string;
}

export interface Metrics {
  pace: number;
  distance: number;
  calories: number;
  time: number;
}

export interface RunSession extends Metrics {
  id: string;
  name: string;
}