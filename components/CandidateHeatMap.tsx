"use client";

import React, { useEffect, useState } from "react";
import {
  CandidateDataInterface,
  CandidateInterface,
} from "@/types/CandidateInterface";
import MostRecommended from "./Posk/MostRecommended";
import { getCandidateData } from "@/services/candidate_services";
import CandidateList from "./Posk/CandidateList";

interface CandidateWithScores {
  candidate: CandidateDataInterface;
  scores: { [key: string]: number };
}

const CandidateHeatMap = ({
  candidates,
}: {
  candidates: CandidateInterface[];
}) => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    string[]
  >([]);
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [candidateData, setCandidateData] = useState<CandidateDataInterface>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidateWithScores, setCandidateWithScores] = useState<
    CandidateWithScores[]
  >([]);

  const fetchCandidateDetails = async (candidateId: string) => {
    try {
      setLoading(true);
      const data = await getCandidateData({ id: candidateId });
      setLoading(false);
      return data;
    } catch (err) {
      setError("Failed to fetch candidates");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchScores = async () => {
      if (selectedCandidates.length === 0) {
        setCandidateWithScores([]);
        setParameters([]);
        setSelectedParameters([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const detailedCandidates = await Promise.all(
          selectedCandidates.map((candidate) =>
            fetchCandidateDetails(candidate)
          )
        );

        // Extract parameters (skill names) from the first candidate's skillset
        const firstCandidateSkills =
          detailedCandidates[0]?.data?.data?.skillset?.flatMap((skillset) =>
            skillset.skills.map((skill) => skill.name)
          ) || [];
        setParameters(firstCandidateSkills);
        setSelectedParameters(firstCandidateSkills);

        // Map consensus scores to parameters
        const candidatesWithScores = detailedCandidates
          .filter(
            (candidate): candidate is CandidateDataInterface =>
              candidate !== undefined
          )
          .map((candidate) => {
            const scoreMap: { [key: string]: number } = {};
            candidate.data?.data?.skillset?.forEach((skillset) => {
              skillset.skills.forEach((skill) => {
                const consensusScore = skill.pos[0]?.consensus_score || 0;
                scoreMap[skill.name] = consensusScore;
              });
            });
            return { candidate, scores: scoreMap };
          });

        setCandidateWithScores(candidatesWithScores);
      } catch (err) {
        setError("Failed to fetch candidate scores");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [selectedCandidates]);

  const toggleCandidateSelection = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId)
        ? prev.filter((id) => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const toggleParameter = (param: string) => {
    setSelectedParameters((prev) =>
      prev.includes(param) ? prev.filter((p) => p !== param) : [...prev, param]
    );
  };

  const getScoreColor = (score: number) => {
    if (score == 1) return "bg-white";
    if (score == 2) return "bg-yellow-200";
    if (score == 3) return "bg-green-200";
    if (score == 4) return "bg-green-500";
    if (score == 5) return "bg-green-800";
    return "bg-gray-200";
  };

  const mostRecommended = candidates.slice(0, 3);

  return (
    <div className="flex flex-row gap-3">
     <div className="flex flex-col  gap-3 w-1/5 p-6 border border-gray-200">
     <MostRecommended
        mostRecommended={mostRecommended}
        onSelectCandidate={toggleCandidateSelection}
        selectedCandidates={selectedCandidates}
      />
      <CandidateList
        candidates={candidates}
        onSelectCandidate={toggleCandidateSelection}
        selectedCandidates={selectedCandidates}
      />
     </div>

      {/* Main Content */}
      <div className="flex flex-col w-4/5 items-start">
        {/* Tabs */}
        <div className="flex justify-between items-center mb-4 w-full">
          <div className="flex space-x-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Compare view
            </button>
            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
              Individual
            </button>
            <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded">
              Shortlisted Candidates
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-gray-600">←</button>
            <button className="text-gray-600">→</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <select
                  className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8"
                  onChange={(e) => toggleParameter(e.target.value)}
                >
                  <option value="">
                    <div>Filter</div>
                  </option>
                  {parameters.map((param) => (
                    <option key={param} value={param}>
                      {param}
                    </option>
                  ))}
                </select>
                {selectedCandidates.length > 0 ? (
                  selectedCandidates.map((cs, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 p-2 bg-gray-100 text-center"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                        {candidates[index].name.charAt(0)}
                      </div>
                    </th>
                  ))
                ) : (
                  <th className="border border-gray-300 p-2 bg-gray-100 w-full">
                    No Candidate Selected
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {selectedParameters.map((param) => (
                <tr key={param}>
                  <td className="border border-gray-300 p-2">{param}</td>
                  {candidateWithScores.map((cs) => (
                    <td
                      key={`${cs.candidate.id}-${param}`}
                      className={`border border-gray-300 p-2 text-center ${getScoreColor(
                        cs.scores[param] || 0
                      )}`}
                    >
                      {cs.scores[param] || 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateHeatMap;
