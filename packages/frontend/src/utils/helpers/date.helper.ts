import dayjs from 'dayjs';

export const getFormattedDate = (date: string) => {
  const today = dayjs().format('DD/MM/YYYY');
  const yesterday = dayjs().subtract(1, 'day').format('DD/MM/YYYY');

  let day = dayjs(date, 'DD/MM/YYYY').format('dddd');

  if(date === today) {
    day = 'Today';
  } else if(date === yesterday) {
    day = 'Yesterday';
  }

  return `${day}, ${date}`;
};
