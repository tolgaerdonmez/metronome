import { ipcRenderer, IpcRendererEvent } from "electron";

export type EEventListener<P> = (e: IpcRendererEvent, ...args: P[]) => void;
export type EEventEmitter<P> = (options: EEventEmitterOptions<P>) => void;
export interface EEventEmitterOptions<P> {
  listener?: EEventListener<P>;
  onlyArgs?: P[];
}

export class EEvent<Payload = null> {
  event: string;

  withIpc: boolean;

  lastListener: EEventListener<Payload> | undefined = undefined;

  constructor(event: string = "", withIpc: boolean = false) {
    this.event = event;
    this.withIpc = withIpc;
  }

  on: EEventEmitter<Payload> = ({ listener }) => {
    if (listener) {
      this.lastListener = listener;
      useIpc(this.withIpc).on(this.event, this.lastListener);
    }
    console.log("on", this.event);
  };

  once: EEventEmitter<Payload> = ({ listener }) => {
    if (listener) useIpc(this.withIpc).once(this.event, listener);
  };

  off = () => {
    if (this.lastListener)
      useIpc(this.withIpc).off(this.event, this.lastListener);
    console.log("off", this.event);
  };

  send: EEventEmitter<Payload> = ({ onlyArgs }) => {
    useIpc(this.withIpc).send(this.event, onlyArgs);
  };
}

const emptyEmitter = (e: any, ..._: any[]) => {
  console.log(e, "EMPTY EMITTER CALLED");
  return {} as any;
};

const useIpc = (use: boolean) =>
  use
    ? ipcRenderer
    : {
        on: emptyEmitter,
        once: emptyEmitter,
        send: emptyEmitter,
        off: emptyEmitter,
      };

export const createEventFactory = (withIpc: boolean = true) => <P = null>(
  e: string
) => {
  return new EEvent<P>(e, withIpc);
};
