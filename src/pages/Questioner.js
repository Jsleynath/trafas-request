import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { RadioGroup } from '@headlessui/react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Input, Label, Button, Select } from '@windmill/react-ui'

function Questioner() {
  let { question_id } = useParams()
  let { id } = useParams()
  const question = useSelector((state) => state.qandas.questionList).find(
    (x) => x.id === question_id,
  )
  console.log(question)
  const questionName = useSelector(
    (state) => state.qandas.questionNameList,
  ).find((x) => x.id === question.question_id)
  console.log(questionName)

  return (
    <>
      <div className="flex justify-center">
        <PageTitle>Questioner : {id}</PageTitle>
      </div>
      <hr />
      <div className="w-full px-4 py-8 ">
        <div className="flex justify-center text-white text-2xl mb-5">
          {questionName.name}
        </div>
        <div className="flex justify-between px-96">
          <Button
            tag={Link}
            to={`/app${question.false}${id}`}
            className="bg-red-600 p-10"
            layout="link "
            size="large"
            aria-label="Edit"
          >
            False
          </Button>
          <Button
            tag={Link}
            to={`/app${question.true}${id}`}
            className=" bg-blue-600 p-10"
            layout="link"
            size="large"
            aria-label="Edit"
          >
            True
          </Button>
        </div>
      </div>
    </>
  )
}

export default Questioner
