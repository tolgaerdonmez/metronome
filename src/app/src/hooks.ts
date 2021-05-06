import { useEffect } from "react";
import { EEventListener, EEvent } from "../../shared/EEvent";

export function useEEventOnOff<P = null>(
  eevent: EEvent<P>,
  listener: EEventListener<P>,
  deps?: React.DependencyList | undefined
) {
  useEffect(() => {
    eevent.on({
      listener,
    });
    return () => eevent.off();
  }, deps);
}
