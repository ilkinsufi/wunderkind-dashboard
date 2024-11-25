import {
  Alert,
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import { BASE_URL } from 'src/api/request';
import useApi from 'src/api/useApi';
import usePatch from 'src/api/usePatch';
import usePost from 'src/api/usePost';
import { usePostFile } from 'src/api/usePostFile';
import ColudIcon from 'src/assets/ColudIcon';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { Language } from 'src/types/types';

interface ProductProps {
  instructionPDF: string;
  images: string[];
  coverImage: string;
  ageGroupId: string;
  difficulty: string;
  category: string;
  price: number;
  showOnHomePage: boolean;
  popular: boolean;
  bestSeller: boolean;
  translations: {
    az: { title: string; description: string; languageCode: string };
    en: { title: string; description: string; languageCode: string };
    ru: { title: string; description: string; languageCode: string };
  };
}

interface AgeDataProps {
  age: string;
  id: string;
}

const categories = [
  { value: 'PUZZLE', label: 'Puzzle' },
  { value: 'LOGIC', label: 'Logic' },
  { value: 'PUZZLE_3D', label: 'Puzzle_3D' },
  { value: 'SPECIAL', label: 'Special' },
];

const difficulties = [
  { value: 'EASY', label: 'Asan' },
  { value: 'MEDIUM', label: 'Orta' },
  { value: 'HARD', label: 'Çətin' },
];

// ----------------------------------------------------------------------

const metadata = { title: `Yeni mehsul` };

export default function Page() {
  const [language, setLanguage] = useState<Language>(Language.AZ);

  const { id } = useParams();
  const { data: itemData, hasData: itemHasData } = useApi(
    `/product/getWithTranslation/${id}`,
    language
  );

  const router = useRouter();
  const [productNameTouched, setProductNameTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);

  // backende göndər
  const { postData: createProduct } = usePost('/product/create');
  const { patchData } = usePatch(`/product/${id}`);

  // yas datasi
  const { data: agesData, hasData: ageHasData } = useApi('/age-group/list');

  // esas sekil
  const { postData: uploadFile, response: uploadFileResponse } = usePostFile('file/uploadFile');
  const [currentPhoto, setCurrentPhoto] = useState<any>(null);
  // const { patchData: updateImgOnServer } = usePatch(`/product/${data.id}`);

  const [productDetails, setProductDetails] = useState<ProductProps>({
    instructionPDF: '',
    images: [],
    coverImage: '',
    ageGroupId: '',
    difficulty: '',
    category: '',
    price: 0,
    showOnHomePage: false,
    popular: false,
    bestSeller: false,
    translations: {
      az: { title: '', description: '', languageCode: '' },
      en: { title: '', description: '', languageCode: '' },
      ru: { title: '', description: '', languageCode: '' },
    },
  });

  useEffect(() => {
    if (itemHasData) {
      setProductDetails((prev) => ({
        ...prev,
        price: itemData.price,
        category: itemData.category,
        ageGroupId: itemData.ageGroupId,
        translations: {
          az: {
            title: itemData.translations[0].title,
            description: itemData.translations[0].description,
            languageCode: itemData.translations[0].languageCode,
          },
          en: {
            title: itemData.translations[1].title,
            description: itemData.translations[1].description,
            languageCode: itemData.translations[1].languageCode,
          },
          ru: {
            title: itemData.translations[2].title,
            description: itemData.translations[2].description,
            languageCode: itemData.translations[2].languageCode,
          },
        },
        difficulty: itemData.difficulty,
        popular: itemData.popular,
        bestSeller: itemData.bestSeller,
        coverImage: itemData.coverImage,
        instructionPDF: itemData.instructionPDF,
        images: itemData.images,
        showOnHomePage: itemData.showOnHomePage,
      }));
    }
    // eslint-disable-next-line
  }, [itemHasData, ageHasData]);

  useEffect(() => {
    setProductNameTouched(false);
    setDescriptionTouched(false);
  }, [language]);

  // eslint-disable-next-line
  const validateFields = () => {
    const currentTranslation = productDetails.translations[language];
    return currentTranslation.title.trim() !== '' && currentTranslation.description.trim() !== '';
  };

  const handleInputChange = (field: string, value: string) => {
    setProductDetails((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [language]: { ...prev.translations[language], [field]: value },
      },
    }));
  };

  const handleNextStep = useCallback(() => {
    const currentTranslation = productDetails.translations[language];

    if (currentTranslation.title.trim() === '') setProductNameTouched(true);
    if (currentTranslation.description.trim() === '') setDescriptionTouched(true);

    if (!validateFields()) return;

    setProductNameTouched(false);
    setDescriptionTouched(false);

    if (language === 'az') setLanguage(Language.EN);
    else if (language === 'en') setLanguage(Language.RU);
    // eslint-disable-next-line
  }, [language, productDetails, validateFields]);

  function handleBackStep() {
    if (language === Language.EN) {
      setLanguage(Language.AZ);
    } else if (language === Language.RU) {
      setLanguage(Language.EN);
    }
  }

  const getProductNameAlertMessage = () => {
    switch (language) {
      case 'az':
        return 'Azərbaycanca məhsul adı daxil edin!';
      case 'en':
        return 'İngiliscə məhsul adı daxil edin!';
      case 'ru':
        return 'Rusca məhsul adı daxil edin!';
      default:
        return '';
    }
  };

  const getDescriptionAlertMessage = () => {
    switch (language) {
      case 'az':
        return 'Azərbaycanca açıqlama daxil edin!';
      case 'en':
        return 'İngiliscə açıqlama daxil edin!';
      case 'ru':
        return 'Rusca açıqlama daxil edin!';
      default:
        return '';
    }
  };

  const handleCoverPhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await toast.promise(
        (async () => {
          const response = await uploadFile(formData);

          // if (response) {
          //   await updateImgOnServer({
          //     image: response[0],
          //   });
          //   // await refetch();
          //   // router.refresh();
          // }
          if (response) {
            setProductDetails((prev) => ({
              ...prev,
              coverImage: response[0],
            }));
            // await refetch();
            // router.refresh();
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
  const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line
    const files = e.target.files;
    if (!files) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append('file', file);
    });

    try {
      await toast.promise(
        (async () => {
          const response = await uploadFile(formData);

          if (response) {
            setProductDetails((prev) => ({
              ...prev,
              images: [...(prev.images || []), ...response],
            }));
          }
        })(),
        {
          loading: 'Gözləyin...',
          success: 'Şəkillər yeniləndi!',
          error: 'Yükləmə zamanı səhv baş verdi!',
        }
      );
    } catch (error) {
      console.error('Yükləmə xətası:', error);
      toast.error('Yükləmə zamanı səhv baş verdi!');
    }
  };
  const handlePdfChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await toast.promise(
        (async () => {
          const response = await uploadFile(formData);

          // if (response) {
          //   await updateImgOnServer({
          //     image: response[0],
          //   });
          //   // await refetch();
          //   // router.refresh();
          // }
          if (response) {
            setProductDetails((prev) => ({
              ...prev,
              instructionPDF: response[0],
            }));
            // await refetch();
            // router.refresh();
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
  const handleDeleteImage = (image: string) => {
    setProductDetails((prev) => {
      const updatedImages = prev.images.filter((img) => img !== image);
      return { ...prev, images: updatedImages };
    });
    toast.success('Şəkil silindi!');
  };

  const sendDatatoBackend = async () => {
    try {
      const formattedTranslations = Object.entries(productDetails.translations).map(
        ([languageCode, { title, description }]) => ({
          title,
          description,
          languageCode,
        })
      );

      const payload = {
        ...productDetails,
        translations: formattedTranslations,
      };

      await patchData(payload);
      toast.success('Məhsul əlavə edildi!');
      // router.push(paths.mehsullar.list);
    } catch (error) {
      console.error('Xəta baş verdi:', error);
      toast.error('Xəta baş verdi! Məhsul əlavə edilmədi.');
    }
  };

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="Düzəliş et"
          links={[{ name: 'Bütün məhsullar', href: paths.mehsullar.list }, { name: 'Düzəliş et' }]}
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
              alignItems: 'end',
              width: { xs: '77%', sm: '92%' },
            }}
          >
            {/* {contentTouched && translations[language].content.trim() === '' && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {getAlertMessage()}
              </Alert>
            )} */}

            {productNameTouched && productDetails.translations[language].title.trim() === '' && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {getProductNameAlertMessage()}
              </Alert>
            )}
            <TextField
              fullWidth
              size="medium"
              label="Məhsulun adı"
              multiline
              value={productDetails.translations[language].title}
              onChange={(e) => {
                handleInputChange('title', e.target.value);
                handleInputChange('languageCode', language.toLowerCase());
                setProductNameTouched(true);
              }}
            />
            {descriptionTouched &&
              productDetails.translations[language].description.trim() === '' && (
                <Alert severity="error" sx={{ width: '100%' }}>
                  {getDescriptionAlertMessage()}
                </Alert>
              )}
            <TextField
              fullWidth
              size="medium"
              label="Açıqlama"
              rows={4}
              multiline
              value={productDetails.translations[language].description}
              onChange={(e) => {
                handleInputChange('description', e.target.value);
                setDescriptionTouched(true);
              }}
            />

            <div className="flex items-center justify-between w-full">
              <div
                role="presentation"
                onClick={handleBackStep}
                className={`${language !== 'az' ? 'opacity-100' : 'opacity-0'} duration-200`}
              >
                <Button component={RouterLink} variant="contained">
                  Geri
                </Button>
              </div>

              <div role="presentation" onClick={handleNextStep}>
                <Button variant="contained" disabled={!validateFields()} onClick={handleNextStep}>
                  İrəli
                </Button>
              </div>
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

        <div>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              boxShadow: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 4,
              alignItems: 'end',
              width: '100%',
            }}
          >
            <div className="grid grid-cols-2 gap-3 w-full">
              <FormControl fullWidth>
                <InputLabel id="">Kateqoriya</InputLabel>
                <Select
                  label="kateqoriya"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={productDetails.category}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    setProductDetails((prev) => ({
                      ...prev,
                      category: newValue,
                    }));
                  }}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Çətinlik səviyyəsi</InputLabel>
                <Select
                  label="çətinlik səviyyəsi"
                  labelId="demo-simple-select"
                  id="demo-simple-"
                  value={productDetails.difficulty}
                  onChange={(e) => {
                    setProductDetails((prev) => ({ ...prev, difficulty: e.target.value }));
                  }}
                >
                  {difficulties.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="age-group-select-label">Yaş aralığı</InputLabel>
                <Select
                  labelId="age-group-select-label"
                  id="age-group-select"
                  label="Yaş aralığı"
                  value={productDetails.ageGroupId}
                  onChange={(e) => {
                    setProductDetails((prev) => ({
                      ...prev,
                      ageGroupId: e.target.value,
                    }));
                  }}
                >
                  {ageHasData ? (
                    agesData.map((item: AgeDataProps) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.age}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Yüklənir...</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">Qiymət</InputLabel>
                <OutlinedInput
                  value={productDetails.price}
                  onChange={(e) => {
                    // eslint-disable-next-line
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      setProductDetails((prev) => ({ ...prev, price: value ? Number(value) : 0 }));
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]|\.|-/.test(e.key) &&
                      !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">₼</InputAdornment>}
                  label="Qiymət"
                />
              </FormControl>
            </div>

            {/* img  */}
            <Typography variant="h6" sx={{ mt: 4, mb: 1, width: '100%' }}>
              Əsas şəkil
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
                  onChange={handleCoverPhotoChange}
                  style={{ display: 'none' }}
                  id="upload-photo"
                />
                <Avatar
                  key={currentPhoto}
                  // src="https://blog.sqlauthority.com/wp-content/uploads/2007/06/null-500x259.png"
                  // src={`${BASE_URL}/file/getFile/${currentPhoto}`}
                  src={`${BASE_URL}/file/getFile/${itemData?.coverImage}?t=${new Date().getTime()}`}
                  alt="Preview"
                  sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '0px',
                  }}
                />
              </label>
            </Box>

            <div className="flex w-full bg-blue-500/0 items-end justify-center flex-col gap-4">
              <div className="w-full flex flex-col bg-[khaki]/0 ">
                <Typography variant="h6" sx={{ mt: 4, mb: 1, width: '100%' }}>
                  Əlavə şəkillər <br />{' '}
                  <span className="text-sm">(bir neçə şəkil əlavə edə bilərsiniz)</span>
                </Typography>

                <div className="grid grid-cols-4 items-center justify-center gap-4">
                  {productDetails.images.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        border: 'none',
                        textAlign: 'center',
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                        position: 'relative',
                      }}
                    >
                      <Avatar
                        src={`${BASE_URL}/file/getFile/${item}?t=${new Date().getTime()}`}
                        alt="Preview"
                        sx={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '14px',
                        }}
                      />
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ position: 'absolute', top: 4, right: 4 }}
                        onClick={() => handleDeleteImage(item)}
                      >
                        Sil
                      </Button>
                    </Box>
                  ))}
                </div>

                <div>
                  {' '}
                  <Button
                    variant="contained"
                    color="inherit"
                    size="large"
                    component="label"
                    sx={{
                      cursor: 'pointer',
                      mt: 4,
                    }}
                    startIcon={<ColudIcon />}
                    className="inline"
                  >
                    <input
                      className="absolute w-full h-full opacity-0"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesChange}
                    />
                    Yeni şəkil əlavə et
                  </Button>
                </div>
              </div>
              <div className="w-full bg-purple-500/0 max-md:w-full">
                <Typography variant="h6" sx={{ mt: 4, mb: 1, width: '100%' }}>
                  PDF File <br />
                  <span className="text-sm">(dəyişdirmək üçün üzərinə klik edin)</span>
                </Typography>
                <Box
                  sx={{
                    border: 'none',
                    textAlign: 'center',
                    width: '100%',
                    // height: '300px',
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
                      // onChange={handleFileChange}
                      style={{ display: 'none' }}
                      id="upload-photo"
                    />
                    <div className="grid grid-cols-4">
                      <div className="bg-gray-200 py-2 rounded-md w-max px-5 text-center text-sm">
                        {/* {itemData?.instructionPDF && itemData?.instructionPDF} */}
                        {productDetails.instructionPDF}
                      </div>
                    </div>
                  </label>
                </Box>
              </div>
            </div>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                backgroundColor: '',
              }}
            >
              {/* <Typography variant="h6">Əsas şəkil</Typography>
              <input type="file" accept="image/*" onChange={handleCoverPhotoChange} /> */}

              {/* <Typography variant="h6">Əlavə Şəkillər (birdən çox şəkil seçmək olar)</Typography> */}
              {/* <input type="file" accept="image/*" multiple onChange={handleImagesChange} /> */}

              {/* <Typography variant="h6">PDF Faylı</Typography>
              <input type="file" accept="application/pdf" onChange={handlePdfChange} /> */}
            </Box>

            <FormGroup
              sx={{
                backgroundColor: '',
                width: '100%',
                display: 'flex',
                justifyContent: 'end',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              {/* <FormControlLabel
                label="Əsas səhifədə göstər "
                control={
                  <Switch
                    checked={productDetails.showOnHomePage}
                    onChange={() => {
                      setProductDetails({
                        ...productDetails,
                        showOnHomePage: !productDetails.showOnHomePage,
                      });
                    }}
                  />
                }
              /> */}
              <FormControlLabel
                label="Bestseller"
                control={
                  <Switch
                    defaultChecked
                    checked={productDetails.bestSeller}
                    onChange={() => {
                      setProductDetails({
                        ...productDetails,
                        bestSeller: !productDetails.bestSeller,
                      });
                    }}
                  />
                }
              />
              <FormControlLabel
                label="Popular"
                control={
                  <Switch
                    defaultChecked
                    checked={productDetails.popular}
                    onChange={() => {
                      setProductDetails({
                        ...productDetails,
                        popular: !productDetails.popular,
                      });
                    }}
                  />
                }
              />
            </FormGroup>
          </Box>
        </div>
        <div className="text-left mt-4 duration-500">
          <Button
            // disabled={
            //   !(
            //     productDetails.images.length > 0 ||
            //     productDetails.coverImage ||
            //     productDetails.difficulty
            //   ) ||
            //   !productDetails.instructionPDF ||
            //   !productDetails.translations.az.title ||
            //   !productDetails.translations.en.title ||
            //   !productDetails.translations.ru.title
            // }
            variant="contained"
            onClick={sendDatatoBackend}
          >
            Hamısını yaddaşa ver
          </Button>
        </div>
      </DashboardContent>
    </>
  );
}
