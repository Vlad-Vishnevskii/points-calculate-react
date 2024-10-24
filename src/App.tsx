import React, { useState } from 'react';
import './App.scss';
import { Team } from './entities';
import { TypeTeam } from './types';
import { sortTable } from './utils';

const App: React.FC = () => {
  const [teamList, setTeamList] = useState([
    new Team(1, 'Лимоны'),
    new Team(2, 'Апельсины'),
    new Team(3, 'Баклажаны'),
  ]);
  const [inputTeamValue, setInputTeamValue] = useState('');
  const [homeTeamNameValue, setHomeTeamNameValue] = useState(teamList[0].name);
  const [visitorTeamNameValue, setVisitorTeamNameValue] = useState(teamList[1].name);
  const [homeTeamGoalsValue, setHomeTeamGoalsValue] = useState(0);
  const [visitorTeamGoalsValue, setVisitorTeamGoalsValue] = useState(0);

  const addTeamHandle = () => {
    if (inputTeamValue) {
      setTeamList(prev => [...prev, new Team(prev.length + 1, inputTeamValue)]);
      setInputTeamValue('');
    }
  };

  const fillResults = () => {
    setTeamList(
      sortTable(
        teamList.map(team => {
          if (team.name === homeTeamNameValue) {
            team.setResultHome(homeTeamGoalsValue, visitorTeamGoalsValue, TypeTeam.home);
            return team;
          } else if (team.name === visitorTeamNameValue) {
            team.setResultVisitor(homeTeamGoalsValue, visitorTeamGoalsValue, TypeTeam.visitor);
            return team;
          } else {
            return team;
          }
        }),
      ),
    );
  };

  return (
    <div className="App">
      <header className="header">
        <button type="button" className="tournament-form__button-clear">
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path
              d="M20.8487 1.37761e-06L0 20.8487L2.15131 23L23 2.15131L20.8487 1.37761e-06Z"
              fill="rgb(230, 59, 68)"
            />
            <path
              d="M2.15131 0L0 2.15131L20.8487 23L23 20.8487L2.15131 0Z"
              fill="rgb(230, 59, 68)"
            />
          </svg>
        </button>
        <div className="header__wrapper container">
          <div className="header__logo-wrapper">
            {/* <img src="image/logo.jpg" alt="ФК Зелёная околица" width="90"> */}
          </div>
        </div>
        <input
          type="text"
          placeholder="введите название команды"
          value={inputTeamValue}
          onChange={e => setInputTeamValue(e.target.value)}
        />
        <button onClick={addTeamHandle} type="button">
          Добавить команду
        </button>
      </header>
      <main>
        <section className="tournament container">
          <h2 className="tournament__title">Ввод результатов матча</h2>
          <form className="tournament__form" action="https://echo.htmlacademy.ru">
            <div className="tournament__home-team-score">
              <div>
                <select
                  className="tournament-form__team-name_home tournament-form__team-name"
                  onChange={e => setHomeTeamNameValue(e.target.value)}
                  name="name_home"
                  value={homeTeamNameValue}
                >
                  {teamList.map(item => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
                <select
                  className="tournament-form__input tournament-form__input_home-score"
                  name="gol_home"
                  value={homeTeamGoalsValue}
                  onChange={e => setHomeTeamGoalsValue(+e.target.value)}
                >
                  <option selected>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </select>
              </div>
            </div>
            <div className="tournament__separator">Против</div>
            <div>
              <select
                className="tournament-form__team-name_home tournament-form__team-name"
                onChange={e => setVisitorTeamNameValue(e.target.value)}
                value={visitorTeamNameValue}
                name="name_visitor"
              >
                {teamList.map(item => (
                  <option key={item.id}>{item.name}</option>
                ))}
              </select>
              <select
                className="tournament-form__input tournament-form__input_visitor-score"
                name="gol_visitor"
                value={visitorTeamGoalsValue}
                onChange={e => setVisitorTeamGoalsValue(+e.target.value)}
              >
                <option selected>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </div>
            <button
              type="button"
              disabled={homeTeamNameValue === visitorTeamNameValue}
              className="button tournament-form__button-add-result"
              onClick={fillResults}
            >
              Добавить результат
            </button>
          </form>
        </section>

        <section className="tournament-wrapper">
          <h2 className="tournament-wrapper__title">Итоговая таблица дня</h2>
          <table className="tournament-table">
            <tr className="tournament-table__title-string">
              <th className="tournament-table__title-cell">М</th>
              <th className="tournament-table__title-cell">Команда</th>
              <th className="tournament-table__title-cell">О</th>
              <th className="tournament-table__title-cell">И</th>
              <th className="tournament-table__title-cell">Пб</th>
              <th className="tournament-table__title-cell">Пр</th>
              <th className="tournament-table__title-cell">Н</th>
              <th className="tournament-table__title-cell tournament-table__cell_scored">ГЗ</th>
              <th className="tournament-table__title-cell tournament-table__cell_conceded">ГП</th>
              <th className="tournament-table__title-cell tournament-table__cell_difference">РГ</th>
            </tr>
            {teamList.map((item, index) => (
              <tr className="tournament-table__string" id="first" data-team={item}>
                <td className="tournament-table__cell tournament-table__cell_place">{index + 1}</td>
                <td className="tournament-table__cell tournament-table__cell_name">{item.name}</td>
                <td className="tournament-table__cell tournament-table__cell_points">
                  {item.points}
                </td>
                <td className="tournament-table__cell tournament-table__cell_matches">
                  {item.matches}
                </td>
                <td className="tournament-table__cell tournament-table__cell_wins">{item.wins}</td>
                <td className="tournament-table__cell tournament-table__cell_loss">{item.loss}</td>
                <td className="tournament-table__cell tournament-table__cell_draws">
                  {item.draws}
                </td>
                <td className="tournament-table__cell tournament-table__cell_scored">
                  {item.scored}
                </td>
                <td className="tournament-table__cell tournament-table__cell_conceded">
                  {item.conceded}
                </td>
                <td className="tournament-table__cell tournament-table__cell_difference">
                  {item.difference}
                </td>
              </tr>
            ))}
          </table>
        </section>
      </main>
      <footer>
        <section className="games">
          <div className="game-result container">
            <div className="game-result__home">Хозяева</div>
            <div className="game-result__score">
              <span className="game-result__home-goal">0</span> -
              <span className="game-result__visitors-goal">0</span>
            </div>
            <div className="game-result__visitors">Гости</div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default App;
