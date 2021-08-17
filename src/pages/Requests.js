import React, { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Link } from 'react-router-dom'
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input,
  Select,
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, SearchIcon, RefreshIcon } from '../icons'
import { useDispatch, useSelector } from 'react-redux'
import Fuse from 'fuse.js'
import {
  clearRequestByIdStatus,
  deleteRequest,
  fetchFilterRequest,
  fetchRequest,
} from '../app/requestsSlice'
import { useAuth } from '../context/Auth'
import { FilterIcon } from '../icons'
import { useForm } from 'react-hook-form'

function Requests() {
  const { user } = useAuth()
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  })
  const [dataTable, setDataTable] = useState([])

  const onSubmitFilter = async (data) => {
    if (data.start_date) {
      const oTime = new Date(data.start_date).valueOf()
      const iTime = new Date(data.end_date).valueOf()

      if (oTime >= iTime) {
        alert('waktu awal harus lebih kecil dari waktu akhir')
      }

      setDataTable(
        response.filter(
          (value) =>
            oTime < new Date(value.created_at).valueOf() &&
            iTime > new Date(value.created_at).valueOf(),
        ),
      )
    }

    if (data.status) {
      const oTime = new Date(data.start_date).valueOf()
      const iTime = new Date(data.end_date).valueOf()

      if (oTime >= iTime) {
        alert('waktu awal harus lebih kecil dari waktu akhir')
      }

      if (data.start_time) {
        setDataTable(
          response
            .filter(
              (value) =>
                oTime < new Date(value.created_at).valueOf() &&
                iTime > new Date(value.created_at).valueOf(),
            )
            .filter((value) => value.status === data.status),
        )
      }
      setDataTable(response.filter((value) => value.status === data.status))
    }
  }
  const onSubmitRefresh = async (data) => {
    reset({ start_date: '', end_date: '', status: '' })
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage,
      ),
    )
  }

  const temp = user?.user_metadata?.role ?? ''
  const dispatch = useDispatch()

  const response = useSelector((state) => state.requests.requestList)

  const requestListStatus = useSelector(
    (state) => state.requests.requestListStatus,
  )
  const requestByIdStatus = useSelector(
    (state) => state.requests.requestByIdStatus,
  )

  useEffect(() => {
    if (requestByIdStatus === 'succeeded') {
      dispatch(clearRequestByIdStatus())
    }
  }, [requestByIdStatus, dispatch])

  useEffect(() => {
    if (requestListStatus === 'idle') {
      dispatch(fetchRequest())
    }
  }, [requestListStatus, dispatch])

  const [pageTable, setPageTable] = useState(1)

  const resultsPerPage = 7
  const totalResults = response.length

  function onPageChangeTable(p) {
    setPageTable(p)
  }

  function removeRequest(id) {
    dispatch(deleteRequest(id))
  }

  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage,
      ),
    )
  }, [response, pageTable])

  return (
    <>
      <PageTitle>
        <div className="flex justify-between">
          <div>Request list</div>
          <div className="float-right">
            <Button size="small" tag={Link} to="/app/requests/new">
              + new request
            </Button>
          </div>
        </div>
      </PageTitle>
      <hr className="mb-1" />
      <div className="my-3 ">
        <form className="flex flex-row" onSubmit={handleSubmit(onSubmitFilter)}>
          <span className="mr-2 text-white w-3/12 text-center self-center">
            Start Date
          </span>
          <Input
            className="mr-2"
            type="datetime-local"
            {...register('start_date')}
          />
          <span className="mr-2 text-white w-3/12 text-center self-center">
            End Date
          </span>
          <Input
            className="mr-3"
            type="datetime-local"
            {...register('end_date')}
          />
          <Select className="mr-2" {...register('status')}>
            <option disabled selected>
              select option ...
            </option>
            <option value="draft">draft</option>
            <option value="postpone">postpone</option>
            <option value="to Buy">to Buy</option>
            <option value="to Receive">to Receive</option>
            <option value="approved">approved</option>
            <option value="rejected">rejected</option>
            <option value="done">done</option>
          </Select>
          <Button type="submit" className="mr-2" size="small">
            <FilterIcon />
          </Button>
          <Button onClick={onSubmitRefresh} size="small">
            <RefreshIcon />
          </Button>
        </form>
      </div>
      <TableContainer className="mb-8 ">
        <Table className=" w-full">
          <TableHeader>
            <tr>
              <TableCell>Created by</TableCell>
              <TableCell>Created at</TableCell>
              <TableCell>Requested item</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Received Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell className="text-center">Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {temp === 'admin' || temp === 'staff-admin'
              ? dataTable.map((data, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{data.employees.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {new Date(data.created_at).toUTCString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{data.item_description}</span>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/app/requests/detail/${data.id}`}
                        className="text-sm"
                      >
                        {data.assets ? data.assets.name : ''}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{data.quantity}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{data.date}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{data.status}</span>
                    </TableCell>

                    <TableCell>
                      <div className="flex   justify-center ">
                        <div className=" space-x-4">
                          {data.status === 'draft' ? (
                            <Button
                              tag={Link}
                              to={`/app/questioner/question/3001/${data.id}`}
                              layout="link"
                              size="icon"
                              aria-label="Edit"
                            >
                              <SearchIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </Button>
                          ) : null}
                          {temp === 'admin' || temp === 'staff-admin' ? (
                            <>
                              <Button
                                tag={Link}
                                to={`/app/requests/edit/${data.id}`}
                                layout="link"
                                size="icon"
                                aria-label="Edit"
                              >
                                <EditIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </Button>
                              <Button
                                onClick={() => removeRequest(data.id)}
                                layout="link"
                                size="icon"
                                aria-label="Delete"
                              >
                                <TrashIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </Button>
                            </>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : dataTable.map((data, i) =>
                  data.employee_id === user.id ? (
                    <TableRow key={i}>
                      <TableCell>
                        <span className="text-sm">
                          {new Date(data.created_at).toUTCString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{data.item_description}</span>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/app/requests/detail/${data.id}`}
                          className="text-sm"
                        >
                          {data.assets ? data.assets.name : ''}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{data.quantity}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{data.date}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{data.status}</span>
                      </TableCell>

                      <TableCell>
                        <div className="flex   justify-center ">
                          <div className=" space-x-4">
                            {data.status === 'draft' ? (
                              <Button
                                tag={Link}
                                to={`/app/questioner/question/3001/${data.id}`}
                                layout="link"
                                size="icon"
                                aria-label="Edit"
                              >
                                <SearchIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </Button>
                            ) : null}
                            {temp === 'admin' || temp === 'staff-admin' ? (
                              <>
                                <Button
                                  tag={Link}
                                  to={`/app/requests/edit/${data.id}`}
                                  layout="link"
                                  size="icon"
                                  aria-label="Edit"
                                >
                                  <EditIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </Button>
                                <Button
                                  onClick={() => removeRequest(data.id)}
                                  layout="link"
                                  size="icon"
                                  aria-label="Delete"
                                >
                                  <TrashIcon
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                  />
                                </Button>
                              </>
                            ) : null}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : null,
                )}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Requests
