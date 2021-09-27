import { useContext } from 'react'
import { Switch, Route } from 'react-router-dom'
import { PostsContext } from '../../context/PostsContext'
import routes from '../../services/constants/routes'

import PostDetail from './components/PostDetail'
import PostList from './components/PostList'

const Posts = () => {
  const { queryList } = useContext(PostsContext)

  return (
    <Switch>
      <Route path={`${routes.posts}${routes.post_detail}/:postId/:userId`}>
        <PostDetail />
      </Route>
      <Route exact={true}>
        <PostList postList={queryList} />
      </Route>
    </Switch>
  )
}

export default Posts
