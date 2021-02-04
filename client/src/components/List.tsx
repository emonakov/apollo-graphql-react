import { FC, useState } from 'react';
import styled from 'styled-components';
import ListElement from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ListItemForm from './ListItemForm';

const DeleteIcon = styled(HighlightOffIcon)`
  cursor: pointer;
`;

const List: FC = () => {
  const [items, setItems] = useState<Array<any>>([]);

  const onDelete = (filterItem: string) => {
    const newItems = items.filter((item) => item !== filterItem);
    setItems(newItems);
  };

  return (
    <>
      <h1>List</h1>
      <ListItemForm onAdd={({ item }) => setItems([...items, item])} />
      {items.length > 0 && (
        <ListElement>
          {items.map((item) => (
            <ListItem key={item}>
              <ListItemText primary={item} />
              <DeleteIcon onClick={() => onDelete(item)} />
            </ListItem>
          ))}
        </ListElement>
      )}
    </>
  );
};

export default List;
