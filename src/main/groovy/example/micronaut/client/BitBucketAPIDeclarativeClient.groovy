package example.micronaut.client


import groovy.transform.CompileStatic
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.QueryValue
import io.micronaut.http.client.annotation.Client
import io.reactivex.Flowable
import io.reactivex.Maybe

import java.nio.file.Path

@CompileStatic
@Client('${bitbucket.api.url}')
interface BitBucketAPIDeclarativeClient {

    @Get('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}')
    Flowable<Map> fetchTotalRepository()

    @Get('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}?q=project.key="data"')
    Flowable<Map> fetchProjectRepository(@QueryValue String q)

    @Get('/${bitbucket.api.version}/workspaces/${bitbucket.api.workspace}/projects')
    Flowable<Map> fetchProject()

    @Get('/${bitbucket.api.version}/workspaces/${bitbucket.api.workspace}/projects/{project_key}')
    Flowable<Map> fetchProjectData(@PathVariable String project_key)

    @Post('/${bitbucket.api.version}/workspaces/${bitbucket.api.workspace}/projects')
    Maybe<Map> createProject(@Body Map projectData)

    @Post('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}/{repo_slug}')
    Maybe<Map> createRepo(@PathVariable String repo_slug,@Body Map repositoryData)

    @Post(uri = '/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}/{repo}/src',
        produces = [MediaType.APPLICATION_FORM_URLENCODED] , consumes = [MediaType.TEXT_HTML])
    HttpResponse uploadFileContent(@Body Map inputData, @PathVariable String repo)

    @Get('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}/${bitbucket.api.repo_slug}/commits')
    Flowable<Map> fetchCommits()

    @Get('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}/{repo_name}/filehistory/${bitbucket.api.branch_name}/{fileName}?pagelen=30&renames=false&fields=values.links.*,values.commit.links.*,values.commit.hash,values.commit.message,values.commit.rendered.message,values.commit.author.raw,values.commit.date')
    Flowable<Map> fetchFileHistory(@PathVariable String fileName, @PathVariable String repo_name)

    @Get('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}/${bitbucket.api.repo_slug}/src/${bitbucket.api.branch_name}/{fileName}')
    Flowable<Map> fetchFileContent(@PathVariable String fileName)

    @Get('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}/{repo_slug}/src')
    HttpResponse fetchRepositoryContent(@PathVariable String repo_slug)

    @Get('/${bitbucket.api.version}/repositories/${bitbucket.api.workspace}/{repo_name}/src/{commitID}/{fileName}?at=master')
    HttpResponse fetchFileContentByCommitID(@PathVariable String repo_name,@PathVariable String commitID, @PathVariable String fileName)

}