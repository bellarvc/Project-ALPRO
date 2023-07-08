var form = document.getElementsByClassName("tambah-data");
let isShown = false;
var data = [];
function check(event) {
  event.preventDefault();
  const namaMahasiswa = document.getElementById("nama").value;
  const nimMahasiswa = document.getElementById("nim").value;
  const prodiMahasiswa = document.getElementById("prodi").value;
  const emailMahasiswa = document.getElementById("email").value;
  const alamatMahasiswa = document.getElementById("alamat").value;

  let dataMahasiswa = [
    namaMahasiswa,
    nimMahasiswa,
    prodiMahasiswa,
    emailMahasiswa,
    alamatMahasiswa,
  ];

  data.push(dataMahasiswa);
  form[0].style.display = "none";
  isShown = false;
  generateTable();
}

function generateTable() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < data[i].length; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(data[i][j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    tableBody.appendChild(row);
  }
}
function showTambahdata() {
  if (!isShown) {
    form[0].style.display = "flex";
    isShown = true;
  } else {
    form[0].style.display = "none";
    isShown = false;
  }
}
