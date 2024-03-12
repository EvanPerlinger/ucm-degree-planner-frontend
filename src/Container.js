import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { Course } from './Course.js'
import { MyComponent, Semester } from './Semester.js'
import { ItemTypes } from './ItemTypes.js'
export const Container = memo(function Container() {
  const [semesters, setSemesters] = useState([
    { accepts: [ItemTypes.SM1, ItemTypes.SM2], lastDroppedItem: null },
    { accepts: [ItemTypes.SM2, ItemTypes.SM1], lastDroppedItem: null },
    { accepts: [ItemTypes.SM3, ItemTypes.SM1], lastDroppedItem: null },
    { accepts: [ItemTypes.SM4, ItemTypes.SM1], lastDroppedItem: null },
    { accepts: [ItemTypes.SM5, ItemTypes.SM1], lastDroppedItem: null },
    { accepts: [ItemTypes.SM6, ItemTypes.SM1], lastDroppedItem: null },
    { accepts: [ItemTypes.SM7, ItemTypes.SM1], lastDroppedItem: null },
    { accepts: [ItemTypes.SM8, ItemTypes.SM1], lastDroppedItem: null }
  ])
  const [courses] = useState([
    { name: 'CS 1100', type: ItemTypes.SM1 },
    { name: 'CS 1110', type: ItemTypes.SM1 },
    { name: 'CS 2200', type: ItemTypes.SM1 },
    { name: 'CS 2300', type: ItemTypes.SM1 },
    { name: 'CS 2400', type: ItemTypes.SM2 },
    { name: 'CS 3100', type: ItemTypes.SM2 },
    { name: 'CS 3110', type: ItemTypes.SM2 },
    { name: 'CS 3130', type: ItemTypes.SM2 },
    { name: 'CS 3200', type: ItemTypes.SM3 },
    { name: 'CS 3500', type: ItemTypes.SM3 },
    { name: 'CS 3800', type: ItemTypes.SM3 },
    { name: 'CS 4110', type: ItemTypes.SM3 },
    { name: 'CS 4120', type: ItemTypes.SM4 },
    { name: 'CS 4300', type: ItemTypes.SM4 },
    { name: 'CS 4500', type: ItemTypes.SM4 },
    { name: 'CS 4600', type: ItemTypes.SM4 },
    { name: 'CS 4910', type: ItemTypes.SM5 },
    { name: 'CS 4920', type: ItemTypes.SM5 },
    { name: 'CS 4930', type: ItemTypes.SM5 },
    { name: 'CS 3120', type: ItemTypes.SM5 },
    { name: 'CS 3300', type: ItemTypes.SM6 },
    { name: 'CS 3810', type: ItemTypes.SM6 },
    { name: 'CS 4000', type: ItemTypes.SM6 },
    { name: 'CS 4020', type: ItemTypes.SM6 },
    { name: 'CS 4130', type: ItemTypes.SM7 },
    { name: 'CS 4140', type: ItemTypes.SM7 },
    { name: 'CS 4510', type: ItemTypes.SM7 },
    { name: 'CS 4610', type: ItemTypes.SM7 },
    { name: 'CS 4620', type: ItemTypes.SM8 },
    { name: 'CS 4630', type: ItemTypes.SM8 },
    { name: 'CS 4700', type: ItemTypes.SM8 },
    { name: 'CS 4800', type: ItemTypes.SM8 }
  ])

  const [droppedCourseNames, setDroppedCourseNames] = useState([])
  function isDropped(courseName) {
    return droppedCourseNames.indexOf(courseName) > 0
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedCourseNames(
        update(droppedCourseNames, name ? { $push: [name] } : { $push: [] }),
      )
      setSemesters(
        update(semesters, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedCourseNames, semesters],
  )
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {semesters.map(({ accepts, lastDroppedItem }, index) => (
          <Semester
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {courses.map(({ name, type }, index) => (
          <Course
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
})
