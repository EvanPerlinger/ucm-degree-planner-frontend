import { memo } from "react";
import { useDrag } from "react-dnd";
const style = {
  border: "3px solid #cf202e",
  backgroundColor: "#cf202e",
  color: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
};
export const Course = memo(function Course({
  name,
  prerequisites,
  type,
  isDropped,
}) {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name, prerequisites },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [prerequisites, name, type]
  );
  return (
    <div ref={drag} style={{ ...style, opacity }} data-testid="Course">
      {isDropped ? <s>{name}</s> : name}
    </div>
  );
});
