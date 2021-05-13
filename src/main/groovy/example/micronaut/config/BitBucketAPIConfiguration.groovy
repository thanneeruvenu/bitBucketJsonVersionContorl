package example.micronaut.config

import groovy.transform.CompileStatic
import io.micronaut.context.annotation.ConfigurationProperties
import io.micronaut.context.annotation.Requires

@CompileStatic
@ConfigurationProperties(BitBucketAPIConfiguration.PREFIX)
@Requires(property = BitBucketAPIConfiguration.PREFIX)
class BitBucketAPIConfiguration {

    public static final String PREFIX = "bitbucket.api"

    private String url
    private String version
    private String workspace
    private String repo_slug
    private String branch_name
    private String username
    private String password

    String getUrl() {
        return url
    }

    void setUrl(String url) {
        this.url = url
    }

    String getVersion() {
        return version
    }

    void setVersion(String version) {
        this.version = version
    }

    String getWorkspace() {
        return workspace
    }

    void setWorkspace(String workspace) {
        this.workspace = workspace
    }

    String getRepo_slug() {
        return repo_slug
    }

    void setRepo_slug(String repo_slug) {
        this.repo_slug = repo_slug
    }

    String getBranch_name() {
        return branch_name
    }

    void setBranch_name(String branch_name) {
        this.branch_name = branch_name
    }

    String getUsername() {
        return username
    }

    void setUsername(String username) {
        this.username = username
    }

    String getPassword() {
        return password
    }

    void setPassword(String password) {
        this.password = password
    }
}
