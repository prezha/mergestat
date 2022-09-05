import { ApolloError, useMutation } from '@apollo/client'
import { Button, Input, Label, Modal, RadioCard, Toolbar } from '@mergestat/blocks'
import { GithubIcon, XIcon } from '@mergestat/icons'
import React, { useState } from 'react'
import { AUTO_IMPORT_REPOS } from 'src/api-logic/graphql/mutations/add-repo'
import { useRepositoriesContext, useRepositoriesSetState } from 'src/state/contexts'
import { showErrorAlert } from 'src/utils/alerts'
import { SYNC_REPO_METHOD, TEST_IDS } from 'src/utils/constants'
import useRepos from '../../hooks/useRepos'

type ImportRadioType = {
  startIcon: React.ReactNode
  label: string
  type: SYNC_REPO_METHOD
}

const IMPORT_TYPE_RADIO_GROUP: ImportRadioType[] = [
  {
    startIcon: <GithubIcon className='t-icon' />,
    label: 'Add from GitHub Org',
    type: SYNC_REPO_METHOD.GH_ORG,
  },
  {
    startIcon: <GithubIcon className='t-icon' />,
    label: 'Add from GitHub User',
    type: SYNC_REPO_METHOD.GH_USER,
  },
]

export const SyncAutoImportReposModal = () => {
  const [importType, setImportType] = useState<SYNC_REPO_METHOD>(SYNC_REPO_METHOD.GH_ORG)
  const [orgUserText, serOrgUserText] = useState('')

  const { setShowSyncRepoModal } = useRepositoriesSetState()
  const [{ search }] = useRepositoriesContext()
  const { refetch } = useRepos(search)

  const closeModal = () => {
    setShowSyncRepoModal(false)
  }

  const [autoImportRepos] = useMutation(AUTO_IMPORT_REPOS, {
    onError: (error: ApolloError) => {
      showErrorAlert(error.message)
    },
    onCompleted: () => {
      refetch()
      closeModal()
    }
  })

  return (
    <Modal open onClose={closeModal} modalWrapperClassName="z-50">
      <Modal.Header>
        <Toolbar className="h-16 px-8">
          <Toolbar.Left>
            <Toolbar.Item>
              <Modal.Title>Sync repos</Modal.Title>
            </Toolbar.Item>
          </Toolbar.Left>
          <Toolbar.Right>
            <Toolbar.Item>
              <Button
                skin="borderless-muted"
                startIcon={<XIcon className="t-icon" />}
                onClick={closeModal}
              />
            </Toolbar.Item>
          </Toolbar.Right>
        </Toolbar>
      </Modal.Header>
      <Modal.Body>
        <div className="w-full p-8">
          <div>
            <p className="text-gray-500 mb-6">
              This will automatically import all repos from your GitHub organization or GitHub User.
            </p>
          </div>
          <div className="mb-6">
            <Label className="mb-1">Import type</Label>
            <div className="flex gap-4">
              {IMPORT_TYPE_RADIO_GROUP.map((radio, index) => {
                return (
                  <RadioCard
                    key={index}
                    isSelected={radio.type === importType}
                    label={radio.label}
                    startIcon={radio.startIcon}
                    onChange={() => setImportType(radio.type)}
                    className="w-full"
                  />
                )
              })}
            </div>
          </div>
          <div>
            <Label>
              {importType === SYNC_REPO_METHOD.GH_ORG ? 'Organization name' : 'User name'}
            </Label>
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder={importType === SYNC_REPO_METHOD.GH_ORG ? 'organization-name' : 'user-name'}
                onChange={(e) => serOrgUserText(e.target.value)}
                data-testid={TEST_IDS.autoImportInputText}
                value={orgUserText}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Toolbar className="h-16 px-6">
          <Toolbar.Right>
            <Toolbar.Item>
              <Button skin="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button
                className="ml-2"
                skin="primary"
                disabled={orgUserText === ''}
                data-testid={TEST_IDS.autoImportButton}
                onClick={() => autoImportRepos({
                  variables: {
                    type: importType,
                    settings: { [importType === SYNC_REPO_METHOD.GH_ORG ? 'org' : 'user']: orgUserText }
                  }
                })}
              >
                Create Auto Import
              </Button>
            </Toolbar.Item>
          </Toolbar.Right>
        </Toolbar>
      </Modal.Footer>
    </Modal>
  )
}
