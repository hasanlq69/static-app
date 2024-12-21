import React, { useState, useEffect } from 'react';
import RowMahasiswa from './components/RowMahasiswa';
import RowTambahMahasiswa from './components/RowTambahMahasiswa';

let url = "https://crud-mahasiswa-react-js-hasan-default-rtdb.";
url += "asia-southeast1.firebasedatabase.app";
url += "/mahasiswas.json";

const App = () => {
  const [mahasiswas, setMahasiswas] = useState([]);
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    const myFetch = async () => {

      let response = await fetch(url);
      let responseData = await response.json();

      const initMahasiswas = [];
      for (const key in responseData) {
        initMahasiswas.push({
          id: key,
          nim: responseData[key].nim,
          nama: responseData[key].nama,
          jurusan: responseData[key].jurusan,
          asalProvinsi: responseData[key].asalProvinsi,
        })
      }
      setMahasiswas(initMahasiswas);
    }
    myFetch();
  }, [submitCount]);

  // handler untuk menambah data mahasiswa di komponen FormMahasiswa
  const handleTambahMahasiswa = async (data) => {

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })

    setSubmitCount(submitCount + 1);
  }

  // handler untuk mengedit data mahasiswa di komponen RowMahasiswa
  const handleEditMahasiswa = async (id, data) => {

    let url = "https://crud-mahasiswa-react-js-hasan-default-rtdb.";
    url += "asia-southeast1.firebasedatabase.app";
    url += `/mahasiswas/${id}.json`;

    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data)
    })

    setSubmitCount(submitCount + 1);
  }

  // handler untuk menghapus data mahasiswa di komponen RowMahasiswa
  const handleHapusMahasiswa = async (e) => {

    let url = "https://crud-mahasiswa-react-js-hasan-default-rtdb.";
    url += "asia-southeast1.firebasedatabase.app";
    url += `/mahasiswas/${e.target.id}.json`;

    await fetch(url, {
      method: "DELETE"
    });

    setSubmitCount(submitCount + 1);
  }

  return (
    <div className="container mt-5">

      <div className="row mt-5">
        <div className="col">
          <h1 className="text-center">Tabel Mahasiswa</h1>

          <table className="table mt-4">
            <thead>
              <tr>
                <th>NIM</th>
                <th>Nama</th>
                <th>Jurusan</th>
                <th>Asal Provinsi</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                mahasiswas.map((mahasiswa) =>
                  <RowMahasiswa
                    key={mahasiswa.nim}
                    mahasiswa={mahasiswa}
                    onEditMahasiswa={handleEditMahasiswa}
                    onHapusMahasiswa={handleHapusMahasiswa}
                  />
                )
              }
              <RowTambahMahasiswa
                mahasiswas={mahasiswas}
                onTambahMahasiswa={handleTambahMahasiswa}
              />
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )
}

export default App;