import ApiFetch from "@/config/config";
import { CandidateDataInterface, CandidateInterface } from "@/types/CandidateInterface";

export const getCandidateList = async (): Promise<CandidateInterface[]> => {
  const response = await ApiFetch({
    url: `/people`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: CandidateInterface[] = await response.data;
  return data;
};

export const getCandidateData = async ({ id }: { id: string }): Promise<CandidateDataInterface> => {
  const response = await ApiFetch({
    url: `/people/${id}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: CandidateDataInterface = await response.data;
  return data;
};