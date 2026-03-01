import { useEffect } from "react";
import { echo } from "../../lib/echo";

export function useMemoBroadcast(onCreated) {
  useEffect(() => {
    const channel = echo.channel('memos');

    channel.listen('.MemoCreated', (payload) => {
        onCreated?.(payload);
    });

    return () => {
        echo.leaveChannel("memos");
    };
  }, [onCreated])
}
