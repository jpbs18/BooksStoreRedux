interface Config {
  label: string;
  type: string;
  name: string;
}

interface FormProps {
  tag: string,
  config: Config[];
  inputs: React.MutableRefObject<any>[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type { Config, FormProps };
