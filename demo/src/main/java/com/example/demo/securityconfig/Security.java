package com.example.demo.securityconfig;
import com.example.demo.Security.AuthenticationFilter;
import com.example.demo.Security.RateLimitingFilter;
import com.example.demo.model.employee;
import com.example.demo.repo.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

@Configuration
@EnableWebSecurity
@CrossOrigin("*")
public class Security {
    @Autowired
    private AuthenticationFilter authenticationFilter;
    @Autowired
    private RateLimitingFilter rateLimitingFilter;
    @Autowired
    private repo employeeRepo;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/", "/login", "/auth/login").permitAll()
                        .requestMatchers("/testmail").permitAll()
                        .requestMatchers("/employee").permitAll()
                        .requestMatchers("/admin/dashboard").permitAll()
                        .requestMatchers("/admin/**")
                        .hasRole("ADMIN")

                        .requestMatchers("/employee/**")
                        .hasAnyRole("ADMIN","EMPLOYEE")

                        .anyRequest().authenticated()
                )

                .addFilterBefore(
                        authenticationFilter,
                        UsernamePasswordAuthenticationFilter.class

                );
                http.addFilterBefore(
                rateLimitingFilter,
                AuthenticationFilter.class
                );


        return http.build();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManagerBean(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public CommandLineRunner initPasswords(repo employeeRepo, PasswordEncoder passwordEncoder, Loginlogrepo loginlogRepo, Auditlogsrepo auditlogsRepo) {
        return args -> {
            System.out.println("=== DELETING EXISTING LOGIN AND AUDIT LOGS ===");
            loginlogRepo.deleteAll();
            auditlogsRepo.deleteAll();

            // Inject admin if not exists
            if (employeeRepo.findByUsername("ram_960").isEmpty()) {
                employee admin = new employee();
                admin.setName("Admin Ram");
                admin.setAge(30);
                admin.setSalary(100000.0);
                admin.setDesignation("HR Administrator");
                admin.setEmail("admin@hrms.com");
                admin.setPhone_no(9876543210L);
                admin.setUsername("ram_960");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setRole("ADMIN");
                employeeRepo.save(admin);
                System.out.println("Initialized default admin user: ram_960 / admin123");
            }

            System.out.println("=== INITIALIZING EMPLOYEE PASSWORDS TO 'password123' ===");
            employeeRepo.findAll().forEach(emp -> {
                if ("ADMIN".equalsIgnoreCase(emp.getRole())) {
                    emp.setPassword(passwordEncoder.encode("admin123"));
                    employeeRepo.save(emp);
                    System.out.println("Ensured admin password is 'admin123' for user: " + emp.getUsername());
                } else {
                    emp.setPassword(passwordEncoder.encode("password123"));
                    employeeRepo.save(emp);
                    System.out.println("Reset password for user: " + emp.getUsername());
                }
            });
            System.out.println("=== PASSWORD INITIALIZATION COMPLETE ===");
        };
    }

}