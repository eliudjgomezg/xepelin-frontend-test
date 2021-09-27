import React from 'react'

import clsx from 'clsx'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

type TToolbarApp = {
  open: boolean
  setOpen: (e: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: theme.palette.white,
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: 220,
      width: `calc(100% - 220px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    powerIcon: {
      alignSelf: 'center',
      marginRight: '1rem',
    },
  })
)

const TollbarApp: React.FC<TToolbarApp> = (props) => {
  const classes = useStyles()

  return (
    <AppBar position='fixed' className={clsx(classes.appBar, { [classes.appBarShift]: props.open })}>
      <Toolbar>
        <div className={`${props.open ? 'justify-end' : 'justify-between'} w-full`}>
          <IconButton
            onClick={() => props.setOpen(true)}
            edge='start'
            className={clsx(classes.menuButton, { [classes.hide]: props.open })}
          >
            <MenuIcon className='text-black w-4 h-4' />
          </IconButton>
          <Typography variant='h2' color='primary'>
            Xe-panel
          </Typography>
          <PowerSettingsNewIcon color='disabled' className={classes.powerIcon} />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TollbarApp
