export interface TennisGame {
  wonPoint(playerName: string): void;
  getScore(): string;
}

export enum Score {
  DEUCE = 'Deuce',
  LOVE = 'Love',
  FIFTEEN = 'Fifteen',
  THIRTY = 'Thirty',
  FORTY = 'Forty',
}