import { createContext, useContext } from "react";
import styled from "styled-components";

export const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

interface CommonRowProps {
  columns: string;
}

export const CommonRow = styled.div<CommonRowProps>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

export const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

export const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

export const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

export const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. 
     Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

export const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TableContextProps {
  columns: string;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);
interface TableProps {
  columns: string;
  children: React.ReactNode;
}

function useTableContext() {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
}

function Table({ columns, children }: TableProps): React.ReactElement {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}
interface HeaderProps {
  children: React.ReactNode;
}

function Header({ children }: HeaderProps): React.ReactElement {
  const { columns } = useTableContext();
  return (
    <StyledHeader role="row" columns={columns} as={"header"}>
      {children}
    </StyledHeader>
  );
}
interface RowProps {
  children: React.ReactNode;
}

function Row({ children }: RowProps): React.ReactElement {
  const { columns } = useTableContext();
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}
interface BodyProps<T> {
  data: T[] | undefined;
  render: (item: T, index: number) => React.ReactElement;
}

function Body<T>({ data, render }: BodyProps<T>): React.ReactElement {
  if (!data || !data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data?.map(render)}</StyledBody>;
}
Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
