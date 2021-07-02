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
  },
  {
    path: '/requests/new',
    component: CreateRequest,
  },
  {
    path: '/requests/detail/:id',
    component: DetailRequest,
  },
  {
    path: '/requests/edit/:id',
    component: EditRequest,
  },
  {
    path: '/assets',
    component: Assets,
  },
  {
    path: '/assets/new',
    component: CreateAsset,
  },
  {
    path: '/assets/detail/:id',
    component: DetailAsset,
  },
  {
    path: '/assets/edit/:id',
    component: EditAsset,
  },
  {
    path: '/employees',
    component: Employees,
  },
  {
    path: '/employees/new',
    component: CreateEmployee,
  },
  {
    path: '/employees/detail/:id',
    component: DetailEmployee,
  },
  {
    path: '/employees/edit/:id',
    component: EditEmployee,
  },
  {
    path: '/questioner/question/:question_id/:id',
    component: Questioner,
  },
  {
    path: '/questioner/decision/:decision_id/:id',
    component: Decision,
  },
]

export default routes
