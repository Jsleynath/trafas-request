import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  assetList: [],
  assetListStatus: 'idle',
  assetListError: null,
  assetById: [],
  assetByIdStatus: 'idle',
  assetByIdError: null,
  createAsset: [],
  createAssetStatus: 'idle',
  createAssetError: null,
  assetDelete: [],
  assetDeleteStatus: 'idle',
  assetDeleteError: null,
  assetUpdate: [],
  assetUpdateStatus: 'idle',
  assetUpdateError: null,
}

export const fetchAsset = createAsyncThunk('assets/fetchAsset', async () => {
  const response = await supabase.from('assets').select()
  return response
})

export const fetchAssetById = createAsyncThunk(
  'assets/fetchAssetById',
  async (id) => {
    const response = await supabase.from('assets').select('*').eq('id', id)
    return response
  },
)

export const createNewAsset = createAsyncThunk(
  'assets/createNewAsset',
  async (data) => {
    const response = await supabase.from('assets').insert([data])
    return response
  },
)

export const deleteAsset = createAsyncThunk(
  'assets/deleteAsset',
  async (id) => {
    await supabase.from('assets').delete().match({ id: id })
    return id
  },
)

export const updateAsset = createAsyncThunk(
  'assets/updateAsset',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('assets')
      .update({
        name: updatedData.name,
        role: updatedData.role,
      })
      .eq('id', updatedData.id)
    return data
  },
)

export const signUp = createAsyncThunk('assets/signUp', async (data) => {
  const { user, session, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  })
  if (error) {
    alert(error.message)
  }
  return [user, session]
})

export const signIn = createAsyncThunk('assets/signIn', async (data) => {
  const { user, session, error } = await supabase.auth.signIn({
    email: data.email,
    password: data.password,
  })
  if (error) {
    alert(error.message)
  }
  return [user, session]
})

export const signOut = createAsyncThunk('assets/signOut', async (data) => {
  const { error } = await supabase.auth.signOut()
  if (error) {
    alert(error.message)
  }
  return null
})

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    clearAssetList: (state) => {
      state.assetList = []
    },
    clearAssetListStatus: (state) => {
      state.assetListStatus = 'idle'
    },
    clearAssetByIdData: (state) => {
      state.assetById = []
    },
    clearAssetByIdStatus: (state) => {
      state.assetByIdStatus = 'idle'
    },
    clearAssetDeleteStatus: (state) => {
      state.assetDeleteStatus = 'idle'
    },
    clearCreateAssetStatus: (state) => {
      state.createAssetStatus = 'idle'
    },
    clearAssetUpdateStatus: (state) => {
      state.assetUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchAsset.pending]: (state) => {
      state.assetListStatus = 'loading'
    },
    [fetchAsset.fulfilled]: (state, action) => {
      state.assetListStatus = 'succeeded'
      state.assetList = state.assetList.concat(action.payload.data)
    },
    [fetchAsset.rejected]: (state, action) => {
      state.assetListStatus = 'failed'
      state.assetListError = action.error.message
    },
    [fetchAssetById.pending]: (state) => {
      state.assetByIdStatus = 'loading'
    },
    [fetchAssetById.fulfilled]: (state, action) => {
      state.assetByIdStatus = 'succeeded'
      state.assetById = action.payload.data
    },
    [fetchAssetById.rejected]: (state, action) => {
      state.assetByIdStatus = 'failed'
      state.assetByIdError = action.error.message
    },
    [createNewAsset.pending]: (state) => {
      state.createAssetStatus = 'loading'
    },
    [createNewAsset.fulfilled]: (state, action) => {
      state.createAssetStatus = 'succeeded'
      state.assetList = state.assetList.concat(action.payload.data[0])
    },
    [createNewAsset.rejected]: (state, action) => {
      state.createAssetStatus = 'failed'
      state.createAssetError = action.error.message
    },
    [deleteAsset.pending]: (state) => {
      state.assetDeleteStatus = 'loading'
    },
    [deleteAsset.fulfilled]: (state, action) => {
      state.assetDeleteStatus = 'succeeded'
      state.assetDelete = action.payload.data
      const array = current(state.assetList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.assetList = temp
    },
    [deleteAsset.rejected]: (state, action) => {
      state.assetDeleteStatus = 'failed'
      state.assetDeleteError = action.error.message
    },
    [updateAsset.pending]: (state) => {
      state.assetUpdateStatus = 'loading'
    },
    [updateAsset.fulfilled]: (state, action) => {
      state.assetUpdateStatus = 'succeeded'
      state.assetUpdate = action.payload.data
    },
    [updateAsset.rejected]: (state, action) => {
      state.assetUpdateStatus = 'failed'
      state.assetUpdateError = action.error.message
    },
  },
})

export const {
  clearAssetList,
  clearAssetByIdData,
  clearAssetByIdStatus,
  clearAssetDeleteStatus,
  clearCreateAssetStatus,
  clearAssetUpdateStatus,
  clearAssetListStatus,
} = assetsSlice.actions

export default assetsSlice.reducer
