import {
  AccomplishmentsMapping,
  ContributorToMapping,
  Counter,
  ManagerToMapping,
  MilestoneMapping,
  ProjectMapping,
  RewardsMapping,
  StatMapping,
  UserMapping,
} from "./state.types";

export let userCounter: Counter = { value: 1 };
export let profileCounter: Counter = { value: 1 };
export let projectCounter: Counter = { value: 1 };
export let milestoneCounter: Counter = { value: 1 };
export let rewardCounter: Counter = { value: 1 };
export let statisticsCounter: Counter = { value: 1 };

export const usernameToId = new Map<string, string>();
export const addressToId = new Map<string, string>();
export const users: UserMapping = {};
export const projects: ProjectMapping = {};
export const rewards: RewardsMapping = {};
export const milestones: MilestoneMapping = {};
export const contributorTo: ContributorToMapping = {};
export const managerTo: ManagerToMapping = {};
export const statistics: StatMapping = {};
export const accomplishments: AccomplishmentsMapping = {};
