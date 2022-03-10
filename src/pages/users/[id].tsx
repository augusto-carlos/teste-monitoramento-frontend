import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/Layout';
import Axios from 'axios';
import { UserModel } from '../../models/user-model';
import { FiBookOpen, FiBriefcase, FiUser } from 'react-icons/fi';
import PostModel from '../../models/post-model';

type Props = {
  user?: UserModel;
  posts?: PostModel[];
  errors?: string;
};

const UserPosts = ({ user, errors, posts }: Props) => {
  if (errors) {
    return (
      <Layout title="Error">
        <p>
          <span className="text-red-300">Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  return (
    <Layout title={`${user ? user.name : ' - Posts'}`}>
      <div className="container bg-gray-50 min-h-screen grid grid-cols-8 m-4 rounded-lg mx-auto items-center">
        <main className="col-start-2 col-span-6 p-4">
          <header className="flex flex-row p-4 my-4 ">
            <div className="p-4 rounded-full bg-blue-50 mr-1">
              <FiUser size={20} className="text-blue-300" />
            </div>
            <div>
              <h2 className="font-lg text-slate-600 font-bold">{user.name}</h2>
              <small className="p-1 rounded-md text-slate-400">
                <FiBriefcase size={14} className="inline align-text-top mr-1" />
                {user.company.name} • {posts.length} posts
              </small>
            </div>
          </header>

          <h3 className="text-xl my-2 text-slate-500 font-bold inline">
            <FiBookOpen size={20} className="mr-1 inline align-middle" />
            Postagens
          </h3>

          <ul className="grid grid-cols-2 gap-4 justify-center">
            {posts.map(post => (
              <li key={post.id}>
                <div className="p-4">
                  <h4 className="text-md mb-1 text-blue-400">{post.title}</h4>
                  <small className="text-slate-500 text-xs">
                    <FiUser size={14} className="inline align-text-top mr-1" />
                    {user.name}
                  </small>
                  <p className="text-slate-400">{post.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default UserPosts;

export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on users
  const { data: users } = await Axios.get(
    `https://teste-monitoramento-api.herokuapp.com/users`
  );

  const paths = users.map(user => ({
    params: { id: user.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const userId = params?.id;
    const { data: posts } = await Axios.get(
      `https://teste-monitoramento-api.herokuapp.com/users/${userId}/posts`
    );
    const { data: user } = await Axios.get(
      `https://teste-monitoramento-api.herokuapp.com/users/${userId}`
    );
    return { props: { posts, user } };
  } catch (err: any) {
    return { props: { errors: err.message } };
  }
};
