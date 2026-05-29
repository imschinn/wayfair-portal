package com.wayfairportal.ecommerce.repository;

import com.wayfairportal.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

/**
 * JPA repository for {@link Product}.
 *
 * <p>Extends {@link JpaRepository} for standard CRUD.
 * Custom queries support the catalog filter surface.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // ── Basic lookups ────────────────────────────────────────
    Optional<Product> findBySku(String sku);

    boolean existsBySku(String sku);

    // ── Category browsing ────────────────────────────────────
    Page<Product> findByCategory(String category, Pageable pageable);

    Page<Product> findByCategoryAndSubCategory(
            String category, String subCategory, Pageable pageable);

    // ── Availability filtering ───────────────────────────────
    Page<Product> findByInStock(boolean inStock, Pageable pageable);

    Page<Product> findByCategoryAndInStock(
            String category, boolean inStock, Pageable pageable);

    // ── Featured products ────────────────────────────────────
    List<Product> findByIsFeaturedTrue();

    // ── Full-text / keyword search ───────────────────────────
    @Query("""
            SELECT p FROM Product p
            WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%'))
               OR LOWER(p.sku) LIKE LOWER(CONCAT('%', :keyword, '%'))
            """)
    Page<Product> searchByKeyword(@Param("keyword") String keyword, Pageable pageable);

    // ── Composite catalog filter ─────────────────────────────
    @Query("""
            SELECT p FROM Product p
            WHERE (:category IS NULL OR p.category = :category)
              AND (:minPrice IS NULL OR p.price >= :minPrice)
              AND (:maxPrice IS NULL OR p.price <= :maxPrice)
              AND (:inStock IS NULL OR p.inStock = :inStock)
              AND (
                :search IS NULL
                OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(p.sku) LIKE LOWER(CONCAT('%', :search, '%'))
              )
            """)
    Page<Product> findWithFilters(
            @Param("category") String category,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("inStock") Boolean inStock,
            @Param("search") String search,
            Pageable pageable);

    // ── Inventory management ─────────────────────────────────
    List<Product> findByInventoryCountLessThanEqualAndInStockTrue(int threshold);

    // ── Supplier / warehouse queries ─────────────────────────
    List<Product> findBySupplierId(String supplierId);

    Page<Product> findByWarehouseLocation(String warehouseLocation, Pageable pageable);
}
