const formatter = new Intl.RelativeTimeFormat('pt-BR', {
  style: 'short',
  numeric: 'auto',
});

export function getRelativeDate(dateString: string) {
  const pastDate = new Date(dateString);
  const now = new Date();

  const diffInSec = Math.floor((now.getTime() - pastDate.getTime()) / 1000); // <- aqui foi o fix

  const threshold = {
    minute: 60,
    hour: 3600,
    day: 86_400,
  };

  const absoluteTime = Math.abs(diffInSec);

  if (absoluteTime < threshold.minute) {
    return formatter.format(-diffInSec, 'second');
  }
  if (absoluteTime < threshold.hour) {
    return formatter.format(
      -Math.floor(diffInSec / threshold.minute),
      'minute'
    );
  }
  if (absoluteTime < threshold.day) {
    return formatter.format(-Math.floor(diffInSec / threshold.hour), 'hour');
  }

  return formatter.format(-Math.floor(diffInSec / threshold.day), 'day');
}
