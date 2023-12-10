function checkForStorage() {
    return typeof Storage !== "undefined";
  }
  
  const tambahBuku = new Event("tambahBuku");
  
  window.addEventListener("load", function () {
    (itemBuku = JSON.parse(localStorage.getItem("rak")) || []), tampilData(itemBuku);
    const o = document.querySelector("#inputBook");
    o.addEventListener("submit", inputNilai);
    document.addEventListener("tambahBuku", simpanData);
  });
  
  function inputNilai(inputNilai) {
    const title = document.querySelector("#inputBookTitle").value;
    const author = document.querySelector("#inputBookAuthor").value;
    const year = document.querySelector("#inputBookYear").value;
    const isComplete = document.querySelector("#inputBookIsComplete").checked;
    const dataBuku = {
      id: Math.random(),
      title: title,
      author: author,
      year: year,
      isComplete: isComplete,
    };
    itemBuku.push(dataBuku);
    document.dispatchEvent(tambahBuku);
    inputNilai.preventDefault();
  }
  
  function tampilData(itemBuku) {
    const belum = document.getElementById("incompleteBook");
    const selesai = document.getElementById("completeBook");
    (belum.innerHTML = ""), (selesai.innerHTML = "");
    for (const data of itemBuku) {
      const itemBuku = document.createElement("article");
      itemBuku.classList.add("book_item");
      const judul = document.createElement("h2");
      judul.innerText = data.title;
      const penulis = document.createElement("p");
      penulis.innerText = "Penulis: " + data.author;
      const tahun = document.createElement("p");
      if (((tahun.innerText = "Tahun: " + data.year), itemBuku.appendChild(judul), itemBuku.appendChild(penulis), itemBuku.appendChild(tahun), data.isComplete)) {
        const div = document.createElement("div");
        div.classList.add("action");
        const button1 = document.createElement("button");
        (button1.id = data.id), (button1.innerText = "Belum Selesai dibaca"), button1.classList.add("green"), button1.addEventListener("click", pindahRakBelum);
        const button2 = document.createElement("button");
        (button2.id = data.id),
          (button2.innerText = "Hapus"),
          button2.classList.add("red"),
          button2.addEventListener("click", dialogue),
          button2.addEventListener("click", hapusItem),
          div.appendChild(button1),
          div.appendChild(button2),
          itemBuku.appendChild(div),
          selesai.appendChild(itemBuku);
      } else {
        const div = document.createElement("div");
        div.classList.add("action");
        const button1 = document.createElement("button");
        (button1.id = data.id), (button1.innerText = "Selesai dibaca"), button1.classList.add("green"), button1.addEventListener("click", pindahRakSelesai);
        const button2 = document.createElement("button");
        (button2.id = data.id),
          (button2.innerText = "Hapus"),
          button2.classList.add("red"),
          button2.addEventListener("click", dialogue),
          button2.addEventListener("click", hapusItem),
          div.appendChild(button1),
          div.appendChild(button2),
          itemBuku.appendChild(div),
          belum.appendChild(itemBuku);
      }
    }
  }
  
  function pindahRakSelesai(inputNilai) {
    const a = itemBuku.findIndex(function (itemBuku) {
      return itemBuku.id === Number(inputNilai.target.id);
    });
    -1 !== a &&
      ((itemBuku[a] = {
        ...itemBuku[a],
        isComplete: !0,
      }),
      document.dispatchEvent(tambahBuku));
  }
  
  function pindahRakBelum(inputNilai) {
    const a = itemBuku.findIndex(function (itemBuku) {
      return itemBuku.id === Number(inputNilai.target.id);
    });
    -1 !== a &&
      ((itemBuku[a] = {
        ...itemBuku[a],
        isComplete: !1,
      }),
      document.dispatchEvent(tambahBuku));
  }
  
  function dialogue() {
    alert("Anda Telah Menghapus Buku");
  }
  
  function hapusItem(inputNilai) {
    const a = itemBuku.findIndex(function (itemBuku) {
      return itemBuku.id === Number(inputNilai.target.id);
    });
    -1 !== a && (itemBuku.splice(a, 1), document.dispatchEvent(tambahBuku));
  }
  
  function simpanData() {
    !(function (itemBuku) {
      localStorage.setItem("rak", JSON.stringify(itemBuku));
    })(itemBuku),
      tampilData(itemBuku);
  }
  