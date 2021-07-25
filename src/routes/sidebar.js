const roles = [
  {
    role: 'admin',
    routes: [
      {
        path: '/app/requests',
        icon: 'CartIcon',
        name: 'Requests',
      },
      {
        path: '/app/assets',
        icon: 'ModalsIcon',
        name: 'Assets',
      },
      {
        path: '/app/employees',
        icon: 'PeopleIcon',
        name: 'Employees',
      },
    ],
  },
  {
    role: 'staff-admin',
    routes: [
      {
        path: '/app/requests',
        icon: 'CartIcon',
        name: 'Requests',
      },
      {
        path: '/app/assets',
        icon: 'ModalsIcon',
        name: 'Assets',
      },
    ],
  },
  {
    role: 'staff',
    routes: [
      {
        path: '/app/requests',
        icon: 'CartIcon',
        name: 'Requests',
      },
      {
        path: '/app/assets',
        icon: 'ModalsIcon',
        name: 'Assets',
      },
    ],
  },
]

export default roles
