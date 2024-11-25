import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { Label } from 'src/components/label';
import NewsListComponent from 'src/components/NewsListComponent';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { maxLine } from 'src/theme/styles';

const metadata = { title: `Xəbələr` };

export default function Page() {
  const theme = useTheme();
  useEffect(() => {
    console.log(theme.palette.mode);
  }, [theme]);

  const popover = usePopover();

  const router = useRouter();
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="Fotoqalereya"
          links={[{ name: 'Fotoqalereya' }, { name: 'Bütün fotolar' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              component={RouterLink}
              href={paths.fotoqalereya.fotoelaveet}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Əlavə et
            </Button>
          }
        />

        {/* list  */}

        <div className="w-full bg-[khaki]/0 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1 grid grid-cols-3">
          {/* item  */}
          <div className="rounded-xl aspect-[334/252] shadow-[4px_4px_4px_4px_rgba(145,158,171,0.12)] flex flex-col p-2 items-center justify-between pb-5">
            <div className="flex w-full flex-col gap-6">
              <div className="rounded-md max-md:rounded-md  aspect-[328/164] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1732305409722-6010a0d234ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full h-full object-cover "
                />
              </div>
              <div
                className={`${theme.palette.mode === 'dark' ? 'text-white' : 'text-[#919EAB]'} flex items-center justify-start gap-1 text-[13px] duration-200 bg-red-400/0 w-full`}
              >
                <span>Posted date:</span>
                <span>21 Jul 2022 12:00 AM</span>
              </div>
            </div>
            <div className="flex items-center justify-end w-full">
              <Stack spacing={1} sx={{ rotate: '90deg' }}>
                <Box display="flex" alignItems="center">
                  <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
                    <Iconify icon="eva:more-horizontal-fill" />
                  </IconButton>
                </Box>
              </Stack>
            </div>
          </div>
          {/* ------------------------------------------- */}
          <CustomPopover
            open={popover.open}
            anchorEl={popover.anchorEl}
            onClose={popover.onClose}
            slotProps={{ arrow: { placement: 'bottom-center' } }}
          >
            <MenuList>
              <MenuItem
                // onClick={() => {
                //   handleDelete(news.id);
                // }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon="solar:trash-bin-trash-bold" />
                Sil
              </MenuItem>
            </MenuList>
          </CustomPopover>
        </div>
      </DashboardContent>
    </>
  );
}
