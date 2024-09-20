import dayjs from 'dayjs';

export default function formatTime(time: string | number) {
  time = Number(time) * 1000;
  const d = dayjs(time);
  return {
    date: d.format('DD.MM.YYYY'),
    time: d.format('HH:mm'),
    d,
  };
}
