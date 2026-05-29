package com.wayfairportal.ecommerce.service;

import com.wayfairportal.ecommerce.dto.ProductDTO;
import com.wayfairportal.ecommerce.dto.ProductRequestDTO;
import com.wayfairportal.ecommerce.entity.Product;
import com.wayfairportal.ecommerce.exception.DuplicateSkuException;
import com.wayfairportal.ecommerce.exception.ResourceNotFoundException;
import com.wayfairportal.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

/**
 * Business logic for the product catalog.
 *
 * <p>Responsibilities:
 * <ul>
 *   <li>Validate uniqueness constraints (SKU)
 *   <li>Map between DTOs and JPA entities
 *   <li>Apply catalog filters and pagination
 *   <li>Manage inventory state transitions
 * </ul>
 */
@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;

    // ── Read Operations ──────────────────────────────────────

    public Page<ProductDTO> getProducts(
            String category,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Boolean inStock,
            String search,
            int page,
            int size,
            String sort) {

        Pageable pageable = buildPageable(page, size, sort);

        return productRepository
                .findWithFilters(category, minPrice, maxPrice, inStock, search, pageable)
                .map(ProductDTO::fromEntity);
    }

    public ProductDTO getProductById(Long id) {
        return productRepository.findById(id)
                .map(ProductDTO::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    public ProductDTO getProductBySku(String sku) {
        return productRepository.findBySku(sku)
                .map(ProductDTO::fromEntity)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with SKU: " + sku));
    }

    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue()
                .stream()
                .map(ProductDTO::fromEntity)
                .toList();
    }

    public List<ProductDTO> getLowStockProducts(int threshold) {
        log.debug("Fetching products with inventory <= {}", threshold);
        return productRepository
                .findByInventoryCountLessThanEqualAndInStockTrue(threshold)
                .stream()
                .map(ProductDTO::fromEntity)
                .toList();
    }

    // ── Write Operations ─────────────────────────────────────

    @Transactional
    public ProductDTO createProduct(ProductRequestDTO request) {
        if (productRepository.existsBySku(request.getSku())) {
            throw new DuplicateSkuException("SKU already exists: " + request.getSku());
        }
        Product saved = productRepository.save(mapToEntity(request, new Product()));
        log.info("Created product id={} sku={}", saved.getId(), saved.getSku());
        return ProductDTO.fromEntity(saved);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductRequestDTO request) {
        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        // Allow SKU change only if the new SKU doesn't clash with another product
        if (!existing.getSku().equals(request.getSku())
                && productRepository.existsBySku(request.getSku())) {
            throw new DuplicateSkuException("SKU already taken: " + request.getSku());
        }

        Product updated = productRepository.save(mapToEntity(request, existing));
        log.info("Updated product id={}", id);
        return ProductDTO.fromEntity(updated);
    }

    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
        log.info("Deleted product id={}", id);
    }

    @Transactional
    public ProductDTO adjustInventory(Long id, int delta) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        int newCount = product.getInventoryCount() + delta;
        if (newCount < 0) {
            throw new IllegalArgumentException(
                    "Inventory adjustment would result in negative stock. Current: "
                    + product.getInventoryCount() + ", delta: " + delta);
        }
        product.setInventoryCount(newCount);
        // syncInStock() is called via @PreUpdate
        return ProductDTO.fromEntity(productRepository.save(product));
    }

    // ── Private Helpers ──────────────────────────────────────

    private Product mapToEntity(ProductRequestDTO dto, Product target) {
        target.setName(dto.getName());
        target.setSku(dto.getSku());
        target.setCategory(dto.getCategory());
        target.setSubCategory(dto.getSubCategory());
        target.setPrice(dto.getPrice());
        target.setCompareAtPrice(dto.getCompareAtPrice());
        target.setInventoryCount(dto.getInventoryCount());
        target.setSupplierId(dto.getSupplierId());
        target.setWarehouseLocation(dto.getWarehouseLocation());
        target.setLengthCm(dto.getLengthCm());
        target.setWidthCm(dto.getWidthCm());
        target.setHeightCm(dto.getHeightCm());
        target.setWeightKg(dto.getWeightKg());
        target.setDescription(dto.getDescription());
        target.setImageUrl(dto.getImageUrl());
        target.setRating(dto.getRating());
        target.setReviewCount(dto.getReviewCount());
        target.setIsFeatured(dto.getIsFeatured() != null ? dto.getIsFeatured() : false);
        target.setTags(dto.getTags());
        return target;
    }

    private Pageable buildPageable(int page, int size, String sort) {
        Sort s = switch (sort) {
            case "price_asc"  -> Sort.by("price").ascending();
            case "price_desc" -> Sort.by("price").descending();
            case "rating"     -> Sort.by("rating").descending();
            default           -> Sort.by("createdAt").descending(); // newest
        };
        return PageRequest.of(Math.max(0, page), Math.min(100, size), s);
    }
}
