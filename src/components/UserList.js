import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

const UserList = () => {
    const [karyawan, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getUsers();
    }, [page, keyword]);

    const getUsers = async () => {
        const response = await axios.get(
            `http://localhost:3000/all-karyawan?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setUsers(response.data.data.result);
        setPage(response.data.data.page);
        setPages(response.data.data.totalPage);
        setRows(response.data.data.totalRows);
    };

    const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
            setMsg(
                "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
            );
        } else {
            setMsg("");
        }
    };

    const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
    };

    return (
        <div className="container mt-5">
            <div className="columns">
                <div className="column is-centered">
                    <form onSubmit={searchData}>
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    type="text"
                                    className="input"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Find something here..."
                                />
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-info">
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                    <table className="table is-striped is-bordered is-fullwidth mt-2">
                        <thead>
                        <tr>
                            <th>NIK</th>
                            <th>Alamat</th>
                            <th>Nama</th>
                        </tr>
                        </thead>
                        <tbody>
                        {karyawan.map((el) => (
                            <tr key={el.nik}>
                                <td>{el.nik}</td>
                                <td>{el.alamat}</td>
                                <td>{el.nama}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <p>
                        Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
                    </p>
                    <p className="has-text-centered has-text-danger">{msg}</p>
                    <nav
                        className="pagination is-centered"
                        key={rows}
                        role="navigation"
                        aria-label="pagination"
                    >
                        <ReactPaginate
                            previousLabel={"< Prev"}
                            nextLabel={"Next >"}
                            pageCount={Math.min(10, pages)}
                            onPageChange={changePage}
                            containerClassName={"pagination-list"}
                            pageLinkClassName={"pagination-link"}
                            previousLinkClassName={"pagination-previous"}
                            nextLinkClassName={"pagination-next"}
                            activeLinkClassName={"pagination-link is-current"}
                            disabledLinkClassName={"pagination-link is-disabled"}
                        />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default UserList;