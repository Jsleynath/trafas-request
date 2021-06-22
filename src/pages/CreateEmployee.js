import React, { useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Button, Select } from '@windmill/react-ui'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster, useToaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
import {
  clearCreateShipmentStatus,
  clearShipmentList,
  clearShipmentListStatus,
  createNewShipment,
} from '../app/shipmentsSlice'
import { Editor } from '@tinymce/tinymce-react'
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
    formState: { errors },
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      role: '',
    },
  })

  const onSubmit = async (data) => {
    if (canSave)
      try {
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
        name: '',
        role: '',
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
              <span>Name :</span>
              <Input
                className="mt-1"
                {...register('name', { required: true })}
              />
            </Label>
            <Label>
              <span>Role</span>
              <Select
                className="mt-1"
                {...register('role', { required: true })}
              >
                <option value="administrator">Administrator</option>
                <option value="admin-staff">Staff Admin</option>
                <option value="courier-staff">Staff Courier</option>
                <option value="logistic-staff">Staff Logistic</option>
                <option value="marketing-staff">Staff Marketing</option>
              </Select>
            </Label>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <Button tag={Link} to="/app/shipment" size="small">
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