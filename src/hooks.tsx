import { useState, useEffect } from 'react';
import { HistoryItem, Team } from './entities';
import { sortTable } from './utils';

export const useTeamTable = () => {
  const [teamList, setTeamList] = useState([
    new Team(1, 'Лимоны'),
    new Team(2, 'Апельсины'),
    new Team(3, 'Баклажаны'),
  ]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  console.log(history);

  useEffect(() => {
    if (history.length > 0) {
      setTeamList(
        sortTable(
          teamList.map((team, index) => {
            const newTeam = new Team(index + 1, team.name);
            newTeam.setResult(history, team.name);
            return newTeam;
          }),
        ),
      );
    }
  }, [history]);

  return {
    teamList,
    setTeamList,
    history,
    setHistory,
  };
};
