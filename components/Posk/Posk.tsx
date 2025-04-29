"use client";

import React, { useEffect, useState } from "react";
import CandidateHeader from "../CandidateHeader";
import { getCandidateList } from "@/services/candidate_services";
import { CandidateInterface } from "@/types/CandidateInterface";
import CandidateHeatMap from "../CandidateHeatMap";

const Posk = () => {
  const [candidates, setCandidates] = useState<CandidateInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidateList();
      setCandidates(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch candidates");
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-col gap-5 p-4">
      <CandidateHeader candidateLength={candidates.length} />
      <CandidateHeatMap candidates={candidates} />
    </div>
  );
};

export default Posk;
