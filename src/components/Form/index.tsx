import { memo } from "react";
import Button from "../Button";
import { FormProps } from "./types";

const Form = memo(({ tag, config, inputs, handleSubmit }: FormProps) => {
  const formFields = config.map((field, i) => {
    return (
      <div key={i}>
        <label>
          {field.label}
          <input
            ref={inputs[i]}
            name={field.name}
            type={field.type}
            required maxLength={100}
          />
        </label>
      </div>
    );
  });

  return (
    <form onSubmit={handleSubmit}>
      <h4>{tag}</h4>
      {formFields}
      <Button>Submit</Button>
    </form>
  );
});

export default Form;
