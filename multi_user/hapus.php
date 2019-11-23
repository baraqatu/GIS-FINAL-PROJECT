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
    $id = $_GET['id'];
 
    //perintah untuk melakukan hapus
    //melakukan penghapusan data berdasarkan ID
    $sql = "DELETE FROM barang WHERE id=$id";
 
    if ($koneksi->query($sql) === TRUE) {
        //jika  berhasil langsung diarahkan kembali ke file bootstrap.php
        header('location:bootstrap.php');
    } else {
        // jika gagal tampil ini
        echo "Gagal Melakukan penghapusan data: " . $koneksi->error;
    }
 
    $koneksi->close();
?>