import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { usePostQuery } from '../../../services/customHooks/request/usePostQuery'
import { useUserQuery } from '../../../services/customHooks/request/useUserQuery'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Typography, Box, Collapse } from '@material-ui/core'
import Loader from '../../../shared/Loader'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import routes from '../../../services/constants/routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    aboutMe: {
      marginLeft: '1rem',
      color: 'var(--sea-blue)',
      cursor: 'pointer',
    },
    textColor: {
      color: 'var(--gray)',
    },
    collapse: {
      border: '1ps solid var(--black)',
      borderRadius: 4,
      marginBottom: '1rem',
    },
    goBack: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1rem',
    },
  })
)

const PostDetail: React.FC = () => {
  const classes = useStyles()
  const param = useParams<{ postId: string; userId: string }>()
  const postQuery = usePostQuery(param.postId)
  const userQuery = useUserQuery(param.userId)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isLoader, setIsLoader] = useState<boolean>(true)

  useEffect(() => {
    if ((postQuery.isSuccess && userQuery.isSuccess) || (postQuery.isError && userQuery.isError)) {
      setIsLoader(false)
    }
  }, [postQuery.isSuccess, postQuery.isError, userQuery.isSuccess, userQuery.isError])

  return (
    <>
      <Loader in={isLoader} />
      <Link to={routes.posts}>
        <Box display='flex' justifyContent='end'>
          <Typography variant='h6' className={classes.goBack}>
            <ChevronLeftIcon /> Volver
          </Typography>
        </Box>
      </Link>
      {postQuery.isError && userQuery.isError ? (
        <Typography variant='h4'>Upss. The post is not available</Typography>
      ) : (
        <div>
          <Typography variant='h4'>{postQuery?.data?.title}</Typography>
          <Box display='flex' mb={2}>
            <Typography variant='body2'>{userQuery?.data?.username}</Typography>
            {!isLoader && (
              <Typography variant='body2' className={classes.aboutMe} onClick={() => setIsOpen((isOpen) => !isOpen)}>
                More about me ...
              </Typography>
            )}
          </Box>

          <Collapse in={isOpen} className={classes.collapse}>
            <Typography variant='body2' className={classes.textColor}>
              {userQuery?.data?.name}
            </Typography>
            <Typography variant='body2' className={classes.textColor}>
              {userQuery?.data?.email}
            </Typography>
            <Typography variant='body2' className={classes.textColor}>
              {userQuery?.data?.phone}
            </Typography>
            <Typography variant='body2' className={classes.textColor}>
              {userQuery?.data?.website}
            </Typography>
          </Collapse>

          <Typography variant='body1' className={classes.textColor}>
            {postQuery?.data?.body}
          </Typography>
        </div>
      )}
    </>
  )
}

export default PostDetail
