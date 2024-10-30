import type { IInvoice } from 'src/types/invoice';

import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fDate } from 'src/utils/format-time';
import { IconButton, MenuItem, MenuList, Switch } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { useRouter } from 'src/routes/hooks';
import { BASE_URL } from 'src/api/request';
import useDelete from 'src/api/useDelete';
import { useState } from 'react';
import { toast } from 'sonner';
import useApi from 'src/api/useApi';
import usePost from 'src/api/usePost';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  item: any;
  refetch: () => void;
};

export function InvoiceTableRowCustom({ item, refetch }: Props) {
  const popover = usePopover();
  const router = useRouter();
  const { postData, loading } = usePost(`product/changeDisplayOnHome/${item.id}`);

  // delete year start
  const { deleteData } = useDelete('/product/delete');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  // delete year end

  const handleDelete = async () => {
    if (deleteId) {
      toast.promise(
        deleteData(deleteId).then(() => {
          refetch();
        }),
        {
          loading: 'Silinir...',
          success: () => 'Məlumat silindi!',
          error: () => 'Silinmə zamanı səhv baş verdi!',
        }
      );

      popover.onClose();
    }
  };

  const handleChange = async (event: any) => {
    try {
      await postData({});
      toast.success('Məlumatlar yadda saxlanıldı!');
      refetch();
      // router.push(paths.haqqinda.insanlarnedeyir);
    } catch (error) {
      toast.error('Xəta baş verdi! Məlumat göndərilmədi.');
    }
  };
  return (
    <TableRow key={item.id} hover>
      <TableCell align="center" className="bg-red-500/0">
        <div className="flex items-center  gap-6">
          <img
            className="w-14 h-14 object-cover rounded-xl"
            alt=""
            src={`${BASE_URL}/file/getFile/${item.coverImage}?t=${new Date().getTime()}`}
          />
          <span>{item.translations[0].title}</span>
        </div>
      </TableCell>
      <TableCell className="">
        <ListItemText
          disableTypography
          primary={
            <Typography variant="body2">
              {item.category.toLowerCase().charAt(0).toUpperCase()}
              {item.category.slice(1).toLowerCase()}
            </Typography>
          }
        />
      </TableCell>

      <TableCell>
        {item.difficulty === 'EASY' ? 'Asan' : item.difficulty === 'MEDIUM' ? 'Orta' : 'Çətin'}
      </TableCell>

      <TableCell>{item.ageGroup.age} yaş</TableCell>

      <TableCell align="center">{item.price} ₼</TableCell>
      <TableCell align="center">
        <Switch checked={item.showOnHomePage} onClick={handleChange} />
      </TableCell>
      <TableCell align="center">
        <Stack direction="row" alignItems="center">
          <IconButton
            color={popover.open ? 'inherit' : 'default'}
            onClick={(event) => {
              popover.onOpen(event);
              setDeleteId(item.id);
            }}
          >
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Stack>
      </TableCell>

      {/* Popover */}
      {/* =========================================== */}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Sil
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();

              // router.push(`/haqqinda/duzeliset/${deleteId}`);
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Düzəliş et
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </TableRow>
  );
}
