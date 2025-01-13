docker build -t parquet-wasm-builder .
docker run --rm -v "$(pwd)":/output parquet-wasm-builder

