import React from "react";
import styled from "@emotion/styled";
import { Table, Space } from "antd";
import { Observer, useObserver } from "mobx-react-lite";
import { useStores } from "@stores";
import { ROUTES } from "@stores/RouterStore";
import { Link } from "react-router-dom";
import { IBasket } from "@src/models";

const { Column } = Table;

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BasketTable: React.FunctionComponent<IProps> = () => {
  const { basketStore } = useStores();
  return useObserver(() => (
    <Observer>
      {() => (
        <Root>
          <Table
            dataSource={basketStore.baskets.map((b) => ({ ...b, key: b.id }))}
          >
            <Column title="Размер" dataIndex="size" />
            <Column title="Цвет" dataIndex="color" />
            <Column title="Материал" dataIndex="material" />
            <Column
              title="Действия"
              key="action"
              render={(text, record: IBasket) => (
                <Space size="middle">
                  <Link
                    to={ROUTES.EDIT_BASKET.replace(":id", String(record.id))}
                  >
                    Изменить
                  </Link>
                  <Link
                    to="/baskets"
                    onClick={() => basketStore.deleteBasket(record.id)}
                  >
                    Удалить
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
export default BasketTable;
