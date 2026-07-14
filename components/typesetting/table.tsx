import { Table } from "@heroui/react";
import { ReactNode } from "react";

export function Tbl(props: { children: ReactNode }) {
  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-150">
          {props.children}
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

export function TblHead(props: { children: ReactNode }) {
  return <Table.Header>{props.children}</Table.Header>;
}

export function TblRow(props: { children: ReactNode; header: string }) {
  const header = props.header === "true";

  if (header) {
    return props.children;
  }

  return <Table.Row>{props.children}</Table.Row>;
}

export function TblCol(props: { children: ReactNode }) {
  return <Table.Column>{props.children}</Table.Column>;
}

export function TblBody(props: { children: ReactNode }) {
  return <Table.Body>{props.children}</Table.Body>;
}

export function TblCell(props: { children: ReactNode }) {
  return <Table.Cell>{props.children}</Table.Cell>;
}
