import { lazy } from 'react'

const Requests = lazy(() => import('../pages/Requests'))
const CreateRequest = lazy(() => import('../pages/CreateRequest'))
const DetailRequest = lazy(() => import('../pages/DetailRequest'))
const EditRequest = lazy(() => import('../pages/EditRequest'))
const Assets = lazy(() => import('../pages/Assets'))
const CreateAsset = lazy(() => import('../pages/CreateAsset'))
const DetailAsset = lazy(() => import('../pages/DetailAsset'))
const EditAsset = lazy(() => import('../pages/EditAsset'))
const Employees = lazy(() => import('../pages/Employees'))
const CreateEmployee = lazy(() => import('../pages/CreateEmployee'))
const DetailEmployee = lazy(() => import('../pages/DetailEmployee'))
const EditEmployee = lazy(() => import('../pages/EditEmployee'))
const Questioner = lazy(() => import('../pages/Questioner'))
const Decision = lazy(() => import('../pages/Decision'))

const routes = [
  {
    path: '/requests',
    component: Requests,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/requests/new',
    component: CreateRequest,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/requests/detail/:id',
    component: DetailRequest,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/requests/edit/:id',
    component: EditRequest,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/assets',
    component: Assets,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/assets/new',
    component: CreateAsset,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/assets/detail/:id',
    component: DetailAsset,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/assets/edit/:id',
    component: EditAsset,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/employees',
    component: Employees,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/employees/new',
    component: CreateEmployee,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/employees/detail/:id',
    component: DetailEmployee,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/employees/edit/:id',
    component: EditEmployee,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/questioner/question/:question_id/:id',
    component: Questioner,
    roles: ['admin', 'staff-admin', 'staff'],
  },
  {
    path: '/questioner/decision/:decision_id/:id',
    component: Decision,
    roles: ['admin', 'staff-admin', 'staff'],
  },
]

export default routes
