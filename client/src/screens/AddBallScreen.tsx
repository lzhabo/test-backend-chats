import styled from "@emotion/styled";
import React from "react";
import { Button, Drawer, Form, Select, Space } from "antd";
import { useHistory } from "react-router-dom";
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

const AddBallScreen: React.FC<IProps> = () => {
  const history = useHistory();
  const { ballStore } = useStores();
  const [form] = useForm();

  const handleFinish = async (v: IFormValues) => {
    await ballStore.createBall(v);
    close();
  };
  const close = () => history.push(ROUTES.BALLS);
  return (
    <Observer>
      {() => {
        return (
          <Root>
            <Drawer
              title="Добавить шар"
              placement="left"
              closable={false}
              onClose={close}
              visible
            >
              <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item
                  name="color"
                  label="Цвет"
                  rules={[{ required: true }]}
                >
                  <Select>
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
                  <Select>
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
                  <Select>
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
                      Отправить
                    </Button>
                    <Button htmlType="button" onClick={close}>
                      Отменить
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Drawer>
          </Root>
        );
      }}
    </Observer>
  );
};
export default AddBallScreen;
