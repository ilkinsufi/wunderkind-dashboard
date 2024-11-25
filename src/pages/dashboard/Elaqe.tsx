import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { z as zod } from 'zod';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Field, Form } from 'src/components/hook-form';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { schemaHelper } from 'src/components/hook-form/schema-helper';

import { BlankView } from 'src/sections/blank/view';
import { zodResolver } from '@hookform/resolvers/zod';

// ----------------------------------------------------------------------

export type NewJobSchemaType = zod.infer<typeof NewJobSchema>;

export const NewJobSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  content: zod.string().min(1, { message: 'Content is required!' }),
  employmentTypes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  role: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Role is required!' },
  }),
  skills: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  workingSchedule: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  locations: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  expiredDate: schemaHelper.date({ message: { required_error: 'Expired date is required!' } }),

  salary: zod.object({
    price: zod.number().min(1, { message: 'Price is required!' }),
    // Not required
    type: zod.string(),
    negotiable: zod.boolean(),
  }),
  benefits: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  // Not required
  experience: zod.string(),
});

const metadata = { title: `Video Əlavə Et` };

export default function Page() {
  const handleRemoveFile = useCallback(() => {
    console.log('deleted');
  }, []);

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      content: '',
      coverUrl: null,
      tags: [],
      metaKeywords: [],
      metaTitle: '',
      metaDescription: '',
    }),
    []
  );

  const methods = useForm<NewJobSchemaType>({
    mode: 'all',
    resolver: zodResolver(NewJobSchema),
    defaultValues,
  });
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Əlaqə"
          links={[{ name: 'Əlaqə məlumatları' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'end',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack width="100%" padding={1}>
            <Form
              methods={methods}
              // onSubmit={() => onSubmit}
            >
              <TextField
                fullWidth
                sx={{ width: '100%' }}
                id="outlined-basic"
                label="Telefon nömrəsi"
                variant="outlined"
                type="number"
              />
              <TextField
                fullWidth
                sx={{ width: '100%', mt: 2 }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
              />
            </Form>
          </Stack>
        </Box>
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            boxShadow: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'end',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Stack spacing={1.5} width="100%" padding={1}>
            <Form
              methods={methods}
              // onSubmit={() => onSubmit}
            >
              <Typography sx={{ mb: 1 }} variant="subtitle2">
                Sosial şəbəkələr
              </Typography>
              <TextField
                fullWidth
                sx={{ width: '100%', mt: 1 }}
                id="outlined-basic"
                label="Instagram"
                variant="outlined"
              />
              <TextField
                fullWidth
                sx={{ width: '100%', mt: 2 }}
                id="outlined-basic"
                label="Facebook"
                variant="outlined"
              />
              <TextField
                fullWidth
                sx={{ width: '100%', mt: 2 }}
                id="outlined-basic"
                label="Youtube"
                variant="outlined"
              />
              <TextField
                fullWidth
                sx={{ width: '100%', mt: 2 }}
                id="outlined-basic"
                label="Tiktok"
                variant="outlined"
              />
              <TextField
                fullWidth
                sx={{ width: '100%', mt: 2 }}
                id="outlined-basic"
                label="Telegram"
                variant="outlined"
              />
            </Form>
          </Stack>
        </Box>
        <div className="flex mt-4 items-center justify-end">
          <Button variant="contained">Yaddaşa ver</Button>
        </div>
      </DashboardContent>
    </>
  );
}
