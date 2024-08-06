"use client"

import React, { useState, ChangeEvent } from 'react';
import { creditData } from '../data/creditData'; // Adjust the path if needed

// Define types based on the structure of creditData
interface SubjectDetails {
  name: string;
  credits: number;
}

interface CreditData {
  [semester: string]: {
    [subjectCode: string]: SubjectDetails;
  };
}

// Assuming creditData conforms to CreditData type
const SemesterSelector: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<Record<string, boolean>>({});

  // Create a flat map of all subjects with their codes and credits
  const allSubjects = Object.values(creditData).flatMap((sem) =>
    Object.entries(sem)
  ).reduce<Record<string, SubjectDetails>>((acc, [code, details]) => {
    acc[code] = details;
    return acc;
  }, {});

  const handleSemesterChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  const handleCheckboxChange = (subjectCode: string) => {
    setSelectedSubjects((prevSubjects) => ({
      ...prevSubjects,
      [subjectCode]: !prevSubjects[subjectCode]
    }));
  };

  const handleClearSelections = () => {
    setSelectedSubjects({});
  };

  const semesters = Object.keys(creditData);

  // Calculate total credits of selected subjects across all semesters
  const totalCredits = Object.entries(selectedSubjects).reduce((acc, [subjectCode, isSelected]) => {
    if (isSelected) {
      const subject = allSubjects[subjectCode];
      return acc + (subject ? subject.credits : 0);
    }
    return acc;
  }, 0);

  // Determine the message based on total credits
  const message = totalCredits > 18 ? 'Gaya' : 'bach gya';

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border p-4">
      <div className="mb-4">
        <label htmlFor="semester" className="block text-blue-gray-900 font-sans text-base font-medium mb-2">
          Select Semester:
        </label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={handleSemesterChange}
          className="w-full p-2 border border-blue-gray-300 rounded-md"
        >
          <option value="">-- Select Semester --</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>
              Semester {sem}
            </option>
          ))}
        </select>
      </div>
      {selectedSemester && (
        <div>
          {Object.entries(creditData[selectedSemester as keyof CreditData] || {}).map(([code, { name }]) => (
            <div key={code} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={code}
                checked={selectedSubjects[code] || false}
                onChange={() => handleCheckboxChange(code)}
                className="mr-2"
              />
              <label htmlFor={code} className="font-sans text-base antialiased font-medium text-blue-gray-900">
                {name}
              </label>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center gap-4">
        <p className="font-sans text-base antialiased font-medium text-blue-gray-900">
          Total Credits of Selected Subjects: {totalCredits}
        </p>
        <button
          onClick={handleClearSelections}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Clear Selections
        </button>
      </div>
      <div className="mt-4">
        <p className="font-sans text-lg antialiased font-bold text-blue-gray-900">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SemesterSelector;
