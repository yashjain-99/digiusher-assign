import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const DEV_BASE_API_URL = "http://127.0.0.1:8000/products/";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getApiUrl = (filter: Record<Filter, string>) => {
  const queryParam = new URLSearchParams();
  if (filter.maxCPU) {
    queryParam.append("max_cpu", filter.maxCPU);
  }
  if (filter.maxRAM) {
    queryParam.append("max_ram", filter.maxRAM);
  }
  if (filter.minCPU) {
    queryParam.append("min_cpu", filter.minCPU);
  }
  if (filter.minRAM) {
    queryParam.append("min_ram", filter.minRAM);
  }
  return `${DEV_BASE_API_URL}?${queryParam.toString()}`;
};
