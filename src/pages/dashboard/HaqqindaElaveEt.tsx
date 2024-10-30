import { Alert, Box, Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import usePost from 'src/api/usePost';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { Language } from 'src/types/types';

// ----------------------------------------------------------------------

const metadata = { title: `Hekayəmiz | Yeni kart` };

export default function Page() {
  const [language, setLanguage] = useState<Language>(Language.AZ);
  const [year, setYear] = useState<number | null>(null);
  const [yearTouched, setYearTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);
  const [translations, setTranslations] = useState({
    az: { content: '', year: '' },
    en: { content: '', year: '' },
    ru: { content: '', year: '' },
  });

  const { postData, loading } = usePost('story/addYear');
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setTranslations((prev) => ({
      ...prev,
      [language]: { ...prev[language], [field]: value },
    }));
  };

  const validateFields = () => {
    const content = translations[language].content.trim();
    return year !== null && content !== '';
  };

  const nextLanguage = useCallback(() => {
    if (!validateFields()) {
      if (year === null) setYearTouched(true);
      if (translations[language].content.trim() === '') setContentTouched(true);
      return;
    }

    if (language === 'az') setLanguage(Language.EN);
    else if (language === 'en') setLanguage(Language.RU);
    else handleSubmit();
        // eslint-disable-next-line
  }, [language, translations, year, validateFields]);

  const prevLanguage = useCallback(() => {
    if (language === 'ru') setLanguage(Language.EN);
    else if (language === 'en') setLanguage(Language.AZ);
  }, [language]);

  const handleSubmit = async () => {
    const formattedData = {
      year,
      translations: Object.entries(translations).map(([lang, { content }]) => ({
        languageCode: lang,
        content,
      })),
    };

    try {
      await postData(formattedData);
      toast.success('Məlumatlar yadda saxlanıldı');
      router.push(paths.haqqinda.hekayemiz);
    } catch (error) {
      toast.error(`Bu il üçün artıq məlumat var!`);
    }
  };

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

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni kart əlavə et"
          links={[{ name: 'Hekayəmiz', href: paths.haqqinda.hekayemiz }, { name: 'Yeni kart' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* Year Input */}
        <Box sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 4 }}>
          {yearTouched && year === null && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Düzgün daxil edin, məsələn: 2024
            </Alert>
          )}
          <TextField
            fullWidth
            type="number"
            size="small"
            label="İl"
            disabled={language !== 'az'}
            value={year === null ? '' : year}
            onChange={(e) => {
              const inputValue = e.target.value;
              if (inputValue === '') {
                setYear(null);
              } else {
                const numericValue = Number(inputValue);
                if (numericValue > 0) setYear(numericValue);
              }
              setYearTouched(true);
            }}
            onKeyDown={(e) => {
              if (e.key === '-' || e.key === 'e') e.preventDefault();
            }}
          />
        </Box>

        <div className="bg-[khaki]/0 flex items-center justify-between">
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'end',
              width: { xs: '77%', sm: '92%' },
            }}
          >
            <TextField
              fullWidth
              size="medium"
              label="Açıqlama"
              multiline
              rows={4}
              value={translations[language].content}
              onChange={(e) => {
                handleInputChange('content', e.target.value);
                setContentTouched(true);
              }}
            />

            <div className="flex items-center justify-between w-full">
              <div className={`${language !== 'az' ? 'opacity-100' : 'opacity-0'} duration-200`}>
                <Button onClick={prevLanguage} component={RouterLink} variant="contained">
                  Geri
                </Button>
              </div>

              <Button
                onClick={nextLanguage}
                variant="contained"
                disabled={!validateFields()} // Disable button if fields are not valid
              >
                {language === 'ru' ? 'Yaddaşa ver' : 'İrəli'}
              </Button>
            </div>
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
      </DashboardContent>
    </>
  );
}
