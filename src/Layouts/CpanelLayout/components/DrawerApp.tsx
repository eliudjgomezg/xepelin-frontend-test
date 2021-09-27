import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../services/constants/routes'

import clsx from 'clsx'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import { ListItemText, Box, Drawer, List, Divider, ListItem, IconButton, ListItemIcon } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AddIcon from '@material-ui/icons/Add'
import ListIcon from '@material-ui/icons/List'

type TdrawerLinks = {
  title: string
  link: string
  icon: ReactElement
}
type TDrawerApp = {
  open: boolean
  setOpen: (e: boolean) => void
}

const cpanelLinks: TdrawerLinks[] = [
  { title: 'Create post', icon: <AddIcon color='primary' />, link: routes.create_post },
  { title: 'Posts', icon: <ListIcon color='primary' />, link: routes.posts },
]

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 220,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: 220,
      borderRight: 'none',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      borderRight: 'none',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 62,
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
)

const DrawerApp: React.FC<TDrawerApp> = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Drawer
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.open,
        [classes.drawerClose]: !props.open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => props.setOpen(false)}>
          {theme.direction === 'rtl' ? <ChevronRightIcon className='text-black' /> : <ChevronLeftIcon className='text-black' />}
        </IconButton>
      </div>
      <Divider />
      <Box height='100%' display='grid' gridTemplateRows='90% 10%' gridTemplateColumns={`${props.open ? '100%' : 62}`}>
        <List>
          {cpanelLinks.map((iter: TdrawerLinks) => (
            <Link key={iter.title} to={iter.link}>
              <ListItem button>
                <ListItemIcon>{iter.icon}</ListItemIcon>
                <ListItemText>
                  <span className='body2-regular text-black'>{iter.title}</span>
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}

export default DrawerApp
