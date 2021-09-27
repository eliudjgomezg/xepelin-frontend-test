import { Link } from 'react-router-dom'
import routes from '../../../services/constants/routes'

import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { IPost } from '../../../models/IPost'

type TPostList = {
  postList: IPost[]
}

const PostList: React.FC<TPostList> = (props) => {
  return (
    <>
      <Typography variant='h3'>Posts list</Typography>
      <List>
        {props.postList.map((post: IPost) => (
          <Link key={post.id} to={`${routes.posts}${routes.post_detail}/${post.id}/${post.userId}`}>
            <ListItem dense={true} button>
              <ListItemText>
                <Typography variant='h6'>{post.title}</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  )
}

export default PostList
