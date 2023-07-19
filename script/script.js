var form = document.getElementsByClassName("tambah-data");
let isShown = false;
var data = [];
const getInput = (id) => document.getElementById(id).value;
const getElement = (id) => document.getElementById(id);
const tableSearch = getElement("searchedTableBody");
const tableNormal = getElement("tablebody");

function check(event) {
  event.preventDefault();
  const namaBuku = getInput(`nama`);
  const tahunBuku = getInput(`tahun`);
  const penulisBuku = getInput(`penulis`);
  const penerbitBuku = getInput(`penerbit`);
  const halamanBuku = getInput(`halaman`);
  const stokBuku = getInput(`stok`);

  const dataBuku = [
    namaBuku,
    tahunBuku,
    penulisBuku,
    penerbitBuku,
    halamanBuku,
    stokBuku,
  ];

  if (
    !(
      namaBuku &&
      tahunBuku &&
      penerbitBuku &&
      penulisBuku &&
      halamanBuku &&
      stokBuku
    )
  ) {
    alert("Data yang dimasukkan Tidak Lengkap");
  } else {
    data.push(dataBuku);
    form[0].style.display = "none";
    isShown = false;
    generateTable();
    saveData();
    window.location.reload();
  }
}

function generateTable() {
  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < data[i].length; j++) {
      const cell = document.createElement("td");
      const cellText = document.createTextNode(data[i][j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    const deleteButton = document.createElement("td");
    const deleteText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteText);
    deleteButton.addEventListener("click", () => deleteData(i));
    row.appendChild(deleteButton);

    tableBody.appendChild(row);
    saveData();
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
  saveData();
}

const saveData = () => {
  localStorage.setItem("data", JSON.stringify(data));
};

const getData = () => {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    data = JSON.parse(savedData);
  }
};

function deleteData(index) {
  data.splice(index, 1);
  generateTable();
  saveData();
}

function selectionSortAsc(index) {
  for (let i = 0; i < data.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < data.length; j++) {
      if (parseInt(data[j][index]) < parseInt(data[minIndex][index])) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const temp = data[i];
      data[i] = data[minIndex];
      data[minIndex] = temp;
    }
  }

  generateTable();
  saveData();
}

function selectionSortDesc(index) {
  for (let i = 0; i < data.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < data.length; j++) {
      if (parseInt(data[j][index]) > parseInt(data[minIndex][index])) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const temp = data[i];
      data[i] = data[minIndex];
      data[minIndex] = temp;
    }
  }

  generateTable();
  saveData();
}

let tableShown = false;
function searchData() {
  const searchedData = getInput("cari");
  for (let i = 0; i < data.length; i++) {
    if (searchedData === data[i][0]) {
      generateTableSearched();
      if (!tableShown) {
        tableNormal.remove();
        tableShown = true;
      } else {
        tableSearch.remove();
        tableShown = false;
      }
    }
  }
}

function generateTableSearched() {
  const searchedData = getInput("cari");
  const tableBody = document.getElementById("searchedTableBody");
  tableBody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === searchedData) {
      const row = document.createElement("tr");

      for (let j = 0; j < data[i].length; j++) {
        const cell = document.createElement("td");
        const cellText = document.createTextNode(data[i][j]);
        cell.appendChild(cellText);
        row.appendChild(cell);
      }

      const deleteButton = document.createElement("td");
      const deleteText = document.createTextNode("Delete");
      deleteButton.appendChild(deleteText);
      deleteButton.addEventListener("click", () => deleteData(i));
      row.appendChild(deleteButton);

      tableBody.appendChild(row);
    }
  }
  getElement("backbtn").style.display = "block";
  saveData();
}

getData();
generateTable();
