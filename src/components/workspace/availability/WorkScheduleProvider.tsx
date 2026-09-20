'use client'
import { createContext, useContext, type ReactNode } from 'react'
import { readSchedule, type WorkSchedule } from './work-schedule'
const WorkScheduleContext = createContext<WorkSchedule | null>(null)
export function WorkScheduleProvider({ value, children }: { value: unknown; children: ReactNode }) {
	return <WorkScheduleContext.Provider value={readSchedule(value)}>{children}</WorkScheduleContext.Provider>
}
export const useWorkSchedule = () => useContext(WorkScheduleContext)
