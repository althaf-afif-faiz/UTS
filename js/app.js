function showModal(id) {
  document.getElementById(id).style.display = "flex";
}
function hideModal(id) {
  document.getElementById(id).style.display = "none";
}

function greetingText() {
  const h = new Date().getHours();
  if (h < 11) return "Selamat pagi";
  if (h < 15) return "Selamat siang";
  if (h < 18) return "Selamat sore";
  return "Selamat malam";
}

function initLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const user = dataPengguna.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      alert("email/password yang anda masukkan salah");
      return;
    }
    localStorage.setItem(
      "book_online_user",
      JSON.stringify({ id: user.id, nama: user.nama, role: user.role })
    );
    window.location.href = "dashboard.html";
  });
  document
    .getElementById("openForgot")
    ?.addEventListener("click", () => showModal("modalForgot"));
  document
    .getElementById("openRegister")
    ?.addEventListener("click", () => showModal("modalRegister"));
  document.querySelectorAll(".closeModal").forEach((b) =>
    b.addEventListener("click", (e) => {
      e.target.closest(".modal-backdrop").style.display = "none";
    })
  );
}

function initDashboard() {
  const el = document.getElementById("greeting");
  if (el) {
    el.textContent =
      greetingText() +
      ", " +
      (JSON.parse(localStorage.getItem("book_online_user"))?.nama || "Tamu");
  }
  document.querySelectorAll("[data-nav]").forEach((btn) => {
    btn.addEventListener(
      "click",
      () => (window.location.href = btn.dataset.nav)
    );
  });
  document.getElementById("logout")?.addEventListener("click", () => {
    localStorage.removeItem("book_online_user");
    localStorage.removeItem("book_online_cart");
    window.location.href = "login.html";
  });
}

function renderCatalog() {
  const wrap = document.getElementById("catalogWrap");
  if (!wrap) return;
  wrap.innerHTML = "";
  dataKatalogBuku.forEach((bk, idx) => {
    const card = document.createElement("div");
    card.className = "book card";
    card.innerHTML = `
      <img src="${bk.cover}" alt="${bk.namaBarang}">
      <div style="flex:1">
        <div style="font-weight:700">${bk.namaBarang}</div>
        <div class="meta">${bk.jenisBarang} · ed ${bk.edisi}</div>
        <div class="row" style="margin-top:8px;">
          <div style="font-weight:700">${bk.harga}</div>
          <div style="margin-left:auto;color:var(--muted)">Stok: ${bk.stok}</div>
        </div>
      </div>`;
    const actions = document.createElement("div");
    actions.className = "row";
    const addBtn = document.createElement("button");
    addBtn.className = "small btn";
    addBtn.textContent = "Tambah ke Cart";
    addBtn.addEventListener("click", () => {
      addToCart(bk.kodeBarang);
    });
    const editBtn = document.createElement("button");
    editBtn.className = "small btn ghost";
    editBtn.textContent = "Edit Stok";
    editBtn.addEventListener("click", () => {
      openEditStock(idx);
    });
    actions.appendChild(addBtn);
    actions.appendChild(editBtn);
    card.appendChild(actions);
    wrap.appendChild(card);
  });
}

function openEditStock(idx) {
  const bk = dataKatalogBuku[idx];
  const qty = prompt("Masukkan stok baru untuk " + bk.namaBarang, bk.stok);
  if (qty !== null) {
    const n = parseInt(qty);
    if (isNaN(n)) {
      alert("Masukkan angka yang valid");
      return;
    }
    bk.stok = n;
    renderCatalog();
    renderStockTable();
  }
}

function renderStockTable() {
  const tbody = document.getElementById("stockTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  dataKatalogBuku.forEach((bk, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${bk.kodeBarang}</td><td>${bk.namaBarang}</td><td>${bk.jenisBarang}</td><td>${bk.edisi}</td><td>${bk.stok}</td><td>${bk.harga}</td>
      <td>
        <div class="actions">
          <button class="small btn" onclick="addToCart('${bk.kodeBarang}')">+ Cart</button>
          <button class="small btn ghost" onclick="removeStock(${i})">Hapus</button>
        </div>
      </td>`;
    tbody.appendChild(tr);
  });
}

function initAddStock() {
  const form = document.getElementById("addStockForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const kode =
      form.kode.value.trim() || "SKU" + Math.floor(Math.random() * 9999);
    const nama = form.nama.value.trim() || "Nama Buku";
    const jenis = form.jenis.value.trim() || "Buku";
    const edisi = form.edisi.value.trim() || "1";
    const stok = parseInt(form.stok.value) || 0;
    const harga = form.harga.value.trim() || "Rp 0";
    const cover = form.cover.value.trim() || "img/pengantar_komunikasi.jpg";
    dataKatalogBuku.push({
      kodeBarang: kode,
      namaBarang: nama,
      jenisBarang: jenis,
      edisi: edisi,
      stok: stok,
      harga: harga,
      cover: cover,
    });
    form.reset();
    renderCatalog();
    renderStockTable();
    alert("Stok berhasil ditambahkan");
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("book_online_cart") || "[]");
}
function saveCart(cart) {
  localStorage.setItem("book_online_cart", JSON.stringify(cart));
  renderCartPreview();
}

function addToCart(kode) {
  const bk = dataKatalogBuku.find((b) => b.kodeBarang === kode);
  if (!bk) {
    alert("Buku tidak ditemukan");
    return;
  }
  const cart = getCart();
  const item = cart.find((c) => c.kodeBarang === kode);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({
      kodeBarang: kode,
      nama: bk.namaBarang,
      hargaStr: bk.harga,
      qty: 1,
      unitPrice: parseInt(bk.harga.replace(/[^0-9]/g, "")),
    });
  }
  saveCart(cart);
  alert("Ditambahkan ke cart");
}

function renderCartPreview() {
  const el = document.getElementById("cartPreview");
  if (!el) return;
  const cart = getCart();
  if (cart.length === 0) {
    el.innerHTML = '<div class="card">Keranjang kosong</div>';
    return;
  }
  let html =
    '<div class="card"><h3>Keranjang</h3><table class="table"><thead><tr><th>Nama</th><th>Qty</th><th>Subtotal</th></tr></thead><tbody>';
  let total = 0;
  cart.forEach((i) => {
    total += i.unitPrice * i.qty;
    html += `<tr><td>${i.nama}</td><td>${i.qty}</td><td>Rp ${
      i.unitPrice * i.qty
    }</td></tr>`;
  });
  html += `</tbody></table><div style="margin-top:10px;font-weight:700">Total: Rp ${total}</div>
    <div style="margin-top:10px"><button class="btn" onclick="location.href='checkout.html'">Checkout</button></div></div>`;
  el.innerHTML = html;
}

function initCheckout() {
  renderCartForCheckout();
  const form = document.getElementById("checkoutForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.nama.value.trim();
    const address = form.alamat.value.trim();
    const payment = form.pembayaran.value;
    if (!name || !address) {
      alert("Isi nama dan alamat");
      return;
    }
    const doNum = "DO" + Date.now().toString().slice(-6);
    const cart = getCart();
    const total = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
    dataTracking[doNum] = {
      nomorDO: doNum,
      nama: name,
      status: "Dikirim",
      ekspedisi: "Kurir (Simulasi)",
      tanggalKirim: new Date().toISOString().slice(0, 10),
      paket: "SIMPKG",
      total: "Rp " + total,
      perjalanan: [
        { waktu: new Date().toISOString(), keterangan: "Pesanan dibuat" },
      ],
    };
    localStorage.removeItem("book_online_cart");
    alert("Pesanan sukses. Nomor DO: " + doNum);
    window.location.href = "tracking.html?do=" + doNum;
  });
}

function renderCartForCheckout() {
  const wrap = document.getElementById("checkoutCart");
  if (!wrap) return;
  const cart = getCart();
  if (cart.length === 0) {
    wrap.innerHTML = '<div class="card">Keranjang kosong</div>';
    return;
  }
  let html =
    '<div class="card"><h3>Order</h3><table class="table"><thead><tr><th>Nama</th><th>Qty</th><th>Harga</th></tr></thead><tbody>';
  cart.forEach((i) => {
    html += `<tr><td>${i.nama}</td><td><input type="number" min="1" value="${
      i.qty
    }" onchange="updateQty('${i.kodeBarang}', this.value)"></td><td>Rp ${
      i.unitPrice * i.qty
    }</td></tr>`;
  });
  html += "</tbody></table></div>";
  wrap.innerHTML = html;
}

function updateQty(kode, val) {
  const cart = getCart();
  const item = cart.find((c) => c.kodeBarang === kode);
  if (!item) return;
  item.qty = parseInt(val) || 1;
  saveCart(cart);
  renderCartForCheckout();
}

function initTracking() {
  const form = document.getElementById("trackingForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const no = form.no.value.trim();
    showTracking(no);
  });
  const params = new URLSearchParams(location.search);
  if (params.has("do")) showTracking(params.get("do"));
}

function showTracking(no) {
  const wrap = document.getElementById("trackResult");
  if (!wrap) return;
  const tr = dataTracking[no];
  if (!tr) {
    wrap.innerHTML = '<div class="card">Nomor DO tidak ditemukan</div>';
    return;
  }
  let html = `<div class="card"><h3>Tracking: ${tr.nomorDO}</h3><p><strong>Nama:</strong> ${tr.nama}</p><p><strong>Status:</strong> ${tr.status}</p>
    <p><strong>Ekspedisi:</strong> ${tr.ekspedisi} · ${tr.paket} · ${tr.tanggalKirim}</p><p><strong>Total:</strong> ${tr.total}</p>
    <div style="margin-top:12px"><strong>Perjalanan:</strong><ul>`;
  tr.perjalanan.forEach(
    (p) => (html += `<li>${p.waktu} — ${p.keterangan}</li>`)
  );
  html += "</ul></div></div>";
  wrap.innerHTML = html;
}

function removeStock(i) {
  if (!confirm("Hapus item dari katalog?")) return;
  dataKatalogBuku.splice(i, 1);
  renderCatalog();
  renderStockTable();
}

window.addEventListener("DOMContentLoaded", () => {
  initLogin();
  initDashboard();
  renderCatalog();
  renderStockTable();
  initAddStock();
  renderCartPreview();
  initCheckout();
  initTracking();
});
