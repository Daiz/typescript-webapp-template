// Typings for Hot Module Reloading
declare namespace HotModule {
  type OutdatedModules = number[];

  interface HotNotify {
    type:
      | "self-declined"
      | "declined"
      | "unaccepted"
      | "accepted"
      | "disposed"
      | "accept-errored"
      | "self-accept-errored"
      | "self-accept-error-handler-errored";
    moduleId: number;
  }

  interface HotNotifyDeclined extends HotNotify {
    type: "declined";
    chain: number[];
    parentId: number;
  }

  interface HotNotifyUnaccepted extends HotNotify {
    type: "unaccepted";
    chain: number[];
  }

  interface HotNotifyAccepted extends HotNotify {
    type: "accepted";
    chain: number[];
    outdatedModules: OutdatedModules;
    outdatedDependencies: {
      [key: number]: number[];
    };
  }

  interface HotNotifyDisposed extends HotNotify {
    type: "disposed";
  }

  interface HotNotifyErrored extends HotNotify {
    type:
      | "accept-errored"
      | "self-accept-errored"
      | "self-accept-error-handler-errored";
    dependencyId: number;
    error: Error;
    originalError?: Error;
  }

  interface HotApplyOptions {
    ignoreUnaccepted: boolean;
    ignoreDeclined: boolean;
    ignoreErrored: boolean;
    onDeclined(callback: (info: HotNotifyDeclined) => void): void;
    onUnaccepted(callback: (info: HotNotifyUnaccepted) => void): void;
    onAccepted(callback: (info: HotNotifyAccepted) => void): void;
    onDisposed(callback: (info: HotNotifyDisposed) => void): void;
    onErrored(callback: (info: HotNotifyErrored) => void): void;
  }

  type Status =
    | "idle"
    | "check"
    | "prepare"
    | "ready"
    | "dispose"
    | "apply"
    | "abort"
    | "fail";

  interface Hot {
    accept(dependencies: string | string[], callback: () => void): void;
    decline(dependencies: string | string[]): void;
    dispose(callback: (data: any) => void): void;
    addDisposeHandler(callback: (data: any) => void): void;
    removeDisposeHandler(callback: (data: any) => void): void;
    status(): Status;
    check(autoApply: boolean): Promise<OutdatedModules>;
    check(options: Partial<HotApplyOptions>): Promise<OutdatedModules>;
    apply(options: Partial<HotApplyOptions>): Promise<OutdatedModules>;
    addStatusHandler(callback: (status: Status) => void): void;
    removeStatusHandler(callback: (status: Status) => void): void;
  }
}

declare interface NodeHotModule extends NodeModule {
  hot?: HotModule.Hot;
}
