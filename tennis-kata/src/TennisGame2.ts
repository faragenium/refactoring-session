import { TennisGame, Score } from './TennisGame';

export class TennisGame2 implements TennisGame {
  P1point: number = 0;
  P2point: number = 0;

  P1res: string = '';
  P2res: string = '';

  private player1Name: string = 'player1';
  private player2Name: string = 'player2';

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  private isEqualizingScore(): boolean {
    return this.P1point === this.P2point && this.P1point < 4;
  }

  private isDeuceScore(): boolean {
    return this.P1point === this.P2point && this.P1point >= 3;
  }

  private onePlayerScoresAndOtherDoesnot(): boolean {
    return this.P1point != this.P2point
  }

  private onePlayerAtAdvantage(): boolean {
    return (this.P1point > this.P2point && this.P2point >= 3) 
      || this.P2point > this.P1point && this.P1point >= 3
  }

  private getAdvantageScore(): string {
    return `Advantage ${this.P1point > this.P2point ? this.player1Name : this.player2Name}`
  }

  private getEqualizingScore(score: number): string {
    if (score === 0) {
      return Score.LOVE
    } else if (score === 1) {
      return Score.FIFTEEN
    } else if (score === 2) {
      return Score.THIRTY
    }
    return ""
  }

  private getPlayerResult(points: number): string {
    if(points === 1) {
      return Score.FIFTEEN
    } else if (points === 2){
      return Score.THIRTY
    } else if (points === 3) {
      return Score.FORTY
    }
    return Score.LOVE;
  }

  private getCurrentWinningScore(): string {
    this.P1res = this.getPlayerResult(this.P1point);
    this.P2res = this.getPlayerResult(this.P2point);
    return this.P1res + "-" + this.P2res;
  }

  private playerWon(): boolean {
    return (this.P1point >= 4 && this.P2point >= 0 && (this.P1point - this.P2point) >= 2)
      || (this.P2point >= 4 && this.P1point >= 0 && (this.P2point - this.P1point) >= 2);
  }

  private getWinningScore(): string {
    return `Win for ${(this.P1point - this.P2point) >= 2 ? this.player1Name : this.player2Name}`
  }

  getScore(): string {
    let score: string = '';
    if (this.isEqualizingScore()) {
      score = this.getEqualizingScore(this.P1point) + "-All";
    }
    if (this.isDeuceScore()){
      score = Score.DEUCE;
    }

    if (this.onePlayerScoresAndOtherDoesnot()) {
      score = this.getCurrentWinningScore()
    }

    if (this.onePlayerAtAdvantage()) {
      score = this.getAdvantageScore();
    }

    if (this.playerWon()) {
      score = this.getWinningScore();
    }
    return score;
  }

  SetP1Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P1Score();
    }
  }

  SetP2Score(score: number): void {
    for (let i = 0; i < score; i++) {
      this.P2Score();
    }
  }

  P1Score(): void {
    this.P1point++;
  }

  P2Score(): void {
    this.P2point++;
  }

  wonPoint(player: string): void {
    if (player === 'player1')
      this.P1Score();
    else
      this.P2Score();
  }
}
