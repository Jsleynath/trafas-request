import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { RadioGroup } from '@headlessui/react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Label, Button, Select } from '@windmill/react-ui'

function Decision() {
  let { decision_id } = useParams()
  let { id } = useParams()

  const decisionName = useSelector(
    (state) => state.qandas.decisionNameList,
  ).find((x) => x.id === decision_id)
  console.log(decisionName)

  return (
    <>
      <div className="flex justify-center">
        <PageTitle>Questioner : {id}</PageTitle>
      </div>
      <hr />
      <div className="w-full px-4 py-8 ">
        <div className="flex justify-center text-white text-2xl mb-5">
          Permintaan anda : {decisionName.name}
        </div>
        <div className="flex justify-center px-96">
          <Button
            tag={Link}
            to="/app/requests"
            className="bg-red-600 p-10"
            layout="link "
            size="large"
            aria-label="Edit"
          >
            Back
          </Button>
        </div>
      </div>
    </>
  )
}

export default Decision
