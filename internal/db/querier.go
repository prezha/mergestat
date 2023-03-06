// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0

package db

import (
	"context"

	"github.com/google/uuid"
)

type Querier interface {
	CheckRunningImps(ctx context.Context) (int64, error)
	CleanOldRepoSyncQueue(ctx context.Context, dollar_1 int32) error
	DeleteGitHubRepoInfo(ctx context.Context, repoID uuid.UUID) error
	DeleteRemovedRepos(ctx context.Context, arg DeleteRemovedReposParams) error
	DequeueSyncJob(ctx context.Context) (DequeueSyncJobRow, error)
	// We use a CTE here to retrieve all the repo_sync_jobs that were previously enqueued, to make sure that we *do not* re-enqueue anything new until the previously enqueued jobs are *completed*.
	// This allows us to make sure all repo syncs complete before we reschedule a new batch.
	// We have now also added a concept of type groups which allows us to apply this same logic but by each group type which is where the PARTITION BY clause comes into play
	EnqueueAllSyncs(ctx context.Context) error
	FetchGitHubToken(ctx context.Context, pgpSymDecrypt string) (string, error)
	GetRepoById(ctx context.Context, id uuid.UUID) (Repo, error)
	GetRepoIDsFromRepoImport(ctx context.Context, arg GetRepoIDsFromRepoImportParams) ([]uuid.UUID, error)
	GetRepoImportByID(ctx context.Context, id uuid.UUID) (MergestatRepoImport, error)
	GetRepoUrlFromImport(ctx context.Context, importid uuid.UUID) ([]string, error)
	InsertGitHubRepoInfo(ctx context.Context, arg InsertGitHubRepoInfoParams) error
	InsertNewDefaultSync(ctx context.Context, arg InsertNewDefaultSyncParams) error
	InsertSyncJobLog(ctx context.Context, arg InsertSyncJobLogParams) error
	ListRepoImportsDueForImport(ctx context.Context) ([]ListRepoImportsDueForImportRow, error)
	MarkRepoImportAsUpdated(ctx context.Context, id uuid.UUID) error
	MarkSyncsAsTimedOut(ctx context.Context) ([]int64, error)
	SetLatestKeepAliveForJob(ctx context.Context, id int64) error
	SetSyncJobStatus(ctx context.Context, arg SetSyncJobStatusParams) error
	UpdateImportStatus(ctx context.Context, arg UpdateImportStatusParams) error
	UpsertRepo(ctx context.Context, arg UpsertRepoParams) error
	UpsertWorkflowRunJobs(ctx context.Context, arg UpsertWorkflowRunJobsParams) error
	UpsertWorkflowRuns(ctx context.Context, arg UpsertWorkflowRunsParams) error
	UpsertWorkflowsInPublic(ctx context.Context, arg UpsertWorkflowsInPublicParams) error
}

var _ Querier = (*Queries)(nil)
