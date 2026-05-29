# ── Stage 1: Build ─────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /workspace

# Cache Maven dependencies separately from source
COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B --no-transfer-progress

# Build the application (skip tests — run them in CI, not in image build)
COPY src src
RUN ./mvnw package -DskipTests -B --no-transfer-progress

# Extract Spring Boot layered JAR for optimal layer caching
RUN java -Djarmode=layertools -jar target/*.jar extract --destination target/extracted

# ── Stage 2: Production Runtime ─────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runner

# Non-root user for GCP Cloud Run security compliance
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

WORKDIR /app

# Copy Spring Boot layers (ordered by change frequency — best cache reuse)
COPY --from=builder /workspace/target/extracted/dependencies/          ./
COPY --from=builder /workspace/target/extracted/spring-boot-loader/    ./
COPY --from=builder /workspace/target/extracted/snapshot-dependencies/ ./
COPY --from=builder /workspace/target/extracted/application/           ./

# GCP Cloud Run injects $PORT; Spring Boot picks it up via SERVER_PORT
ENV SERVER_PORT=8080
EXPOSE 8080

# JVM tuning for containerised environments:
#   -XX:+UseContainerSupport  — respects cgroup memory limits
#   -XX:MaxRAMPercentage=75   — leave headroom for OS / JVM overhead
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "org.springframework.boot.loader.launch.JarLauncher"]
