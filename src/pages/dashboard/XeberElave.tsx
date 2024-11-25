import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Field, Form } from 'src/components/hook-form';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { z as zod } from 'zod';
import { Language } from 'src/types/types';
import { schemaHelper } from 'src/components/hook-form/schema-helper';
import { useForm } from 'react-hook-form';
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

const metadata = { title: `Xəbərlər | Yeni xəbər` };

export default function Page() {
  const [language, setLanguage] = useState<Language>(Language.AZ);

  const getAlertMessage = () => {
    switch (language) {
      case 'az':
        return 'Azərbaycanca məlumat daxil edin!';
      case 'en':
        return 'İngiliscə məlumat daxil edin!';
      case 'ru':
        return 'Rusca məlumat daxil edin!';
      default:
        return '';
    }
  };
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

  function onSubmit() {
    console.log('sumbit');
  }

  const handleRemoveFile = useCallback(() => {
    console.log('deleted');
  }, []);

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni xəbər əlavə et"
          links={[{ name: 'Bütün xəbərlər', href: paths.xeberler.list }, { name: 'Yeni xəbər' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <div className="bg-[khaki]/0 flex items-center justify-between">
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
              width: { xs: '77%', sm: '92%' },
            }}
          >
            <TextField
              fullWidth
              size="medium"
              label="Başlıq"
              multiline
              // value={translations[language].content}
              onChange={(e) => {
                // handleInputChange('content', e.target.value);
                // setContentTouched(true);
              }}
            />

            <Box sx={{ backgroundColor: '', width: '100%' }}>
              <Form methods={methods} onSubmit={() => onSubmit}>
                <Typography sx={{ mb: 1 }} variant="subtitle2">
                  Kontent
                </Typography>
                {/* @ts-ignore-next-line */}
                <Field.Editor
                  name="Xəbər kontenti"
                  helperText={getAlertMessage()}
                  sx={{ maxHeight: 480 }}
                  placeholder="Kontenti daxil edin..."
                />
              </Form>

              <div className="w-full flex items-center justify-end">
                <Button variant="contained">İrəli</Button>
              </div>
            </Box>
          </Box>

          <ul className="flex flex-col gap-1 h-full mr-2">
            <li className="flex gap-4 items-center">
              <span
                className={`${
                  language === 'az' || language === 'en' || language === 'ru'
                    ? 'bg-[#00A76F]'
                    : 'bg-[#D1D6DA]'
                } duration-200 rounded-full w-4 h-4`}
              />
              <span>AZ</span>
            </li>
            <li className="ml-[7px] w-[1px] h-[22px] bg-[#919EAB]" />
            <li className="flex gap-4 items-center">
              <span
                className={`${
                  language === 'en' || language === 'ru' ? 'bg-[#00A76F]' : 'bg-[#D1D6DA]'
                } duration-200 rounded-full w-4 h-4`}
              />
              <span>EN</span>
            </li>
            <li className="ml-[7px] w-[1px] h-[22px] bg-[#919EAB]" />
            <li className="flex gap-4 items-center">
              <span
                className={`${
                  language === 'ru' ? 'bg-[#00A76F]' : 'bg-[#D1D6DA]'
                } duration-200 rounded-full w-4 h-4`}
              />
              <span>RU</span>
            </li>
          </ul>
        </div>

        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'center',
            width: { xs: '77%', sm: '92%' },
            marginTop: 2,
          }}
        >
          <Box sx={{ backgroundColor: '', width: '100%' }}>
            <Form methods={methods} onSubmit={() => onSubmit}>
              <Typography sx={{ mb: 1 }} variant="subtitle2">
                Xəbərin şəkli
              </Typography>
              <Field.Upload onDelete={handleRemoveFile} name="coverUrl" maxSize={3145728} />
            </Form>

            <FormGroup sx={{ mt: 2 }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Post edildikdə, xəbərləri abunəçilərə göndərmək"
              />
            </FormGroup>
          </Box>
        </Box>
        <Stack
          sx={{
            width: { xs: '77%', sm: '92%' },
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'end',
            justifyContent: 'center',
          }}
        >
          <Button variant="contained">Yaddaşa ver</Button>
        </Stack>
      </DashboardContent>
    </>
  );
}
