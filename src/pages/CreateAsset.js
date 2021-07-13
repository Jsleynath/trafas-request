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
import { Link } from 'react-router-dom'
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
  clearCreateDetailassetStatus,
  createNewDetailasset,
} from '../app/detailassetsSlice'

function CreateAsset() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const dispatch = useDispatch()
  const category = useSelector((state) => state.assets.assetList)
  const createDetailassetStatus = useSelector(
    (state) => state.detailassets.createDetailassetStatus,
  )
  const assetListStatus = useSelector((state) => state.assets.assetListStatus)

  useEffect(() => {
    if (assetListStatus === 'idle') {
      dispatch(fetchAsset())
    }
  }, [assetListStatus, dispatch])

  const canSave = createDetailassetStatus === 'idle'

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      code: Math.random().toString(36).substr(2, 9).toUpperCase(),
      brand: '',
      name: '',
      asset_id: '',
      qty: 0,
      unit: '',
    },
  })

  const onSubmit = async (data) => {
    if (canSave)
      try {
        const resultAction = await dispatch(createNewDetailasset(data))
        unwrapResult(resultAction)
        if (resultAction.payload.error === null) {
          toast.success('Berhasil menambahkan data!')
        }
      } catch (error) {
        if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        dispatch(clearCreateDetailassetStatus())
      }
  }

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        code: Math.random().toString(36).substr(2, 9).toUpperCase(),
        brand: '',
        name: '',
        asset_id: '',
        qty: 0,
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
      <CreateCategory isModalOpen={isModalOpen} closeModal={closeModal} />

      <PageTitle>
        <div className="flex justify-between">
          <div>New Asset</div>
          <div className="float-right">
            <Button size="small" onClick={openModal}>
              + add category
            </Button>
          </div>
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
                type="number"
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
              {createDetailassetStatus === 'loading' ? (
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

function CreateCategory({ isModalOpen, closeModal }) {
  const dispatch = useDispatch()
  const createAssetStatus = useSelector(
    (state) => state.assets.createAssetStatus,
  )
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
    },
  })

  const canSave = createAssetStatus === 'idle'

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
        dispatch(clearAssetListStatus())
      }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalHeader>New Category</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Category name</span>
            <Input className="mt-1" {...register('name', { required: true })} />
          </Label>
          <Button className="my-4 float-right" type="submit" size="small">
            + add
          </Button>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default CreateAsset
