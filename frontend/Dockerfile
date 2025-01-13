FROM rust:1.84-slim-bookworm as builder

RUN apt-get update && \
    apt-get install -y \
    git \
    curl \
    llvm \
    clang

RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

CMD ["sh", "-c", "git clone https://github.com/kylebarron/parquet-wasm.git && \
    cd parquet-wasm && \
    wasm-pack build --no-default-features --features zstd --features reader && \
    mv pkg /output/parquet-wasm"]
