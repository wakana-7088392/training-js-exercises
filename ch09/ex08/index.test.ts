import { AlarmClock } from "./index.ts";

describe("ch09/ex08", () => {
  test.each`
    state              | expectedState      | expectedAction
    ${"normal"}        | ${"alarmSet"}      | ${"none"}
    ${"alarmSet"}      | ${"alarmSet"}      | ${"none"}
    ${"alarmSounding"} | ${"alarmSounding"} | ${"none"}
    ${"snoozing"}      | ${"snoozing"}      | ${"none"}
  `(
    "test case $state のとき setAlarm すると $expectedState $expectedAction になる",
    ({ state, expectedAction, expectedState }) => {
      const clock = new AlarmClock(state);

      const action = clock.setAlarm();

      expect(clock.getState()).toBe(expectedState);
      expect(action).toBe(expectedAction);
    }
  );
  test.each`
    state              | expectedState | expectedAction
    ${"normal"}        | ${"normal"}   | ${"none"}
    ${"alarmSet"}      | ${"normal"}   | ${"none"}
    ${"alarmSounding"} | ${"normal"}   | ${"stopAlarm"}
    ${"snoozing"}      | ${"normal"}   | ${"none"}
  `(
    "test case $state のとき cancelAlarm すると $expectedState $expectedAction になる",
    ({ state, expectedAction, expectedState }) => {
      const clock = new AlarmClock(state);

      const action = clock.cancelAlarm();

      expect(clock.getState()).toBe(expectedState);
      expect(action).toBe(expectedAction);
    }
  );
  test.each`
    state              | expectedState      | expectedAction
    ${"normal"}        | ${"normal"}        | ${"none"}
    ${"alarmSet"}      | ${"alarmSounding"} | ${"soundAlarm"}
    ${"alarmSounding"} | ${"alarmSounding"} | ${"none"}
    ${"snoozing"}      | ${"snoozing"}      | ${"none"}
  `(
    "test case $state のとき reachedToAlarmTime すると $expectedState $expectedAction になる",
    ({ state, expectedAction, expectedState }) => {
      const clock = new AlarmClock(state);

      const action = clock.reachedToAlarmTime();

      expect(clock.getState()).toBe(expectedState);
      expect(action).toBe(expectedAction);
    }
  );
  test.each`
    state              | expectedState | expectedAction
    ${"normal"}        | ${"normal"}   | ${"none"}
    ${"alarmSet"}      | ${"alarmSet"} | ${"none"}
    ${"alarmSounding"} | ${"snoozing"} | ${"stopAlarm"}
    ${"snoozing"}      | ${"snoozing"} | ${"none"}
  `(
    "test case $state snooze $expectedState $expectedAction",
    ({ state, expectedAction, expectedState }) => {
      const clock = new AlarmClock(state);

      const action = clock.snooze();

      expect(clock.getState()).toBe(expectedState);
      expect(action).toBe(expectedAction);
    }
  );
  test.each`
    state              | expectedState      | expectedAction
    ${"normal"}        | ${"normal"}        | ${"none"}
    ${"alarmSet"}      | ${"alarmSet"}      | ${"none"}
    ${"alarmSounding"} | ${"alarmSounding"} | ${"none"}
    ${"snoozing"}      | ${"alarmSounding"} | ${"soundAlarm"}
  `(
    "test case $state のとき elapseSnoozeTime すると $expectedState $expectedAction になる",
    ({ state, expectedAction, expectedState }) => {
      const clock = new AlarmClock(state);

      const action = clock.elapseSnoozeTime();

      expect(clock.getState()).toBe(expectedState);
      expect(action).toBe(expectedAction);
    }
  );
});
