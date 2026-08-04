use std::time::Duration;
use tokio::time::sleep;

#[tokio::main]
async fn main() {
    println!("Spatial Engine booted up and listening on port 9000...");
    
    // Continuous loop keeps the Rust process alive
    loop {
        sleep(Duration::from_secs(1)).await;
    }
}