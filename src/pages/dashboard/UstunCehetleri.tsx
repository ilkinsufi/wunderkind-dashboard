import { Alert, Avatar, Box, Button, TextField, Typography } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import useApi from 'src/api/useApi';
import usePatch from 'src/api/usePatch';
import { usePostFile } from 'src/api/usePostFile';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { Language } from 'src/types/types';

// ----------------------------------------------------------------------

const metadata = { title: `Üstün cəhətləri` };

export default function Page() {
  const [coreID, setCoreID] = useState<string | null>(null);
  const [coreData, setCoreData] = useState<Record<string, any>>({
    az: { title: '', description: '', advantageLists: [] },
    en: { title: '', description: '', advantageLists: [] },
    ru: { title: '', description: '', advantageLists: [] },
  });

  const [language, setLanguage] = useState<Language>(Language.AZ);
  const { data, hasData, refetch } = useApi(`/advantage/listAll`);
  const [itemId, setItemId] = useState<string | null>(null);
  const { patchData, loading } = usePatch(`/advantage/${itemId}`);

  useEffect(() => {
    if (hasData && data) {
      const item = data[0];
      setItemId(item.id);
      const parsedData = item.translations.reduce((acc: any, curr: any) => {
        acc[curr.languageCode] = {
          title: curr.title,
          description: curr.description,
          advantageLists: curr.advantageLists || [],
        };
        return acc;
      }, {});
      setCoreData(parsedData);
      // sekil
      // eslint-disable-next-line
      hasData && setCurrentPhoto(data[0].image);
      // eslint-disable-next-line
      hasData && setCoreID(data[0].id);
      // eslint-disable-next-line
    }
  }, [data, hasData]);

  const handleInputChange = (field: string, value: string) => {
    setCoreData((prev) => ({
      ...prev,
      [language]: { ...prev[language], [field]: value },
    }));
  };

  const handleSubmit = async () => {
    const formattedData = {
      translations: Object.entries(coreData).map(
        ([lang, { title, description, advantageLists }]) => ({
          languageCode: lang,
          title,
          description,
          advantageLists,
        })
      ),
    };

    try {
      await patchData(formattedData);
      toast.success('Məlumatlar uğurla güncelləndi!');
    } catch (error) {
      toast.error('Məlumatları güncelleyərkən xəta baş verdi!');
    }
  };

  const nextLanguage = useCallback(() => {
    if (language === 'az') setLanguage(Language.EN);
    else if (language === 'en') setLanguage(Language.RU);
  }, [language]);

  const prevLanguage = useCallback(() => {
    if (language === 'ru') setLanguage(Language.EN);
    else if (language === 'en') setLanguage(Language.AZ);
  }, [language]);

  const getLanguageIndex = (lang: Language) => {
    switch (lang) {
      case 'az':
        return 0;
      case 'en':
        return 1;
      case 'ru':
        return 2;
      default:
        return -1;
    }
  };

  // sekil
  const [currentPhoto, setCurrentPhoto] = useState<any>(null);
  const { postData: uploadFile, response: uploadFileResponse } = usePostFile('file/uploadFile');
  const { patchData: updateImgOnServer } = usePatch(`/advantage/${coreID}`);
  const router = useRouter();

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
            console.log('Yüklenecek img name: ', response.message);

            await updateImgOnServer({
              image: response.message,
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
        <title>{metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Üstün cəhətləri"
          links={[{ name: 'Haqqında' }, { name: 'Üstün cəhətləri' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        {/* esas kontainer  */}

        <div className="bg-[khaki]/0 flex justify-between">
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
            {/* Title Input */}
            <TextField
              fullWidth
              label="Başlıq"
              value={coreData[language]?.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />

            {/* Description Input */}
            <TextField
              fullWidth
              label="Açıqlama"
              value={coreData[language]?.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />

            {/* Advantage List Input */}
            {coreData[language]?.advantageLists.map((adv: any, index: number) => (
              <TextField
                key={index}
                fullWidth
                label={`Üstünlük ${index + 1}`}
                value={adv.description}
                onChange={(e) =>
                  setCoreData((prev) => {
                    const updatedList = [...prev[language].advantageLists];
                    updatedList[index].description = e.target.value;
                    return {
                      ...prev,
                      [language]: { ...prev[language], advantageLists: updatedList },
                    };
                  })
                }
              />
            ))}

            {/* Language Navigation Buttons */}
            <div className="flex flex-wrap justify-between mt-4 gap-2">
              {/* Back Button */}
              <Button
                onClick={prevLanguage}
                disabled={language === Language.AZ}
                sx={{
                  flex: '1 1 100%', // Takes full width on small screens
                  backgroundColor: language === Language.AZ ? '#F1F1F1' : '#FFA726',
                  color: language === Language.AZ ? '#9E9E9E' : '#fff',
                  '&:hover': {
                    backgroundColor: '#FB8C00',
                  },
                  '@media (min-width: 600px)': {
                    flex: '1 1 auto', // Resets to normal behavior on larger screens
                  },
                }}
              >
                Geri
              </Button>

              {/* Next Button */}
              <Button
                onClick={nextLanguage}
                disabled={language === Language.RU}
                sx={{
                  flex: '1 1 100%',
                  backgroundColor: language === Language.RU ? '#F1F1F1' : '#66BB6A',
                  color: language === Language.RU ? '#9E9E9E' : '#fff',
                  '&:hover': {
                    backgroundColor: '#43A047',
                  },
                  '@media (min-width: 600px)': {
                    flex: '1 1 auto',
                  },
                }}
              >
                İrəli
              </Button>

              {/* Save Button */}
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  flex: '1 1 100%',
                  '@media (min-width: 600px)': {
                    flex: '0 1 auto',
                  },
                }}
              >
                Yadda saxla
              </Button>
            </div>
          </Box>
          {/* Language Progress Indicator */}
          <ul className="flex flex-col gap-1 h-full mt-4">
            {['az', 'en', 'ru'].map((lang, index) => (
              <div key={lang}>
                {/* Language step indicator */}
                <li className="flex gap-4 items-center">
                  <span
                    className={`${
                      index <= getLanguageIndex(language) ? 'bg-[#00A76F]' : 'bg-[#D1D6DA]'
                    } duration-200 rounded-full w-4 h-4`}
                  />
                  <span>{lang.toUpperCase()}</span>
                </li>

                {/* Line separator (hidden for the last element) */}
                <li
                  className={`${
                    lang === 'ru' ? 'hidden' : ''
                  } ml-[7px] w-[1px] h-[22px] bg-[#919EAB]`}
                />
              </div>
            ))}
          </ul>
        </div>

        {/* Image Upload */}
        <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
          Şəkil
        </Typography>
        <Box
          sx={{
            borderRadius: '14px',
            textAlign: 'center',
            width: '100%',
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
                border: '1px solid #ddd',
                borderRadius: '0px',
              }}
            />
          </label>
        </Box>
      </DashboardContent>
    </>
  );
}
