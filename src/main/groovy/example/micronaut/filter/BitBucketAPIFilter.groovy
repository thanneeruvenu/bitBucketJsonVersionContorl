package example.micronaut.filter

import example.micronaut.config.BitBucketAPIConfiguration
import groovy.transform.CompileStatic
import io.micronaut.context.annotation.Requires
import io.micronaut.http.HttpResponse
import io.micronaut.http.MutableHttpRequest
import io.micronaut.http.annotation.Filter
import io.micronaut.http.filter.ClientFilterChain
import io.micronaut.http.filter.HttpClientFilter
import org.reactivestreams.Publisher

import javax.inject.Inject

@CompileStatic
@Filter('/${bitbucket.api.version}/**')
@Requires(property = "bitbucket.api.username")
@Requires(property = "bitbucket.api.password")
class BitBucketAPIFilter implements HttpClientFilter{

    @Inject
    BitBucketAPIConfiguration bitBucketAPIConfiguration
    @Override
    Publisher<? extends HttpResponse<?>> doFilter(MutableHttpRequest<?> request, ClientFilterChain chain) {
        return chain.proceed(request.basicAuth(bitBucketAPIConfiguration.username, bitBucketAPIConfiguration.password))
    }
}
