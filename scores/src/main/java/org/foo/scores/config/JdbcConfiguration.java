package org.foo.scores.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;

@Configuration
@EnableJdbcRepositories(basePackages = {"org.foo.scores"})
public class JdbcConfiguration {
}
