import { Table } from './types';
import { Team } from './entities';

export const sortTable = (table: Table) => {
  return table.sort((rowA: Team, rowB: Team) => {
    let a = rowA.points;
    let b = rowB.points;
    if (a === b) {
      a = rowA.difference;
      b = rowB.difference;
    }
    if (a === b) {
      a = rowA.wins;
      b = rowB.wins;
    }
    if (a > b) {
      return -1;
    }
    if (a < b) {
      return 1;
    }
    return 0;
  });
};
