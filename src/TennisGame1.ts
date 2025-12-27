import { TennisGame, Score } from './TennisGame';

export class TennisGame1 implements TennisGame {
  private m_score1: number = 0;
  private m_score2: number = 0;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
  }

  private getEqualizingScore(): string {
    if (this.m_score1 === 0) {
      return `${Score.LOVE}-${Score.ALL}`
    } else if (this.m_score1 === 1) {
      return `${Score.FIFTEEN}-${Score.ALL}`
    } else if (this.m_score1 === 2) {
      return `${Score.THIRTY}-${Score.ALL}`
    }
    return Score.DEUCE
  }

  private isEqualizingScore(): boolean {
    return this.m_score1 === this.m_score2;
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
    return this.getPlayerResult(this.m_score1) + "-" + this.getPlayerResult(this.m_score2);
  }


  private onePlayerAtAdvantage(): boolean {
    return (this.m_score1 > this.m_score2 && this.m_score2 >= 3) 
      || this.m_score2 > this.m_score1 && this.m_score1 >= 3
  }

  private getAdvantageScore(): string {
    return `Advantage ${this.m_score1 > this.m_score2 ? this.player1Name : this.player2Name}`
  }

  private playerWon(): boolean {
    return (this.m_score1 >= 4 && this.m_score2 >= 0 && (this.m_score1 - this.m_score2) >= 2)
      || (this.m_score2 >= 4 && this.m_score1 >= 0 && (this.m_score2 - this.m_score1) >= 2);
  }

  private getWinningScore(): string {
    return `Win for ${(this.m_score1 - this.m_score2) >= 2 ? this.player1Name : this.player2Name}`
  }

  wonPoint(playerName: string): void {
    if (playerName === 'player1')
      this.m_score1 += 1;
    else
      this.m_score2 += 1;
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
