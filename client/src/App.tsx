import React from "react";
import { Observer } from "mobx-react-lite";
import { Link, Route, Switch } from "react-router-dom";
import BallTable from "@src/screens/BallTable";
import BasketTable from "@src/screens/BasketTable";
import { ROUTES } from "@stores/RouterStore";
import { Layout, Menu, Spin } from "antd";
import { useStores } from "@stores";
import EditBallScreen from "@src/screens/EditBallScreen";
import { SettingOutlined } from "@ant-design/icons";
import AddBallScreen from "@src/screens/AddBallScreen";
import AddBasketScreen from "@src/screens/AddBasketScreen";
import EditBasketScreen from "@src/screens/EditBasketScreen";

const { Header, Content } = Layout;

interface IProps {}

const App: React.FunctionComponent<IProps> = () => {
  const rootStore = useStores();
  return (
    <Observer>
      {() => (
        <Layout style={{ width: "100%" }}>
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[ROUTES.BALLS, ROUTES.BASKETS].filter((v) =>
                rootStore.routerStore.currentPath.includes(v)
              )}
            >
              <Menu.Item key="/baskets">
                <Link to="/baskets">Корзиночки</Link>
              </Menu.Item>
              <Menu.Item key="/balls">
                <Link to="/balls">Шары</Link>
              </Menu.Item>
              <Menu.SubMenu
                key="SubMenu"
                icon={<SettingOutlined />}
                title="Всякие действия"
              >
                <Menu.Item
                  key="random"
                  onClick={() => rootStore.ballStore.createRandomBall()}
                >
                  Добавить рандомный шар
                </Menu.Item>
                <Menu.Item key="ball">
                  <Link to={ROUTES.ADD_BALL}>Добавить шар</Link>
                </Menu.Item>
                <Menu.Item key="basket">
                  <Link to={ROUTES.ADD_BASKET}> Добавить корзиночку</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Header>
          <Content style={{ padding: "50px", boxSizing: "border-box" }}>
            {rootStore.initialized ? (
              <Switch>
                <Route path={ROUTES.BALLS}>
                  <BallTable />
                </Route>
                <Route path={ROUTES.BASKETS}>
                  <BasketTable />
                </Route>
              </Switch>
            ) : (
              <Spin />
            )}
          </Content>
          <Route path={ROUTES.EDIT_BALL} exact>
            <EditBallScreen />
          </Route>
          <Route path={ROUTES.EDIT_BASKET} exact>
            <EditBasketScreen />
          </Route>
          <Route path={ROUTES.ADD_BALL} exact>
            <AddBallScreen />
          </Route>
          <Route path={ROUTES.ADD_BASKET} exact>
            <AddBasketScreen />
          </Route>
        </Layout>
      )}
    </Observer>
  );
};

export default App;
