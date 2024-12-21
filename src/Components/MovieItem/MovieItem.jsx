const MovieItem = ({ title, poster }) => {
  return (
    <li>
      <p>{title}</p>
      <img
        src={poster}
        alt={title}
        width={200}
      />
    </li>
  );
};

export default MovieItem;
