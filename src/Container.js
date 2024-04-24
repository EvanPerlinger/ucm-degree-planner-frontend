import update from "immutability-helper";
import { memo, useCallback, useState, useEffect } from "react";
import { Course } from "./Course.js";
import { Semester } from "./Semester.js";
import { ItemTypes } from "./ItemTypes.js";

export const Container = memo(function Container() {
  const [semesters, setSemesters] = useState([
    {
      accepts: [ItemTypes.SM1, ItemTypes.SMOSF, ItemTypes.SMOF],
      lastDroppedItem: null,
      semesterId: 0,
    },
    {
      accepts: [ItemTypes.SM2, ItemTypes.SMOSF, ItemTypes.SMOS],
      lastDroppedItem: null,
      semesterId: 1,
    },
    {
      accepts: [ItemTypes.SM3, ItemTypes.SMOSF, ItemTypes.SMOF],
      lastDroppedItem: null,
      semesterId: 2,
    },
    {
      accepts: [ItemTypes.SM4, ItemTypes.SMOSF, ItemTypes.SMOS],
      lastDroppedItem: null,
      semesterId: 3,
    },
    {
      accepts: [ItemTypes.SM5, ItemTypes.SMOSF, ItemTypes.SMOF],
      lastDroppedItem: null,
      semesterId: 4,
    },
    {
      accepts: [ItemTypes.SM6, ItemTypes.SMOSF, ItemTypes.SMOS],
      lastDroppedItem: null,
      semesterId: 5,
    },
    {
      accepts: [ItemTypes.SM7, ItemTypes.SMOSF, ItemTypes.SMOF],
      lastDroppedItem: null,
      semesterId: 6,
    },
    {
      accepts: [ItemTypes.SM8, ItemTypes.SMOSF, ItemTypes.SMOS],
      lastDroppedItem: null,
      semesterId: 7,
    },
  ]);
  const [courses, setCourses] = useState([]);

  function refreshPage() {
    window.location.reload(false);
  }

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const response = await fetch("http://localhost:8080/course/getAllCourse");
    setCourses(await response.json());
  };

  const [droppedCourseNames, setDroppedCourseNames] = useState([]);

  function isDropped(courseName) {
    return droppedCourseNames.indexOf(courseName) > -1;
  }

  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item;
      setDroppedCourseNames(
        update(droppedCourseNames, name ? { $push: [name] } : { $push: [] })
      );
      setSemesters(
        update(semesters, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
            semesterId: {
              $set: index,
            },
          },
        })
      );
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseCode !== item.name)
      );
    },
    [droppedCourseNames, semesters]
  );

  return (
    <div>
      <form style={{ paddingTop: 20, paddingBottom: 20 }}>
        <label>
          Enter your 700 number:
          <input type="text" />
        </label>
      </form>

      <div style={{ overflow: "hidden", clear: "both" }}>
        {semesters.map(({ accepts, lastDroppedItem, semesterId }, index) => {
          const semesterCourses = courses.filter(
            (course) => course.semestersOffered === semesterId
          );
          const semesterPrerequisites = semesterCourses.map(
            (course) => course.prerequisites
          );
          return (
            <Semester
              accept={accepts}
              lastDroppedItem={lastDroppedItem}
              semesterId={semesterId}
              prerequisites={semesterPrerequisites}
              onDrop={(item) => handleDrop(index, item)}
              key={index}
            />
          );
        })}
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}></div>

      <div style={{ overflow: "hidden", clear: "both" }}>
        {courses.map(
          ({ courseCode, prerequisites, semestersOffered }, index) => {
            // Filter out courses whose prerequisites are not met
            const canBeDropped =
              prerequisites === "" ||
              prerequisites
                .split("AND")
                .every((prerequisite) =>
                  droppedCourseNames.includes(prerequisite.trim())
                );
            if (canBeDropped) {
              return (
                <Course
                  name={courseCode}
                  prerequisites={prerequisites}
                  type={semestersOffered}
                  isDropped={isDropped(courseCode)}
                  key={index}
                />
              );
            }
            return null; // Skip rendering this course if prerequisites are not met
          }
        )}
        {console.log("Courses", courses)}
      </div>
      <button
        style={{
          border: "3px solid #cf202e",
          padding: "0.5rem 1rem",
          marginRight: "1.5rem",
          marginBottom: "1.5rem",
          color: "White",
          backgroundColor: "#cf202e",
          borderRadius: "50px",
        }}
        onClick={refreshPage}
      >
        Submit Schedule
      </button>
      <br></br>
    </div>
  );
});
