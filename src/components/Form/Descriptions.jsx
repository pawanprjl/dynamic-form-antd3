import React, { Component } from "react";
import { Form, Input, Icon, Button } from "antd";

let descId = 0;

class Descriptions extends Component {
  add = () => {
    const { getFieldValue, setFieldsValue } = this.props;
    // can use data-binding to get
    const keys = getFieldValue("desc");
    const nextKeys = keys.concat(descId++);
    // can use data-binding to set
    // important! notify form to detect changes
    setFieldsValue({
      desc: nextKeys
    });
  };

  remove = (k) => {
    const form = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("desc");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      desc: keys.filter((key) => key !== k)
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props;

    getFieldDecorator("desc", { initialValue: [] });
    const keys = getFieldValue("desc");
    const descItems = keys.map((k, index) => (
      <Form.Item label={null} required={false} key={k}>
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Description cannot be empty!"
            }
          ]
        })(
          <Input
            placeholder="Description here"
            style={{ width: "60%", marginRight: 8 }}
          />
        )}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));

    return (
      <div>
        {descItems}
        <Button type="dashed" onClick={this.add}>
          <Icon type="plus" /> Add field
        </Button>
      </div>
    );
  }
}

export default Descriptions;
