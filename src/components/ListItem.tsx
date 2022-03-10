import React from 'react';
import Link from 'next/link';
import { UserModel } from '../models/user-model';
import { FiBriefcase, FiUser } from 'react-icons/fi';

type Props = {
  user: UserModel;
};

const ListItem = ({ user }: Props) => (
  <Link href="/users/[id]" as={`/users/${user.id}`}>
    <a>
      <div className="h-60 rounded-lg bg-white border flex flex-col justify-center items-center duration-300 shadow-lg hover:border-blue-300">
        <div className="p-4 rounded-full bg-orange-50">
          <FiUser size={40} className="text-orange-300" />
        </div>
        <h3 className="font-lg my-2 text-slate-600">{user.name}</h3>
        <small className="p-1 rounded-md text-slate-400">
          <FiBriefcase size={14} className="inline align-text-top mr-1" />
          {user.company.name}
        </small>
      </div>
    </a>
  </Link>
);

export default ListItem;
