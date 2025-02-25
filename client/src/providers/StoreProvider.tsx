'use client'
import { AppStore, makeStore } from '@/redux/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  const persistedStore = persistStore(storeRef.current);

  return <Provider store={storeRef.current}>
    <PersistGate loading={false} persistor={persistedStore}>
    {children}
    </PersistGate>
  </Provider>
}