import {
  AiOutlineHome,
  AiOutlineEuroCircle,
  AiOutlineBell,
  AiOutlineQuestionCircle,
} from 'react-icons/ai';
import { BiChevronDown, BiChevronUp} from "react-icons/bi";
import { FaUser, FaClipboardList } from 'react-icons/fa';
import { BsFillMegaphoneFill, BsFillGearFill, BsHeadset } from 'react-icons/bs';
import { IoMdTimer } from 'react-icons/io';
import { IoDocumentAttachOutline } from 'react-icons/io5';
import { TbFileCertificate } from 'react-icons/tb';
import { MdWork } from 'react-icons/md';
import { ReactComponent as PtwIcon } from '@assets/icons/sidebar/ptwIcon.svg';
import { ReactComponent as ScaffoldIcon } from '@assets/icons/sidebar/scaffoldIcon.svg';
import { ReactComponent as PlannerIcon } from '@assets/icons/sidebar/plannerIcon.svg';
import { ReactComponent as UserRolesIcon } from '@assets/icons/sidebar/userRoles.svg';
import { ReactComponent as ReportIcon } from '@assets/icons/sidebar/report.svg';

export const navItemsTop = [
  {
    title: 'Dashboard',
    route: '/',
    icon: <AiOutlineHome />,
  },
  {
    title: 'PTW',
    route: '/ptw',
    icon: <PtwIcon className="imported-icon" />,
  },
  {
    title: 'ToolBox Meetings',
    route: '/toolbox-meetings',
    icon: <BsFillMegaphoneFill />,
  },
  {
    title: 'Site Inspections',
    route: '/site-inspections',
    icon: <FaClipboardList />,
  },
  {
    title: 'LMRA',
    route: '/lmra',
    icon: <IoMdTimer />,
  },
  {
    title: 'Competence',
    route: '/competence',
    icon: <TbFileCertificate />,
  },
  {
    title: 'Scaffolding Management',
    route: '/scaffolding-management',
    icon: <ScaffoldIcon className="imported-icon" />,
  },
  {
    title: 'Journer Planner',
    route: '/journery-planner',
    icon: <PlannerIcon className="imported-icon" />,
  },
  {
    title: 'Safety Documents',
    route: '/safety-dicuments',
    icon: <IoDocumentAttachOutline />,
  },
];

export const navItemsBottom = [
  {
    title: 'Clients',
    route: '/clients',
    icon: <MdWork />,
  },
  {
    title: 'Users',
    route: '/users',
    icon: <FaUser />,
  },
  {
    title: 'Roles & Permissions',
    route: '/roles-permissions',
    icon: <UserRolesIcon className="imported-icon" />,
  },
  {
    title: 'Billings & Subscirptions',
    route: '/billings-subscriptions',
    icon: <AiOutlineEuroCircle />,
    iconClosed : <BiChevronDown />,
    iconOpened : <BiChevronUp />, 
  }, 
      {
        title : 'Invoices',
        route : '/billings-subscriptions/invoices'
      },
      {
        title : 'Plans Settings',
        route : '/billings-subscriptions/plans-settings'
      }
    
  ,
  
  {
    title: 'Notifications & Emails',
    route: '/notifications-emails',
    icon: <AiOutlineBell />,
  },
  {
    title: 'Reports',
    route: '/reports',
    icon: <ReportIcon className="imported-icon" />,
  },
  {
    title: 'General Settings',
    route: '/general-settings',
    icon: <BsFillGearFill />,
  },
  {
    title: 'Support & Issues',
    route: '/support-issues',
    icon: <BsHeadset />,
  },
  {
    title: 'Help & Documentation',
    route: '/help-documentation',
    icon: <AiOutlineQuestionCircle />,
  },
];
