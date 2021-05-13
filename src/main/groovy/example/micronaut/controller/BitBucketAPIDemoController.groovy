package example.micronaut.controller

import com.fasterxml.jackson.databind.ObjectMapper
import example.micronaut.client.BitBucketAPIDeclarativeClient
import example.micronaut.client.BitBucketLowLevelClient

import io.micronaut.http.HttpResponse
import io.micronaut.http.MediaType
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.QueryValue
import io.reactivex.Flowable
import io.reactivex.Maybe
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import javax.inject.Inject
import java.text.ParseException

@Controller('/bitbucket')
class BitBucketAPIDemoController {
    //private static final Logger LOGGER = LoggerFactory.getLogger(BitBucketAPIDemoController.class);

    @Inject
    BitBucketAPIDeclarativeClient bitBucketAPIDeclarativeClient
    @Inject
    BitBucketLowLevelClient bitBucketLowLevelClient

    @Get(uri = "/repositories", produces = MediaType.APPLICATION_JSON_STREAM)
    Flowable<Map> packages(@QueryValue String q) {
        return bitBucketAPIDeclarativeClient.fetchProjectRepository(q)
    }

    @Get(uri = "/repositories-lowlevel", produces = MediaType.APPLICATION_JSON_STREAM)
    Flowable<HttpResponse<Map>> packagesWithLowLevelClient() {
        return bitBucketLowLevelClient.fetchRepository()
    }

    @Get(uri = "/get-projects", produces = MediaType.APPLICATION_JSON_STREAM)
    Flowable<Map> getProjects() {
        return bitBucketAPIDeclarativeClient.fetchProject()
    }

    @Get(uri = "/get-projectRepo/{project_key}", produces = MediaType.APPLICATION_JSON_STREAM)
    Flowable<Map> getProjectRepository(@PathVariable String project_key) {
        return bitBucketAPIDeclarativeClient.fetchProjectData(project_key)
    }

    @Post(uri = "/create-project", produces = MediaType.APPLICATION_JSON)
    Maybe<Map> createProject(@Body Map projectData){
        return bitBucketAPIDeclarativeClient.createProject(projectData)
    }

    @Post(uri = "/create-repository/{repo_slug}", produces =   MediaType.APPLICATION_JSON)
    Maybe<Map> createRepo(@PathVariable String repo_slug,@Body Map repositoryData){
        return bitBucketAPIDeclarativeClient.createRepo(repo_slug,repositoryData)
    }

    @Post(uri = "/create-file/{repo}", produces = [MediaType.TEXT_HTML, MediaType.APPLICATION_JSON],
            consumes = [MediaType.APPLICATION_FORM_URLENCODED, MediaType.APPLICATION_JSON])
    HttpResponse createFile(@Body Map inputData , @PathVariable String repo) {
        Map pushFileMap = [:]  //Creating Empty Map
        String commitMessage = inputData.commitMessage
        Map jsonFileData = inputData.fileContent
        def newTime = jsonFileData.fileTimestamp ? json2date(jsonFileData.fileTimestamp).getTime() : (new Date()).getTime()
        if (newTime <= (new Date()).getTime()) {
            jsonFileData.fileTimestamp = new Date().toInstant().toString()
        }
        String name = jsonFileData.constantName
        ObjectMapper mapper = new ObjectMapper();
        String jsonFileContent = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonFileData)
        pushFileMap.put(name, jsonFileContent) // Pushing File Content to the Empty Map PushFileMap
        pushFileMap.put("message", commitMessage)

        // TODO NEED TO FETCH FROM PROPERTIES FILES

        pushFileMap.put("branch", "master")
        if (jsonFileData.owner) {
            pushFileMap.put("author", "${jsonFileData.owner} <test@test.com>")
        }
        return bitBucketAPIDeclarativeClient.uploadFileContent(pushFileMap, repo)
    }

    def json2date = { s ->
        Date date  // Creates date object representing current date and time
        try {
            date = s ? javax.xml.bind.DatatypeConverter.parseDateTime(s).time : null
        } catch (ParseException e) {
            LOGGER.error "Exception in json2date ${e}"
        }
        date
    }

    @Get(uri = "/commits", produces = MediaType.APPLICATION_JSON_STREAM)
    Flowable<Map> getCommits() {
        return bitBucketAPIDeclarativeClient.fetchCommits()
    }
    @Get(uri = "/file-history/{repo_name}/{fileName}", produces = MediaType.APPLICATION_JSON_STREAM)
    Flowable<Map> getHistory(@PathVariable String fileName, @PathVariable String repo_name) {
        return bitBucketAPIDeclarativeClient.fetchFileHistory(fileName, repo_name)
    }
    @Get(uri = "/file-content/{fileName}", produces = MediaType.APPLICATION_JSON_STREAM)
    Flowable<Map> getFileContent(@PathVariable String fileName) {
        return bitBucketAPIDeclarativeClient.fetchFileContent(fileName)
    }

    @Get(uri = "/file-contentID/{repo_name}/{commitID}/{fileName}", produces = MediaType.APPLICATION_JSON)
    HttpResponse getFileContentByID(@PathVariable String repo_name,@PathVariable String commitID,@PathVariable String fileName ) {
        return bitBucketAPIDeclarativeClient.fetchFileContentByCommitID(repo_name,commitID,fileName)
    }

    @Get(uri = "/totalRepo", produces = MediaType.APPLICATION_JSON)
    Flowable<Map> getRepositoryData(){
        return bitBucketAPIDeclarativeClient.fetchTotalRepository()
    }
    @Get(uri = "/repoFiles/{repo_slug}", produces = MediaType.APPLICATION_JSON)
    HttpResponse getRepositoryFiles(@PathVariable String repo_slug){
        return bitBucketAPIDeclarativeClient.fetchRepositoryContent(repo_slug)
    }

}
