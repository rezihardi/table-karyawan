import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNik = () => {
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const navigate = useNavigate();
    const { nik } = useParams();

    useEffect(() => {

        getNikById();
        // eslint-disable-next-line
    }, []);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/edit-karyawan-obj`, {
                nik,
                nama,
                alamat,
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (ev) => {
        const result = ev.target.value.replace(/[^a-z ]/gi, '') //only letter and space
        setNama(result)
    }

    const getNikById = async () => {
        const response = await axios.get(`http://localhost:3000/one-karyawan/${nik}`);
        setNama(response.data.data.nama);
        setAlamat(response.data.data.alamat);
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={updateUser}>
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input
                                type="text"
                                minLength={7}
                                className="input"
                                value={nama}
                                onChange={handleChange}
                                placeholder="Untarizaeca, Etc ...."
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Alamat</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}
                                placeholder="Alamat"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNik;