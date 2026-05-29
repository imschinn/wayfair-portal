package com.wayfairportal.ecommerce.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

/**
 * Core product entity.
 * Maps to the {@code products} table in PostgreSQL.
 *
 * <p>Fields mirror Wayfair-style catalog data: SKU, category hierarchy,
 * pricing (sale + compare-at), physical dimensions for logistics, and
 * supplier/warehouse provenance for supply-chain tracking.
 */
@Entity
@Table(
    name = "products",
    indexes = {
        @Index(name = "idx_product_sku",      columnList = "sku",      unique = true),
        @Index(name = "idx_product_category", columnList = "category"),
        @Index(name = "idx_product_in_stock", columnList = "in_stock"),
    }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"tags"})
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ── Identification ──────────────────────────────────────
    @NotBlank(message = "Product name is required")
    @Size(max = 255)
    @Column(nullable = false)
    private String name;

    /** Unique Stock Keeping Unit identifier, e.g. "SOFA-HC-001-GRY" */
    @NotBlank(message = "SKU is required")
    @Size(max = 80)
    @Column(nullable = false, unique = true, length = 80)
    private String sku;

    // ── Categorisation ──────────────────────────────────────
    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String category;

    @Size(max = 100)
    @Column(name = "sub_category", length = 100)
    private String subCategory;

    // ── Pricing ─────────────────────────────────────────────
    @NotNull
    @DecimalMin(value = "0.01", message = "Price must be positive")
    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal price;

    /** Original / list price — shown as strikethrough when a sale is active */
    @Column(name = "compare_at_price", precision = 12, scale = 2)
    private BigDecimal compareAtPrice;

    // ── Inventory & Logistics ────────────────────────────────
    @Min(0)
    @Column(name = "inventory_count", nullable = false)
    private Integer inventoryCount;

    @Column(name = "in_stock", nullable = false)
    private Boolean inStock;

    /** Reference to the supplying vendor */
    @Size(max = 50)
    @Column(name = "supplier_id", length = 50)
    private String supplierId;

    /** Physical warehouse slot, e.g. "WH-ATL-A3" */
    @Size(max = 50)
    @Column(name = "warehouse_location", length = 50)
    private String warehouseLocation;

    // ── Physical Dimensions (for shipping calculations) ──────
    /** Length in centimetres */
    @Column(name = "length_cm", precision = 8, scale = 2)
    private BigDecimal lengthCm;

    /** Width in centimetres */
    @Column(name = "width_cm", precision = 8, scale = 2)
    private BigDecimal widthCm;

    /** Height in centimetres */
    @Column(name = "height_cm", precision = 8, scale = 2)
    private BigDecimal heightCm;

    /** Weight in kilograms */
    @Column(name = "weight_kg", precision = 8, scale = 3)
    private BigDecimal weightKg;

    // ── Merchandising ────────────────────────────────────────
    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    @Min(0)
    @Column(name = "review_count")
    private Integer reviewCount;

    @Column(name = "is_featured", nullable = false)
    private Boolean isFeatured = false;

    /** Searchable comma-delimited tags stored as a simple string list */
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "tag", length = 80)
    private List<String> tags;

    // ── Audit ────────────────────────────────────────────────
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

    // ── Business logic helpers ───────────────────────────────
    @PrePersist
    @PreUpdate
    public void syncInStock() {
        this.inStock = this.inventoryCount != null && this.inventoryCount > 0;
    }
}
