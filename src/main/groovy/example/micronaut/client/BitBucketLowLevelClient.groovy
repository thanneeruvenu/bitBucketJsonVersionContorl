package example.micronaut.client


import example.micronaut.config.BitBucketAPIConfiguration
import groovy.transform.CompileStatic
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.client.RxHttpClient
import io.micronaut.http.client.annotation.Client
import io.micronaut.http.uri.UriTemplate
import io.reactivex.Flowable

import javax.inject.Inject
import javax.inject.Singleton

@CompileStatic
@Singleton
class BitBucketLowLevelClient {

    @Inject
    @Client('${bitbucket.api.url}') RxHttpClient httpClient

    @Inject
    BitBucketAPIConfiguration bitBucketAPIConfiguration


    Flowable<HttpResponse<Map>> fetchRepository() {
        HttpRequest<?> request = HttpRequest.GET(getRepository())
        return httpClient.exchange(request,Map)
    }
    private String getRepository(){
        String path = "/{version}/repositories/{workspace}"
        String uri = UriTemplate.of(path).expand(bitBucketAPIConfiguration)
        return uri
    }
}