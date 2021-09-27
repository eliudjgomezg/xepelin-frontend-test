import { createContext, useEffect, useState } from 'react'
import { IPost } from '../models/IPost'
import { usePostsQuery } from '../services/customHooks/request/usePostQuery'

type TPostsContextProps = {
  postList: IPost[]
  queryList: IPost[]
  setPostList: React.Dispatch<React.SetStateAction<IPost[]>>
  currentScroll: any
}

const PostsContext: React.Context<TPostsContextProps> = createContext<TPostsContextProps>({
  postList: null!,
  queryList: null!,
  setPostList: null!,
  currentScroll: null!,
})

const skip = 20

const PostsContextProvider: React.FC = (props) => {
  const postsQuery = usePostsQuery()
  const [postList, setPostList] = useState<IPost[]>([])
  const [queryList, setQueryList] = useState<any>([])
  const [limit, setLimit] = useState<number>(skip)

  const currentScroll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target
    if (scrollHeight - (scrollTop + clientHeight) < 10) {
      setLimit((prev) => prev + skip)
    }
  }

  useEffect(() => {
    if (postsQuery.isSuccess) {
      const listsliced = postsQuery.data.slice(0, limit)
      setQueryList(listsliced)
    }
  }, [postsQuery.isSuccess])

  useEffect(() => {
    if (postsQuery.isSuccess) {
      const newList = [...postList, ...postsQuery.data]
      const listsliced = newList.slice(0, limit)
      setQueryList(listsliced)
    }
  }, [limit, postList, postsQuery.isSuccess])

  return (
    <PostsContext.Provider value={{ queryList, postList, setPostList, currentScroll }}>{props.children}</PostsContext.Provider>
  )
}

export { PostsContext, PostsContextProvider }
