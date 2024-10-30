import type { IInvoice } from 'src/types/invoice';

// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
// import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

// import { fCurrency } from 'src/utils/format-number';
// import { fDate, fTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  row: IInvoice;
  selected: boolean;
  index: number;
};

export function InvoiceTableRow({ row, selected, index }: Props) {
  return (
    <TableRow hover selected={selected}>
      <TableCell>{index + 1}</TableCell>

      <TableCell>
        <Stack spacing={2} direction="row" alignItems="right">
          <ListItemText
            disableTypography
            primary={
              // <Typography variant="body2" noWrap>
              //   {row.invoiceTo.name}
              // </Typography>
              <div>01.09.2024</div>
            }
            secondary={
              // <Link noWrap variant="body2" sx={{ color: 'text.disabled', cursor: 'pointer' }}>
              //   {row.invoiceNumber}
              // </Link>
              <div className="text-[#606060] text-sm">-cü il tarixində</div>
            }
          />
        </Stack>
      </TableCell>

      <TableCell>
        {/* <ListItemText
          primary={fDate(row.createDate)}
          secondary={fTime(row.createDate)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
        /> */}
        487.68 ₼
      </TableCell>

      <TableCell>
        {/* <ListItemText
          primary={fDate(row.dueDate)}
          secondary={fTime(row.dueDate)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
        /> */}
        326.6 ₼
      </TableCell>

      {/* <TableCell>{fCurrency(row.totalAmount)}</TableCell> */}
      <TableCell>161.08 ₼</TableCell>
    </TableRow>
  );
}
