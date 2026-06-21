import styled from "styled-components";
import { Colors } from "../../styles/color";

type Tab = "fields" | "stacks" | "dependencies";

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const TAB_LABELS: { key: Tab; label: string }[] = [
  { key: "fields", label: "기술분야" },
  { key: "stacks", label: "기술스택" },
  { key: "dependencies", label: "의존성" },
];

export default function TabBar({ activeTab, onTabChange }: Props) {
  return (
    <Container role="tablist" aria-label="프로젝트 상세 탭">
      {TAB_LABELS.map(({ key, label }) => (
        <Tab
          key={key}
          role="tab"
          aria-selected={activeTab === key}
          $active={activeTab === key}
          onClick={() => onTabChange(key)}
        >
          {label}
        </Tab>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 15px;
  margin-left: 10px;
`;

const Tab = styled.button<{ $active: boolean }>`
  font-size: 16px;
  color: ${({ $active }) =>
    $active ? Colors.text.primary : Colors.text.disabled};
  cursor: pointer;
  background: none;
  border: 0;
  padding: 0;
`;
