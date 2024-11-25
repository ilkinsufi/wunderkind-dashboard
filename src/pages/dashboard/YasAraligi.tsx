import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Card, CardHeader, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';
import useApi from 'src/api/useApi';
import useDelete from 'src/api/useDelete';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import DoneIcon from '@mui/icons-material/Done';
import usePost from 'src/api/usePost';
import request from 'src/api/request';

const metadata = { title: `Yaş aralıqları` };

export default function Page() {
  const { data: ageData, hasData: ageHasData, refetch: ageRefetch } = useApi('age-group/list');
  const { deleteData } = useDelete('/age-group/delete');
  const { postData: createData } = usePost(`age-group/create`);

  const [editedAgeRanges, setEditedAgeRanges] = useState<{ [key: string]: string }>({});

  const getRandomAgeRange = () => {
    const age1 = Math.floor(Math.random() * 100);
    const age2 = Math.floor(Math.random() * 100);
    return `${age1}-${age2}`;
  };

  const handleEditItem = async (id: string) => {
    // typescript-disable-next-line
    const updatedAge = editedAgeRanges[id];
    if (id && updatedAge) {
      try {
        const response = await request.patch(
          `age-group/${id}`,
          { age: updatedAge },
          {
            headers: {
              'Content-Type': 'application/json-patch+json',
            },
          }
        );

        ageRefetch();
        toast.success('Məlumatlar yadda saxlanıldı!');
      } catch (err) {
        console.error(err);
        toast.error('Xəta baş verdi! Məlumat göndərilmədi.');
      }
    }
  };

  const handleAgeChange = (id: string, value: string) => {
    setEditedAgeRanges((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addNewItem = async (ageRange: string) => {
    console.log(ageRange);

    toast.promise(
      createData({ age: '' }).then(() => {
        ageRefetch();
      }),
      {
        loading: 'Yaradılır...',
        success: () => 'Məlumat yaratıldı!',
        error: () => 'Yaratılır zamanı səhv baş verdi!',
      }
    );
  };

  const handleDeleteAgeGroup = async (id: string) => {
    if (id) {
      toast.promise(
        deleteData(id).then(() => {
          ageRefetch();
        }),
        {
          loading: 'Silinir...',
          success: () => 'Məlumat silindi!',
          error: () => 'Silinmə zamanı səhv baş verdi!',
        }
      );
    }
  };

  useEffect(() => {
    if (ageHasData) {
      console.log(ageData);
    }
    // eslint-disable-next-line
  }, [ageHasData]);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <DashboardContent maxWidth="xl" style={{ backgroundColor: '' }}>
        <CustomBreadcrumbs
          heading="Yaş aralıqları"
          links={[{ name: 'Məhsullar' }, { name: 'Yaş aralıqları' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Box>
          <Card>
            <Box
              sx={{
                p: 3,
                pb: 3,
                alignItems: '',
                display: 'flex',
                gap: 3,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardHeader sx={{ p: 0, px: 0 }} title="Yaş aralığı" />
              {ageHasData
                ? ageData.map((item: any) => (
                    <Stack key={item.id} spacing={2}>
                      <Stack
                        spacing={2}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <TextField
                          sx={{ width: '100%' }}
                          id="outlined-helperText"
                          value={editedAgeRanges[item.id] || item.age}
                          onChange={(e) => handleAgeChange(item.id, e.target.value)}
                          placeholder="Yaş aralığı daxil edin"
                        />
                        <DoneIcon
                          onClick={() => handleEditItem(item.id)}
                          sx={{ cursor: 'pointer' }}
                          fontSize="large"
                        />
                        <CloseIcon
                          onClick={() => handleDeleteAgeGroup(item.id)}
                          sx={{ cursor: 'pointer' }}
                          fontSize="large"
                        />
                      </Stack>
                    </Stack>
                  ))
                : 'Məlumat yoxdur 😔'}

              <Button onClick={() => addNewItem(getRandomAgeRange())} variant="contained">
                Əlavə et
              </Button>
            </Box>
          </Card>
        </Box>
      </DashboardContent>
    </>
  );
}
