
export interface AITipsterUpcomingFixture {
    fixture: IFootballFixture;
    league: IFootballFixtureLeague;
    teams: {
      home: IFootballFixtureTeam;
      away: IFootballFixtureTeam;
    };
    goals: IFootballGoal;
    score: {
      halftime: IFootballScore;
      fulltime: IFootballScore;
      extratime: IFootballScore;
      penalty: IFootballScore;
    };
  }
  
  interface IFootballFixture {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    assistantId: string;
    periods: {
      first: number;
      second: number | null;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: string;
      short: string;
      elapsed: number;
    };
  }
  interface IFootballFixtureLeague {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  }
   interface IFootballFixtureTeam {
    id: number;
    name: string;
    logo: string;
    winner: boolean;
  }
  
   interface IFootballGoal {
    home: number;
    away: number;
  }
  
   interface IFootballScore {
    home: number | null;
    away: number | null;
  }