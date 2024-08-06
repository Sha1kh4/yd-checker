export interface SubjectDetails {
  name: string;
  credits: number;
}

export interface CreditData {
  [semester: string]: {
    [subjectCode: string]: SubjectDetails;
  };
}

export const creditData: CreditData = {
    "I": {
      "BTBS101": { name: "Engineering Mathematics-I", credits: 4 },
      "BTBS102": { name: "Engineering Physics", credits: 4 },
      "BTES103": { name: "Engineering Graphics", credits: 2 },
      "BTHM104": { name: "Communication Skills", credits: 2 },
      "BTES105": { name: "Energy and Environment Engineering", credits: 2 },
      "BTBS107L": { name: "Engineering Physics Lab", credits: 1 },
      "BTES108L": { name: "Engineering Graphics Lab", credits: 2 },
      "BTHM109L": { name: "Communication Skills Lab", credits: 1 }
    },
    "II": {
      "BTBS201": { name: "Engineering Mathematics-II", credits: 4 },
      "BTBS202": { name: "Engineering Chemistry", credits: 4 },
      "BTES203": { name: "Engineering Mechanics", credits: 3 },
      "BTES204": { name: "Computer Programming in C", credits: 2 },
      "BTES205": { name: "Workshop Practices", credits: 2 },
      "BTES207L": { name: "Computer Programming Lab", credits: 1 },
      "BTBS208L": { name: "Engineering Chemistry Lab", credits: 1 },
      "BTES209L": { name: "Engineering Mechanics Lab", credits: 1 },
      "BTES210P": { name: "Mini Project", credits: 1 }
    },
    "III": {
      "BTBS301": { name: "Engineering Mathematics-III", credits: 4 },
      "BTCOC302": { name: "Discrete Mathematics", credits: 4 },
      "BTCOC303": { name: "Data Structures", credits: 4 },
      "BTCOC304": { name: "Computer Architecture & Organization", credits: 4 },
      "BTCOC305": { name: "Object-Oriented Programming in C++", credits: 4 },
      "BTCOL306": { name: "Data Structures Lab & Object-Oriented Programming Lab", credits: 2 },
      "BTCOS307": { name: "Seminar I", credits: 2 }
    },
    "IV": {
      "BTCOC401": { name: "Design & Analysis of Algorithms", credits: 4 },
      "BTCOC402": { name: "Operating Systems", credits: 4 },
      "BTHM403": { name: "Basic Human Rights", credits: 3 },
      "BTBSC404": { name: "Probability and Statistics", credits: 3 },
      "BTES405": { name: "Digital Logic Design & Microprocessors", credits: 4 },
      "BTCOL406": { name: "Operating Systems & Python Programming Lab", credits: 3 },
      "BTCOS407": { name: "Seminar II", credits: 2 }
    },
    "V": {
      "BTCOC501": { name: "Database Systems", credits: 4 },
      "BTCOC502": { name: "Theory of Computation", credits: 4 },
      "BTCOC503": { name: "Software Engineering", credits: 4 },
      "BTCOE504": { name: "Human-Computer Interaction", credits: 3 },
      "BTHM505": { name: "Business Communication", credits: 3 },
      "BTCOL506": { name: "Database Systems & Software Engineering Lab", credits: 2 },
      "BTCOM507": { name: "Mini-Project", credits: 2 }
    },
    "VI": {
      "BTCOC601": { name: "Compiler Design", credits: 4 },
      "BTCOC602": { name: "Computer Networks", credits: 4 },
      "BTCOC603": { name: "Machine Learning", credits: 4 },
      "BTCOE604": { name: "Internet of Things", credits: 3 },
      "BTHM605": { name: "Employability and Skill Development", credits: 3 },
      "BTCOL606": { name: "Competitive Programming & Machine Learning Lab", credits: 3 },
      "BTCOM607": { name: "Mini-Project", credits: 2 }
    }
  };
  