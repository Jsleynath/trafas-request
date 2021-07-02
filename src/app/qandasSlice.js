import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  questionNameList: [
    { id: '2001', name: 'Barang tidak diperlukan saat ini?' },
    { id: '2002', name: 'Perusahaan tidak memiliki budget?' },
    { id: '2003', name: 'Perusahaan tidak memiliki sisa stock?' },
    { id: '2004', name: 'Barang bukan merupakan barang baru?' },
    { id: '2005', name: 'Barang tidak memiliki diskon?' },
  ],
  decisionNameList: [
    { id: '1001', name: 'accepted' },
    { id: '1002', name: 'rejected' },
  ],
  questionList: [
    {
      id: '3001',
      question_id: '2001',
      true: '/questioner/decision/1002/',
      false: '/questioner/question/3002/',
    },
    {
      id: '3002',
      question_id: '2002',
      true: '/questioner/decision/1001/',
      false: '/questioner/question/3003/',
    },
    {
      id: '3003',
      question_id: '2003',
      true: '/questioner/question/3004/',
      false: '/questioner/decision/1001/',
    },
    {
      id: '3004',
      question_id: '2004',
      true: '/questioner/decision/1002/',
      false: '/questioner/question/3005/',
    },
    {
      id: '3005',
      question_id: '2005',
      true: '/questioner/decision/1002/',
      false: '/questioner/decision/1001/',
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
