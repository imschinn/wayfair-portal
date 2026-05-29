package com.wayfairportal.ecommerce.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.wayfairportal.ecommerce.entity.Product;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

/**
 * API response DTO for a product.
 * Flattens the JPA entity into a clean, versioned contract for consumers.
 */
@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDTO {

    private Long id;
    private String name;
    private String sku;
    private String category;
    private String subCategory;
    private BigDecimal price;
    private BigDecimal compareAtPrice;
    private Integer inventoryCount;
    private Boolean inStock;
    private String supplierId;
    private String warehouseLocation;

    // Dimensions
    private DimensionsDTO dimensions;

    private String description;
    private String imageUrl;
    private BigDecimal rating;
    private Integer reviewCount;
    private Boolean isFeatured;
    private List<String> tags;
    private Instant createdAt;
    private Instant updatedAt;

    @Data
    @Builder
    public static class DimensionsDTO {
        private BigDecimal lengthCm;
        private BigDecimal widthCm;
        private BigDecimal heightCm;
        private BigDecimal weightKg;
    }

    /** Maps a {@link Product} entity to its DTO representation. */
    public static ProductDTO fromEntity(Product p) {
        return ProductDTO.builder()
                .id(p.getId())
                .name(p.getName())
                .sku(p.getSku())
                .category(p.getCategory())
                .subCategory(p.getSubCategory())
                .price(p.getPrice())
                .compareAtPrice(p.getCompareAtPrice())
                .inventoryCount(p.getInventoryCount())
                .inStock(p.getInStock())
                .supplierId(p.getSupplierId())
                .warehouseLocation(p.getWarehouseLocation())
                .dimensions(DimensionsDTO.builder()
                        .lengthCm(p.getLengthCm())
                        .widthCm(p.getWidthCm())
                        .heightCm(p.getHeightCm())
                        .weightKg(p.getWeightKg())
                        .build())
                .description(p.getDescription())
                .imageUrl(p.getImageUrl())
                .rating(p.getRating())
                .reviewCount(p.getReviewCount())
                .isFeatured(p.getIsFeatured())
                .tags(p.getTags())
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }
}
