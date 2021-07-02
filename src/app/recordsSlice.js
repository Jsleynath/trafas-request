import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  recordList: [],
  recordListStatus: 'idle',
  recordListError: null,
  recordById: [],
  recordByIdStatus: 'idle',
  recordByIdError: null,
  createRecord: [],
  createRecordStatus: 'idle',
  createRecordError: null,
  recordDelete: [],
  recordDeleteStatus: 'idle',
  recordDeleteError: null,
  recordUpdate: [],
  recordUpdateStatus: 'idle',
  recordUpdateError: null,
}

export const fetchRecord = createAsyncThunk(
  'records/fetchRecord',
  async () => {
    const response = await supabase.from('records').select()
    return response
  },
)

export const fetchRecordById = createAsyncThunk(
  'records/fetchRecordById',
  async (id) => {
    const response = await supabase.from('records').select('*').eq('id', id)
    return response
  },
)

export const createNewRecord = createAsyncThunk(
  'records/createNewRecord',
  async (data) => {
    const response = await supabase.from('records').insert([data])
    const { user, session, error } = await supabase.auth.signUp({
      email: data.name,
      password: 'password',
    })
    console.log(user)
    return response
  },
)

export const deleteRecord = createAsyncThunk(
  'records/deleteRecord',
  async (id) => {
    await supabase.from('records').delete().match({ id: id })
    return id
  },
)

export const updateRecord = createAsyncThunk(
  'records/updateRecord',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('records')
      .update({
        name: updatedData.name,
        role: updatedData.role,
      })
      .eq('id', updatedData.id)
    return data
  },
)

export const signUp = createAsyncThunk(
  'records/signUp',
  async (data) => {
    const { user, session, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    })
    if(error){alert(error.message)}
    return [user,session]
  },
)

export const signIn = createAsyncThunk(
  'records/signIn',
  async (data) => {
    const { user, session, error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    })
    if(error){alert(error.message)}
    return [user,session]
  },
)

export const signOut = createAsyncThunk(
  'records/signOut',
  async (data) => {
    const { error } = await supabase.auth.signOut()
    if(error){alert(error.message)}
    return null
  },
)

const recordsSlice = createSlice({
  name: 'records',
  initialState,
  reducers: {
    clearRecordList: (state) => {
      state.recordList = []
    },
    clearRecordListStatus: (state) => {
      state.recordListStatus = 'idle'
    },
    clearRecordByIdData: (state) => {
      state.recordById = []
    },
    clearRecordByIdStatus: (state) => {
      state.recordByIdStatus = 'idle'
    },
    clearRecordDeleteStatus: (state) => {
      state.recordDeleteStatus = 'idle'
    },
    clearCreateRecordStatus: (state) => {
      state.createRecordStatus = 'idle'
    },
    clearRecordUpdateStatus: (state) => {
      state.recordUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchRecord.pending]: (state) => {
      state.recordListStatus = 'loading'
    },
    [fetchRecord.fulfilled]: (state, action) => {
      state.recordListStatus = 'succeeded'
      state.recordList = state.recordList.concat(action.payload.data)
    },
    [fetchRecord.rejected]: (state, action) => {
      state.recordListStatus = 'failed'
      state.recordListError = action.error.message
    },
    [fetchRecordById.pending]: (state) => {
      state.recordByIdStatus = 'loading'
    },
    [fetchRecordById.fulfilled]: (state, action) => {
      state.recordByIdStatus = 'succeeded'
      state.recordById = action.payload.data
    },
    [fetchRecordById.rejected]: (state, action) => {
      state.recordByIdStatus = 'failed'
      state.recordByIdError = action.error.message
    },
    [createNewRecord.pending]: (state) => {
      state.createRecordStatus = 'loading'
    },
    [createNewRecord.fulfilled]: (state, action) => {
      state.createRecordStatus = 'succeeded'
      state.recordList = state.recordList.concat(action.payload.data[0])
    },
    [createNewRecord.rejected]: (state, action) => {
      state.createRecordStatus = 'failed'
      state.createRecordError = action.error.message
    },
    [deleteRecord.pending]: (state) => {
      state.recordDeleteStatus = 'loading'
    },
    [deleteRecord.fulfilled]: (state, action) => {
      state.recordDeleteStatus = 'succeeded'
      state.recordDelete = action.payload.data
      const array = current(state.recordList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.recordList = temp
    },
    [deleteRecord.rejected]: (state, action) => {
      state.recordDeleteStatus = 'failed'
      state.recordDeleteError = action.error.message
    },
    [updateRecord.pending]: (state) => {
      state.recordUpdateStatus = 'loading'
    },
    [updateRecord.fulfilled]: (state, action) => {
      state.recordUpdateStatus = 'succeeded'
      state.recordUpdate = action.payload.data
    },
    [updateRecord.rejected]: (state, action) => {
      state.recordUpdateStatus = 'failed'
      state.recordUpdateError = action.error.message
    },
  },
})

export const {
  clearRecordList,
  clearRecordByIdData,
  clearRecordByIdStatus,
  clearRecordDeleteStatus,
  clearCreateRecordStatus,
  clearRecordUpdateStatus,
  clearRecordListStatus,
} = recordsSlice.actions

export default recordsSlice.reducer
