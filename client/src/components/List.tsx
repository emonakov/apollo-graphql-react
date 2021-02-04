import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import ListElement from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ListItemForm from './ListItemForm';
import { selectItems, addItem, deleteItems } from '../store/slice';

const DeleteIcon = styled(HighlightOffIcon)`
  cursor: pointer;
`;

const List: FC = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const setItems = (item: string) => {
    dispatch(addItem({ items: [item] }));
  };

  const onDelete = (item: string) => dispatch(deleteItems({ items: [item] }));

  return (
    <>
      <h1>List</h1>
      <ListItemForm onAdd={({ item }) => setItems(item)} />
      {items && items.length > 0 && (
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
