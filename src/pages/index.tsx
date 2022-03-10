import Axios from 'axios';
import { GetStaticProps } from 'next';
import { useState } from 'react';
import Layout from '../components/Layout';
import List from '../components/List';

const IndexPage = ({ users: data }) => {
  const [users, setUsers] = useState(data);

  function searchUsersByGroup(e) {
    const groupName = e.target.value;

    if (groupName) {
      let result = users.filter(user =>
        user.company.name.toLowerCase().includes(groupName.toLowerCase())
      );

      setUsers(result);
    } else {
      setUsers(data);
    }
  }

  return (
    <Layout title="Monitorameto de grupos emprasariais">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-slate-700 text-center my-4 font-black text-3xl">
          Busque por usuários
          <br />
          apartir de seus grupos empresariais
        </h1>
        <input
          type="search"
          className="w-80 hover:w-96 duration-300	focus:outline-none border-none rounded-md bg-slate-200 py-3 px-3"
          placeholder="nome do grupo empresarial"
          onChange={searchUsersByGroup}
        />
      </section>
      <main className="grid grid-cols-2 md:grid-cols-6 gap-2 p-4 min-h-screen">
        <aside></aside>
        <div className="col-span-4">
          <List items={users} />
        </div>
      </main>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data: users } = await Axios.get(
    'https://teste-monitoramento-backend.herokuapp.com/users'
  );
  return { props: { users } };
};

export default IndexPage;
