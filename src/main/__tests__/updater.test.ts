import { beforeEach, describe, expect, it, vi } from "vitest";

const checkForUpdates = vi.fn(async () => undefined);

vi.mock("electron", () => ({
  app: {
    isPackaged: false,
  },
}));

vi.mock("electron-updater", () => ({
  autoUpdater: {
    autoDownload: false,
    autoInstallOnAppQuit: false,
    on: vi.fn(),
    checkForUpdates,
  },
}));

describe("configureAutoUpdates", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
    delete process.env["CLAUDE_LAUNCHER_DISABLE_AUTO_UPDATE"];
  });

  it("does nothing when app is not packaged", async () => {
    const { app } = await import("electron");
    (app as { isPackaged: boolean }).isPackaged = false;

    const { configureAutoUpdates } = await import("../updater");
    configureAutoUpdates();

    expect(checkForUpdates).not.toHaveBeenCalled();
  });

  it("does nothing when auto-update is disabled by env", async () => {
    const { app } = await import("electron");
    (app as { isPackaged: boolean }).isPackaged = true;
    process.env["CLAUDE_LAUNCHER_DISABLE_AUTO_UPDATE"] = "1";

    const { configureAutoUpdates } = await import("../updater");
    configureAutoUpdates();

    expect(checkForUpdates).not.toHaveBeenCalled();
  });

  it("starts update checks when app is packaged", async () => {
    const { app } = await import("electron");
    (app as { isPackaged: boolean }).isPackaged = true;
    const timerRef = { unref: vi.fn() };
    const setIntervalSpy = vi
      .spyOn(globalThis, "setInterval")
      .mockReturnValue(timerRef as unknown as NodeJS.Timeout);

    const { configureAutoUpdates } = await import("../updater");
    configureAutoUpdates();

    expect(checkForUpdates).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledOnce();
    expect(timerRef.unref).toHaveBeenCalledOnce();
  });
});
