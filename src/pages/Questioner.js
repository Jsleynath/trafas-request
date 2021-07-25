import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link, useParams, useHistory, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { FulfillingBouncingCircleSpinner } from 'react-epic-spinners'
function Questioner() {
  let { id } = useParams()
  console.log(id)
  let { question_id } = useParams()
  console.log(question_id)

  const [linkStatus, setLinkStatus] = useState(true)
  const [linkStatus2, setLinkStatus2] = useState(true)
  const [link, setLink] = useState('')
  const [link2, setLink2] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const question = useSelector((state) => state.qandas.questionList).find(
    (x) => x.id === question_id,
  )

  const questionName = useSelector(
    (state) => state.qandas.questionNameList,
  ).find((x) => x.id === question.question_id)

  return (
    <>
      <div className="flex justify-center">
        <div className="uppercase bold text-white text-3xl my-7">
          Questioner Permintaan Barang
        </div>
      </div>
      <hr />
      {isModalOpen ? (
        <>
          <div className="flex justify-center mt-14">
            <span className="text-white text-2xl uppercase">
              Mohon menunggu sistem sedang Melakukan kalkulasi data
            </span>
          </div>
          <div className="flex justify-center mt-10">
            <FulfillingBouncingCircleSpinner size="120" />
          </div>
        </>
      ) : (
        <>
          <div className="w-full px-4 py-8 ">
            {question_id === '3001' ? (
              linkStatus ? (
                <>
                  <div className="flex justify-center text-white text-2xl mb-5">
                    {questionName.name}
                  </div>
                  <Question3001
                    question={question}
                    id={id}
                    setIsModalOpen={setIsModalOpen}
                    setLink={setLink}
                    setLinkStatus={setLinkStatus}
                  />
                </>
              ) : (
                <div className="flex flex-col justify-center">
                  <Button
                    tag={Link}
                    to={link}
                    className=" self-center bg-green-600 p-10 w-1/4"
                    layout="link "
                    size="large"
                    aria-label="Edit"
                  >
                    Next
                  </Button>
                </div>
              )
            ) : question_id === '3004' ? (
              linkStatus2 ? (
                <>
                  <div className="flex justify-center text-white text-2xl mb-5">
                    {questionName.name}
                  </div>
                  <Question3004
                    question={question}
                    id={id}
                    setIsModalOpen={setIsModalOpen}
                    setLink2={setLink2}
                    setLinkStatus2={setLinkStatus2}
                  />
                </>
              ) : (
                <div className="flex flex-col justify-center">
                  <Button
                    tag={Link}
                    to={link2}
                    className=" self-center bg-green-600 p-10 w-1/4"
                    layout="link "
                    size="large"
                    aria-label="Edit"
                  >
                    Next
                  </Button>
                </div>
              )
            ) : (
              <>
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
                    Tidak
                  </Button>
                  <Button
                    tag={Link}
                    to={`/app${question.true}${id}`}
                    className=" bg-blue-600 p-10"
                    layout="link"
                    size="large"
                    aria-label="Edit"
                  >
                    Iya
                  </Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}

function Question3001({
  id,
  question,
  setIsModalOpen,
  setLink,
  setLinkStatus,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      date: '',
    },
  })

  const onSubmit = (data) => {
    setIsModalOpen(true)
    if (new Date().toDateString() === new Date(data.date).toDateString()) {
      setInterval(() => {
        setIsModalOpen(false)
        setLink('/app' + String(question.true) + String(id))
        setLinkStatus(false)
        // return () => clearInterval()
      }, 4000)
      // return <Redirect to={`/app${question.true}${id}`} />
    } else {
      setInterval(() => {
        setIsModalOpen(false)
        setLink('/app' + String(question.false) + String(id))
        setLinkStatus(false)
      }, 4000)
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center"
        action=""
      >
        <div className="grid gap-6  md:grid-cols-1 xl:grid-cols-1">
          <Label className="  ">
            <Input
              type="datetime-local"
              className=""
              {...register('date', { required: true })}
            />
          </Label>
          <Button className="" type="submit" size="small">
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}

function Question3004({
  id,
  question,
  setIsModalOpen,
  setLink2,
  setLinkStatus2,
}) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      harga: '',
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    setIsModalOpen(true)
    if (100000 > parseFloat(data.harga)) {
      setInterval(() => {
        setIsModalOpen(false)
        setLink2('/app' + String(question.true) + String(id))
        setLinkStatus2(false)
        // return () => clearInterval()
      }, 4000)
      // return <Redirect to={`/app${question.true}${id}`} />
    } else {
      setInterval(() => {
        setIsModalOpen(false)
        setLink2('/app' + String(question.false) + String(id))
        setLinkStatus2(false)
      }, 4000)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center"
        action=""
      >
        <div className="grid gap-6  md:grid-cols-1 xl:grid-cols-1">
          <Label className="  ">
            <Input
              type="number"
              className=""
              {...register('harga', { required: true })}
            />
          </Label>
          <Button className="" type="submit" size="small">
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}

export default Questioner
