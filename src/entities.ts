import { TypeTeam, History } from './types';

export class Team {
  points: number = 0;
  matches: number = 0;
  wins: number = 0;
  loss: number = 0;
  draws: number = 0;
  scored: number = 0;
  conceded: number = 0;
  difference: number = 0;

  constructor(readonly id: number, readonly name: string) {}

  setResult(history: History, team: string) {
    history.forEach(item => {
      if (item.homeTeam === team) {
        this.setResultHome(item.homeScored, item.visitorScored, TypeTeam.home);
      }

      if (item.visitorTeam === team) {
        this.setResultVisitor(item.homeScored, item.visitorScored, TypeTeam.visitor);
      }
    });
  }

  setResultHome(homeTeamGoalsValue: number, visitorTeamGoalsValue: number, type: TypeTeam) {
    this.points = this.points + this.getPoints(homeTeamGoalsValue, visitorTeamGoalsValue, type);
    this.matches = this.matches + 1;
    this.wins = homeTeamGoalsValue > visitorTeamGoalsValue ? this.wins + 1 : this.wins;
    this.loss = homeTeamGoalsValue < visitorTeamGoalsValue ? this.loss + 1 : this.loss;
    this.draws = homeTeamGoalsValue === visitorTeamGoalsValue ? this.draws + 1 : this.draws;
    this.scored = this.scored + homeTeamGoalsValue;
    this.conceded = this.conceded + visitorTeamGoalsValue;
    this.difference = this.difference + (homeTeamGoalsValue - visitorTeamGoalsValue);
  }

  setResultVisitor(homeTeamGoalsValue: number, visitorTeamGoalsValue: number, type: TypeTeam) {
    this.points = this.points + this.getPoints(homeTeamGoalsValue, visitorTeamGoalsValue, type);
    this.matches = this.matches + 1;
    this.wins = homeTeamGoalsValue < visitorTeamGoalsValue ? this.wins + 1 : this.wins;
    this.loss = homeTeamGoalsValue > visitorTeamGoalsValue ? this.loss + 1 : this.loss;
    this.draws = homeTeamGoalsValue === visitorTeamGoalsValue ? this.draws + 1 : this.draws;
    this.scored = this.scored + visitorTeamGoalsValue;
    this.conceded = this.conceded + homeTeamGoalsValue;
    this.difference = this.difference + (visitorTeamGoalsValue - homeTeamGoalsValue);
  }

  private getPoints(homeGoals: number, visitorGoals: number, type: TypeTeam) {
    if (type === TypeTeam.home) {
      if (homeGoals > visitorGoals) {
        return 3;
      } else if (homeGoals < visitorGoals) {
        return 0;
      } else {
        return 1;
      }
    }

    if (type === TypeTeam.visitor) {
      if (homeGoals > visitorGoals) {
        return 0;
      } else if (homeGoals < visitorGoals) {
        return 3;
      } else {
        return 1;
      }
    }

    return 0;
  }
}

export class HistoryItem {
  constructor(
    readonly homeTeam: string,
    readonly visitorTeam: string,
    readonly homeScored: number,
    readonly visitorScored: number,
  ) {}
}
