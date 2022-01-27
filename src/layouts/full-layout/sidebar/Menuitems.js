import TokenOutlinedIcon from '@mui/icons-material/TokenOutlined';
import BusinessIcon from '@mui/icons-material/Business';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import NumbersIcon from '@mui/icons-material/Numbers';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

const Menuitems = [
  {
    title: 'Dashboard',
    icon: <DashboardOutlinedIcon width="20" height="20" />,
    href: '/dashboard',
  },
  {
    title: 'Admins',
    icon: <SupervisorAccountOutlinedIcon width="20" height="20" />,
    href: '/admins',
  },
  {
    title: 'User',
    icon: <PeopleAltOutlinedIcon width="20" height="20" />,
    href: '/user',
  },
  {
    title: 'Company',
    // icon: 'hard-drive',
    icon: <BusinessIcon width="20" height="20" />,
    href: '/company',
  },
  {
    title: 'NFTs',
    // icon: 'users',
    // href: '/nfts',
    icon: <TokenOutlinedIcon width="20" height="20" />,
    collapse: true,
    children: [
      {
        title: 'NFTs',
        icon: <TokenOutlinedIcon width="20" height="20" />,
        href: '/nfts',
      },
      {
        title: 'AirDrop',
        // icon: 'edit',
        icon: <InvertColorsIcon width="20" height="20" />,
        href: '/airdrop',
      },
    ],
  },
  {
    title: 'Serials',
    icon: <NumbersIcon width="20" height="20" />,
    href: '/serials',
  },
  {
    title: 'Transaction',
    icon: <SwapHorizIcon width="20" height="20" />,
    href: '/transaction',
  },
  {
    title: 'Collections',
    // icon: 'hard-drive',
    icon: <CollectionsOutlinedIcon width="20" height="20" />,
    href: '/collection',
  },
  {
    title: 'Reward',
    icon: <EmojiEventsOutlinedIcon width="20" height="20" />,
    href: '/reward',
  },
];

export default Menuitems;
