import { Route, Switch } from 'react-router'
import CpanelLayout from '../Layouts/CpanelLayout/CpanelLayout'
import routes from '../services/constants/routes'

const AppRouter: React.FC = () => {
  return (
    <Switch>
      <Route path={routes.home} component={CpanelLayout} />
    </Switch>
  )
}

export default AppRouter
