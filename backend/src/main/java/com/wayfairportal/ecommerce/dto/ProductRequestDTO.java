package com.wayfairportal.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/** Request payload for creating or updating a product. */
@Data
public class ProductRequestDTO {

    @NotBlank(message = "Product name is required")
    @Size(max = 255)
    private String name;

    @NotBlank(message = "SKU is required")
    @Size(max = 80)
    private String sku;

    @NotBlank
    @Size(max = 100)
    private String category;

    @Size(max = 100)
    private String subCategory;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal price;

    private BigDecimal compareAtPrice;

    @NotNull
    @Min(0)
    private Integer inventoryCount;

    @Size(max = 50)
    private String supplierId;

    @Size(max = 50)
    private String warehouseLocation;

    // Dimensions
    private BigDecimal lengthCm;
    private BigDecimal widthCm;
    private BigDecimal heightCm;
    private BigDecimal weightKg;

    private String description;
    private String imageUrl;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    private BigDecimal rating;

    @Min(0)
    private Integer reviewCount;

    private Boolean isFeatured;
    private List<String> tags;
}
