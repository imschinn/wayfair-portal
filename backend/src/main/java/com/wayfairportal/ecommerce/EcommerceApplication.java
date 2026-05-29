package com.wayfairportal.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Entry point for the Wayfair Portal backend.
 *
 * <p>Architecture: Controller → Service → Repository → JPA Entity → PostgreSQL
 * Designed for GCP Cloud Run / GKE deployment with Cloud SQL.
 */
@SpringBootApplication
@EnableJpaAuditing
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
    }
}
