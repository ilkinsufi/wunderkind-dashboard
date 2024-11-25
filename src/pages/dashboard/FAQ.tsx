import {
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  MenuItem,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import useApi from 'src/api/useApi';
import useDelete from 'src/api/useDelete';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { Language } from 'src/types/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

const metadata = { title: `FAQ` };

export default function Page() {
  // Silinecek item
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [language] = useState<Language>(Language.AZ);

  // Popover
  const popover = usePopover();

  const router = useRouter();

  const { data, error, hasData, refetch } = useApi('/review/list', language);

  const { deleteData } = useDelete('/review/delete');

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

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="FAQ"
          links={[{ name: 'Tez-tez verilən suallar' }]}
          action={
            <Button
              component={RouterLink}
              href={paths.elaqe.faqelaveet}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Əlavə et
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Kartlar */}
        <Box
          gap={3}
          display="grid"
          sx={{
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
          }}
        >
          {hasData
            ? data?.map((item: any, index: number) => (
                <Card key={index}>
                  <Box
                    sx={{
                      p: 2,
                      pb: 0,
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <CardHeader sx={{ p: 0, px: 1 }} title={item.fullName} />
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
                  </Box>

                  <Typography variant="body2" sx={{ px: 3, py: 2, color: 'text.secondary' }}>
                    {item.description}
                  </Typography>
                </Card>
              ))
            : 'Məlumat yoxdur'}
        </Box>

        {/* Popover */}
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

                router.push(`/haqqinda/insanlarnedeyirduzelis/${deleteId}`);
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Düzəliş et
            </MenuItem>
          </MenuList>
        </CustomPopover>
      </DashboardContent>
    </>
  );
}
