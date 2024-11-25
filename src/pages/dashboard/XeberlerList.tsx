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

  const popover = usePopover();

  const router = useRouter();
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="Xəbələr"
          links={[{ name: 'Xəbərlər' }, { name: 'Bütün xəbələr' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button
              component={RouterLink}
              href={paths.xeberler.xeberelaveet}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Əlavə et
            </Button>
          }
        />

        {/* list  */}
        <NewsListComponent />
      </DashboardContent>
    </>
  );
}
