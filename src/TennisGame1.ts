import { TennisGame, Score } from './TennisGame';

export class TennisGame1 implements TennisGame {
  private player1Score: number = 0;
  private player2Score: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  private getEqualizingScore(): string {
    if (this.player1Score === 0) {
      return `${Score.LOVE}-${Score.ALL}`
    } else if (this.player1Score === 1) {
      return `${Score.FIFTEEN}-${Score.ALL}`
    } else if (this.player1Score === 2) {
      return `${Score.THIRTY}-${Score.ALL}`
    }
    return Score.DEUCE
  }

  private isEqualizingScore(): boolean {
    return this.player1Score === this.player2Score;
  }


  private getPlayerResult(points: number): string {
    if(points === 0) {
      return Score.LOVE
    } else if(points === 1) {
      return Score.FIFTEEN
    } else if (points === 2){
      return Score.THIRTY
    } else if (points === 3) {
      return Score.FORTY
    }
    return ""
  }

  private getCurrentWinningScore(): string {
    return this.getPlayerResult(this.player1Score) + "-" + this.getPlayerResult(this.player2Score);
  }


  private onePlayerAtAdvantage(): boolean {
    return (this.player1Score > this.player2Score && this.player2Score >= 3) 
      || this.player2Score > this.player1Score && this.player1Score >= 3
  }

  private getAdvantageScore(): string {
    return `Advantage ${this.player1Score > this.player2Score ? this.player1Name : this.player2Name}`
  }

  private playerWon(): boolean {
    return (this.player1Score >= 4 && this.player2Score >= 0 && (this.player1Score - this.player2Score) >= 2)
      || (this.player2Score >= 4 && this.player1Score >= 0 && (this.player2Score - this.player1Score) >= 2);
  }

  private getWinningScore(): string {
    return `Win for ${(this.player1Score - this.player2Score) >= 2 ? this.player1Name : this.player2Name}`
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name)
      this.player1Score += 1;
    else
      this.player2Score += 1;
  }

  getScore(): string {
    let score: string = '';
    if (this.isEqualizingScore()) {
      score = this.getEqualizingScore()
    }
    else if (this.playerWon()) {
      score = this.getWinningScore();
    }
    else if (this.onePlayerAtAdvantage()) {
      score = this.getAdvantageScore()
    }
    else {
      score = this.getCurrentWinningScore()
    }
    return score;
  }
}
