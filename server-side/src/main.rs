use actix_cors::Cors;
use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use std::fs::File;
use std::io::Read;

#[get("/download-parquet")]
async fn download_parquet() -> impl Responder {
    let mut file = File::open("./parquet-files/test.parquet").expect("file not found");
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer)
        .expect("error while reading file");

    HttpResponse::Ok()
        .content_type("application/octet-stream")
        .insert_header(("Content-Disposition", "attachment; filename=test.parquet"))
        .body(buffer)
}

#[get("/")]
async fn index() -> impl Responder {
    "Hello, World!"
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    log::info!("starting HTTP server at http://localhost:8080");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .service(download_parquet)
            .service(index)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
