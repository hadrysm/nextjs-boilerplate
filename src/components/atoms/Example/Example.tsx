import clsx from 'clsx';

interface ExampleProps {
  className?: string;
}

export const Example = ({ className, ...rest }: ExampleProps) => (
  <div className={clsx('bg-slate-500', className)} {...rest}>
    <h1 className="p-5 text-center text-slate-100">Example</h1>
  </div>
);
