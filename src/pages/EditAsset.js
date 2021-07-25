import React, { useState, useEffect } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import {
  Input,
  Label,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Select,
} from '@windmill/react-ui'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
import {
  fetchAsset,
  clearCreateAssetStatus,
  createNewAsset,
  clearAssetListStatus,
} from '../app/assetsSlice'
import {
  clearDetailassetUpdateStatus,
  fetchDetailassetById,
  updateDetailasset,
} from '../app/detailassetsSlice'

function CreateAsset() {
  let { id } = useParams()
  const dispatch = useDispatch()
  const category = useSelector((state) => state.assets.assetList)
  const detailassetUpdateStatus = useSelector(
    (state) => state.detailassets.detailassetUpdateStatus,
  )
  const detailassetByIdStatus = useSelector(
    (state) => state.detailassets.detailassetByIdStatus,
  )
  const detailassetById = useSelector(
    (state) => state.detailassets.detailassetById,
  )

  useEffect(() => {
    if (detailassetByIdStatus === 'idle') {
      dispatch(fetchAsset())
      dispatch(fetchDetailassetById(id))
    }
    reset({
      code: detailassetById.code,
      brand: detailassetById.brand,
      name: detailassetById.name,
      asset_id: detailassetById.asset_id,
      qty: detailassetById.qty,
      unit: detailassetById.unit,
    })
  }, [detailassetByIdStatus, dispatch])

  const canSave = detailassetUpdateStatus === 'idle'

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      code: '',
      brand: '',
      name: '',
      asset_id: '',
      qty: '',
      unit: '',
    },
  })

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.id = id
        console.log(data)
        const resultAction = await dispatch(updateDetailasset(data))
        unwrapResult(resultAction)
        if (resultAction.payload[0]) {
          toast.success('Berhasil menambahkan data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        dispatch(clearDetailassetUpdateStatus())
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

      <PageTitle>
        <div className="flex justify-between">
          <div>Edit Asset</div>
        </div>
      </PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-6 mt-4 mb-4 md:grid-cols-2 xl:grid-cols-2">
            <Label>
              <span>Code</span>
              <Input
                className="mt-1"
                {...register('code', { required: true })}
              />
            </Label>
            <Label>
              <span>Brand</span>
              <Input
                className="mt-1"
                {...register('brand', { required: true })}
              />
            </Label>
            <Label>
              <span>Name</span>
              <Input
                className="mt-1"
                {...register('name', { required: true })}
              />
            </Label>
            <Label>
              <span>Category</span>
              <Select
                className="mt-1"
                {...register('asset_id', { required: true })}
              >
                {category.map((data) => (
                  <option value={data.id}>{data.name}</option>
                ))}
              </Select>
            </Label>
            <Label>
              <span>Qty</span>
              <Input
                className="mt-1"
                type="text"
                value={1}
                {...register('qty', { required: true })}
              />
            </Label>
            <Label>
              <span>Unit</span>
              <Select
                className="mt-1"
                {...register('unit', { required: true })}
              >
                <option>Pcs</option>
                <option>Meter</option>
                <option>Lot</option>
              </Select>
            </Label>
          </div>
          <div className="flex justify-between mt-5">
            <div>
              <Button tag={Link} to="/app/assets" size="small">
                Cancel
              </Button>
            </div>
            <div>
              {detailassetUpdateStatus === 'loading' ? (
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
