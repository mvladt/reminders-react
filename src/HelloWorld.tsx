import { useState } from "react";

type Props = {
  name: string;
};

export default function HelloWorld({ name }: Props) {
  const [count, setCount] = useState<number>(1);
  return (
    <div>
      <h1>
        Hello {name} x{count}!
      </h1>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
