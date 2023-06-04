interface ExampleProps {
  className?: string;
}

export const Example = ({ ...rest }: ExampleProps) => (
  <div {...rest}>
    <h1>Example</h1>
  </div>
);
