import type { IInvoice } from 'src/types/invoice';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';

import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

type Props = {
  row: IInvoice;
  index: number;
};

export function InvoiceTableRow({ row, index }: Props) {
  return (
    <TableRow hover>
      <TableCell align="center">{index + 1}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <ListItemText
            disableTypography
            primary={
              <Typography variant="body2" noWrap>
                {row.invoiceTo.name}
              </Typography>
            }
          />
        </Stack>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(row.createDate)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        />
      </TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(row.dueDate)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        />
      </TableCell>

      <TableCell>9999999</TableCell>

      {/* <TableCell align="center">{row.sent}</TableCell> */}
      <TableCell align="center">AZN</TableCell>

      <TableCell align="left" sx={{ px: 1 }}>
        Tamamlanır
      </TableCell>

      <TableCell align="left">
        <Label
          variant="soft"
          color={
            (row.status === 'Verilib' && 'success') ||
            (row.status === 'İcraatda' && 'warning') ||
            (row.status === 'Xətalı' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );
}
