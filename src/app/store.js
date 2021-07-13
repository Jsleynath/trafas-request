import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './employeesSlice'
import assetsReducer from './assetsSlice'
import requestsReducer from './requestsSlice'
import recordsReducer from './recordsSlice'
import qandasReducer from './qandasSlice'
import detailassetsReducer from './detailassetsSlice'

export default configureStore({
  reducer: {
    employees: employeesReducer,
    assets: assetsReducer,
    requests: requestsReducer,
    records: recordsReducer,
    qandas: qandasReducer,
    detailassets: detailassetsReducer,
  },
})
