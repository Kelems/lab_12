import React from "react";
import axios from "axios";
import ReposList from "./RepList";

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      pages: 20,
      per_page: 10,
      visible: "non-visible",
      pagination: []
    };
  }
  searchNew() {
    this.setState(
      () => {
        return { page: 1 };
      },
      () => this.search()
    );
  }

  search() {
    let text = document.getElementById("text").value;

    let paggArr = new Array(this.state.pages);
    for (let i = 0; i < paggArr.length; i++) paggArr[i] = i;

    if (text !== "") {
      let sort = document.getElementById("sort-items").value;
      let sortValue = sort.split("-")[1];
      let pagination =
        "&page=" + this.state.page + "&per_page=" + this.state.per_page;
      let url =
        "https://api.github.com/search/repositories?q=" + text + pagination;

      if (sort === "best-matches") url += "&order=desc";

      if (sort === "most-stars") url += "&sort=" + sortValue + "&order=desc";

      if (sort === "fewest-stars") url += "&sort=" + sortValue + "&order=asc";
      axios(url)
        .then((response) => {
          if (response.data.items.length !== 0) {
            this.setState(
              () => {
                return {
                  data: response.data.items,
                  pagination: paggArr,
                  visible: "visible"
                };
              },
              () => this.changeActivePage()
            );
          } else alert("Ничего не найдено.");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  changeCurrentPage(page) {
    this.setState(() => {
      return { page: page };
    });
  }

  changeActivePage() {
    let pages = document.getElementsByClassName("page");

    for (let i = 0; i < pages.length; i++) {
      if (this.state.page === +pages[i].innerText) {
        pages[i].classList.add("active");
      } else {
        pages[i].classList.remove("active");
      }
    }
  }

  changePageOnClick(page) {
    this.setState(
      () => {
        return { page: page };
      },
      () => this.search()
    );
  }

  render() {
    return (
      <div>
        <h1 class="top">12 лабораторная - GitHub GraphQl API</h1>
        <div id="search">
          <select
            id="sort-items"
            class="sort"
            onChange={() => this.changeCurrentPage(1)}
          >
            <option value="best-match">Best match</option>
            <option value="most-stars">Most stars</option>
            <option value="fewest-stars">Fewest stars</option>
          </select>
          <input type="text" id="text" />
          <button
            type="button"
            class="btn btn-primary btn-sm"
            onClick={() => this.searchNew()}
          >
            Поиск
          </button>
        </div>
        <ul class="list-group">
          <ReposList data={this.state.data} />
          <li class="list-group-item">
            <div id="pages" className={this.state.visible}>
              {this.state.pagination.map((page) => {
                return (
                  <button
                    onClick={() => this.changePageOnClick(page + 1)}
                    key={page}
                  >
                    {page + 1}
                  </button>
                );
              })}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
