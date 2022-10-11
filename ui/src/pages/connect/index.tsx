import { useQuery } from '@apollo/client'
import { Button, Label, Panel, Tabs, Toolbar } from '@mergestat/blocks'
import { DuplicateIcon } from '@mergestat/icons'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { GetDatabaseConnectionQuery } from 'src/api-logic/graphql/generated/schema'
import { GET_DB_CONNECTION } from 'src/api-logic/graphql/queries/auth'
import Loading from 'src/components/Loading'
import { showSuccessAlert } from 'src/utils/alerts'

const Connect: NextPage = () => {
  const { loading, data } = useQuery<GetDatabaseConnectionQuery>(GET_DB_CONNECTION, { fetchPolicy: 'no-cache' })

  const copy = (text: string | null | undefined) => {
    navigator.clipboard.writeText(text || '')
    showSuccessAlert('Copied')
  }

  return (
    <Fragment>
      <Head>
        <title>MergeStat</title>
      </Head>
      <main className="w-full flex flex-col h-full bg-gray-50 overflow-hidden">
        <div className="bg-white h-16 w-full border-b px-8">
          <Toolbar className="h-full">
            <Toolbar.Left>
              <h2 className="t-h2 mb-0">Connect</h2>
            </Toolbar.Left>
          </Toolbar>
        </div>
        {loading
          ? <Loading />
          : <div className="flex-1 items-center p-8 overflow-auto">
            <div className="sm_mx-auto sm_max-w-5xl">
              <Panel className="shadow-sm rounded-md">
                <Panel.Body className="p-8 overflow-hidden">
                  <div className="mb-6">
                    <h3 className="t-h3">Connection details</h3>
                    <p className="text-gray-500">This is some helptext with a short description to explain how to use this connect page.</p>
                  </div>

                  <Tabs>
                    <Tabs.List>
                      <Tabs.Item>Parameters</Tabs.Item>
                      <Tabs.Item>URL</Tabs.Item>
                    </Tabs.List>
                    <Tabs.Panels>
                      <Tabs.Panel className="pt-6">
                        <div className="flex flex-col divide-y">
                          <div className="md_flex items-center w-full py-3">
                            <Label className="text-gray-500 w-40 md_w-56">Host</Label>
                            <div className="flex items-center flex-1 space-x-4">
                              <p className="flex-1 break-all">{data?.databaseConnection?.host}</p>
                              <Button
                                isIconOnly
                                skin="borderless"
                                startIcon={<DuplicateIcon className="t-icon" />}
                                onClick={() => copy(data?.databaseConnection?.host)}
                              />
                            </div>
                          </div>

                          <div className="md_flex items-center w-full py-3">
                            <Label className="text-gray-500 w-40 md_w-56">Username</Label>
                            <div className="flex items-center flex-1 space-x-4">
                              <p className="flex-1 break-all">{data?.databaseConnection?.user}</p>
                              <Button
                                isIconOnly
                                skin="borderless"
                                startIcon={<DuplicateIcon className="t-icon" />}
                                onClick={() => copy(data?.databaseConnection?.user)}
                              />
                            </div>
                          </div>

                          <div className="md_flex items-center w-full py-3">
                            <Label className="text-gray-500 w-40 md_w-56">Password</Label>
                            <div className="flex items-center flex-1 space-x-4">
                              <div className="flex items-center space-x-2 flex-1">
                                <p className="break-all">•••••••••••••••••••</p>
                                <Button
                                  label="Show"
                                  size="small"
                                  skin="borderless"
                                />
                              </div>
                              <Button
                                isIconOnly
                                skin="borderless"
                                startIcon={<DuplicateIcon className="t-icon" />}
                              />
                            </div>
                          </div>
                          <div className="md_flex items-center w-full py-3">
                            <Label className="text-gray-500 w-40 md_w-56">Database</Label>
                            <div className="flex items-center flex-1 space-x-4">
                              <p className="flex-1 break-all">{data?.databaseConnection?.database}</p>
                              <Button
                                isIconOnly
                                skin="borderless"
                                startIcon={<DuplicateIcon className="t-icon" />}
                                onClick={() => copy(data?.databaseConnection?.database)}
                              />
                            </div>
                          </div>
                        </div>
                      </Tabs.Panel>
                      <Tabs.Panel className="pt-6">
                        <div className="bg-gray-50 border rounded-md p-5 font-mono text-sm text-gray-500 mb-4">
                          <pre>
                            <code className="whitespace-normal break-all">postgresql://{data?.databaseConnection?.user}:<a className="text-blue-600" href="#blank">show-password</a>@{data?.databaseConnection?.host}/{data?.databaseConnection?.database}</code>
                          </pre>
                        </div>
                        <Button
                          label="Copy"
                          startIcon={<DuplicateIcon className="t-icon" />}
                          skin="secondary"
                          size="small"
                          onClick={() => copy(`postgresql://${data?.databaseConnection?.user}:@${data?.databaseConnection?.host}/${data?.databaseConnection?.database}`)}
                        />

                      </Tabs.Panel>
                    </Tabs.Panels>
                  </Tabs>
                </Panel.Body>
              </Panel>
            </div>
          </div>}
      </main>
    </Fragment>
  )
}

export default Connect
