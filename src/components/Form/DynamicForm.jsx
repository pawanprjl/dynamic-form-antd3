import React, { Component } from "react";
import { Form, Input, Divider, Button, Icon } from "antd";
import styled from "styled-components";
import Descriptions from "./Descriptions";

const FormItem = Form.Item;
const { TextArea } = Input;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

class DynamicForm extends Component {
  handleOk = (e) => {
    const { onSubmitted, form } = this.props;
    if (e) {
      e.preventDefault();
    }
    form.validateFields((err, values) => {
      if (!err) {
        const { desc, names } = values;
        console.log(
          Object.assign(
            {},
            {
              descriptions: desc.map((key) => names[key])
            }
          )
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form layout="horizontal">
          <h3>Full Name</h3>
          <Divider />
          <FormItem>{getFieldDecorator("full_name")(<Input />)}</FormItem>

          <h3>Description</h3>
          <Divider />
          <Descriptions {...this.props.form} />
        </Form>

        <ButtonWrapper>
          <Button
            type="primary"
            size="large"
            onClick={this.handleOk}
            htmlType="button"
          >
            Submit
          </Button>
        </ButtonWrapper>
      </div>
    );
  }
}

export default Form.create()(DynamicForm);
