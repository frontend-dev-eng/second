const TimerDeadline = (AssignmentDate, usageDuration, allocation_confirmation_period, Status) => {
  if (!AssignmentDate) return undefined;
  if (!allocation_confirmation_period) return usageDuration || undefined;

  const getCurrentFormattedDate = () => {
    const currDate = new Date();
    return currDate.toISOString().split('.')[0];
  };

  const parseDate = (dateString) => Date.parse(dateString);

  if (Status === 'Opened') {
    if (usageDuration) {
      const current = parseDate(getCurrentFormattedDate());
      const usageEndDate = parseDate(usageDuration.split('.')[0]);

      return current < usageEndDate ? usageDuration : undefined;
    }
    return undefined;
  }

  const addMinutesToDate = (date, minutesToAdd) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + parseInt(minutesToAdd, 10));
    return newDate.toISOString().split('.')[0];
  };

  const timeDeadline = addMinutesToDate(AssignmentDate, allocation_confirmation_period);
  const current = parseDate(getCurrentFormattedDate());
  const deadline = parseDate(timeDeadline);

  if (deadline < current) {
    return usageDuration || undefined;
  }

  return timeDeadline;
};

export default TimerDeadline;