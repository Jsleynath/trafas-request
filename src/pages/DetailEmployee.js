import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Select } from '@windmill/react-ui'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchEmployeeById,
} from '../app/employeesSlice'

function DetailEmployee() {
  let { id } = useParams();
  const dispatch = useDispatch()
  const employeeById = useSelector((state)=>state.employees.employeeById)
  const employeeByIdStatus = useSelector((state)=>state.employees.employeeByIdStatus)


  React.useEffect(() => {
    if (employeeByIdStatus === 'idle') {
      dispatch(fetchEmployeeById(id))
    }
  }, [employeeByIdStatus, dispatch])

  const {
    register,
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      department: '',
      phone: '',
      email: '',
      password: '',
      role: '',
    },
  })

  React.useEffect(() => {
      reset({
        name: employeeById.name,
        department: employeeById.department,
        phone: employeeById.phone,
        email: employeeById.email,
        password: employeeById.password,
        role: employeeById.role,
      })
    
  }, [employeeById, reset])

  return (
    <>
      <PageTitle>Detail Employee</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Name</span>
              <Input
                disabled
                className="mt-1"
                {...register('name', { required: true })}
              />
            </Label>
            <Label>
              <span>Department</span>
              <Input
                disabled
                className="mt-1"
                {...register('department', { required: true })}
              />
            </Label>
            <Label>
              <span>Phone</span>
              <Input
                disabled
                className="mt-1"
                {...register('phone', { required: true })}
              />
            </Label>
            <Label>
              <span>Email</span>
              <Input
                disabled
                type='email'
                className="mt-1"
                {...register('email', { required: true })}
              />
            </Label>
            <Label>
              <span>Password</span>
              <Input
                disabled
                className="mt-1"
                {...register('password', { required: true })}
              />
            </Label>
            <Label>
              <span>Role</span>
              <Select
                disabled
                className="mt-1"
                {...register('role', { required: true })}
              >
                <option value="admin">Administrator</option>
                <option value="staff">Staff</option>
                <option value="it">Staff IT</option>
              </Select>
            </Label>
          </div>
        </form>
      </div>
    </>
  )
}

export default DetailEmployee
