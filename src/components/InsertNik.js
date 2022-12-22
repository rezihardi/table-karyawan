import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const CreateNik = () => {
    // const [nik, setNik] = useState("")
    const [nama, setNama] = useState("")
    const [alamat, setAlamat] = useState("jakarta")
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const saveNik = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3000/karyawan`, [{
                nama, alamat
            }])
            navigate("/")
        } catch (e){
            console.log('logErr', e.message)
            setError(true)
        }
    }

    return(
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveNik}>
                    {/*<div className="field">*/}
                    {/*    <label className="label">Nik</label>*/}
                    {/*    <div className="control">*/}
                    {/*        <input*/}
                    {/*            type="text"*/}
                    {/*            className="input"*/}
                    {/*            value={nik}*/}
                    {/*            onChange={(e) => setNik(e.target.value)}*/}
                    {/*            placeholder="Nik"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="field">
                        <label className="label">Nama</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="Nama"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Alamat</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={alamat}
                                    onChange={(e) => setAlamat(e.target.value)}
                                >
                                    <option value="Male">Jakarta</option>
                                    <option value="Female">Grogot</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">
                            Simpan
                        </button>
                    </div>
                    {
                        error && <div style={{color: 'red'}}>an validation occurred from the Backend, check the length of 'nama'</div>
                    }
                </form>
            </div>
        </div>
    )

}

export default CreateNik;