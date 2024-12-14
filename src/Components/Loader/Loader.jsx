import { PuffLoader } from 'react-spinners';

const Loader = () => {
  return (
    <PuffLoader
      color="#ffffff"
      size={100}
      cssOverride={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default Loader;
