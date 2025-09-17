/**\
 * Day difference between dates
 * @param startDate - The start date
 * @param endDate - The end date
 * @returns The number of days between the two dates
 */
export function getDayDifference(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
