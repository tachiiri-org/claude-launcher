import { app } from "electron";
import { autoUpdater } from "electron-updater";

const UPDATE_CHECK_INTERVAL_MS = 6 * 60 * 60 * 1000;

function checkForUpdates(): void {
  void autoUpdater.checkForUpdates().catch((error: unknown) => {
    console.error("Auto-update check failed:", error);
  });
}

export function configureAutoUpdates(): void {
  if (!app.isPackaged) {
    return;
  }

  if (process.env["CLAUDE_LAUNCHER_DISABLE_AUTO_UPDATE"] === "1") {
    return;
  }

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on("error", (error: Error) => {
    console.error("Auto-update error:", error);
  });

  autoUpdater.on("update-available", (info) => {
    console.info(`Update available: ${info.version}`);
  });

  autoUpdater.on("update-downloaded", (info) => {
    console.info(`Update downloaded: ${info.version}`);
  });

  checkForUpdates();

  const timer = setInterval(() => {
    checkForUpdates();
  }, UPDATE_CHECK_INTERVAL_MS);
  timer.unref();
}
