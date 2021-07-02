import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button, Select } from '@windmill/react-ui'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
import {
  clearEmployeeUpdateStatus,
  fetchEmployeeById,
  updateEmployee,
} from '../app/employeesSlice'

function EditEmployee() {
  let { id } = useParams()
  const dispatch = useDispatch()

  const employeeById = useSelector((state) => state.employees.employeeById)
  const employeeByIdStatus = useSelector(
    (state) => state.employees.employeeByIdStatus,
  )

  const employeeUpdateStatus = useSelector(
    (state) => state.employees.employeeUpdateStatus,
  )

  React.useEffect(() => {
    if (employeeByIdStatus === 'idle') {
      dispatch(fetchEmployeeById(id))
    }
  }, [employeeByIdStatus, dispatch])

  const canSave = employeeUpdateStatus === 'idle'

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: '',
      department: '',
      phone: '',
      role: '',
    },
  })

  const onSubmit = async (data) => {
    console.log(data)
    if (canSave)
      try {
        data.id = id
        console.log(data)
        const resultAction = await dispatch(updateEmployee(data))
        unwrapResult(resultAction)
        if (resultAction.payload[0] !== null) {
          toast.success('Berhasil update data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal update data!')
      } finally {
        dispatch(clearEmployeeUpdateStatus())
      }
  }

  React.useEffect(() => {
    reset({
      name: employeeById.name,
      department: employeeById.department,
      phone: employeeById.phone,
      // email: employeeById.email,
      role: employeeById.role,
    })
  }, [employeeById, reset])

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            marginTop: '90px',
            marginRight: '40px',
            background: '#363636',
            color: '#fff',
            zIndex: 1,
          },
          duration: 5000,
          success: {
            duration: 1000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
          error: {
            duration: 1000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <PageTitle>Edit Employee : {id}</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                {...register('name', { required: true })}
              />
            </Label>
            <Label>
              <span>Department</span>
              <Input
                className="mt-1"
                {...register('department', { required: true })}
              />
            </Label>
            <Label>
              <span>Phone</span>
              <Input
                className="mt-1"
                {...register('phone', { required: true })}
              />
            </Label>
            {/* <Label>
              <span>Email</span>
              <Input
                readOnly
                type="email"
                className="mt-1"
                {...register('email', { required: true })}
              />
            </Label> */}

            <Label>
              <span>Role</span>
              <Select
                className="mt-1"
                {...register('role', { required: true })}
              >
                <option value="admin">Administrator</option>
                <option value="staff">Staff</option>
                <option value="it">Staff IT</option>
              </Select>
            </Label>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <Button tag={Link} to="/app/employees" size="small">
                Cancel
              </Button>
            </div>
            <div>
              {employeeUpdateStatus === 'loading' ? (
                <>
                  <FulfillingBouncingCircleSpinner size="20" />
                </>
              ) : (
                <Button type="submit" size="small">
                  Submit
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default EditEmployee
