import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { RadioGroup } from '@headlessui/react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Input, Label, Button, Select } from '@windmill/react-ui'
import { updateRequest } from '../app/requestsSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { clearRequestListStatus } from '../app/requestsSlice'
function Decision() {
  const history = useHistory()
  const dispatch = useDispatch()
  let { decision_id } = useParams()
  let { id } = useParams()

  const decisionName = useSelector(
    (state) => state.qandas.decisionNameList,
  ).find((x) => x.id === decision_id)

  const requestListStatus = useSelector(
    (state) => state.requests.requestListStatus,
  )

  useEffect(() => {
    if (requestListStatus === 'succeeded') {
      dispatch(clearRequestListStatus())
    }
  }, [requestListStatus, dispatch])

  const canSave = true

  const onSubmit = async (data) => {
    if (canSave)
      try {
        data.id = id
        console.log(data)
        const resultAction = await dispatch(updateRequest(data))
        unwrapResult(resultAction)
        // console.log(resultAction)
      } catch (error) {
        // if (error) throw toast.error('Gagal menambahkan data!')
      } finally {
        // dispatch(clearRequestUpdateStatus())
        history.push('/app')
      }
  }

  return (
    <>
      <div className="flex justify-center">
        <PageTitle>Questioner : {id}</PageTitle>
      </div>
      <hr />
      <div className="w-full px-4 py-8 ">
        <div className="flex justify-center text-white text-2xl mb-5">
          PERMINTAAN ANDA {decisionName.name}
        </div>
        <div className="flex justify-center px-96">
          <Button
            tag={Link}
            onClick={() => onSubmit({ status: decisionName.status })}
            className="bg-green-600 p-10"
            layout="link "
            size="large"
            aria-label="Edit"
          >
            SUBMIT
          </Button>
        </div>
      </div>
    </>
  )
}

export default Decision
