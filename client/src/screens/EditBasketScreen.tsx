import styled from "@emotion/styled";
import React from "react";
import { Button, Drawer, Form, Select, Space, Spin } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { useStores } from "@src/stores/useStores";
import { useForm } from "antd/es/form/Form";
import { ROUTES } from "@src/stores/RouterStore";
import { Observer } from "mobx-react-lite";
import { COLORS, MATERIALS, SIZES } from "@src/types";

interface IFormValues {
  size: string;
  material: string;
  color: string;
}

interface IProps {}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const EditBallScreen: React.FC<IProps> = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { basketStore } = useStores();
  const [form] = useForm();

  const handleFinish = async (v: IFormValues) => {
    await basketStore.updateBasket(id, v);
    close();
  };
  const close = () => history.push(ROUTES.BALLS);
  return (
    <Observer>
      {() => {
        const ball = basketStore.getBasketById(+id);
        return (
          <Root>
            <Drawer
              title="Редактирование"
              placement="right"
              closable={false}
              onClose={close}
              visible
            >
              {basketStore.rootStore.initialized ? (
                <Form
                  form={form}
                  layout="vertical"
                  initialValues={ball}
                  onFinish={handleFinish}
                >
                  <Form.Item
                    name="color"
                    label="Цвет"
                    rules={[{ required: true }]}
                  >
                    <Select value={ball && ball.color}>
                      {COLORS.map((v) => (
                        <Select.Option key={v} value={v}>
                          {v}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="size"
                    label="Размер"
                    rules={[{ required: true }]}
                  >
                    <Select value={ball && ball.size}>
                      {SIZES.map((v) => (
                        <Select.Option key={v} value={v}>
                          {v}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="material"
                    label="Материал"
                    rules={[{ required: true }]}
                  >
                    <Select value={ball && ball.size}>
                      {MATERIALS.map((v) => (
                        <Select.Option key={v} value={v}>
                          {v}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button type="primary" htmlType="submit">
                        Сохранить
                      </Button>
                      <Button htmlType="button" onClick={close}>
                        Отменить
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              ) : (
                <Spin />
              )}
            </Drawer>
          </Root>
        );
      }}
    </Observer>
  );
};
export default EditBallScreen;
