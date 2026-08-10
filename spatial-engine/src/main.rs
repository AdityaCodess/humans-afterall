use warp::Filter;
use futures_util::{StreamExt, SinkExt};
use serde::Serialize;
use std::time::Duration;
use tokio::time::interval;
use redis::AsyncCommands;

#[derive(Serialize)]
struct EntityUpdate {
    id: String,
    position: [f32; 3],
    action: String,
}

#[tokio::main]
async fn main() {
    println!("SPATIAL_OS Engine Booting with Redis Bridge...");

    // Spawn a background task to listen to Python's macro events via Redis
    tokio::spawn(async {
        loop {
            match redis::Client::open("redis://redis:6379") {
                Ok(client) => {
                    match client.get_async_connection().await {
                        Ok(mut con) => {
                            println!("Spatial engine connected to Redis broker.");
                            let mut pubsub = con.as_pubsub();
                            if let Ok(_) = pubsub.subscribe("global_events").await {
                                loop {
                                    if let Ok(msg) = pubsub.on_message().next().await {
                                        if let Ok(payload) = msg.get_payload::<String>() {
                                            println!("Spatial Engine intercepted global event: {}", payload);
                                            // Here is where you can alter entity moods/energies dynamically based on payload content!
                                        }
                                    }
                                }
                            }
                        }
                        Err(e) => eprintln!("Redis connection failed: {}. Retrying...", e),
                    }
                }
                Err(e) => eprintln!("Invalid Redis URL: {}. Retrying...", e),
            }
            tokio::time::sleep(Duration::from_secs(3)).await;
        }
    });

    // Define the WebSocket route for the UI
    let ws_route = warp::path("stream").and(warp::ws()).map(|ws: warp::ws::Ws| {
        ws.on_upgrade(|websocket| async {
            handle_connection(websocket).await;
        })
    });

    warp::serve(ws_route).run(([0, 0, 0, 0], 8088)).await;
}

async fn handle_connection(ws: warp::ws::WebSocket) {
    let (mut sender, _) = ws.split();
    let mut ticker = interval(Duration::from_millis(50));

    let mut current_x: f32 = 0.0;
    let mut current_z: f32 = 0.0;
    let speed: f32 = 0.05;

    let work_target = (5.0, -5.0);
    let home_target = (-4.0, 2.0);
    let mut heading_to_work = true;

    loop {
        ticker.tick().await;

        let (target_x, target_z) = if heading_to_work { work_target } else { home_target };
        let action_text = if heading_to_work { "Commuting to Vertex Corp HQ" } else { "Returning home" };

        let dx = target_x - current_x;
        let dz = target_z - current_z;
        let distance = (dx * dx + dz * dz).sqrt();

        if distance > 0.1 {
            current_x += (dx / distance) * speed;
            current_z += (dz / distance) * speed;
        } else {
            heading_to_work = !heading_to_work;
        }

        let update = EntityUpdate {
            id: String::from("8492-A44"),
            position: [current_x, -0.5, current_z],
            action: String::from(action_text),
        };

        if sender.send(warp::ws::Message::text(serde_json::to_string(&update).unwrap())).await.is_err() {
            break;
        }
    }
}