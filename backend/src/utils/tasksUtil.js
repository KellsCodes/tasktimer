export const transformData = (data) => {
  return {
    id: data.id,
    title: data.title,
    status: data.status,
    userId: data.userId,
    timeZone: data.timeZone,
    startDate: data.localStartDate,
    endDate: data.localEndDate,
    startHour: data.localStartHour,
    endHour: data.localEndHour,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
};
