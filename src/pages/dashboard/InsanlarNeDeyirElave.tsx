import { Alert, Box, Button, Rating, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import usePost from 'src/api/usePost';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const metadata = { title: `Hekayəmiz | Yeni kart` };

export default function Page() {
  const [fullName, setFullname] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);
  const [touched, setTouched] = useState({ fullName: false, description: false, rating: false });

  const { postData, loading } = usePost('review/create');
  const router = useRouter();

  const handleSubmit = async () => {
    const data = { fullName, description, rating };

    try {
      await postData(data);
      toast.success('Məlumatlar yadda saxlanıldı!');
      router.push(paths.haqqinda.insanlarnedeyir);
    } catch (error) {
      toast.error('Xəta baş verdi! Məlumat göndərilmədi.');
    }
  };

  const isFormValid = fullName.trim() !== '' && description.trim() !== '' && rating !== null;

  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl">
        <CustomBreadcrumbs
          heading="Yeni kart əlavə et"
          links={[
            { name: 'İnsanlar nə deyir', href: paths.haqqinda.insanlarnedeyir },
            { name: 'Yeni kart' },
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
          {touched.fullName && fullName.trim() === '' && (
            <Alert severity="error">Ad və Soyad daxil edilməlidir!</Alert>
          )}
          <TextField
            fullWidth
            size="small"
            label="Ad və Soyad"
            value={fullName}
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
            <Typography fontSize={12} component="legend">
              Ulduzların sayı
            </Typography>
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
