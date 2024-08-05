import { Address } from "viem";

export type Counter = {
  value: number;
};

export type User = {
  id: string;
  username: string;
  address: Address;
};

export type Project = {
  id: string;
  url: string;
  contributors: Address[];
  managers: Address[];
};

export type MilestoneDetails = {
  description: string;
  achievement: {
    metric: "contribCount" | "impact";
    value: number;
  };
};

export type Milestone = {
  id: string;
  projectId: string;
  rewardId: string;
  details: MilestoneDetails;
};

export type RewardType = "NFTs" | "Token";

export type Reward = {
  id: string;
  address: Address;
  type: RewardType;
  amount: bigint;
  description: string;
};

export type Stat = {
  id: string;
  userId: string;
  projectId: string;
  contributionNo: number;
  impact: number;
};

export type UserMapping = {
  [id: string]: User;
};

export type ProjectMapping = {
  [projectId: string]: Project;
};

export type RewardsMapping = {
  [projectId: string]: Reward[];
};

export type MilestoneMapping = {
  [projectId: string]: Milestone[];
};

export type ContributorToMapping = {
  [address: Address]: Project[];
};

export type ManagerToMapping = {
  [address: Address]: Project[];
};

export type AccomplishmentsMapping = {
  [address: Address]: { milestone: Milestone; redeemed: boolean }[];
};

export type StatMapping = {
  [address: Address]: {
    [projectId: string]: Stat;
  };
};
