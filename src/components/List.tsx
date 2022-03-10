import * as React from 'react';
import { UserModel } from '../models/user-model';
import ListItem from './ListItem';

type Props = {
  items: UserModel[];
};

const List = ({ items }: Props) => (
  <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {items.map(item => (
      <li key={item.id}>
        <ListItem user={item} />
      </li>
    ))}
  </ul>
);

export default List;
