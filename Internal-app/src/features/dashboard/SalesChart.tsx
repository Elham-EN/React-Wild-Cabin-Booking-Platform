import { ReactElement } from "react";
import styled from "styled-components";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Headers/Heading";
import { useDarkMode } from "../../context/useDarkMode";
import { BookingsAfterDate } from "../../types/booking";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

interface SalesChartProps {
  bookings: BookingsAfterDate[] | undefined;
  numDays: number;
}

function SalesChart({ bookings, numDays }: SalesChartProps): ReactElement {
  const { isDarkMode } = useDarkMode();

  /**
   * Creates an array of dates from a specific number of days ago until today
   * new Date() - Creates today's date
   * subDays(new Date(), numDays - 1) - Goes back in time by taking today's date
   * and subtracting (numDays - 1) days from it
   * For example, if numDays is 7, this creates a date that's 6 days ago
   * Example: If numDays is 7 and today is May 1, 2025, allDates will contain date
   * objects for:
   * April 25, April 26, April 27, April 28, April 29, April 30, and May 1, 2025
   */
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      // Calculates the total sales amount for each day in our date range
      // Example: If on May 1st we had three bookings with prices $50, $75,
      // and $100, the totalSales for May 1st would be $225.
      totalSales: bookings
        // Filter: Only keeps bookings that match the current day
        ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
        // Sum up all the matching bookings' prices: Total Sales Amount
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>
      <ResponsiveContainer width={"100%"} height={240}>
        <AreaChart data={data}>
          <XAxis
            dataKey={"label"}
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text }}
          />
          <YAxis
            unit={"$"}
            axisLine={false}
            tickLine={false}
            tick={{ fill: colors.text }}
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey={"totalSales"}
            type={"monotone"}
            fill={colors.totalSales.fill}
            stroke={colors.totalSales.stroke}
            strokeWidth={3}
            name="Total Sales"
            unit="$"
          />
          <Area
            dataKey={"extrasSales"}
            type={"monotone"}
            fill={colors.extrasSales.fill}
            stroke={colors.extrasSales.stroke}
            strokeWidth={3}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
