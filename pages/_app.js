// this is our root Component
import { Component } from 'react/cjs/react.production.min'
import '../styles/globals.css';
import Layout from './../components/layout/Layout'

// { Component, pageProps } we are destructuring from a props
// Component hold the page content that should be render
// .. pagesProp are expecific props our page may be getting

const MyApp = (props) => {
  return <Layout>
    <props.Component {...props.pageProps} />
  </Layout>
}

export default MyApp
