import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './products'
import singleProductReducer from './singleProduct'
import allUsersReducer from './users'
import cartReducer from './cart'
import prevOrders from './prevOrders'

const persistConfig = {
  key: 'root',
  storage
}

const reducer = combineReducers({
  user,
  products,
  users: allUsersReducer,
  singleProduct: singleProductReducer,
  cart: cartReducer,
  prevOrders
})

const persistedReducer = persistReducer(persistConfig, reducer)

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(persistedReducer, middleware)

const persistor = persistStore(store)

export {store, persistor}
export * from './user'
export * from './cart'
export * from './prevOrders'
