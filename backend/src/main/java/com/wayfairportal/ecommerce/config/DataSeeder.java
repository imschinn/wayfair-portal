package com.wayfairportal.ecommerce.config;

import com.wayfairportal.ecommerce.entity.Product;
import com.wayfairportal.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.math.BigDecimal;
import java.util.List;

/**
 * Seeds the database with sample Wayfair-style products on first startup.
 * Runs only when the 'dev' or 'default' profile is active — never in production.
 */
@Configuration
@Slf4j
@RequiredArgsConstructor
public class DataSeeder {

    @Bean
    @Profile({"dev", "default"})
    public CommandLineRunner seedProducts(ProductRepository repo) {
        return args -> {
            if (repo.count() > 0) {
                log.info("DataSeeder: products already exist — skipping seed.");
                return;
            }
            log.info("DataSeeder: seeding sample Wayfair-style products…");
            repo.saveAll(sampleProducts());
            log.info("DataSeeder: {} products seeded.", repo.count());
        };
    }

    private List<Product> sampleProducts() {
        return List.of(
            Product.builder()
                .name("Hartwell Mid-Century Sectional Sofa")
                .sku("SOFA-HC-001-GRY")
                .category("Living Room").subCategory("Sofas & Sectionals")
                .price(new BigDecimal("1299.99")).compareAtPrice(new BigDecimal("1599.99"))
                .inventoryCount(24).inStock(true)
                .lengthCm(new BigDecimal("280")).widthCm(new BigDecimal("160"))
                .heightCm(new BigDecimal("85")).weightKg(new BigDecimal("72.0"))
                .description("Contemporary sectional with solid walnut legs and premium performance fabric.")
                .imageUrl("https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80")
                .rating(new BigDecimal("4.6")).reviewCount(312)
                .isFeatured(true).supplierId("SUP-001").warehouseLocation("WH-ATL-A3")
                .tags(List.of("mid-century", "sectional", "grey", "performance-fabric"))
                .build(),

            Product.builder()
                .name("Castlewood Solid Oak Dining Table")
                .sku("DTBL-OAK-180-NT")
                .category("Dining Room").subCategory("Dining Tables")
                .price(new BigDecimal("849.00")).compareAtPrice(new BigDecimal("1050.00"))
                .inventoryCount(11).inStock(true)
                .lengthCm(new BigDecimal("180")).widthCm(new BigDecimal("90"))
                .heightCm(new BigDecimal("76")).weightKg(new BigDecimal("48.0"))
                .description("Handcrafted solid white oak table with natural finish. Seats 6 comfortably.")
                .imageUrl("https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80")
                .rating(new BigDecimal("4.8")).reviewCount(178)
                .isFeatured(true).supplierId("SUP-002").warehouseLocation("WH-CHI-B1")
                .tags(List.of("solid-wood", "oak", "natural", "farmhouse"))
                .build(),

            Product.builder()
                .name("Elara Velvet King Bed Frame")
                .sku("BED-VLV-KNG-TL")
                .category("Bedroom").subCategory("Bed Frames")
                .price(new BigDecimal("679.99")).compareAtPrice(new BigDecimal("799.99"))
                .inventoryCount(36).inStock(true)
                .lengthCm(new BigDecimal("215")).widthCm(new BigDecimal("200"))
                .heightCm(new BigDecimal("120")).weightKg(new BigDecimal("55.0"))
                .description("Upholstered king bed with deep teal velvet headboard and solid wood slats.")
                .imageUrl("https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80")
                .rating(new BigDecimal("4.5")).reviewCount(234)
                .isFeatured(false).supplierId("SUP-003").warehouseLocation("WH-DAL-C2")
                .tags(List.of("velvet", "king", "teal", "upholstered"))
                .build(),

            Product.builder()
                .name("Cascade Pendant Light — Brass")
                .sku("LGTS-PND-BRS-M")
                .category("Lighting").subCategory("Pendant Lights")
                .price(new BigDecimal("229.00"))
                .inventoryCount(58).inStock(true)
                .lengthCm(new BigDecimal("35")).widthCm(new BigDecimal("35"))
                .heightCm(new BigDecimal("45")).weightKg(new BigDecimal("2.1"))
                .description("Handblown glass globe with brushed brass hardware. E26 socket, dimmable.")
                .imageUrl("https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=600&q=80")
                .rating(new BigDecimal("4.7")).reviewCount(89)
                .isFeatured(false).supplierId("SUP-004").warehouseLocation("WH-ATL-A1")
                .tags(List.of("brass", "glass", "dimmable", "pendant"))
                .build(),

            Product.builder()
                .name("Marble & Acacia Wood Coffee Table")
                .sku("CTBL-MAR-ACA-WH")
                .category("Living Room").subCategory("Coffee Tables")
                .price(new BigDecimal("459.00")).compareAtPrice(new BigDecimal("549.00"))
                .inventoryCount(0).inStock(false)
                .lengthCm(new BigDecimal("120")).widthCm(new BigDecimal("65"))
                .heightCm(new BigDecimal("42")).weightKg(new BigDecimal("26.0"))
                .description("White Carrara marble top with sustainably sourced acacia wood base.")
                .imageUrl("https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80")
                .rating(new BigDecimal("4.4")).reviewCount(67)
                .isFeatured(false).supplierId("SUP-005").warehouseLocation("WH-CHI-B2")
                .tags(List.of("marble", "acacia", "luxury", "white"))
                .build(),

            Product.builder()
                .name("Nomad Moroccan Tufted Area Rug 8×10")
                .sku("RUG-MOR-810-IVY")
                .category("Rugs").subCategory("Area Rugs")
                .price(new BigDecimal("389.99")).compareAtPrice(new BigDecimal("479.99"))
                .inventoryCount(42).inStock(true)
                .lengthCm(new BigDecimal("305")).widthCm(new BigDecimal("244"))
                .heightCm(new BigDecimal("1.5")).weightKg(new BigDecimal("14.0"))
                .description("Hand-tufted wool blend with geometric Moroccan pattern in ivory and terracotta.")
                .imageUrl("https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80")
                .rating(new BigDecimal("4.3")).reviewCount(145)
                .isFeatured(true).supplierId("SUP-006").warehouseLocation("WH-DAL-C3")
                .tags(List.of("moroccan", "wool", "tufted", "geometric", "8x10"))
                .build()
        );
    }
}
