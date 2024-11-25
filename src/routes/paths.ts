// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/',
};

// ----------------------------------------------------------------------

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // haqqinda
  haqqinda: {
    root: `/haqqinda`,
    hekayemiz: `/haqqinda/hekayemiz`,
    elaveet: `/haqqinda/elaveet`,
    duzeliset: (id: string) => `/haqqinda/duzeliset/${id}`,
    insanlarnedeyir: `/haqqinda/insanlarnedeyir`,
    insanlarnedeyirelave: '/haqqinda/insanlarnedeyirelave',
    insanlarnedeyirduzelis: '/haqqinda/insanlarnedeyirduzelis',
    ustuncehetleri: `/haqqinda/ustuncehetleri`,
  },
  mehsullar: {
    root: `/mehsullar`,
    list: `/mehsullar/list`,
    mehsulelave: `/mehsullar/mehsulelave`,
    mehsulduzeliset: (id: string) => `/mehsullar/mehsulduzeliset/${id}`,
    yasaraligi: `/mehsullar/yas-araligi`,
  },
  xeberler: {
    root: `/xeberler`,
    list: `/xeberler/list`,
    xeberelaveet: `/xeberler/xeberelaveet`,
  },
  fotoqalereya: {
    root: `/fotoqalereya`,
    list: `/fotoqalereya/list`,
    fotoelaveet: `/fotoqalereya/fotoelaveet`,
  },
  videolar: {
    root: `/videolar`,
    list: `/videolar/list`,
    videoelaveet: `/videolar/videoelaveet`,
  },
  elaqe: {
    root: `/elaqe`,
    elaqe: `/elaqe/elaqe`,
    faq: `/elaqe/faq`,
    faqelaveet: `/elaqe/faqelaveet`,
  },
};
