import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';
import { gql, useQuery, useMutation } from '@apollo/client';
import ListElement from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import ListItemForm from './ListItemForm';
import { selectItems, addItem, deleteItems, clearItems } from '../store/slice';
import { ItemInterface } from '../types/StateInterface';
import * as GetItemsTypes from './__generated__/GetItems';
import * as AddItemTypes from './__generated__/AddItem';
import * as DeleteItemTypes from './__generated__/DeleteItem';

const DeleteIcon = styled(HighlightOffIcon)`
  cursor: pointer;
`;

const GET_ITEMS = gql`
  query GetItems {
    items {
      success
      message
      items {
        id
        title
        createdAt
      }
    }
  }
`;

const ADD_ITEM = gql`
  mutation AddItem($itemTitle: String!) {
    createItem(title: $itemTitle) {
      success
      message
      item {
        id
        title
        createdAt
      }
    }
  }
`;

const DELETE_ITEM = gql`
  mutation DeleteItem($itemId: ID!) {
    deleteItem(itemId: $itemId) {
      success
      message
      id
    }
  }
`;

const List: FC = () => {
  const { data, loading, error } = useQuery<GetItemsTypes.GetItems>(GET_ITEMS);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const [addItemMutation, { error: addItemError }] = useMutation<
    AddItemTypes.AddItem,
    AddItemTypes.AddItemVariables
  >(ADD_ITEM, {
    onCompleted({ createItem }) {
      if (createItem?.item) {
        const newItem = (createItem.item as unknown) as ItemInterface;
        dispatch(addItem({ items: [newItem] }));
      }
    },
    errorPolicy: 'all',
  });

  const [deleteItemMutation, { error: deleteItemError }] = useMutation<
    DeleteItemTypes.DeleteItem,
    DeleteItemTypes.DeleteItemVariables
  >(DELETE_ITEM, {
    onCompleted({ deleteItem }) {
      if (deleteItem?.success) {
        const itemToRemove = ({
          id: deleteItem.id,
        } as unknown) as ItemInterface;
        dispatch(deleteItems({ items: [itemToRemove] }));
      }
    },
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (data && data.items?.items) {
      const {
        items: { items },
      } = data;
      const newItems = ([...items] as unknown) as ItemInterface[];
      dispatch(addItem({ items: newItems }));
    }

    return () => {
      dispatch(clearItems());
    };
  }, [data]);

  return (
    <>
      <h1>List</h1>
      <ListItemForm
        onAdd={({ item }) =>
          addItemMutation({ variables: { itemTitle: item } })
        }
      />
      {loading && <h4>Loading......</h4>}
      {error && <h4>Something went wrong while fetching items</h4>}
      {addItemError && <h4>New items was not saved</h4>}
      {deleteItemError && <h4>Item was not deleted</h4>}
      {items && items.length > 0 && (
        <ListElement>
          {items.map((item) => (
            <ListItem key={item.createdAt}>
              <ListItemText
                primary={`${item.title} (${format(
                  fromUnixTime(Number(item.createdAt) / 1000),
                  'dd-MM-yyyy HH:ss'
                )})`}
              />
              <DeleteIcon
                onClick={() =>
                  deleteItemMutation({ variables: { itemId: String(item.id) } })
                }
              />
            </ListItem>
          ))}
        </ListElement>
      )}
    </>
  );
};

export default List;
