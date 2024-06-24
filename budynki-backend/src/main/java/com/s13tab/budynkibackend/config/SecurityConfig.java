package com.s13tab.budynkibackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Klasa konfiguracyjna dla Spring Security.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Konfiguruje łańcuch filtrów bezpieczeństwa dla żądań HTTP.
     *
     * @param http obiekt {@link HttpSecurity}, który pozwala na dostosowanie konfiguracji zabezpieczeń
     * @return skonfigurowany obiekt {@link SecurityFilterChain}
     * @throws Exception jeśli wystąpił błąd podczas konfigurowania zabezpieczeń
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf
                        .disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests((authorize) -> authorize
                        .anyRequest().permitAll()) // .authenticated()
                .httpBasic(Customizer.withDefaults())
                .formLogin(Customizer.withDefaults());

        return http.build();
    }

}
