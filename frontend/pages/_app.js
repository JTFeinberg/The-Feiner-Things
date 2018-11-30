import App, { Container } from 'next/app'
import Page from '../components/Page'
import { ApolloProvider } from 'react-apollo'
import withData from '../lib/withData'

class MyApp extends App {
  //Next.js lifecycle that runs before render. Anything returned is exposed to props in render
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    //Crawl every page for any mutations or queries it may have and fetch the data before component renders
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    //This exposes the query to the user
    pageProps.query = ctx.query
    return { pageProps }
  }

  render() {
    const { Component, apollo, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withData(MyApp)
