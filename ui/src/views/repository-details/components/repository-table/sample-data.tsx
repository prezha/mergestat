import { Spinner, ThreeDots } from '@mergestat/blocks'
import { CircleCheckFilledIcon } from '@mergestat/icons'
import React from 'react'
import { RepoSyncDataType } from './@type'




export const sampleRepositoryData: RepoSyncDataType[] = [
  {
    syncStateIcon: <Spinner size="sm" />,
    Data: { title: "Commit stats", brief: 'Stores git commits for this repo in the "git_commits" table' },
    latest_run: "Now",
    status: { disabled: false, graphNode: <div>Graphe</div> },
    syncNow: { syncState: "syncing" },
    options: <ThreeDots />,
  },
  {
    syncStateIcon: <CircleCheckFilledIcon className=" text-green-600" />,
    Data: { title: "Pull Requests", brief: 'Stores git commits for this repo in the "git_commits" table' },
    latest_run: "Now",
    status: { disabled: false, graphNode: <div>Graphe</div> },
    syncNow: { syncState: "not_sync" },
    options: <ThreeDots />,
  },
  {
    syncStateIcon: <Spinner size="sm" />,
    Data: { title: "Commit stats", brief: 'Stores git commits for this repo in the "git_commits" table' },
    latest_run: "Now",
    status: { disabled: false, graphNode: <div>Graphe</div> },
    syncNow: { syncState: "disabled" },
    options: <ThreeDots />,
  },
  {
    syncStateIcon: <Spinner size="sm" />,
    Data: { title: "Commit stats", brief: 'Stores git commits for this repo in the "git_commits" table' },
    latest_run: "Now",
    status: { disabled: false, graphNode: <div>Graphe</div> },
    syncNow: { syncState: "syncing" },
    options: <ThreeDots />,
  },
  {
    syncStateIcon: <Spinner size="sm" />,
    Data: { title: "Forks", brief: 'Stores git commits for this repo in the "git_commits" table' },
    latest_run: "Now",
    status: { disabled: false, graphNode: <div>Graphe</div> },
    syncNow: { syncState: "error" },
    options: <ThreeDots />,
  },

]
