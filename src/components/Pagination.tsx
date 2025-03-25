import "./Pagination.css";

type PaginationType = {
  allRecipesLength: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
};

const Pagination = ({
  allRecipesLength,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationType) => {
  let pages = [];

  for (let i = 0; i < Math.ceil(allRecipesLength / postsPerPage); i++) {
    pages.push(i + 1);
  }

  return (
    <div className="paginationContainer">
      {pages.map((page) => {
        let className = "pageButton ";
        if (page === currentPage) className += "currentPage ";

        return (
          <button
            key={page}
            className={className.trim()}
            onClick={() => {
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
