import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button, Select } from '@windmill/react-ui'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
import {
  clearCreateEmployeeStatus,
  createNewEmployee,
} from '../app/employeesSlice'

function CreateEmployee() {
  const dispatch = useDispatch()
  const createEmployeeStatus = useSelector(
    (state) => state.employees.createEmployeeStatus,
  )
  const canSave = createEmployeeStatus === 'idle'

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
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

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.role = { role: data.role }
        const resultAction = await dispatch(createNewEmployee(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          toast.success('Berhasil menambahkan data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        dispatch(clearCreateEmployeeStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: '',
        password: '',
      })
    }
  }, [formState, reset])

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

      <PageTitle>New Employee</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Name</span>
              <Input
                type="text"
                className="mt-1"
                {...register('name', { required: true })}
              />
            </Label>
            <Label>
              <span>Department</span>
              <Input
                type="text"
                className="mt-1"
                {...register('department', { required: true })}
              />
            </Label>
            <Label>
              <span>Phone</span>
              <Input
                type="text"
                className="mt-1"
                {...register('phone', { required: true })}
              />
            </Label>
            <Label>
              <span>Role</span>
              <Input
                type="text"
                className="mt-1"
                {...register('role', { required: true })}
              />
            </Label>
            <Label>
              <span>Email</span>
              <Input
                type="email"
                className="mt-1"
                {...register('email', { required: true })}
              />
            </Label>
            <Label>
              <span>Password</span>
              <Input
                type="password"
                className="mt-1"
                {...register('password', { required: true })}
              />
            </Label>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <Button tag={Link} to="/app/employees" size="small">
                Cancel
              </Button>
            </div>
            <div>
              {createEmployeeStatus === 'loading' ? (
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

export default CreateEmployee
