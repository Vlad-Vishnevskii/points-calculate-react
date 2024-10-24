import { Team } from './entities';

export enum TypeTeam {
  home = 'home',
  visitor = 'visitor',
}

export enum CreateTeamType {
  default = 'default',
  computed = 'computed',
}

export type Table = Team[];
