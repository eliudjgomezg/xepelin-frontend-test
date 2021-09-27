import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

type TLoader = {
  in: boolean
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#ffffff',
  },
}))

const Loader: React.FC<TLoader> = (props) => {
  const classes = useStyles()

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.in}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default Loader
