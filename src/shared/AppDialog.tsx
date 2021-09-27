import React, { PropsWithChildren } from 'react'

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import { IconButton, Dialog, DialogContent, Typography } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'

type TAppDialog = {
  open: boolean
  title: string
  fullScreen?: boolean
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  onClose?: () => void
  handleClose?: (e: any) => void
}

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      paddingLeft: '2rem',
      backgroundColor: 'var(--black)',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: 4,
      color: theme.palette.grey[500],
    },
    textWhite: {
      color: 'var(--white)',
    },
  })

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h5' component='span' className={classes.textWhite}>
        {children}
      </Typography>
      {onClose ? (
        <IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

const AppDialog: React.FC<TAppDialog> = (props: PropsWithChildren<any>) => {
  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.onClose}
      maxWidth={props.maxWidth ? props.maxWidth : 'sm'}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='customized-dialog-title' onClose={props.handleClose}>
        <Typography variant='h5' component='span'>
          {props.title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContent>{props.children}</DialogContent>
      </DialogContent>
    </Dialog>
  )
}

export default AppDialog
