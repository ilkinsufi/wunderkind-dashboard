import { Alert, Box, Button, Rating, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import useApi from 'src/api/useApi';
import usePatch from 'src/api/usePatch';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const metadata = { title: `Hekayəmiz | Düzəliş et` };

export default function Page() {
  const { id } = useParams(); // Gelen id'yi yakala
  const router = useRouter();

  const { data, error, hasData } = useApi(`/review/get/${id}`); // Mevcut veriyi çek
  const { patchData } = usePatch(`/review/${id}`); // PATCH isteği için hook

  const [fullname, setFullname] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [touched, setTouched] = useState({ fullname: false, description: false, rating: false });

  useEffect(() => {
    // Veriler geldikten sonra state'i güncelle
    if (hasData && data) {
      setFullname(data.fullName || '');
      setDescription(data.description || '');
      setRating(data.rating || null);
    }
  }, [data, hasData]);

  const isFormValid = fullname.trim() !== '' && description.trim() !== '' && rating !== null;

  const handleSubmit = async () => {
    const updatedData = { fullName: fullname, description, rating };

    try {
      await patchData(updatedData); // Güncelleme isteği
      toast.success('Məlumatlar yadda saxlanıldı!');
      router.push(paths.haqqinda.insanlarnedeyir); // Başarılı olursa yönlendirme
    } catch (err) {
      toast.error('Xəta baş verdi! Məlumat göndərilmədi.');
    }
  };

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Düzəliş et"
          links={[
            { name: 'İnsanlar nə deyir', href: paths.haqqinda.insanlarnedeyir },
            { name: 'Düzəliş et' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Box
          sx={{
            mb: 3,
            p: 2,
            borderRadius: 2,
            boxShadow: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* Fullname Input */}
          {touched.fullname && fullname.trim() === '' && (
            <Alert severity="error">Ad və Soyad daxil edilməlidir!</Alert>
          )}
          <TextField
            fullWidth
            size="small"
            label="Ad və Soyad"
            value={fullname}
            onChange={(e) => {
              setFullname(e.target.value);
              setTouched((prev) => ({ ...prev, fullname: true }));
            }}
          />

          {/* Rating Input */}
          {touched.rating && rating === null && (
            <Alert severity="error">Ulduzların sayı seçilməlidir!</Alert>
          )}
          <Box display="flex" alignItems="center" gap={2}>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
                setTouched((prev) => ({ ...prev, rating: true }));
              }}
            />
          </Box>

          {/* Description Input */}
          {touched.description && description.trim() === '' && (
            <Alert severity="error">Açıqlama daxil edilməlidir!</Alert>
          )}
          <TextField
            multiline
            fullWidth
            rows={4}
            size="medium"
            label="Açıqlama"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setTouched((prev) => ({ ...prev, description: true }));
            }}
          />

          <Button onClick={handleSubmit} variant="contained" disabled={!isFormValid} sx={{ mt: 2 }}>
            Yadda saxla
          </Button>
        </Box>
      </DashboardContent>
    </>
  );
}
