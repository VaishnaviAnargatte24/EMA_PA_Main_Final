import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Route} from './shared/model/general.model';
import Login from './Components/Templates/Login';
import Home from './Components/Templates/Home/Home';
import Profile from './Components/Templates/Profile/Profile';

import colors from './shared/Colors/colors';

import Dashboard from './Components/Templates/Dashboard/Dashboard';
import Classes from './Components/Templates/Classes/Classes';
import Result from './Components/Templates/Result/Result';
import Exams from './Components/Templates/Exams/Exams';
import ResultDetails from './Components/Templates/Result/components/ResultDetails';

import HomeIcon from './assets/icons/HomeIcon.svg';
import HomeActive from './assets/icons/HomeIconActive.svg';
import ClassesIcon from './assets/icons/Classes.svg';
import ClassesActive from './assets/icons/ClassesActive.svg';
import ResultIcon from './assets/icons/Result.svg';
import ResultActive from './assets/icons/ResultActive.svg';
import ExamsIcon from './assets/icons/Exams.svg';
import ExamsActive from './assets/icons/ExamsActive.svg';
import ProfileIcon from './assets/icons/Profile.svg';
import ProfileActive from './assets/icons/ProfileActive.svg';

export const ROUTES = {
  Login: 'Login',
  Home: 'Home',
  Dashboard: 'Dashboard',
  Classes: 'Classes',
  Result: 'Result',
  Exams: 'Exams',
  Profile: 'Profile',
  ResultDetails: 'ResultDetails',
} as const;

export type RootStackParamList = {
  [ROUTES.Login]: undefined;
  [ROUTES.Home]: undefined;
  [ROUTES.Dashboard]: undefined;
  [ROUTES.Profile]: undefined;
};

export type UseNavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const BOTTOM_ROUTES: Route[] = [
  {
    name: ROUTES.Home,
    component: Home,
    backgroundColor: '#ffffff',
    icon: <HomeIcon width={24} height={24} />,
    activeIcon: <HomeActive width={24} height={24} />,
  },
  {
    name: ROUTES.Classes,
    component: Classes,
    backgroundColor: '#ffffff',
    icon: <ClassesIcon width={24} height={24} />,
    activeIcon: <ClassesActive width={24} height={24} />,
  },
  {
    name: ROUTES.Result,
    component: Result,
    backgroundColor: '#ffffff',
    icon: <ResultIcon width={24} height={24} />,
    activeIcon: <ResultActive width={24} height={24} />,
  },
  {
    name: ROUTES.Exams,
    component: Exams,
    backgroundColor: '#ffffff',
    icon: <ExamsIcon width={24} height={24} />,
    activeIcon: <ExamsActive width={24} height={24} />,
  },
  {
    name: ROUTES.Profile,
    component: Profile,
    backgroundColor: '#ffffff',
    icon: <ProfileIcon width={24} height={24} />,
    activeIcon: <ProfileActive width={24} height={24} />,
  },
];

const PRE_LOGIN_ROUTES: Route[] = [
  {
    name: ROUTES.Login,
    component: Login,
    backgroundColor: '#ffffff',
  },
];

const POST_LOGIN_ROUTES: Route[] = [
  {name: ROUTES.Dashboard, component: Dashboard, backgroundColor: '#ffffff'},
  {
    name: ROUTES.ResultDetails,
    component: ResultDetails,
    backgroundColor: '#ffffff',
  },
];

export {PRE_LOGIN_ROUTES, POST_LOGIN_ROUTES};
