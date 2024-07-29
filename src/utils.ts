import { Address, stringToHex } from "viem";
import { Project } from "./state/state.types";
import { app } from ".";

export function isManager(project: Project, address: Address) {
  for (let i = 0; i < project.managers.length; i++)
    if (project.managers[i] === address) return true;
  return false;
}

export function report(message: string): "reject" {
  app.createReport({ payload: stringToHex(message) });
  return "reject";
}

export function notice(message: { message: string; data: any }): "accept" {
  app.createNotice({ payload: stringToHex(JSON.stringify(message)) });
  return "accept";
}
