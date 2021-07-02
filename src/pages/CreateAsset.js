import React from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button } from '@windmill/react-ui'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
import { clearCreateAssetStatus, createNewAsset } from '../app/assetsSlice'

function CreateAsset() {
  const dispatch = useDispatch()
  const createAssetStatus = useSelector(
    (state) => state.assets.createAssetStatus,
  )
  const canSave = createAssetStatus === 'idle'

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      quantity: '',
      unit: '',
    },
  })

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createNewAsset(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          toast.success('Berhasil menambahkan data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        dispatch(clearCreateAssetStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: '',
        quantity: '',
        unit: '',
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

      <PageTitle>New Asset</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Name</span>
            <Input className="mt-1" {...register('name', { required: true })} />
          </Label>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Qty</span>
              <Input
                className="mt-1"
                type="number"
                {...register('quantity', { required: true })}
              />
            </Label>
            <Label>
              <span>Unit</span>
              <Input
                className="mt-1"
                {...register('unit', { required: true })}
              />
            </Label>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <Button tag={Link} to="/app/assets" size="small">
                Cancel
              </Button>
            </div>
            <div>
              {createAssetStatus === 'loading' ? (
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

export default CreateAsset
