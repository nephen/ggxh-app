export const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date: string | Date) => {
  return new Date(date).toLocaleString();
};