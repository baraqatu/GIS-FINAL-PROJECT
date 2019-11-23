<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "tabel";

    // membuat koneksi
    $koneksi = new mysqli($servername, $username, $password, $dbname);

    // melakukan pengecekan koneksi
    if ($koneksi->connect_error) {
        die("Connection failed: " . $koneksi->connect_error);
    } 

    //menangkap parameter yang dikirimkan dari detail.php
    $id = $_POST['id'];
    $namabarang = $_POST['nama_barang'];
    $desc_barang = $_POST['deskripsi'];

    //perintah untuk melakukan update
    //melakukan update data berdasarkan ID
    $sql = "UPDATE barang SET nama_barang = '$namabarang', desc_barang = '$desc_barang' WHERE id=$id";

    if ($koneksi->query($sql) === TRUE) {
        //jika  berhasil tampil ini
        echo "Data Berhasil Diubah"."</br>";
        echo "<a href='Daftar_SLTP.php'>Kembali Ke Halaman Depan</a>";
    } else {
        // jika gagal tampil ini
        echo "Gagal Melakukan Perubahan: " . $koneksi->error;
    }



    $koneksi->close();
?>