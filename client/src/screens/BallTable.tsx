import React from "react";
import styled from "@emotion/styled";
import { Space, Table } from "antd";
import { Observer, useObserver } from "mobx-react-lite";
import { useStores } from "@stores";
import { ROUTES } from "@src/stores/RouterStore";
import { Link } from "react-router-dom";
import { IBall } from "@src/models";

const { Column } = Table;

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BallTable: React.FunctionComponent<IProps> = () => {
  const { ballStore } = useStores();
  return useObserver(() => (
    <Observer>
      {() => (
        <Root>
          <Table dataSource={ballStore.balls.map((b) => ({ ...b, key: b.id }))}>
            <Column title="Размер" dataIndex="size" />
            <Column title="Цвет" dataIndex="color" />
            <Column title="Материал" dataIndex="material" />
            <Column
              title="Действия"
              key="action"
              render={(text, record: IBall) => (
                <Space size="middle">
                  <Link to={ROUTES.EDIT_BALL.replace(":id", String(record.id))}>
                    Изменить
                  </Link>
                </Space>
              )}
            />
          </Table>
        </Root>
      )}
    </Observer>
  ));
};
export default BallTable;
