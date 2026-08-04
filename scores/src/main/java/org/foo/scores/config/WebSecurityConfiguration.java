package org.foo.scores.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.LogoutConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.*;
import org.springframework.util.StringUtils;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.function.Supplier;

@Configuration
@EnableWebSecurity
public class WebSecurityConfiguration {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) {

        CookieCsrfTokenRepository repository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        repository.setCookieName("XSRF-TOKEN");

        // Sukuriame rankinį handlerį, kuris actual token paims iš slapuko
        CsrfTokenRequestHandler customRequestHandler = new CsrfTokenRequestHandler() {
            private final XorCsrfTokenRequestAttributeHandler delegate = new XorCsrfTokenRequestAttributeHandler();

            @Override
            public void handle(HttpServletRequest request, HttpServletResponse response, Supplier<CsrfToken> csrfToken) {
                // Svarbu: išjungia XOR demaskavimą atributams, jei norima gryno tokeno
                this.delegate.setCsrfRequestAttributeName(null);
                this.delegate.handle(request, response, csrfToken);
            }

            @Override
            public String resolveCsrfTokenValue(HttpServletRequest request, CsrfToken csrfToken) {
                // 1. Pirmiausia bandome nuskaityti reikšmę tiesiai iš slapukų
                if (request.getCookies() != null) {
                    for (Cookie cookie : request.getCookies()) {
                        if ("XSRF-TOKEN".equals(cookie.getName()) && StringUtils.hasText(cookie.getValue())) {
                            return cookie.getValue(); // Grąžina slapuko reikšmę kaip "actual token"
                        }
                    }
                }
                // 2. Jei slapuko nėra, naudojame standartinį mechanizmą (antraštę/formą)
                return this.delegate.resolveCsrfTokenValue(request, csrfToken);
            }
        };

        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf
                        .csrfTokenRepository(repository) // widthHttpOnlyFalse leidžia JS perskaityti slapuką
                        .csrfTokenRequestHandler(customRequestHandler)
                )
                .addFilterAfter(new CsrfCookieFilter(), BasicAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                )
                .formLogin((form) -> form
                        .loginPage("/login")
                        .permitAll()
                )
                .logout(LogoutConfigurer::permitAll);


        return http.build();
    }

    private static final class CsrfCookieFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                throws ServletException, IOException {
            CsrfToken csrfToken = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
            if (csrfToken != null) {
                csrfToken.getToken();
            }
            filterChain.doFilter(request, response);
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Naudojame pattern, kad leistų slapukus/credentials
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(List.of("*"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}