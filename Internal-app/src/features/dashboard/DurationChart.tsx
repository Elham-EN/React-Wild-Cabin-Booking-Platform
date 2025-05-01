import styled from "styled-components";
import { Booking } from "../../types/booking";
import { ReactElement } from "react";
import Heading from "../../ui/Headers/Heading";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../context/useDarkMode";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

interface StartData {
  duration: string;
  value: number;
  color: string;
}

/**
 * Analyzes booking data to create a summary of stay durations
 * @returns Processed data showing counts for each duration category that has bookings
 * @argument This kind of information is perfect for creating charts that show your
 * booking patterns.
 */
function prepareData(startData: StartData[], stays: Booking[]): StartData[] {
  /**
   * @description This function takes an array of objects and a field value.
   * It looks through each object and increases the value property by 1 for
   * any object whose duration property matches the specified field.
   * @param arr An array of objects
   * @param field The value to match against each object's duration property.
   * @returns A new array with the same objects as the input, but with the
   * value property incremented by 1 for objects that match the condition
   */
  const incArrayValue = (arr: StartData[], field: string) => {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  };

  /**
   * Categorizes bookings based on their duration (number of nights) and counts them
   * @param startData - Initial array of duration categories with zero counts
   * @param stays - Array of booking objects to analyze
   * @returns Filtered array showing only categories that have at least one booking
   * @description a collection of bookings and organizes them by how long each stay lasted
   * @example For example, if a booking was for 5 nights, it adds +1 to the
   * "4-5 nights" category
   */
  const data = stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

interface DurationChartProps {
  confirmedStays: Booking[] | undefined;
}

function DurationChart({ confirmedStays }: DurationChartProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays!);
  return (
    <ChartBox>
      <Heading as="h2">Stay duration summary</Heading>
      <ResponsiveContainer width={"100%"} height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cy={"50%"}
            cx={"40%"}
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell fill={entry.color} stroke={entry.color} key={entry.duration} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconType="circle"
            iconSize={15}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
