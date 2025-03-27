import { useState } from 'react';
import './App.css';

function App() {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, setZombieFighters] = useState([
    {
      id: 1,
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
    },
    {
      id: 2,
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
    },
    {
      id: 3,
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
    },
    {
      id: 4,
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
    },
    {
      id: 5,
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
    },
    {
      id: 6,
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
    },
    {
      id: 7,
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
    },
    {
      id: 8,
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
    },
    {
      id: 9,
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
    },
    {
      id: 10,
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
    },
  ]);

  // Handler to add a fighter to the team
  const handleAddFighter = (fighter) => {
    // Check if there's enough money
    if (money < fighter.price) {
      console.log("Out of money");
      return;
    }

    // Add fighter to the team
    setTeam([...team, fighter]);

    // Remove fighter from available fighters
    setZombieFighters(zombieFighters.filter(availableFighter => availableFighter.id !== fighter.id));

    // Subtract the cost
    setMoney(money - fighter.price);
  };

  // Handler to remove a fighter from the team
  const handleRemoveFighter = (fighter) => {
    // Remove fighter from the team
    setTeam(team.filter(teamMember => teamMember.id !== fighter.id));

    // Add fighter back to available fighters
    setZombieFighters([...zombieFighters, fighter]);

    // Refund the cost
    setMoney(money + fighter.price);
  };

  // Calculate team stats
  const totalStrength = team.reduce((total, fighter) => total + fighter.strength, 0);
  const totalAgility = team.reduce((total, fighter) => total + fighter.agility, 0);

  return (
    <div>
      <header>
        <h1>Zombie Fighters</h1>
        <div>Your Budget: ${money}</div>
      </header>

      <main>
        <section>
          <h2>Your Team</h2>
          <div>
            <p>Total Strength: {totalStrength}</p>
            <p>Total Agility: {totalAgility}</p>
          </div>
          
          {team.length === 0 ? (
            <p>Pick some team members!</p>
          ) : (
            <ul>
              {team.map(fighter => (
                <li key={fighter.id}>
                  <img src={fighter.img} alt={fighter.name} />
                  <h3>{fighter.name}</h3>
                  <div>
                    <p>Price: ${fighter.price}</p>
                    <p>Strength: {fighter.strength}</p>
                    <p>Agility: {fighter.agility}</p>
                  </div>
                  <button onClick={() => handleRemoveFighter(fighter)}>Remove</button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2>Available Fighters</h2>
          <ul>
            {zombieFighters.map(fighter => (
              <li key={fighter.id}>
                <img src={fighter.img} alt={fighter.name} />
                <h3>{fighter.name}</h3>
                <div>
                  <p>Price: ${fighter.price}</p>
                  <p>Strength: {fighter.strength}</p>
                  <p>Agility: {fighter.agility}</p>
                </div>
                <button 
                  onClick={() => handleAddFighter(fighter)}
                  disabled={money < fighter.price}
                >
                  {money < fighter.price ? "Out of money" : "Add"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;