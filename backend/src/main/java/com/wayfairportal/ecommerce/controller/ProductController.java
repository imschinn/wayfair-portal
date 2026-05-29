package com.wayfairportal.ecommerce.controller;

import com.wayfairportal.ecommerce.dto.ProductDTO;
import com.wayfairportal.ecommerce.dto.ProductRequestDTO;
import com.wayfairportal.ecommerce.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * REST controller for the product catalog.
 *
 * <p>Base path: {@code /api/products}
 *
 * <pre>
 * GET    /api/products           — paginated catalog with filters
 * GET    /api/products/featured  — featured products list
 * GET    /api/products/{id}      — single product by ID
 * GET    /api/products/sku/{sku} — single product by SKU
 * POST   /api/products           — create a new product
 * PUT    /api/products/{id}      — full update
 * DELETE /api/products/{id}      — delete
 * PATCH  /api/products/{id}/inventory — adjust stock level
 * </pre>
 */
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product catalog and inventory management endpoints")
public class ProductController {

    private final ProductService productService;

    // ── GET /api/products ────────────────────────────────────
    @GetMapping
    @Operation(summary = "List products with optional filters and pagination")
    public ResponseEntity<Page<ProductDTO>> getProducts(
            @Parameter(description = "Filter by top-level category, e.g. 'Living Room'")
            @RequestParam(required = false) String category,

            @Parameter(description = "Minimum price (inclusive)")
            @RequestParam(required = false) BigDecimal minPrice,

            @Parameter(description = "Maximum price (inclusive)")
            @RequestParam(required = false) BigDecimal maxPrice,

            @Parameter(description = "Filter to in-stock products only")
            @RequestParam(required = false) Boolean inStock,

            @Parameter(description = "Full-text keyword search across name, SKU, and description")
            @RequestParam(required = false) String search,

            @RequestParam(defaultValue = "0")  @Min(0) int page,
            @RequestParam(defaultValue = "20") @Min(1) @Max(100) int size,

            @Parameter(description = "Sort: newest | price_asc | price_desc | rating")
            @RequestParam(defaultValue = "newest") String sort
    ) {
        return ResponseEntity.ok(
                productService.getProducts(category, minPrice, maxPrice, inStock, search, page, size, sort)
        );
    }

    // ── GET /api/products/featured ───────────────────────────
    @GetMapping("/featured")
    @Operation(summary = "Return all featured products (for homepage banners / carousels)")
    public ResponseEntity<List<ProductDTO>> getFeaturedProducts() {
        return ResponseEntity.ok(productService.getFeaturedProducts());
    }

    // ── GET /api/products/{id} ───────────────────────────────
    @GetMapping("/{id}")
    @Operation(summary = "Get a single product by its database ID")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // ── GET /api/products/sku/{sku} ──────────────────────────
    @GetMapping("/sku/{sku}")
    @Operation(summary = "Get a product by its SKU code")
    public ResponseEntity<ProductDTO> getProductBySku(@PathVariable String sku) {
        return ResponseEntity.ok(productService.getProductBySku(sku));
    }

    // ── POST /api/products ───────────────────────────────────
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Create a new product in the catalog")
    public ResponseEntity<ProductDTO> createProduct(
            @Valid @RequestBody ProductRequestDTO request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.createProduct(request));
    }

    // ── PUT /api/products/{id} ───────────────────────────────
    @PutMapping("/{id}")
    @Operation(summary = "Full update of an existing product")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequestDTO request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    // ── DELETE /api/products/{id} ────────────────────────────
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Remove a product from the catalog")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    // ── PATCH /api/products/{id}/inventory ───────────────────
    @PatchMapping("/{id}/inventory")
    @Operation(summary = "Adjust a product's inventory count (+/-)")
    public ResponseEntity<ProductDTO> adjustInventory(
            @PathVariable Long id,
            @RequestBody Map<String, Integer> body) {
        int delta = body.getOrDefault("delta", 0);
        return ResponseEntity.ok(productService.adjustInventory(id, delta));
    }
}
