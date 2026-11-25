export interface Skill {
  id: string;
  _id: string | null;
  resume: string | null;
  skill: string | null;
  level: string | null;
  position: number | null;
}

export interface Education {
  id: string;
  _id: string | null;
  resume: string | null;
  school: string | null;
  degree: string | null;
  level: string | null;
  city: string | null;
  dateFrom: Date | null;
  dateUntil: Date | null;
  description: string | null;
  position: number | null;
  isMonthUntilHidden: boolean;
  isDateUntilPresent: boolean;
  isMonthFromHidden: boolean;
}

export interface Experinence {
  id: string;
  _id: string | null;
  resume: string;
  title: null;
  employer: null;
  city: null;
  dateFrom: string;
  dateUntil: string;
  description: string | null;
  position: string | null;
  isMonthUntilHidden: boolean;
  isDateUntilPresent: boolean;
  isMonthFromHidden: boolean;
}
