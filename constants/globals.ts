import { Settings } from "@/types";

export const Time = {
  sec: 1000,
  min: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000
} as const;



export const DefaultSettings: Settings = {
  weight: "",
}


export const reauthAction = ['changePasscode', 'disablePasscode', 'lockNote', 'unlockNote', 'viewLockedNote'] as const;