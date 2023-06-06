import React from "react"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { ThemeProvider } from "@mui/material"
import { Provider } from "react-redux"
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom"

import { theme } from "./utils/theme"
import { store } from "./app/store"
import Layout from "./components/layout"
import ScenePanel from "./pages/scenePanel"
import SceneEditPanel from "./pages/sceneEditPanel"

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route
                element={
                  <Layout>
                    <Outlet />
                  </Layout>
                }
              >
                <Route path="/scenes" element={<ScenePanel />} />
                <Route path="/scenes/add" element={<SceneEditPanel />} />
                <Route path="/scenes/edit" element={<SceneEditPanel />} />
                <Route path="*" element={<Navigate to="/scenes" />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  )
}

export default App
