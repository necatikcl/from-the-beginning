const createConfig = <T>(configCreator: () => T): () => T => {
  const config = configCreator();

  return () => config;
};

export default createConfig;
