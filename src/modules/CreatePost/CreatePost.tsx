import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PostsContext } from '../../context/PostsContext'
import { useSnackbar } from 'notistack'
import routes from '../../services/constants/routes'
import { usePostMutation } from '../../services/customHooks/request/usePostQuery'
import { IPost } from '../../models/IPost'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { TextField, Typography, Box, Button } from '@material-ui/core'
import Loader from '../../shared/Loader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
      marginBlock: '1rem',
    },
  })
)

const CreatePost = () => {
  const { postList, setPostList } = useContext(PostsContext)
  const snackbar = useSnackbar()
  const form = useForm()
  const classes = useStyles()
  const postMutation = usePostMutation()
  const [isLoader, setIsLoader] = useState<boolean>(false)

  const createPost = (post: IPost) => {
    setIsLoader(true)
    const refactorPost = {
      ...post,
      id: new Date().getTime.toString(),
      userId: (new Date().getTime() + 1000).toString(),
    }

    postMutation.mutate(refactorPost)
  }

  useEffect(() => {
    postMutation.isError && snackbar.enqueueSnackbar('Something went wrong. Try again', { variant: 'error' })
    if (postMutation.isSuccess) {
      form && form.reset()
      setPostList([postMutation.data, ...postList])
      snackbar.enqueueSnackbar('Success!', { variant: 'success' })
    }
    setIsLoader(false)
  }, [postMutation.isError, postMutation.isSuccess])

  return (
    <>
      <Loader in={isLoader} />
      <form onSubmit={form.handleSubmit(createPost)}>
        <Typography variant='h3'>Add a new post</Typography>

        <TextField
          label='Title'
          placeholder='Title here'
          variant='outlined'
          className={classes.textField}
          {...form.register('title', {
            required: 'Required field',
          })}
        />

        <TextField
          label='Body'
          placeholder='Body here'
          variant='outlined'
          className={classes.textField}
          multiline
          rows={4}
          {...form.register('body', {
            required: 'Required field',
          })}
        />

        <Box display='flex' justifyContent='flex-end' position='absolute' bottom={50} right={50}>
          <Button variant='contained' color='primary' type='submit'>
            Create post
          </Button>
        </Box>
      </form>
    </>
  )
}

export default CreatePost
