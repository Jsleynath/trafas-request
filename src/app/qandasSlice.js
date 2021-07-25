import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  questionNameList: [
    { id: '2001', name: 'Kapan anda membutuhkan barang anda?' },
    {
      id: '2002',
      name: 'Apakah barang yang anda butuhkan saat ini sedang diskon?',
    },
    { id: '2003', name: 'Apakah barang yang anda cari memiliki garansi?' },
    { id: '2004', name: 'Berapa harga barang yang anda ajukan?' },
    { id: '2005', name: 'Apakah barang merupakan barang baru?' },
  ],
  decisionNameList: [
    { id: '1001', name: 'DITERIMA', status: 'approved' },
    { id: '1002', name: 'DITOLAK', status: 'rejected' },
  ],
  questionList: [
    {
      id: '3001',
      question_id: '2001',
      true: '/questioner/question/3002/',
      false: '/questioner/decision/1002/',
    },
    {
      id: '3002',
      question_id: '2002',
      true: '/questioner/question/3003/',
      false: '/questioner/question/3004/',
    },
    {
      id: '3003',
      question_id: '2003',
      true: '/questioner/decision/1001/',
      false: '/questioner/decision/1002/',
    },
    {
      id: '3004',
      question_id: '2004',
      true: '/questioner/question/3005/',
      false: '/questioner/decision/1002/',
    },
    {
      id: '3005',
      question_id: '2005',
      true: '/questioner/decision/1001/',
      false: '/questioner/decision/1002/',
    },
  ],
}

const qandasSlice = createSlice({
  name: 'qandas',
  initialState,
  reducers: {},
  extraReducers: {},
})

export const {} = qandasSlice.actions

export default qandasSlice.reducer
