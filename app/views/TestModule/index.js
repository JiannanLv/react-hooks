import React, { useEffect, useState } from "react";
import { Button } from "antd";
import "./style.scss";
const TestCom = (props) => {
  const [count, setCount] = useState(0);

  useEffect(() => {}, []);
  return (
    <div className="test-com">
      <p>You cliked {count} times</p>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Click me
      </Button>
    </div>
  );
};

export default TestCom;
