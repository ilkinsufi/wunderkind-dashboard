import {
  Avatar,
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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'src/routes/hooks';
import { BASE_URL } from 'src/api/request';
import { usePostFile } from 'src/api/usePostFile';
import usePatch from 'src/api/usePatch';

// ----------------------------------------------------------------------

const metadata = { title: `Hekayəmiz` };

export default function Page() {
  const [coreID, setCoreID] = useState<string | null>(null);
  const [coreImgName, setCoreImgName] = useState<string | null>(null);

  const [currentPhoto, setCurrentPhoto] = useState<any>(null);

  const [language] = useState<Language>(Language.AZ);

  // opsi data
  const { data, hasData, refetch } = useApi('/story/list', language);

  useEffect(() => {
    // eslint-disable-next-line
    hasData && setCurrentPhoto(data[0].image);
    // eslint-disable-next-line
    hasData && setCoreID(data[0].id);
    // eslint-disable-next-line
  }, [hasData]);

  // serverdeki sekli update
  const { patchData: updateImgOnServer } = usePatch(`/story/${coreID}`);

  // kompdan sekli servere gonder
  const { postData: uploadFile, response: uploadFileResponse } = usePostFile('file/uploadFile');

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const popover = usePopover();
  const router = useRouter();
  const { deleteData } = useDelete('/story/deleteYear');
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await toast.promise(
        (async () => {
          const response = await uploadFile(formData);

          if (response) {
            setCoreImgName(response[0]);

            await updateImgOnServer({
              image: response[0],
            });
            await refetch();
            router.refresh();
          }
        })(),
        {
          loading: 'Yüklənir...',
          success: 'Şəkil yeniləndi!',
          error: 'Yükleme zamanı səhv baş verdi!',
        }
      );
    } catch (error) {
      console.error('Yükleme hatası:', error);
      toast.error('Yükleme zamanı səhv baş verdi!');
    }
  };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="Hekayəmiz"
          links={[{ name: 'Haqqında' }, { name: 'Hekayəmiz' }]}
          action={
            <Button
              component={RouterLink}
              href={paths.haqqinda.elaveet}
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
            ? data[0]?.years?.map((item: any, index: number) => (
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
                    <CardHeader sx={{ p: 0, px: 1 }} title={item.year} />
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

        {/* img  */}
        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Şəkil
        </Typography>
        <Box
          sx={{
            borderRadius: '14px',
            border: 'none',
            textAlign: 'center',
            width: '100%',
            height: '300px',
            // height: '400px',
            objectFit: 'cover',
            overflow: 'hidden',
          }}
        >
          <label
            htmlFor="upload-photo"
            style={{ cursor: 'pointer', width: '100%', height: '100%' }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="upload-photo"
            />
            <Avatar
              key={currentPhoto}
              // src={
              //   image
              //     ? `/story/${storyID}`
              //     : 'https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png'
              // }
              // src={`${BASE_URL}/file/getFile/${currentPhoto}`}
              src={`${BASE_URL}/file/getFile/${currentPhoto}?t=${new Date().getTime()}`}
              alt="Preview"
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '0px',
              }}
            />
          </label>
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

                router.push(`/haqqinda/duzeliset/${deleteId}`);
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
