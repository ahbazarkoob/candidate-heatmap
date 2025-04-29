import React from "react";

const CandidateHeader = ({ candidateLength }: { candidateLength: number }) => {
  return (
    <div className="flex justify-between items-center ">
      <h1 className="text-2xl font-bold">Posk_UXDesigner_sr001</h1>
      <div>{candidateLength} {""} Candidates</div>
    </div>
  );
};

export default CandidateHeader;
