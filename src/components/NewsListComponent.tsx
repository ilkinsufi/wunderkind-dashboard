import {
  Box,
  Button,
  Card,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import useApi from 'src/api/useApi';
import useDelete from 'src/api/useDelete';
import usePost from 'src/api/usePost';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { Label } from 'src/components/label';
import { useRouter } from 'src/routes/hooks';
import { maxLine } from 'src/theme/styles';
import { formatDate } from 'src/utils/formatDate';

const NewsListComponent = () => {
  const [selectedItemID, setSelectedItemID] = useState<string>('');
  //   get
  const { data: allNews, hasData: hasAllNews, refetch: refetchNews } = useApi(`/news/listAll`);

  // delete
  const { deleteData: deleteItem } = useDelete('/news/delete');

  const theme = useTheme();

  const popover = usePopover();

  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (id) {
      toast.promise(
        deleteItem(id).then(() => {
          refetchNews();
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

  const { postData: sendNewsMail } = usePost(`news/sendNewsMail/${selectedItemID}`);
  const handleSendMail = async (id: string) => {
    if (id) {
      setSelectedItemID(id);

      toast.promise(sendNewsMail(id), {
        loading: 'Göndərilir...',
        // eslint-disable-next-line
        success: (response) => {
          return `Məlumat göndərildi!`;
        },
        error: (err) => {
          const errorMessage = err.response?.data?.message || 'Olmadığı üçün xəta';
          return `Xəta: ${errorMessage}`;
        },
      });
    }
  };

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
      >
        <>
          {hasAllNews
            ? allNews.map((news: any) => (
                <Stack key={news.id}>
                  <Card sx={{ display: 'flex' }}>
                    <Stack spacing={1} sx={{ p: theme.spacing(3, 1, 2, 3) }}>
                      <Box display="flex" alignItems="center" justifyContent="end" sx={{ mb: 2 }}>
                        <Box
                          component="span"
                          sx={{ typography: 'caption', color: 'text.disabled' }}
                        >
                          {formatDate(news.createdAt)}
                        </Box>
                      </Box>

                      <Stack spacing={1} flexGrow={1}>
                        <Link
                          // component={RouterLink}
                          // href={paths.dashboard.post.details(title)}
                          color="inherit"
                          variant="subtitle2"
                          sx={{ ...maxLine({ line: 2 }) }}
                        >
                          {news?.translations[0]?.title}
                        </Link>

                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {news?.translations[0]?.description}
                        </Typography>
                      </Stack>
                      <Button
                        onClick={() => handleSendMail(news.id)}
                        color="inherit"
                        size="small"
                        variant="contained"
                      >
                        Abunəçilərə göndərmək
                      </Button>

                      <Box display="flex" alignItems="center">
                        <IconButton
                          color={popover.open ? 'inherit' : 'default'}
                          onClick={popover.onOpen}
                        >
                          <Iconify icon="eva:more-horizontal-fill" />
                        </IconButton>
                      </Box>
                    </Stack>

                    <Box
                      sx={{
                        p: 1,
                        width: 180,
                        height: 260,
                        flexShrink: 0,
                        position: 'relative',
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      <img
                        alt="title"
                        src={`${BASE_URL}/file/getFile/${news.coverImage}?t=${new Date().getTime()}`}
                        className="rounded-[12px]"
                      />
                    </Box>
                  </Card>
                  <CustomPopover
                    open={popover.open}
                    anchorEl={popover.anchorEl}
                    onClose={popover.onClose}
                    slotProps={{ arrow: { placement: 'bottom-center' } }}
                  >
                    <MenuList>
                      <MenuItem
                        onClick={() => {
                          popover.onClose();
                          // router.push(paths.dashboard.post.edit(title));
                        }}
                      >
                        <Iconify icon="solar:pen-bold" />
                        Düzəliş et
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          handleDelete(news.id);
                        }}
                        sx={{ color: 'error.main' }}
                      >
                        <Iconify icon="solar:trash-bin-trash-bold" />
                        Sil
                      </MenuItem>
                    </MenuList>
                  </CustomPopover>
                </Stack>
              ))
            : ''}
        </>
      </Box>
    </Stack>
  );
};

export default NewsListComponent;
