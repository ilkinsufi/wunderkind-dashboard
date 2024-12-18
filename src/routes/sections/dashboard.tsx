import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// haqqinda
const Hekayemiz = lazy(() => import('src/pages/dashboard/Hekayemiz'));
const HaqqindaElaveEt = lazy(() => import('src/pages/dashboard/HaqqindaElaveEt'));
const HaqqimizdaDuzelisEt = lazy(() => import('src/pages/dashboard/HaqqimizdaDuzelisEt'));
const InsanlarNeDeyir = lazy(() => import('src/pages/dashboard/InsanlarNeDeyir'));
const InsanlarNeDeyirElave = lazy(() => import('src/pages/dashboard/InsanlarNeDeyirElave'));
const InsanlarNeDeyirDuzelis = lazy(() => import('src/pages/dashboard/InsanlarNeDeyirDuzelis'));
const UstunCehetleri = lazy(() => import('src/pages/dashboard/UstunCehetleri'));

// mehsullar
const MehsullarList = lazy(() => import('src/pages/dashboard/MehsullarList'));
const MehsulElave = lazy(() => import('src/pages/dashboard/MehsulElave'));
const MehsulDuzelisEt = lazy(() => import('src/pages/dashboard/MehsulDuzelisEt'));
const YasAraligi = lazy(() => import('src/pages/dashboard/YasAraligi'));
const XeberlerList = lazy(() => import('src/pages/dashboard/XeberlerList'));
const XeberElaveEt = lazy(() => import('src/pages/dashboard/XeberElave'));

// fotoqalereya
const Fotoqalereya = lazy(() => import('src/pages/dashboard/Fotoqalereya'));
const FotoElaveEt = lazy(() => import('src/pages/dashboard/FotoElaveEt'));

// videolar
const Videolar = lazy(() => import('src/pages/dashboard/Videolar'));
const VideoElaveEt = lazy(() => import('src/pages/dashboard/VideoElaveEt'));

// elaqe
const FAQ = lazy(() => import('src/pages/dashboard/FAQ'));
const FAQElaveEt = lazy(() => import('src/pages/dashboard/FAQElaveEt'));
const Elaqe = lazy(() => import('src/pages/dashboard/Elaqe'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'haqqinda',
        children: [
          { path: 'hekayemiz', element: <Hekayemiz /> },
          { path: 'elaveet', element: <HaqqindaElaveEt /> },
          { path: 'duzeliset/:id', element: <HaqqimizdaDuzelisEt /> },
          { path: 'insanlarnedeyir', element: <InsanlarNeDeyir /> },
          { path: 'insanlarnedeyirelave', element: <InsanlarNeDeyirElave /> },
          { path: 'insanlarnedeyirduzelis/:id', element: <InsanlarNeDeyirDuzelis /> },
          { path: 'ustuncehetleri', element: <UstunCehetleri /> },
        ],
      },
    ],
  },
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'mehsullar',
        children: [
          { path: 'list', element: <MehsullarList /> },
          { path: 'mehsulelave', element: <MehsulElave /> },
          { path: 'mehsulduzeliset/:id', element: <MehsulDuzelisEt /> },
          { path: 'yas-araligi', element: <YasAraligi /> },
        ],
      },
    ],
  },
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'xeberler',
        children: [
          { path: 'list', element: <XeberlerList /> },
          { path: 'xeberelaveet', element: <XeberElaveEt /> },
        ],
      },
    ],
  },
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'fotoqalereya',
        children: [
          { path: 'list', element: <Fotoqalereya /> },
          { path: 'fotoelaveet', element: <FotoElaveEt /> },
        ],
      },
    ],
  },
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'videolar',
        children: [
          { path: 'list', element: <Videolar /> },
          { path: 'videoelaveet', element: <VideoElaveEt /> },
        ],
      },
    ],
  },
  {
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      {
        path: 'elaqe',
        children: [
          { path: 'elaqe', element: <Elaqe /> },
          { path: 'faq', element: <FAQ /> },
          { path: 'faqelaveet', element: <FAQElaveEt /> },
        ],
      },
    ],
  },
];
