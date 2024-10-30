import type { Theme, SxProps } from '@mui/material/styles';

import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';

export type TableHeadCustomProps = {
  orderBy?: string;
  sx?: SxProps<Theme>;
  order?: 'asc' | 'desc';
  headLabel: Record<string, any>[];
};

export function TableHeadCustom({ sx, order, orderBy, headLabel }: TableHeadCustomProps) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
