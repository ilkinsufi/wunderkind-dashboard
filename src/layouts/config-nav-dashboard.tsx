import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  news: icon('ic-news'),
  tour: icon('ic-tour'),
  camera: icon('ic-camera'),
  video: icon('ic-video'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
  abouticon: icon('ic-about-icon'),
};

// ----------------------------------------------------------------------

export const navData = [
  /**
   * Management
   */
  {
    items: [
      {
        title: 'Haqqında',
        path: paths.haqqinda.root,
        icon: ICONS.abouticon,
        children: [
          { title: 'Hekayəmiz', path: paths.haqqinda.hekayemiz },
          { title: 'İnsanlar nə deyir', path: paths.haqqinda.insanlarnedeyir },
          { title: 'Üstün cəhətləri', path: paths.haqqinda.ustuncehetleri },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Məhsullar',
        path: paths.mehsullar.root,
        icon: ICONS.order,
        children: [
          { title: 'Bütün məhsullar', path: paths.mehsullar.list },
          { title: 'Yaş aralıqları', path: paths.mehsullar.yasaraligi },
        ],
      },
    ],
  },
  {
    items: [
      {
        title: 'Xəbərlər',
        path: paths.xeberler.root,
        icon: ICONS.news,
        children: [{ title: 'Bütün xəbərlər', path: paths.xeberler.list }],
      },
    ],
  },
  {
    items: [
      {
        title: 'Foto qalereya',
        icon: ICONS.camera,
        path: paths.fotoqalereya.root,
        children: [{ title: 'Fotolar', path: paths.fotoqalereya.list }],
      },
    ],
  },
  {
    items: [
      {
        title: 'Video qalereya',
        icon: ICONS.video,
        path: paths.videolar.root,
        children: [{ title: 'Videolar', path: paths.videolar.list }],
      },
    ],
  },

  {
    items: [
      {
        title: 'Əlaqə',
        icon: ICONS.chat,
        path: paths.elaqe.root,
        children: [
          { title: 'Əlaqə', path: paths.elaqe.elaqe },
          { title: 'FAQ', path: paths.elaqe.faq },
        ],
      },
    ],
  },
  /**
   * Overview
   */
  // {
  //   items: [
  //     { title: 'One', path: paths.dashboard.root, icon: ICONS.dashboard },
  //     { title: 'Two', path: paths.dashboard.two, icon: ICONS.ecommerce },
  //     { title: 'Three', path: paths.dashboard.three, icon: ICONS.analytics },
  //   ],
  // },
];
