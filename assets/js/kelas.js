/* Halaman kelas: pilih rombel & nama, buka kunci menu, cari mapel */
(function () {
  'use strict';
  var ROMAN = document.body.getAttribute('data-roman');
  var KEY = 'asasSiswa_' + ROMAN;
  var rombelSel = document.getElementById('pilihRombel');
  var namaSel = document.getElementById('pilihNama');
  var statusEl = document.getElementById('statusSiswa');
  var grid = document.getElementById('grid-mapel');
  var cari = document.getElementById('cariMapel');
  var kosong = document.getElementById('kosong');
  var PESAN = 'Pilih rombel dan nama untuk membuka menu mata pelajaran.';

  Object.keys(DATA_SISWA).filter(function (k) { return k.indexOf(ROMAN + ' ') === 0; })
    .forEach(function (r) { rombelSel.appendChild(new Option(r, r)); });

  function isiNama(rombel) {
    namaSel.innerHTML = '';
    if (!rombel) { namaSel.appendChild(new Option('— Pilih rombel dahulu —', '')); namaSel.disabled = true; return; }
    namaSel.appendChild(new Option('— Pilih Nama —', ''));
    (DATA_SISWA[rombel] || []).forEach(function (n) { namaSel.appendChild(new Option(n, n)); });
    namaSel.disabled = false;
  }
  function setLinks(qs) {
    grid.querySelectorAll('a.kartu-mapel').forEach(function (a) {
      a.setAttribute('href', a.getAttribute('href').split('?')[0] + qs);
    });
  }
  function reset() {
    sessionStorage.removeItem(KEY);
    rombelSel.value = ''; isiNama('');
    grid.classList.add('terkunci'); setLinks('');
    statusEl.textContent = PESAN;
  }
  function terapkan(rombel, nama) {
    setLinks('?kelas=' + encodeURIComponent(rombel) + '&nama=' + encodeURIComponent(nama));
    grid.classList.remove('terkunci');
    statusEl.textContent = '';
    var s = document.createElement('span');
    s.innerHTML = 'Masuk sebagai ';
    var b = document.createElement('span'); b.className = 'aktif'; b.textContent = nama + ' — ' + rombel;
    s.appendChild(b);
    var g = document.createElement('button'); g.type = 'button'; g.className = 'ganti'; g.textContent = 'Ganti siswa';
    g.addEventListener('click', reset);
    statusEl.appendChild(s); statusEl.appendChild(g);
    try { sessionStorage.setItem(KEY, JSON.stringify({ rombel: rombel, nama: nama })); } catch (e) {}
  }

  rombelSel.addEventListener('change', function () {
    isiNama(rombelSel.value); grid.classList.add('terkunci'); setLinks(''); statusEl.textContent = PESAN;
  });
  namaSel.addEventListener('change', function () {
    if (rombelSel.value && namaSel.value) terapkan(rombelSel.value, namaSel.value);
  });

  if (cari) cari.addEventListener('input', function () {
    var q = cari.value.trim().toLowerCase(), n = 0;
    grid.querySelectorAll('a.kartu-mapel').forEach(function (a) {
      var ok = a.textContent.toLowerCase().indexOf(q) > -1;
      a.style.display = ok ? '' : 'none'; if (ok) n++;
    });
    kosong.style.display = n ? 'none' : 'block';
  });

  try {
    var s = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (s && DATA_SISWA[s.rombel] && DATA_SISWA[s.rombel].indexOf(s.nama) > -1) {
      rombelSel.value = s.rombel; isiNama(s.rombel); namaSel.value = s.nama; terapkan(s.rombel, s.nama);
    }
  } catch (e) {}
})();
