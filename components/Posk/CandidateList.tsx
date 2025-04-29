import { CandidateInterface } from "@/types/CandidateInterface";
import React from "react";

const CandidateList = ({
  candidates,
  onSelectCandidate,
  selectedCandidates,
}: {
  candidates: CandidateInterface[];
  onSelectCandidate: (candidateId: string) => void;
  selectedCandidates: string[];
}) => {
  return (
    <div className="flex flex-col h-[40%] overflow-scroll">
      {candidates.map((candidate) => (
        <div
          key={candidate.id}
          className="flex items-center border border-gray-200 p-3 justify-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
            <span className="text-purple-600 font-semibold">
              {candidate.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium">{candidate.name}</p>
            <p className="text-xs text-gray-500">Abhishek Trivedi</p>
          </div>
          <input
            type="checkbox"
            checked={!!selectedCandidates.includes(candidate.id)}
            onChange={() => onSelectCandidate(candidate.id)}
            className="mr-3"
          />
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
