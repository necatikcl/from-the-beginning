const formatMs = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (!hours && !minutes) {
    return `${seconds}s`;
  }

  if (!hours) {
    return `${minutes}m ${seconds % 60}s`;
  }

  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
};

export default formatMs;
