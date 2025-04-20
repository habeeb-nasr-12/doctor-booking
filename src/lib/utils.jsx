export const removeUndefinedValues = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== "" && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

export const generateTimeSlots = () => {
  const slots = [];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const nextDays = days.map((day, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0];
  });

  for (const day of nextDays) {
    for (let hour = 9; hour < 17; hour++) {
      const ampm = hour < 12 ? "AM" : "PM";
      const formattedHour = hour <= 12 ? hour : hour - 12;

      slots.push({
        date: day,
        time: `${formattedHour}:00 ${ampm}`,
      });

      slots.push({
        date: day,
        time: `${formattedHour}:30 ${ampm}`,
      });
    }
  }

  const numberOfSlots = 4;
  const shuffled = slots.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, numberOfSlots);
  return selected.sort((a, b) => {
    const dateTimeA = new Date(`${a.date} ${a.time}`);
    const dateTimeB = new Date(`${b.date} ${b.time}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });
};
export function getDayLabel(dateString) {
  const inputDate = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const isToday = inputDate.toDateString() === today.toDateString();
  const isTomorrow = inputDate.toDateString() === tomorrow.toDateString();

  if (isToday) {
    return "Today";
  } else if (isTomorrow) {
    return "Tomorrow";
  }
  return inputDate.toLocaleDateString("en-US", { weekday: "short" });
}

export const getLocalStorageItem = (key, parser) => {
  try {
    const item = localStorage.getItem(key);
    return item ? parser(item) : null;
  } catch (error) {
    return error;
  }
};

export const updateLocalStorage = (key, value) => {
  try {
    if (value !== null && value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    return error;
  }
};
