import { memo, useState, useEffect } from "react";
import { useDrop } from "react-dnd";

const style = {
  height: "10rem",
  width: "15rem",
  border: "5px solid black",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "black",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

// Global state to track usage of courses across all semesters
const usedCourses = {};

export const Semester = memo(function Semester({
  accept,
  lastDroppedItem,
  semesterId,
  onDrop,
}) {
  const [addedCourses, setAddedCourses] = useState([]);

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: (item, monitor) => {
      onDrop(item, monitor);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = "white";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "white";
  }

  useEffect(() => {
    if (lastDroppedItem && !addedCourses.includes(lastDroppedItem.name)) {
      setAddedCourses((prevCourses) => [...prevCourses, lastDroppedItem.name]);
      usedCourses[lastDroppedItem.name] = true; // Mark the course as used
    }
  }, [lastDroppedItem, addedCourses]);

  return (
    <div
      ref={drop}
      style={{ ...style, backgroundColor }}
      data-testid="Semester"
    >
      {isActive ? "Release to drop" : `${accept[0]}`}
      {addedCourses.map((course, index) => (
        <p key={index}>{course}</p>
      ))}
      {console.log("Courses added", addedCourses, semesterId)}
    </div>
  );
});
