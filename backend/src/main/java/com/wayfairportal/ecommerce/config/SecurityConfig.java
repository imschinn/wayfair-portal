package com.wayfairportal.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration.
 *
 * <p>Current posture: stateless, no session, CSRF disabled (REST API).
 * GET endpoints are public. Write operations require authentication — ready
 * to wire in JWT bearer token validation when you add your auth module.
 *
 * <p>To add JWT: inject a JwtAuthenticationFilter before UsernamePasswordAuthenticationFilter.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Public read access to the catalog
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()
                // Health checks and API docs
                .requestMatchers("/actuator/health", "/actuator/info").permitAll()
                .requestMatchers("/swagger-ui/**", "/swagger-ui.html", "/api-docs/**").permitAll()
                // Everything else requires authentication (ready for JWT)
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
