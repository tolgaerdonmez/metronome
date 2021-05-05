import { IpcRenderer, ipcRenderer, IpcRendererEvent } from "electron";

type EEventListener<P> = (e: IpcRendererEvent, data: P) => void;
type EEventEmitter<P> = (listener: EEventListener<P>) => void;

export class EEvent<Payload = null> {
  header: string;
  action: string;

  ipc: IpcRenderer | undefined;

  on: EEventEmitter<Payload>;
  once: EEventEmitter<Payload>;
  off: EEventEmitter<Payload>;
  send: EEventEmitter<Payload>;

  constructor(
    header: string,
    action: string,
    ipc: IpcRenderer | undefined = undefined
  ) {
    this.header = header;
    this.action = action;
    this.ipc = ipc;

    // creating the event emitters, using (!) syntax but if this.ipc is still undefined it will get detected by the if clause so no problem
    this.on = this.createEmitter(this.ipc!.on);
    this.once = this.createEmitter(this.ipc!.once);
    this.off = this.createEmitter(this.ipc!.off);
    this.send = this.createEmitter(this.ipc!.send);
  }

  get event(): string {
    return this.header + ":" + this.action;
  }

  get isValid(): boolean {
    if (this.header !== "" && this.action !== "") return true;
    else return false;
  }

  // receives an ipcRenderer method and creates the event emitter
  private createEmitter = (
    main: ((...args: any[]) => void) | undefined
  ): EEventEmitter<Payload> => {
    return (listener: EEventListener<Payload>) => {
      if (main !== undefined) main(this.event, listener);
    };
  };
  // send = () this.createEmitter(this.ipc!.send);
  // send = (listener: EEventListener<Payload>) => {
  //   if (this.ipc) {
  //     this.ipc.send(this.event, listener);
  //   }
  // };

  // on = (listener: EEventListener<Payload>) => {
  //   if (this.ipc) {
  //     this.ipc.on(this.event, listener);
  //   }
  // };

  // once = (listener: EEventListener<Payload>) => {
  //   if (this.ipc) {
  //     this.ipc.once(this.event, listener);
  //   }
  // };

  // off = (listener: EEventListener<Payload>) => {
  //   if (this.ipc) {
  //     this.ipc.off(this.event, listener);
  //   }
  // };
}

export const createEvent = <P = null>(e: string): EEvent<P> => {
  const [header, action] = e.split(":");
  try {
    return new EEvent(header, action, ipcRenderer);
  } catch {
    return new EEvent("", "");
  }
};
