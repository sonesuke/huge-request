# Huge request-response example

In this project, we aim to reduce the amount of data transferred by returning server-side data to the frontend in Parquet format instead of JSON.

## Build

The first time only, you need to build the parquet-wasm module:

```bash
./build-parquet-wasm.sh
```

This will create parquet-wasm directory by cutom compiling the parquet-wasm module.
The reason for this is that the frontend only needs to read the Parquet data.

```bash
npm install
```
