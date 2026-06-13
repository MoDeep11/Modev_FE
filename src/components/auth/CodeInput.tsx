import styled from "styled-components";
import { Colors } from "../../styles/color";
import { useRef, useEffect } from "react";

type Props = {
  onReady: (getCode: () => string) => void;
};

export default function CodeInput({ onReady }: Props) {
  useEffect(() => {
    onReady(() => inputRefs.current.map((el) => el?.value ?? "").join(""));
  }, []);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val.slice(-1);

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <Wrapper>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          maxLength={1}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
        />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  width: 44px;
  height: 52px;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  border-radius: 8px;
  background-color: ${Colors.background.base};
  border: 1px solid ${Colors.background.overlay};
  color: white;
  caret-color: transparent;

  &:focus {
    outline: none;
    border-color: ${Colors.brand.default};
  }
`;
