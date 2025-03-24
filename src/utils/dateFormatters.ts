export const formatDate = (dateString: string): string => {
  const date = dateString === 'today' ? new Date() : new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}; 