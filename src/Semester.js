import { memo, useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes.js';

const style = {
  height: '12rem',
  width: '12rem',
  border: '5px solid black',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'black',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

export const Semester = memo(function Semester({
  accept,
  lastDroppedItem,
  onDrop,
}) {
  const [array, setArray] = useState([]);
  const [prevLastDroppedItem, setPrevLastDroppedItem] = useState(null); // Initialize prevLastDroppedItem
  const addedRef = useRef(false); // Using ref to track if an item is added

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = isOver && canDrop;
  let backgroundColor = 'white';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'white';
  }

  useEffect(() => {
    if (lastDroppedItem && lastDroppedItem !== prevLastDroppedItem && !addedRef.current) {
      setArray(prevArray => [...prevArray, lastDroppedItem.name]);
      setPrevLastDroppedItem(lastDroppedItem);
      addedRef.current = true;
    } else {
      addedRef.current = false;
    }
  }, [lastDroppedItem, prevLastDroppedItem]);

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="Semester">
      {isActive ? 'Release to drop' : `${accept[0]}`}
      {console.log(array)}
      {array.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
});
