const Menuitems = [
  {
    title: 'Dashboard',
    icon: 'pie-chart',
    href: '/dashboard',
  },
  {
    title: 'User',
    icon: 'users',
    href: '/user',
  },
  {
    title: 'Company',
    icon: 'hard-drive',
    href: '/company',
  },
  {
    title: 'NFTs',
    icon: 'users',
    // href: '/nfts',
    collapse: true,
    children: [
      {
        title: 'NFTs',
        icon: 'list',
        href: '/nfts',
      },
      {
        title: 'AirDrop',
        icon: 'edit',
        href: '/airdrop',
      },
    ],
  },
  {
    title: 'Serials',
    icon: 'hard-drive',
    href: '/serials',
  },
  {
    title: 'Transaction',
    icon: 'hard-drive',
    href: '/transaction',
  },
  {
    title: 'Collections',
    icon: 'hard-drive',
    href: '/collection',
  },
  {
    title: 'Reward',
    icon: 'dollar-sign',
    href: '/reward',
  },
];

export default Menuitems;
