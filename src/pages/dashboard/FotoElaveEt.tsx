import { Box, Button, Stack, Typography } from '@mui/material';
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

const metadata = { title: `Foto Əlavə Et` };

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
          heading="Yeni foto əlavə et"
          links={[{ name: 'Bütün fotolar', href: paths.fotoqalereya.list }, { name: 'Yeni foto' }]}
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
            width: { xs: '77%', sm: '90%' },
          }}
        >
          <Stack spacing={1.5} width="100%" padding={1}>
            <Form
              methods={methods}
              // onSubmit={() => onSubmit}
            >
              <Typography sx={{ mb: 1 }} variant="subtitle2">
                Şəkil
              </Typography>
              <Field.Upload onDelete={handleRemoveFile} name="coverUrl" maxSize={3145728} />
            </Form>
          </Stack>
          <Button variant="contained">Yaddaşa ver</Button>
        </Box>
      </DashboardContent>
    </>
  );
}
