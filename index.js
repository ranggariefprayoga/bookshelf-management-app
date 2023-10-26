const RAK_BELUM_SELESAI_DIBACA = "RAK_BELUM_SELESAI_DIBACA";
const RAK_SELESAI_DIBACA = "RAK_SELESAI_DIBACA";
const inputButton = document.querySelector("#input-book");
const searchBookButton = document.querySelector("form#search-book");

const addFirstBookToRakSelesaiDibaca = (book) => {
  const rakBuku = [];
  rakBuku.push(book);
  const packaging = JSON.stringify(rakBuku);
  localStorage.setItem(RAK_SELESAI_DIBACA, packaging);
};

const addBookToRakSelesaiDibaca = (book, rakBuku) => {
  rakBuku.push(book);
  const packaging = JSON.stringify(rakBuku);
  localStorage.setItem(RAK_SELESAI_DIBACA, packaging);
};

const addFirstBookToRakBelumSelesaiDibaca = (book) => {
  const listBookNotComplete = [];
  listBookNotComplete.push(book);
  const packaging = JSON.stringify(listBookNotComplete);
  localStorage.setItem(RAK_BELUM_SELESAI_DIBACA, packaging);
};

const addBookToRakBelumSelesaiDibaca = (book, rakBuku) => {
  rakBuku.push(book);
  const packaging = JSON.stringify(rakBuku);
  localStorage.setItem(RAK_BELUM_SELESAI_DIBACA, packaging);
};

const uiCompleteBookshelf = (completeBookshelfListContainer) => {
  completeBookshelfListContainer.innerHTML = `
    <div class="no-books">
        <p>Gak ada nih bukunya...</p>
    </div>
    `;
};

const uiIncompleteBookshelf = (incompleteBookshelfListContainer) => {
  incompleteBookshelfListContainer.innerHTML = `
    <div class="no-books">
        <p>Gak ada nih bukunya...</p>
    </div>
    `;
};

const uiCompleteBookshelfWithDataInLocalStorage = (rakSelesaiDibaca, container) => {
  const rakBuku = JSON.parse(rakSelesaiDibaca) || [];
  if (rakBuku.length === 0) {
    container.innerHTML = `
    <div class="no-books">
        <p>Gak ada nih bukunya...</p>
    </div>
    `;
  } else {
    const allBooks = rakBuku
      .map(
        (book) => `
        <article class="book-item" id=${book.id} is-complete=${book.isComplete}>
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <div class="action">
                <button class="green">Belum Selesai dibaca</button>
                <div class="red">
                  <img class="delete-icon" src="./public/delete-icon.svg" alt="delete-icon" />
                </div>
            </div>
        </article>
        `
      )
      .reduce((prev, curr) => prev + curr, "");

    container.innerHTML = allBooks;
  }
};

const uiInCompleteBookshelfWithDataInLocalStorage = (rakBelumSelesaiDibaca, container) => {
  const rakBuku = JSON.parse(rakBelumSelesaiDibaca) || [];
  if (rakBuku.length === 0) {
    container.innerHTML = `
    <div class="no-books">
        <p>Gak ada nih bukunya...</p>
    </div>
    `;
  } else {
    const allBooks = rakBuku
      .map(
        (book) => `
             <article class="book-item" id=${book.id} is-complete=${book.isComplete}>
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
                <div class="action">
                    <button class="green">Selesai dibaca</button>
                    <div class="red">
                        <img class="delete-icon" src="./public/delete-icon.svg" alt="delete-icon" />
                     </div>
                </div>
             </article>
      `
      )
      .reduce((prev, curr) => prev + curr, "");

    container.innerHTML = allBooks;
  }
};

inputButton.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = new Date();
  const title = document.querySelector("#title-value").value;
  const author = document.querySelector("#author-value").value;
  const year = document.querySelector("#book-year-value").value;
  const isComplete = document.querySelector("#input-book-is-complete").checked;
  const rakSelesaiDibaca = localStorage.getItem(RAK_SELESAI_DIBACA);
  const rakBelumSelesaiDibaca = localStorage.getItem(RAK_BELUM_SELESAI_DIBACA);

  const book = { id, title, author, year, isComplete };

  if (isComplete) {
    if (rakSelesaiDibaca === null) {
      addFirstBookToRakSelesaiDibaca(book);
    } else {
      const rakBuku = JSON.parse(rakSelesaiDibaca);
      addBookToRakSelesaiDibaca(book, rakBuku);
    }
  } else {
    if (rakBelumSelesaiDibaca === null) {
      addFirstBookToRakBelumSelesaiDibaca(book);
    } else {
      const rakBuku = JSON.parse(rakBelumSelesaiDibaca);
      addBookToRakBelumSelesaiDibaca(book, rakBuku);
    }
  }

  Swal.fire("Berhasil!", "Buku berhasil ditambahkan kedalam rak!:)", "success");

  updateRak();
});

searchBookButton.addEventListener("submit", (e) => {
  e.preventDefault();
  const rakSelesaiDibaca = JSON.parse(localStorage.getItem(RAK_SELESAI_DIBACA)) || [];
  const rakBelumSelesaiDibaca = JSON.parse(localStorage.getItem(RAK_BELUM_SELESAI_DIBACA)) || [];
  const titleFromUser = document.querySelector("input#search-book-title").value.toLowerCase();
  const incompleteBookshelfListContainer = document.querySelector("#incompleteBookshelfList");
  const completeBookshelfListContainer = document.querySelector("#completeBookshelfList");

  const cekRakSelesaiDibaca = (titleFromUser, rakSelesaiDibaca) => {
    const matchBooks = rakSelesaiDibaca.filter((book) => book.title.toLowerCase().includes(titleFromUser));
    return matchBooks;
  };

  const cekRakBelumSelesaiDibaca = (titleFromUser, rakBelumSelesaiDibaca) => {
    const matchBooks = rakBelumSelesaiDibaca.filter((book) => book.title.toLowerCase().includes(titleFromUser));
    return matchBooks;
  };

  const viewBooksFromSearch = (filterRakBuku, container) => {
    const filtered = filterRakBuku || [];
    if (filtered.length === 0) {
      container.innerHTML = `
      <div class="no-books">
          <p>Gak ada nih bukunya...</p>
      </div>
      `;
    } else {
      const allBooks = filtered
        .map(
          (book) => `
             <article class="book-item" id=${book.id} is-complete=${book.isComplete}>
                <h3>${book.title}</h3>
                <p>Penulis: ${book.author}</p>
                <p>Tahun: ${book.year}</p>
                <div class="action">
                    <button class="green">Selesai dibaca</button>
                    <div class="red">
                        <img class="delete-icon" src="./public/delete-icon.svg" alt="delete-icon" />
                     </div>
                </div>
             </article>
      `
        )
        .reduce((prev, curr) => prev + curr, "");

      container.innerHTML = allBooks;
    }
  };

  if (rakBelumSelesaiDibaca.length === 0 || rakSelesaiDibaca.length === 0) {
    Swal.fire("Yah, bukunya gak ada:(");
    console.log("masuk sini");
  } else {
    const filteredCompleteBooks = cekRakBelumSelesaiDibaca(titleFromUser, rakSelesaiDibaca);
    const filteredNotCompleteBooks = cekRakSelesaiDibaca(titleFromUser, rakBelumSelesaiDibaca);

    viewBooksFromSearch(filteredCompleteBooks, completeBookshelfListContainer);
    viewBooksFromSearch(filteredNotCompleteBooks, incompleteBookshelfListContainer);
  }
});

const updateRak = () => {
  const rakSelesaiDibaca = localStorage.getItem(RAK_SELESAI_DIBACA);
  const rakBelumSelesaiDibaca = localStorage.getItem(RAK_BELUM_SELESAI_DIBACA);
  const incompleteBookshelfListContainer = document.querySelector("#incompleteBookshelfList");
  const completeBookshelfListContainer = document.querySelector("#completeBookshelfList");

  if (rakSelesaiDibaca === null) {
    uiCompleteBookshelf(completeBookshelfListContainer);
  } else {
    uiCompleteBookshelfWithDataInLocalStorage(rakSelesaiDibaca, completeBookshelfListContainer);
  }

  if (rakBelumSelesaiDibaca === null) {
    uiIncompleteBookshelf(incompleteBookshelfListContainer);
  } else {
    uiInCompleteBookshelfWithDataInLocalStorage(rakBelumSelesaiDibaca, incompleteBookshelfListContainer);
  }
};

updateRak();

document.addEventListener("click", (e) => {
  if (e.target.className === "green") {
    const id = e.target.parentNode.parentNode.getAttribute("id");
    const tipeRak = e.target.parentNode.parentNode.getAttribute("is-complete");
    const rakBelumSelesaiDibaca = JSON.parse(localStorage.getItem(RAK_BELUM_SELESAI_DIBACA));
    const rakSelesaiDibaca = JSON.parse(localStorage.getItem(RAK_SELESAI_DIBACA));

    if (tipeRak === "true") {
      const newBook = rakSelesaiDibaca
        .filter((book) => book.id === id)
        .map((item) => ({ ...item, isComplete: false }))
        .pop();

      if (rakBelumSelesaiDibaca === null) {
        addFirstBookToRakBelumSelesaiDibaca(newBook);
      } else {
        addBookToRakBelumSelesaiDibaca(newBook, rakBelumSelesaiDibaca);
      }
      const rakBukuBaru = rakSelesaiDibaca.filter((book) => book.id !== id);
      localStorage.setItem(RAK_SELESAI_DIBACA, JSON.stringify(rakBukuBaru));
      Swal.fire({
        icon: "success",
        title: "Yeay berhasil!",
        text: "Buku berhasil dipindahkan ke rak belum selesai dibaca:)",
      });
      updateRak();
    } else {
      const newBook = rakBelumSelesaiDibaca
        .filter((book) => book.id === id)
        .map((item) => ({ ...item, isComplete: true }))
        .pop();

      if (rakSelesaiDibaca === null) {
        addFirstBookToRakSelesaiDibaca(newBook);
      } else {
        addBookToRakSelesaiDibaca(newBook, rakSelesaiDibaca);
      }

      const rakBukuBaru = rakBelumSelesaiDibaca.filter((book) => book.id !== id);
      localStorage.setItem(RAK_BELUM_SELESAI_DIBACA, JSON.stringify(rakBukuBaru));
      Swal.fire({
        icon: "success",
        title: "Yeay berhasil!",
        text: "Buku berhasil dipindahkan ke rak selesai dibaca:)",
      });
      updateRak();
    }
  }

  if (e.target.className === "delete-icon") {
    const id = e.target.parentNode.parentNode.parentNode.getAttribute("id");
    const tipeRak = e.target.parentNode.parentNode.parentNode.getAttribute("is-complete");

    if (tipeRak === "true") {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Kamu yakin?",
          text: "Buku ini bakal dihapus dari rak loh!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Tidak, batalkan!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire("Terhapus!", "Buku ini sudah terhapus dari rak ya!:)", "success");
            const newRak = JSON.parse(localStorage.getItem(RAK_SELESAI_DIBACA)).filter((book) => book.id !== id);
            localStorage.setItem(RAK_SELESAI_DIBACA, JSON.stringify(newRak));
            updateRak();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Dibatalkan!", "Buku ini masih ada di rak ya!:)", "error");
          }
        });
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: true,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Kamu yakin?",
          text: "Buku ini bakal dihapus dari rak loh!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ya, hapus!",
          cancelButtonText: "Tidak, batalkan!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire("Terhapus!", "Buku ini sudah terhapus dari rak ya!:)", "success");
            const newRak = JSON.parse(localStorage.getItem(RAK_BELUM_SELESAI_DIBACA)).filter((book) => book.id !== id);
            localStorage.setItem(RAK_BELUM_SELESAI_DIBACA, JSON.stringify(newRak));
            updateRak();
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire("Dibatalkan!", "Buku ini masih ada di rak ya!:)", "error");
          }
        });
    }
  }
});
