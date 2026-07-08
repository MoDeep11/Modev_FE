const WIZARD_PATH_PATTERNS: RegExp[] = [
  /^\/$/,
  /^\/main-1$/,
  /^\/main-2$/,
  /^\/main-3$/,
  /^\/main-4$/,
  /^\/main-modify\/[^/]+$/,
  /^\/main-md-2\/[^/]+$/,
  /^\/main-md-3\/[^/]+$/,
  /^\/main-md-4\/[^/]+$/,
];

import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";


export const isWizardPath = (path: string): boolean =>
  WIZARD_PATH_PATTERNS.some((pattern) => pattern.test(path));


export const useWizardExitGuard = () => {
  const navigate = useNavigate();
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const guardedNavigate = useCallback(
    (path: string) => {
      if (isWizardPath(path)) {
        // 같은 마법사 흐름 안 -> 데이터 유지된 채 바로 이동, 모달 필요 없음
        navigate(path);
      } else {
        // 마법사 밖으로 나가는 이동 -> 확인 모달 띄우기
        setPendingPath(path);
        setIsExitModalOpen(true);
      }
    },
    [navigate],
  );

  const confirmExit = useCallback(() => {
    if (pendingPath) {
      sessionStorage.removeItem("projectForm"); // 마법사를 완전히 나가는 거라 임시 데이터 정리
      navigate(pendingPath);
    }
    setIsExitModalOpen(false);
    setPendingPath(null);
  }, [pendingPath, navigate]);

  const cancelExit = useCallback(() => {
    setIsExitModalOpen(false);
    setPendingPath(null);
  }, []);

  return { isExitModalOpen, guardedNavigate, confirmExit, cancelExit };
};