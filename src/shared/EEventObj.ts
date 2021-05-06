import { IpcRenderer, ipcRenderer, IpcRendererEvent } from "electron";

// export class EEvent_<Payload = null> {
//   header: string;
//   action: string;

//   ipc: IpcRenderer | undefined;

//   on: EEventEmitter<Payload>;
//   once: EEventEmitter<Payload>;
//   off: EEventEmitter<Payload>;
//   // send: () => EEventEmitter<Payload>;

//   constructor(
//     header: string,
//     action: string,
//     ipc: IpcRenderer | undefined = undefined
//   ) {
//     this.header = header;
//     this.action = action;
//     this.ipc = ipc;

//     // creating the event emitters, using (!) syntax but if this.ipc is still undefined it will get detected by the if clause so no problem
//     this.on = this.createEmitter(ipcRenderer!.on);
//     this.once = this.createEmitter(ipcRenderer!.once);
//     this.off = this.createEmitter(ipcRenderer!.off);
//     // this.send = () => this.createEmitter(ipcRenderer!.send);
//   }

//   getEvent = () => this.header + ":" + this.action;

//   isValid = () => {
//     if (this.header !== "" && this.action !== "") return true;
//     else return false;
//   };

//   // receives an ipcRenderer method and creates the event emitter
//   private createEmitter = (
//     main: ((...args: any[]) => void) | undefined
//   ): EEventEmitter<Payload> => {
//     return (listener: EEventListener<Payload>) => {
//       if (main !== undefined) main(this.getEvent(), listener);
//     };
//   };
//   // send = () this.createEmitter(this.ipc!.send);
//   send = (listener: EEventListener<Payload>) => {
//     // if (this.ipc) {
//     ipcRenderer.send(this.getEvent(), listener);
//     // }
//   };

//   // on = (listener: EEventListener<Payload>) => {
//   //   if (this.ipc) {
//   //     this.ipc.on(this.event, listener);
//   //   }
//   // };

//   // once = (listener: EEventListener<Payload>) => {
//   //   if (this.ipc) {
//   //     this.ipc.once(this.event, listener);
//   //   }
//   // };

//   // off = (listener: EEventListener<Payload>) => {
//   //   if (this.ipc) {
//   //     this.ipc.off(this.event, listener);
//   //   }
//   // };
// }

interface EEvent<P> {
  event: string;
  send: EEventEmitter<P>;
  on: EEventEmitter<P>;
  once: EEventEmitter<P>;
  off: EEventEmitter<P>;
}

type EEventListener<P> = (e: IpcRendererEvent, data: P) => void;
type EEventEmitter<P> = (options: EEventEmitterOptions<P>) => void;
interface EEventEmitterOptions<P> {
  listener?: EEventListener<P>;
  onlyArgs?: P[];
}

const createEmitter = <P>(
  event: string,
  emitter: ((...args: any[]) => void) | undefined,
  ignoreListener: boolean = false
): EEventEmitter<P> => {
  return ({ onlyArgs, listener }: EEventEmitterOptions<P>) => {
    if (emitter !== undefined) {
      if (ignoreListener) {
        emitter(event, onlyArgs);
      } else {
        emitter(event, listener);
      }
    }
  };
};

const emptyEmitter = (e: any, ..._: any[]) => {
  console.log(e, "EMPTY EMITTER CALLED");
  return {} as any;
};

export const createEvent = <P = null>(e: string): EEvent<P> => {
  try {
    return {
      event: e,
      on: createEmitter(e, ipcRenderer.on),
      once: createEmitter(e, ipcRenderer.once),
      send: createEmitter(e, ipcRenderer.send, false),
      off: createEmitter(e, ipcRenderer.off),
    };
  } catch {
    return {
      event: e,
      on: emptyEmitter,
      once: emptyEmitter,
      send: emptyEmitter,
      off: emptyEmitter,
    };
  }
};
