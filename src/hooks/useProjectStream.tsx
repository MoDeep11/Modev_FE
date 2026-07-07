import { useEffect, useState } from "react";
import { connectProjectStream } from "../apis/newproject/index";

export const useProjectStream = (projectId: string) => {
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!projectId) return;

    setCompleted(false);
    setProgress(0);
    setLogs([]);
    setMessage("");

    const es = connectProjectStream(projectId);

    es.addEventListener("connected", (e) => {
      const data = JSON.parse(e.data);

      setMessage(data.message);
    });

    es.addEventListener("progress", (e) => {
      const data = JSON.parse(e.data);

      setMessage(data.message);

      setLogs((prev) => [...prev, data.message]);

      if (data.step === "analyzing") {
        setProgress(20);
      }

      if (data.step === "generating") {
        setProgress(50);
      }
    });

    es.addEventListener("file_created", (e) => {
      const data = JSON.parse(e.data);

      setLogs((prev) => [...prev, data.path]);

      setProgress((prev) => Math.min(prev + 3, 95));
    });

    es.addEventListener("complete", (e) => {
      const data = JSON.parse(e.data);

      setMessage(data.message);

      setProgress(100);

      setCompleted(true);

      es.close();
    });

    es.addEventListener("error", (e) => {
      try {
        const data = JSON.parse((e as MessageEvent).data);

        setMessage(data.message);
      } catch {
        setMessage("생성에 실패했습니다.");
      }

      es.close();
    });

    return () => {
      es.close();
    };
  }, [projectId]);

  return {
    progress,
    message,
    completed,
    logs,
  };
};
