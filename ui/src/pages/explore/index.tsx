import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { ExploreProvider } from 'src/state/contexts/repo-explore.context'
import { MERGESTAT_TITLE } from 'src/utils/constants'
import ExploreView from 'src/views/explore'

const ExplorePage: NextPage = () => {
  const title = `Repo Explore ${MERGESTAT_TITLE}`

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      <ExploreProvider>
        <ExploreView />
      </ExploreProvider>
    </Fragment>
  )
}

export default ExplorePage
