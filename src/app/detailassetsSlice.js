import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { supabase } from '../supabase'

const initialState = {
  detailassetList: [],
  detailassetListStatus: 'idle',
  detailassetListError: null,
  detailassetById: [],
  detailassetByIdStatus: 'idle',
  detailassetByIdError: null,
  detailassetByIdAsset: [],
  detailassetByIdAssetStatus: 'idle',
  detailassetByIdAssetError: null,
  createDetailasset: [],
  createDetailassetStatus: 'idle',
  createDetailassetError: null,
  detailassetDelete: [],
  detailassetDeleteStatus: 'idle',
  detailassetDeleteError: null,
  detailassetUpdate: [],
  detailassetUpdateStatus: 'idle',
  detailassetUpdateError: null,
}

export const fetchDetailasset = createAsyncThunk(
  'detailassets/fetchDetailasset',
  async () => {
    const response = await supabase.from('detail_assets').select()
    return response
  },
)

export const fetchDetailassetById = createAsyncThunk(
  'detailassets/fetchDetailassetById',
  async (id) => {
    const response = await supabase
      .from('detail_assets')
      .select('*')
      .eq('id', id)
    return response
  },
)

export const fetchDetailassetByIdAsset = createAsyncThunk(
  'detailassets/fetchDetailassetByIdAsset',
  async (id) => {
    const response = await supabase
      .from('detail_assets')
      .select('*')
      .eq('asset_id', id)
    return response
  },
)

export const createNewDetailasset = createAsyncThunk(
  'detailassets/createNewDetailasset',
  async (data) => {
    const response = await supabase.from('detail_assets').insert([data])
    return response
  },
)

export const deleteDetailasset = createAsyncThunk(
  'detailassets/deleteDetailasset',
  async (id) => {
    await supabase.from('detail_assets').delete().match({ id: id })
    return id
  },
)

export const updateDetailasset = createAsyncThunk(
  'detailassets/updateDetailasset',
  async (updatedData) => {
    const { data, error } = await supabase
      .from('detail_assets')
      .update({
        code: updatedData.code,
        brand: updatedData.brand,
        name: updatedData.name,
        asset_id: updatedData.asset_id,
        qty: updatedData.qty,
        unit: updatedData.unit,
      })
      .eq('id', updatedData.id)
    return data
  },
)

const detailassetsSlice = createSlice({
  name: 'detailassets',
  initialState,
  reducers: {
    clearDetailassetList: (state) => {
      state.detailassetList = []
    },
    clearDetailassetListStatus: (state) => {
      state.detailassetListStatus = 'idle'
    },
    clearDetailassetByIdData: (state) => {
      state.detailassetById = []
    },
    clearDetailassetByIdStatus: (state) => {
      state.detailassetByIdStatus = 'idle'
    },
    clearDetailassetDeleteStatus: (state) => {
      state.detailassetDeleteStatus = 'idle'
    },
    clearCreateDetailassetStatus: (state) => {
      state.createDetailassetStatus = 'idle'
    },
    clearDetailassetUpdateStatus: (state) => {
      state.detailassetUpdateStatus = 'idle'
    },
    clearIdStatus: (state) => {
      state.idStatus = 'idle'
    },
    clearDetailassetByIdAssetStatus: (state) => {
      state.detailassetByIdAssetStatus = 'idle'
    },
  },
  extraReducers: {
    [fetchDetailasset.pending]: (state) => {
      state.detailassetListStatus = 'loading'
    },
    [fetchDetailasset.fulfilled]: (state, action) => {
      state.detailassetListStatus = 'succeeded'
      state.detailassetList = action.payload.data
    },
    [fetchDetailasset.rejected]: (state, action) => {
      state.detailassetListStatus = 'failed'
      state.detailassetListError = action.error.message
    },
    [fetchDetailassetById.pending]: (state) => {
      state.detailassetByIdStatus = 'loading'
    },
    [fetchDetailassetById.fulfilled]: (state, action) => {
      state.detailassetByIdStatus = 'succeeded'
      state.detailassetById = action.payload.data[0]
    },
    [fetchDetailassetById.rejected]: (state, action) => {
      state.detailassetByIdStatus = 'failed'
      state.detailassetByIdError = action.error.message
    },

    [fetchDetailassetByIdAsset.pending]: (state) => {
      state.detailassetByIdAssetStatus = 'loading'
    },
    [fetchDetailassetByIdAsset.fulfilled]: (state, action) => {
      state.detailassetByIdAssetStatus = 'succeeded'
      state.detailassetByIdAsset = action.payload.data
    },
    [fetchDetailassetByIdAsset.rejected]: (state, action) => {
      state.detailassetByIdAssetStatus = 'failed'
      state.detailassetByIdAssetError = action.error.message
    },

    [createNewDetailasset.pending]: (state) => {
      state.createDetailassetStatus = 'loading'
    },
    [createNewDetailasset.fulfilled]: (state, action) => {
      state.createDetailassetStatus = 'succeeded'
      state.detailassetList = state.detailassetList.concat(
        action.payload.data[0],
      )
    },
    [createNewDetailasset.rejected]: (state, action) => {
      state.createDetailassetStatus = 'failed'
      state.createDetailassetError = action.error.message
    },
    [deleteDetailasset.pending]: (state) => {
      state.detailassetDeleteStatus = 'loading'
    },
    [deleteDetailasset.fulfilled]: (state, action) => {
      state.detailassetDeleteStatus = 'succeeded'
      state.detailassetDelete = action.payload.data
      const array = current(state.detailassetList)
      // eslint-disable-next-line eqeqeq
      const temp = array.filter((element) => element.id != action.payload)
      state.detailassetList = temp
    },
    [deleteDetailasset.rejected]: (state, action) => {
      state.detailassetDeleteStatus = 'failed'
      state.detailassetDeleteError = action.error.message
    },
    [updateDetailasset.pending]: (state) => {
      state.detailassetUpdateStatus = 'loading'
    },
    [updateDetailasset.fulfilled]: (state, action) => {
      state.detailassetUpdateStatus = 'succeeded'
      state.detailassetUpdate = action.payload.data
    },
    [updateDetailasset.rejected]: (state, action) => {
      state.detailassetUpdateStatus = 'failed'
      state.detailassetUpdateError = action.error.message
    },
  },
})

export const {
  clearDetailassetList,
  clearDetailassetByIdData,
  clearDetailassetByIdStatus,
  clearDetailassetDeleteStatus,
  clearCreateDetailassetStatus,
  clearDetailassetUpdateStatus,
  clearDetailassetListStatus,
  clearDetailassetByIdAssetStatus,
} = detailassetsSlice.actions

export default detailassetsSlice.reducer
