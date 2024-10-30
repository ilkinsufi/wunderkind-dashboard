import {
  Box,
  Button,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Table,
  TableBody,
  Tooltip,
} from '@mui/material';
import useDelete from 'src/api/useDelete';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { Language } from 'src/types/types';
import { useEffect, useState } from 'react';
import { InvoiceTableToolbar } from 'src/sections/invoice/invoice-table-toolbar';
import { IInvoice, IInvoiceTableFilters } from 'src/types/invoice';
import { _invoices } from 'src/_mock';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { Scrollbar } from 'src/components/scrollbar';
import { InvoiceTableRowCustom } from 'src/sections/invoice/invoice-table-row-custom';
import { start } from 'nprogress';
import useApi from 'src/api/useApi';
import { GridSearchIcon } from '@mui/x-data-grid';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'productImg', label: 'Məhsul' },
  { id: 'category', label: 'Kateqoriya' },
  { id: 'level', label: 'Çətinlik səviyyəsi' },
  { id: 'age', label: 'Yaş aralığı' },
  { id: 'price', label: 'Qiymət' },
  { id: 'showonHome', label: 'Əsas səhifədə göstər', align: 'center' },
  { id: 'actions', label: '', align: 'center' },
];
// ----------------------------------------------------------------------

const metadata = { title: `Məhsullar` };

export default function Page() {
  const [language] = useState<Language>(Language.AZ);
  const [search, setSearch] = useState('');

  // get data start
  const { data, hasData, refetch } = useApi('/product/listAll', language);

  // get data end

  // list start

  const [tableData] = useState<IInvoice[]>(_invoices);

  const table = useTable({ defaultOrderBy: 'createDate' });

  const filters = useSetState<IInvoiceTableFilters>({
    name: '',
    service: [],
    status: 'all',
  });

  let dataFiltered;

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="Məhsullar"
          links={[{ name: 'Məhsullar' }, { name: 'Bütün məhsullar' }]}
          action={
            <Button
              component={RouterLink}
              href={paths.mehsullar.mehsulelave}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Əlavə et
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* list  */}
        <Card>
          {/* ============================ */}
          <div className="w-full bg-red-500/0   flex flex-col text-right">
            <FormControl variant="outlined" sx={{ my: 3, mx: 3 }}>
              <OutlinedInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="outlined-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">
                    <GridSearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          {/* ====================== */}

          <Box sx={{ position: 'relative' }}>
            <Scrollbar sx={{ minHeight: '' }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                />

                <TableBody>
                  {hasData
                    ? data
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        .filter((item: any) =>
                          item.translations[0].title.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((item: any, index: number) => (
                          <InvoiceTableRowCustom refetch={refetch} key={item.id} item={item} />
                        ))
                    : ''}

                  {hasData ? (
                    <div
                      className={`${
                        data
                          .slice(
                            table.page * table.rowsPerPage,
                            table.page * table.rowsPerPage + table.rowsPerPage
                          )
                          .filter((item: any) =>
                            item.translations[0].title.toLowerCase().includes(search.toLowerCase())
                          ).length === 0
                          ? 'block'
                          : 'hidden'
                      }  w-full text-center bg-red-500/0`}
                    >
                      <span className="font-medium">{search}</span> üçün nəticə tapılmadı
                    </div>
                  ) : (
                    ''
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </Box>
          {hasData ? (
            <TablePaginationCustom
              page={table.page}
              dense={table.dense}
              count={
                data
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .filter((item: any) =>
                    item.translations[0].title.toLowerCase().includes(search.toLowerCase())
                  ).length
              }
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onChangeDense={table.onChangeDense}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          ) : (
            ''
          )}
        </Card>
      </DashboardContent>
    </>
  );
}

// ----------------------------------------------------------------------
