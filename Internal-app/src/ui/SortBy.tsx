import { ChangeEvent, ReactElement } from "react";
import Select from "./Select";
import { useSearchParams } from "react-router-dom";

export interface SortByOptions {
  value: string;
  label: string;
}

interface SortByProps {
  options: SortByOptions[];
}

export default function SortBy({ options }: SortByProps): ReactElement {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  };

  return <Select options={options} type="white" value={sortBy} onChange={handleChange} />;
}
