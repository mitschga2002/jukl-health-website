import { queryOptions } from "@tanstack/react-query";
import { getAcademyCatalog } from "@/lib/academy.functions";

export const academyCatalogQuery = () =>
  queryOptions({
    queryKey: ["academy-catalog"],
    queryFn: () => getAcademyCatalog(),
    staleTime: 5 * 60_000,
  });

/** "2 Std. 10 Min." from a minute count, the way the app phrases it. */
export function formatMinutes(total: number) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours === 0) return `${minutes} Min.`;
  if (minutes === 0) return `${hours} Std.`;
  return `${hours} Std. ${minutes} Min.`;
}

export function formatEuro(cents: number) {
  return new Intl.NumberFormat("de-AT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
