import ProcessLayout from '@layouts/process/layout';

export default function Layout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return <ProcessLayout lang={lang}>{children}</ProcessLayout>;
}
