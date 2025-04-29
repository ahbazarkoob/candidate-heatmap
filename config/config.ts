import axios from "axios";

const appServerURL = "https://forinterview.onrender.com";

const ApiFetch = axios.create({
  baseURL: appServerURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export default ApiFetch;