declare type Filter =
  | "currency"
  | "region"
  | "cloudProvider"
  | "minCPU"
  | "maxCPU"
  | "minRAM"
  | "maxRAM";

declare type Instance = {
  id: string;
  unit: string;
  price_per_unit: number;
  instance_type: string;
  location: string;
  vcpu?: number;
  memory?: number;
};
