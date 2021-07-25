import React, { useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button, Select } from '@windmill/react-ui'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
import {
  clearRequestListStatus,
  clearRequestUpdateStatus,
  fetchRequestById,
  updateRequest,
} from '../app/requestsSlice'
import { useAuth } from '../context/Auth'

function CreateRequest() {
  const history = useHistory()
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      employee_id: '',
      asset_id: '',
      quantity: '',
      date: '',
      status: '',
    },
  })
  let { id } = useParams()
  const dispatch = useDispatch()

  const requestById = useSelector((state) => state.requests.requestById)
  const requestByIdStatus = useSelector(
    (state) => state.requests.requestByIdStatus,
  )
  const requestUpdateStatus = useSelector(
    (state) => state.requests.requestUpdateStatus,
  )
  const requestListStatus = useSelector(
    (state) => state.requests.requestListStatus,
  )

  useEffect(() => {
    if (requestListStatus === 'succeeded') {
      dispatch(clearRequestListStatus())
    }
  }, [requestListStatus, dispatch])
  useEffect(() => {
    if (requestByIdStatus === 'idle') {
      dispatch(fetchRequestById(id))
    }
    console.log(requestById)

    var today = new Date(requestById.date)
    var dd = today.getDate()
    var mm = today.getMonth() + 1 //January is 0!
    var yyyy = today.getFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd + 'T' + 14 + ':' + 20
    reset({
      employee_id: requestById.employee_id,
      asset_id: requestById.asset_id,
      quantity: requestById.quantity,
      date: today,
      status: requestById.status,
    })
  }, [requestByIdStatus, dispatch])

  const canSave = requestUpdateStatus === 'idle'

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.id = id
        const resultAction = await dispatch(updateRequest(data))
        unwrapResult(resultAction)
        console.log(resultAction)
        if (resultAction.payload[0]) {
          toast.success('Berhasil menambahkan data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        dispatch(clearRequestUpdateStatus())
        history.push('/app')
      }
  }

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

      <PageTitle>Edit Request</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Employee ID</span>
              <Input
                className="mt-1"
                {...register('employee_id', { required: true })}
              />
            </Label>
            <Label>
              <span>Asset</span>
              <Input
                className="mt-1"
                {...register('asset_id', { required: true })}
              />
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
                type="datetime-local"
                className="mt-1"
                {...register('date', { required: true })}
              />
            </Label>
            <Label>
              <span>Status</span>
              <Select
                className="mt-1"
                {...register('status', { required: true })}
              >
                <option value="draft">Draft</option>
                <option value="to Buy">To Buy</option>
                <option value="to Receive">To Receive</option>
                <option value="done">Done</option>
              </Select>
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
              {requestUpdateStatus === 'loading' ? (
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
