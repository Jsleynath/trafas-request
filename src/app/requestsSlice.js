import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  requestList: [],
  requestListStatus: 'idle',
  requestListError: null,
  requestById: [],
  requestByIdStatus: 'idle',
  requestByIdError: null,
  createRequest: [],
  createRequestStatus: 'idle',
  createRequestError: null,
  requestDelete: [],
  requestDeleteStatus: 'idle',
  requestDeleteError: null,
  requestUpdate: [],
  requestUpdateStatus: 'idle',
  requestUpdateError: null,
}

export const fetchRequest = createAsyncThunk(
  'requests/fetchRequest',
  async () => {
    const response = await supabase
      .from('requests')
      .select(
        `id,employees:employee_id ( name ),assets:asset_id ( name ),quantity,date,status`,
      )
    return response
  },
)

export const fetchRequestById = createAsyncThunk(
  'requests/fetchRequestById',
  async (id) => {
    const response = await supabase.from('requests').select('*').eq('id', id)
    return response
  },
)

export const createNewRequest = createAsyncThunk(
  'requests/createNewRequest',
  async (data) => {
    const response = await supabase.from('requests').insert([data])

    return response
  },
)

export const deleteRequest = createAsyncThunk(
  'requests/deleteRequest',
  async (id) => {
    await supabase.from('requests').delete().match({ id: id })
    return id
  },
)

export const updateRequest = createAsyncThunk(
  'requests/updateRequest',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('requests')
      .update({
        name: updatedData.name,
        role: updatedData.role,
      })
      .eq('id', updatedData.id)
    return data
  },
)

export const signUp = createAsyncThunk('requests/signUp', async (data) => {
  const { user, session, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })
  if (error) {
    alert(error.message)
  }
  return [user, session]
})

export const signIn = createAsyncThunk('requests/signIn', async (data) => {
  const { user, session, error } = await supabase.auth.signIn({
    email: data.email,
    password: data.password,
  })
  if (error) {
    alert(error.message)
  }
  return [user, session]
})

export const signOut = createAsyncThunk('requests/signOut', async (data) => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert(error.message)
  }
  return null
})

const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    clearRequestList: (state) => {
      state.requestList = []
    },
    clearRequestListStatus: (state) => {
      state.requestListStatus = 'idle'
    },
    clearRequestByIdData: (state) => {
      state.requestById = []
    },
    clearRequestByIdStatus: (state) => {
      state.requestByIdStatus = 'idle'
    },
    clearRequestDeleteStatus: (state) => {
      state.requestDeleteStatus = 'idle'
    },
    clearCreateRequestStatus: (state) => {
      state.createRequestStatus = 'idle'
    },
    clearRequestUpdateStatus: (state) => {
      state.requestUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchRequest.pending]: (state) => {
      state.requestListStatus = 'loading'
    },
    [fetchRequest.fulfilled]: (state, action) => {
      state.requestListStatus = 'succeeded'
      state.requestList = state.requestList.concat(action.payload.data)
    },
    [fetchRequest.rejected]: (state, action) => {
      state.requestListStatus = 'failed'
      state.requestListError = action.error.message
    },
    [fetchRequestById.pending]: (state) => {
      state.requestByIdStatus = 'loading'
    },
    [fetchRequestById.fulfilled]: (state, action) => {
      state.requestByIdStatus = 'succeeded'
      state.requestById = action.payload.data
    },
    [fetchRequestById.rejected]: (state, action) => {
      state.requestByIdStatus = 'failed'
      state.requestByIdError = action.error.message
    },
    [createNewRequest.pending]: (state) => {
      state.createRequestStatus = 'loading'
    },
    [createNewRequest.fulfilled]: (state, action) => {
      state.createRequestStatus = 'succeeded'
      state.requestList = state.requestList.concat(action.payload.data[0])
    },
    [createNewRequest.rejected]: (state, action) => {
      state.createRequestStatus = 'failed'
      state.createRequestError = action.error.message
    },
    [deleteRequest.pending]: (state) => {
      state.requestDeleteStatus = 'loading'
    },
    [deleteRequest.fulfilled]: (state, action) => {
      state.requestDeleteStatus = 'succeeded'
      state.requestDelete = action.payload.data
      const array = current(state.requestList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.requestList = temp
    },
    [deleteRequest.rejected]: (state, action) => {
      state.requestDeleteStatus = 'failed'
      state.requestDeleteError = action.error.message
    },
    [updateRequest.pending]: (state) => {
      state.requestUpdateStatus = 'loading'
    },
    [updateRequest.fulfilled]: (state, action) => {
      state.requestUpdateStatus = 'succeeded'
      state.requestUpdate = action.payload.data
    },
    [updateRequest.rejected]: (state, action) => {
      state.requestUpdateStatus = 'failed'
      state.requestUpdateError = action.error.message
    },
  },
})

export const {
  clearRequestList,
  clearRequestByIdData,
  clearRequestByIdStatus,
  clearRequestDeleteStatus,
  clearCreateRequestStatus,
  clearRequestUpdateStatus,
  clearRequestListStatus,
} = requestsSlice.actions

export default requestsSlice.reducer
