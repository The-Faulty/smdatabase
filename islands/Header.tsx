type Page = {
  path: string;
  title?: string;
  active?: boolean;
};

export const Header = ({ path }: { path: string }) => {
  const pagesList: preact.VNode[] = [];

  /* Here you can edit what pages you have */
  const pages: Page[] = [
    { path: "home" },
    { path: "parts" },
    { path: "projects" },
  ];

  pages.forEach((page) => {
    if (page.path === path) {
      page.active = true;
    }

    pagesList.push(
      <li>
        <a href={page.path} class={page.active ? "active" : ""}>
          {page.title ? page.title : page.path}
        </a>
      </li>,
    );
  });
  return (
    <header>
      <ul>
        <li>
          <h3>smdatabase</h3>
        </li>
        {pagesList}
      </ul>
    </header>
  );
};
