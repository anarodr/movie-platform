# Build Stage (Compilation with Cython)
FROM python:3.10 AS builder

WORKDIR /backend

# Install compilation dependencies
RUN apt-get update && apt-get install -y gcc musl-dev make python3-distutils build-essential curl

# Copy source code
COPY . /backend

# Pass linters
RUN make clean && \
    make setup && \
    make lint && \
    make type-check 
    # TODO && \
    #TODO make security-check && \
    #TODO make dependency-check

# Download wait-for-it script
RUN curl -sSL https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -o /usr/local/bin/wait-for-it.sh && \
    chmod +x /usr/local/bin/wait-for-it.sh

# Runtime Stage (Final image with Python runtime)
FROM python:3.10-slim AS movieplatform

WORKDIR /backend

RUN apt-get update && apt-get install -y make

COPY --from=builder /backend /backend
COPY --from=builder /usr/local/bin/wait-for-it.sh /usr/local/bin/wait-for-it.sh

CMD ["wait-for-it.sh", "mongodb:27017", "--", "make", "run"]