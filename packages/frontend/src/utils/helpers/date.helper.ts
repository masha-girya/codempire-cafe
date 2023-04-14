import dayjs from 'dayjs';
import { TIME_CONSTANTS as TIME } from 'constants-app';

export const getFormattedDate = (date: string) => {
  const today = dayjs().format(TIME.DATE);
  const yesterday = dayjs().subtract(1, 'day').format(TIME.DATE);

  let day = dayjs(date, TIME.DATE).format(TIME.WEEK);

  if(date === today) {
    day = 'Today';
  } else if(date === yesterday) {
    day = 'Yesterday';
  }

  return `${day}, ${date}`;
};
