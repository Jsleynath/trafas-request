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
  deleteDetailasset,
  fetchDetailassetById,
  fetchDetailassetByIdAsset,
} from '../app/detailassetsSlice'
import { fetchAssetById } from '../app/assetsSlice'
import { useParams } from 'react-router-dom'

function DetailAsset() {
  const dispatch = useDispatch()
  let { id } = useParams()

  const response = useSelector(
    (state) => state.detailassets.detailassetByIdAsset,
  )
  const assetById = useSelector((state) => state.assets.assetById)
  const detailassetByIdAssetStatus = useSelector(
    (state) => state.detailassets.detailassetByIdAssetStatus,
  )

  useEffect(() => {
    if (detailassetByIdAssetStatus === 'idle') {
      dispatch(fetchDetailassetByIdAsset(id))
      dispatch(fetchAssetById(id))
    }
  }, [detailassetByIdAssetStatus, id, dispatch])

  const [pageTable, setPageTable] = useState(1)

  const [dataTable, setDataTable] = useState([])

  const resultsPerPage = 7
  const totalResults = response.length

  function onPageChangeTable(p) {
    setPageTable(p)
  }

  function removeOrganization(id) {
    dispatch(deleteDetailasset(id))
  }

  useEffect(() => {
    setDataTable(
      response.slice(
        (pageTable - 1) * resultsPerPage,
        pageTable * resultsPerPage,
      ),
    )
  }, [id, response, pageTable])
  return (
    <>
      <PageTitle>
        <div className="flex justify-between">Detail assets {`{ ${id} }`}</div>
        <div className=" text-sm ">
          category : {assetById[0] ? assetById[0].name : ''}
        </div>
      </PageTitle>

      <hr className="mb-1" />
      <TableContainer className="my-4 ">
        <Table className=" w-full">
          <TableHeader>
            <tr>
              <TableCell>Code</TableCell>
              <TableCell>Entry Date</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell className="text-center">Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((data, i) => (
              <TableRow key={i}>
                <TableCell>
                  <span className="text-sm">{data.code}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(data.created_at).toDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.brand}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{data.qty}</span>
                </TableCell>
                <TableCell>
                  <div className="flex   justify-center ">
                    <div className=" space-x-4">
                      <Button
                        tag={Link}
                        to={`/app/assets/edit/${data.id}`}
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      <Button
                        onClick={() => removeOrganization(data.id)}
                        layout="link"
                        size="icon"
                        aria-label="Delete"
                      >
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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

export default DetailAsset
