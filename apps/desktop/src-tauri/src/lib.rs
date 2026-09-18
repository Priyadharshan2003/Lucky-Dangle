#[cfg(target_os = "windows")]
use windows::Win32::Foundation::POINT;
#[cfg(target_os = "windows")]
use windows::Win32::UI::WindowsAndMessaging::GetCursorPos;

use std::sync::atomic::{AtomicI32, AtomicBool, Ordering};
use std::sync::Arc;
use std::thread;
use std::time::Duration;
use tauri::State;

use tauri::{
    menu::{Menu, MenuItem, Submenu, PredefinedMenuItem, CheckMenuItem},
    tray::TrayIconBuilder,
    Emitter, Manager, WebviewWindowBuilder, WebviewUrl,
};

struct CharmState {
    x: AtomicI32,
    y: AtomicI32,
    dragging: AtomicBool,
}

#[tauri::command]
fn update_charm_pos(state: State<'_, Arc<CharmState>>, x: i32, y: i32) {
    state.x.store(x, Ordering::Relaxed);
    state.y.store(y, Ordering::Relaxed);
}

#[tauri::command]
fn set_dragging(state: State<'_, Arc<CharmState>>, dragging: bool) {
    state.dragging.store(dragging, Ordering::Relaxed);
}


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let state = Arc::new(CharmState {
        x: AtomicI32::new(-1000),
        y: AtomicI32::new(-1000),
        dragging: AtomicBool::new(false),
    });

    let state_for_setup = state.clone();

    tauri::Builder::default()
        .manage(state.clone())
        .invoke_handler(tauri::generate_handler![update_charm_pos, set_dragging])
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_global_shortcut::Builder::new().build())
        .runtime(tauri_runtime_wry::Wry::default())
        .setup(move |app| {
            let undangle = MenuItem::with_id(app, "undangle", "Undangle\tCtrl+D", true, Some("Ctrl+D"))?;
            let fresh = MenuItem::with_id(app, "fresh", "Hang a fresh garland\tCtrl+X", true, Some("Ctrl+X"))?;
            let separator1 = PredefinedMenuItem::separator(app)?;
            
            let nazar = CheckMenuItem::with_id(app, "nazar", "👁️ Nazar boncuğu", true, true, None::<&str>)?;
            let hamsa = CheckMenuItem::with_id(app, "hamsa", "🪬 Hamsa", true, false, None::<&str>)?;
            let nimbu = CheckMenuItem::with_id(app, "nimbu-mirchi", "🌶️ Nimbu-mirchi", true, false, None::<&str>)?;
            let drishti = CheckMenuItem::with_id(app, "drishti-bommai", "👺 Drishti bommai", true, false, None::<&str>)?;
            let daruma = CheckMenuItem::with_id(app, "daruma", "🏮 Daruma", true, false, None::<&str>)?;
            let maneki = CheckMenuItem::with_id(app, "maneki-neko", "🐱 Maneki-neko", true, false, None::<&str>)?;
            let horseshoe = CheckMenuItem::with_id(app, "horseshoe", "🧲 Horseshoe", true, false, None::<&str>)?;
            let scarab = CheckMenuItem::with_id(app, "scarab", "🪲 Scarab", true, false, None::<&str>)?;
            let emoji = CheckMenuItem::with_id(app, "emoji", "🍀 Emoji", true, false, None::<&str>)?;
            
            let charms_items = vec![
                nazar.clone(), hamsa.clone(), nimbu.clone(), drishti.clone(),
                daruma.clone(), maneki.clone(), horseshoe.clone(), scarab.clone(), emoji.clone()
            ];
            
            let choose_charm = Submenu::with_items(app, "Choose a charm", true, &[
                &nazar, &hamsa, &nimbu, &drishti, &daruma, &maneki, &horseshoe, &scarab, &emoji
            ])?;
            
            let gallery = MenuItem::with_id(app, "gallery", "Open the gallery", true, None::<&str>)?;
            let separator2 = PredefinedMenuItem::separator(app)?;
            
            let bless = MenuItem::with_id(app, "bless", "✨ Bless", true, None::<&str>)?;
            let increase_len = MenuItem::with_id(app, "len-up", "Increase Length", true, None::<&str>)?;
            let decrease_len = MenuItem::with_id(app, "len-down", "Decrease Length", true, None::<&str>)?;
            let length_submenu = Submenu::with_items(app, "Adjust Length", true, &[&increase_len, &decrease_len])?;
            let pause_cycle = CheckMenuItem::with_id(app, "toggle-auto-cycle", "⏸️ Pause Auto Cycle", true, false, None::<&str>)?;
            let separator_options = PredefinedMenuItem::separator(app)?;
            
            let settings = MenuItem::with_id(app, "settings", "⚙️ Open settings\tCtrl+,", true, Some("Ctrl+,"))?;
            let updates = MenuItem::with_id(app, "updates", "Check for updates", true, None::<&str>)?;
            let separator3 = PredefinedMenuItem::separator(app)?;
            
            let quit = MenuItem::with_id(app, "quit", "⌧ Quit Lucky Dangle\tCtrl+Q", true, Some("Ctrl+Q"))?;

            let menu = Menu::with_items(app, &[
                &undangle, &fresh,
                &separator1,
                &choose_charm, &gallery,
                &separator2,
                &bless, &length_submenu,
                &pause_cycle,
                &separator_options,
                &settings, &updates,
                &separator3,
                &quit
            ])?;

            TrayIconBuilder::new()
                .menu(&menu)
                .icon(app.default_window_icon().unwrap().clone())
                .on_menu_event(move |app_handle, event| {
                    let id = event.id().as_ref();
                    if id == "quit" || id == "undangle" {
                        app_handle.exit(0);
                    } else if id == "fresh" {
                        let _ = app_handle.emit("fresh", ());
                    } else if id == "bless" {
                        let _ = app_handle.emit("bless", ());
                    } else if id == "len-up" {
                        let _ = app_handle.emit("len-up", ());
                    } else if id == "len-down" {
                        let _ = app_handle.emit("len-down", ());
                    } else if id == "toggle-auto-cycle" {
                        let _ = app_handle.emit("toggle-auto-cycle", ());
                    } else if id == "gallery" {
                        if let Some(win) = app_handle.get_webview_window("gallery") {
                            let _ = win.set_focus();
                        } else {
                            let _ = WebviewWindowBuilder::new(app_handle, "gallery", WebviewUrl::App("index.html".into()))
                                .title("Lucky Dangle - Gallery")
                                .inner_size(900.0, 750.0)
                                .center()
                                .resizable(true)
                                .transparent(false) // We want a normal solid window for the gallery
                                .build();
                        }
                    } else {
                        // Check if it's a charm selection
                        let is_charm = charms_items.iter().any(|i| i.id().as_ref() == id);
                        if is_charm {
                            for item in &charms_items {
                                let item_id = item.id().as_ref();
                                if item_id == id {
                                    let _ = item.set_checked(true);
                                    let _ = app_handle.emit("change-charm", id);
                                } else {
                                    let _ = item.set_checked(false);
                                }
                            }
                        }
                    }
                })
                .build(app)?;

            #[cfg(target_os = "windows")]
            {
                let window = app.get_webview_window("main").unwrap();
                let _ = window.maximize();
                
                let window_clone = window.clone();
                let state_clone = state_for_setup.clone();
                
                thread::spawn(move || {
                    let mut was_transparent = false;
                    loop {
                        thread::sleep(Duration::from_millis(32));
                        
                        let mut pt = POINT { x: 0, y: 0 };
                        unsafe {
                            let _ = GetCursorPos(&mut pt);
                            let cx = state_clone.x.load(Ordering::Relaxed);
                            let cy = state_clone.y.load(Ordering::Relaxed);
                            let dragging = state_clone.dragging.load(Ordering::Relaxed);
                            
                            let dx = pt.x - cx;
                            let dy = pt.y - cy;
                            // 60px radius for grabbing
                            let dist_sq = dx * dx + dy * dy;
                            let is_near = dist_sq < 80 * 80; // slightly larger grab area
                            
                            let should_be_transparent = !dragging && !is_near;
                            
                            if should_be_transparent && !was_transparent {
                                let _ = window_clone.set_ignore_cursor_events(true);
                                was_transparent = true;
                            } else if !should_be_transparent && was_transparent {
                                let _ = window_clone.set_ignore_cursor_events(false);
                                was_transparent = false;
                            }
                        }
                    }
                });
            }

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while building tauri application");
}
