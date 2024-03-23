import ContentLoader from 'react-content-loader';

const FolderCardLoader = (props: any) => (
  <ContentLoader
    speed={2}
    width={226}
    height={100}
    viewBox="0 0 226 100"
    backgroundColor="#F3F6FA"
    foregroundColor="#E7ECF3"
    className="w-full h-auto shadow-card rounded-md overflow-hidden"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="226" height="100" />
  </ContentLoader>
);

export default FolderCardLoader;
