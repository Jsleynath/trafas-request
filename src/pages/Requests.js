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
} from '@windmill/react-ui'
import { EditIcon, TrashIcon, SearchIcon } from '../icons'
import { useDispatch, useSelector } from 'react-redux'
import Fuse from 'fuse.js'
import {
  clearRequestByIdStatus,
  deleteRequest,
  fetchRequest,
} from '../app/requestsSlice'
import { useAuth } from '../context/Auth'

function Requests() {
  const { user } = useAuth()
  const temp = user?.user_metadata?.role ?? ''
  const dispatch = useDispatch()

  const [query, setQuery] = useState('')
  const response = useSelector((state) => state.requests.requestList)
  const fuse = new Fuse(response, { keys: ['name'] })

  const results = fuse.search(query)
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

  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 7
  const totalResults = response.length

  function onPageChangeTable(p) {
    setPageTable(p)
  }

  function removeRequest(id) {
    dispatch(deleteRequest(id))
  }

  let searchResult = []
  useEffect(() => {
    if (query) {
      for (let index = 0; index < results.length; index++) {
        searchResult = searchResult.concat(results[index].item)
      }
      setDataTable(
        searchResult.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage,
        ),
      )
      console.log(searchResult)
    } else {
      setDataTable(
        response.slice(
          (pageTable - 1) * resultsPerPage,
          pageTable * resultsPerPage,
        ),
      )
    }
  }, [response, query, pageTable])

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
      <div className="ml-1  flex py-3 justify-start flex-1 lg:mr-32">
        <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            className="pl-8 rounded-md text-gray-700"
            placeholder="Search. . ."
            aria-label="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
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
              <TableCell>Date</TableCell>
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
