import { makeAutoObservable } from 'mobx';
import React, {
  useContext,
  createContext,
  ReactNode,
  ReactElement,
} from 'react';

import { padZero } from '../utils/utils';

/*
Mobx store used track and update the state of timers.
*/
export default class TimerStore {
  timers: Timer[] = [];
  timerId = 0;

  /* Populate timer array following this logic:
  - 5 sec warm up round.
  - Traning round followed by a break round.
  */
  createTimers(rounds = 1, roundDuration = 60, breakDuration = 15): void {
    this.timers[0] = new Timer(5, TimerType.ready);
    for (let i = 1; i <= rounds; i++) {
      this.timers.push(new Timer(roundDuration, TimerType.train));
      // add a break after every training round except for the last round.
      if (i !== rounds) {
        this.timers.push(new Timer(breakDuration, TimerType.break));
      }
    }
  }

  // Reset timers array.
  resetTimers(): void {
    this.timers = [];
    this.timerId = 0;
    console.log('Timers reset');
  }

  // Return current timer
  get currentTimer(): Timer {
    return this.timers[this.currentId];
  }

  // Get total number of rounds in timers array.
  get totalRounds(): number {
    return this.timers.length;
  }

  // Get number of rounds left.
  get roundsLeft(): number {
    return this.timers.length - this.timerId - 1;
  }

  // Return current state of the timer.
  currentCount(): number {
    if (this.timerId < this.timers.length) {
      return this.timers[this.timerId].count;
    } else {
      return 0;
    }
  }

  // Get the timer id.
  get currentId(): number {
    return this.timerId;
  }

  hasNext(): boolean {
    if (this.timerId + 1 < this.timers.length) {
      return true;
    }
    return false;
  }

  // Rotate to the next timer.
  next(): void {
    if (this.timerId >= this.timers.length) {
      throw new Error('No new timer');
    } else {
      this.timerId += 1;
    }
  }

  constructor() {
    // Automatically add the proper Mobx function annotations.
    makeAutoObservable(this);
  }
}

export enum TimerType {
  ready = '🙌',
  train = '💪',
  break = '😮‍💨',
}

/*
Timer class. Define a count state and countdown logic.
*/
export class Timer {
  timerType = TimerType.train;
  isRunning = true;
  currentCount: number;
  initialCount: number;

  // unique id for each timer.
  id;
  intervalId = 0;
  static lastId = 0;

  // Timer countdown time update logic.
  start(): void {
    console.log('timer start', this.id);
    this.isRunning = true;
    this.intervalId = window.setInterval(() => this.update(), 1000);
  }

  // Update current count.
  update(): void {
    this.currentCount -= 1;
    if (this.currentCount <= 0) {
      this.pause();
    }
    console.log('current count: ', this.currentCount);
  }

  // Pause timer.
  pause(): void {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  // Reset timer.
  reset(): void {
    this.isRunning = false;
    this.currentCount = this.initialCount;
    this.pause();
  }

  // Get padded time display in format 00:00.
  get display(): string {
    const minutes = Math.floor(this.currentCount / 60);
    const seconds = this.currentCount % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }

  // Get current count.
  get count(): number {
    return this.currentCount;
  }

  constructor(startingcount: number, timerType: TimerType) {
    this.initialCount = startingcount;
    this.currentCount = startingcount;
    this.timerType = timerType;
    this.id = ++Timer.lastId;
    makeAutoObservable(this);
  }
}

// Store context
// Requires default value
const StoreContext = createContext<TimerStore>(new TimerStore());

export const TimerStoreProvider = ({
  children,
  store,
}: {
  children: ReactNode;
  store: TimerStore;
}): ReactElement => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// Store hook
export const useTimerStore = (): TimerStore => useContext(StoreContext);
