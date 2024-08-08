"use client";

import React, { useState,ChangeEvent, useEffect, useRef } from 'react';
import { creditData } from '../data/creditData'; 
interface SubjectDetails {
  name: string;
  credits: number;
}

interface CreditData {
  [semester: string]: {
    [subjectCode: string]: SubjectDetails;
  };
}

const SemesterSelector: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState<string>('');
  const [selectedSubjects, setSelectedSubjects] = useState<Record<string, boolean>>({});
  const [imageSrc, setImageSrc] = useState<string>('images/Win.png');
  const prevImageSrcRef = useRef<string>('images/Win.png');
  const [audioSrc, setAudioSrc] = useState<string>('audio/win.mp3'); // Default audio
  const [submitted, setSubmitted] = useState<boolean>(false); // Track submission status

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

  const handleSubmit = () => {
    setSubmitted(true); // Mark as submitted
  };

  const semesters = Object.keys(creditData);

  const totalCredits = Object.entries(selectedSubjects).reduce((acc, [subjectCode, isSelected]) => {
    if (isSelected) {
      const subject = allSubjects[subjectCode];
      return acc + (subject ? subject.credits : 0);
    }
    return acc;
  }, 0);

  const newImageSrc = totalCredits > 18 ? 'images/Loss.png' : 'images/Win.png';
  const newAudioSrc = totalCredits > 18 ? 'audio/loss.mp3' : 'audio/win.mp3';

  useEffect(() => {
    if (prevImageSrcRef.current !== newImageSrc || audioSrc !== newAudioSrc) {
      prevImageSrcRef.current = newImageSrc;
      setAudioSrc(newAudioSrc);
    }
  }, [newImageSrc, newAudioSrc]);

  useEffect(() => {
    if (submitted) {
      const audio = new Audio(audioSrc);
      audio.play();
    }
  }, [audioSrc, submitted]);

  const selectedSubjectsList = Object.entries(selectedSubjects)
    .filter(([_, isSelected]) => isSelected)
    .map(([subjectCode]) => allSubjects[subjectCode]);

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md rounded-xl bg-clip-border p-4">
      <div className="mb-4">
        <p className="font-sans text font-bold text-blue-gray-900">Select all backlog Subjects</p>
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
        <div className="flex flex-col md:flex-row md:items-start">
          <div className="md:w-1/2">
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
                  {name} ({allSubjects[code].credits} Credits)
                </label>
              </div>
            ))}
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
              <button
                onClick={handleSubmit}
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </div>
          {submitted && (
            <div className="md:w-1/2 mt-4 md:mt-0 md:ml-4 flex justify-center items-center">
              <img
                src={newImageSrc}
                alt={totalCredits > 18 ? 'High Credits' : 'Low Credits'}
                
                className="w-80 h-80 mx-auto" // Maintain aspect ratio
              />
            </div>
          )}
        </div>
      )}
      {selectedSubjectsList.length > 0 && (
        <div className="mt-4">
          <p className="font-sans text-base antialiased font-medium text-blue-gray-900">Selected Subjects:</p>
          <ul>
            {selectedSubjectsList.map((subject, index) => (
              <li key={index} className="font-sans text-base antialiased text-blue-gray-900">
                {subject.name} ({subject.credits} Credits)
              </li>
            ))}
          </ul>
        </div>
      )}
      <footer className=" text-center lg:text-left mt-4">
        <div className=" p-4 text-center text-surface">
          <p>By and For MIT Batu Final year Students</p>
          © {new Date().getFullYear()} Copyright:
          <a href="https://sha1kh4.github.io/portfolio/">SKAD</a>
        </div>
      </footer>
    </div>
  );
};

export default SemesterSelector;
