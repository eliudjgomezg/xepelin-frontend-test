import React, { useEffect, useContext, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import routes from '../../services/constants/routes'
import { PostsContext } from '../../context/PostsContext'

import { Box, Typography } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import TollbarApp from './components/ToolbarApp'
import DrawerApp from './components/DrawerApp'
import CreatePost from '../../modules/CreatePost/CreatePost'
import Posts from '../../modules/Posts/Posts'
import AppDialog from '../../shared/AppDialog'

export default function CpanelLayout() {
  const history = useHistory()
  const { currentScroll } = useContext(PostsContext)
  const [open, setOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  useEffect(() => {
    history.push(routes.create_post)
  }, [])

  const componentsProps = {
    open: open,
    setOpen: setOpen,
  }

  return (
    <div className='flex'>
      <CssBaseline />

      <TollbarApp {...componentsProps} />
      <DrawerApp {...componentsProps} />

      <Box height='calc(100vh - 64px)' width='100%' className={`pl-2 bg-gray mt-8`}>
        <Box height='100%' className='p-4 bg-white'>
          <Box
            id='main_section'
            overflow='auto'
            height='100%'
            px={4}
            py={6}
            className='border-2px-black'
            onScroll={currentScroll}
          >
            <Switch>
              <Route path={routes.create_post}>
                <CreatePost />
              </Route>
              <Route path={routes.posts}>
                <Posts />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Box>

      <AppDialog open={isOpen} title='HOLA AMIG@S DE XEPELIN' handleClose={() => setIsOpen(false)}>
        <Typography variant='h4' gutterBottom>
          Bienvenid@s a Xe-panel
        </Typography>
        <Typography variant='body1' gutterBottom>
          Xe-panel es un CMS desarrollado para manejar el contenido de los blogs que mostramos en nuestra p??gina web
          www.xepelin.com
        </Typography>
        <Typography variant='body1' gutterBottom>
          Esta desarrollado en React y typescript. Tambi??n recibe la ayuda de librer??as como react-hook-form, react-query,
          materialUi y sass. Est?? configurado con Eslint y prettier para que la estructura del c??digo siempre sea la misma.
        </Typography>
        <Typography variant='body1' gutterBottom>
          En vista de ser un CMS, busca ser lo m??s simple en cuanto a dise??o pero con una estructura robusta para que pueda ser
          escalado de forma favorable en el tiempo.
        </Typography>
        <Typography variant='body1' gutterBottom>
          A dem??s de robusto, posee un c??digo declarativo para que cualquier desarrollador e incluyendo los compa??eros junior que
          puedan llegar, puedan leerlo y colaborar en el.
        </Typography>
      </AppDialog>
    </div>
  )
}
