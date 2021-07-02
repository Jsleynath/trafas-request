import React, { useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button, Select } from '@windmill/react-ui'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
import {
  clearCreateRequestStatus,
  createNewRequest,
} from '../app/requestsSlice'
import { useAuth } from '../context/Auth'
import { fetchAsset } from '../app/assetsSlice'

function CreateRequest() {
  const { user } = useAuth()
  var today = new Date()
  var dd = today.getDate()
  var mm = today.getMonth() + 1 //January is 0!
  var yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd

  const dispatch = useDispatch()
  const createRequestStatus = useSelector(
    (state) => state.requests.createRequestStatus,
  )

  const assetList = useSelector((state) => state.assets.assetList)
  const assetListStatus = useSelector((state) => state.assets.assetListStatus)

  useEffect(() => {
    if (assetListStatus === 'idle') {
      dispatch(fetchAsset())
    }
  }, [assetListStatus, dispatch])

  const canSave = createRequestStatus === 'idle'

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      employee_id: user.id,
      asset_id: '',
      quantity: '',
      date: today,
      status: 'draft',
    },
  })

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createNewRequest(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          toast.success('Berhasil menambahkan data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        dispatch(clearCreateRequestStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        employee_id: user.id,
        asset_id: '',
        quantity: '',
        date: today,
        status: 'draft',
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

      <PageTitle>New Request</PageTitle>
      <div className="text-white">{JSON.stringify(user)}</div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Employee ID</span>
              <Input
                className="mt-1"
                value={user.id}
                {...register('employee_id', { required: true })}
              />
            </Label>
            <Label>
              <span>Asset</span>
              <Select
                className="mt-1"
                {...register('asset_id', { required: true })}
              >
                {assetList.map((data) => (
                  <option value={data.id}>{data.name}</option>
                ))}
              </Select>
            </Label>
            <Label>
              <span>Quantity</span>
              <Input
                type="number"
                className="mt-1"
                {...register('quantity', { required: true })}
              />
            </Label>
            <Label>
              <span>Date</span>
              <Input
                type="date"
                className="mt-1"
                value={today}
                {...register('date', { required: true })}
              />
            </Label>
            <Label>
              <span>Status</span>
              <Input
                className="mt-1"
                value="draft"
                {...register('status', { required: true })}
              />
            </Label>
            <Label></Label>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <Button tag={Link} to="/app/requests" size="small">
                Cancel
              </Button>
            </div>
            <div>
              {createRequestStatus === 'loading' ? (
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

export default CreateRequest
