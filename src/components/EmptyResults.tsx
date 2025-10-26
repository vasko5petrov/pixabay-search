import { Result } from "antd";

const EmptyResults = () => {
  return (
    <div>
      <Result
        status="404"
        title="No results found"
        subTitle="Please try a different search term."
      />
    </div>
  );
};

export default EmptyResults;
