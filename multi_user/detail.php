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

    if($_POST['rowid']) {
        $id = $_POST['rowid'];
        // mengambil data berdasarkan id
        // dan menampilkan data ke dalam form modal bootstrap
        $sql = "SELECT * FROM barang WHERE id = $id";
        $result = $koneksi->query($sql);
        foreach ($result as $baris) { ?>

        <!-- MEMBUAT FORM -->
        <form action="update.php" method="post">
            <input type="hidden" name="id" value="<?php echo $baris['id']; ?>">
            <div class="form-group">
                <label>Nama Barang</label>
                <input type="text" class="form-control" name="nama_barang" value="<?php echo $baris['nama_barang']; ?>">
            </div>
            <div class="form-group">
                <label>Deskripsi</label>
                <textarea class="form-control" rows="5" name="deskripsi" ><?php echo $baris['desc_barang']; ?></textarea>
            </div>
              <button class="btn btn-primary" type="submit">Update</button>
        </form>

        <?php } }
    $koneksi->close();
?>