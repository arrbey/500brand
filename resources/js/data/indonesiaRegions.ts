export interface Province {
  code: string;
  name: string;
  cities: string[];
}

export const INDONESIA_REGIONS: Province[] = [
  {
    code: '11',
    name: 'Aceh',
    cities: [
      'Banda Aceh', 'Sabang', 'Lhokseumawe', 'Langsa', 'Subulussalam',
      'Aceh Besar', 'Aceh Barat', 'Aceh Barat Daya', 'Aceh Jaya', 'Aceh Selatan',
      'Aceh Singkil', 'Aceh Tamiang', 'Aceh Tengah', 'Aceh Tenggara', 'Aceh Timur',
      'Aceh Utara', 'Bener Meriah', 'Bireuen', 'Gayo Lues', 'Nagan Raya', 'Pidie', 'Pidie Jaya', 'Simeulue'
    ]
  },
  {
    code: '12',
    name: 'Sumatera Utara',
    cities: [
      'Medan', 'Binjai', 'Pematangsiantar', 'Tanjungbalai', 'Tebing Tinggi', 'Sibolga', 'Padang Sidempuan', 'Gunungsitoli',
      'Deli Serdang', 'Karo', 'Langkat', 'Simalungun', 'Asahan', 'Batubara', 'Dairi', 'Humbang Hasundutan',
      'Labuhanbatu', 'Labuhanbatu Selatan', 'Labuhanbatu Utara', 'Mandailing Natal', 'Nias', 'Nias Barat', 'Nias Selatan', 'Nias Utara',
      'Padang Lawas', 'Padang Lawas Utara', 'Pakpak Bharat', 'Samosir', 'Serdang Bedagai', 'Tapanuli Selatan', 'Tapanuli Tengah', 'Tapanuli Utara', 'Toba'
    ]
  },
  {
    code: '13',
    name: 'Sumatera Barat',
    cities: [
      'Padang', 'Bukittinggi', 'Padang Panjang', 'Pariaman', 'Payakumbuh', 'Sawahlunto', 'Solok',
      'Agam', 'Dharmasraya', 'Kepulauan Mentawai', 'Lima Puluh Kota', 'Padang Pariaman', 'Pasaman', 'Pasaman Barat',
      'Pesisir Selatan', 'Sijunjung', 'Solok', 'Solok Selatan', 'Tanah Datar'
    ]
  },
  {
    code: '14',
    name: 'Riau',
    cities: [
      'Pekanbaru', 'Dumai',
      'Bengkalis', 'Indragiri Hilir', 'Indragiri Hulu', 'Kampar', 'Kepulauan Meranti', 'Kuantan Singingi',
      'Pelalawan', 'Rokan Hilir', 'Rokan Hulu', 'Siak'
    ]
  },
  {
    code: '15',
    name: 'Jambi',
    cities: [
      'Jambi', 'Sungai Penuh',
      'Batanghari', 'Bungo', 'Kerinci', 'Merangin', 'Muaro Jambi', 'Sarolangun', 'Tanjung Jabung Barat', 'Tanjung Jabung Timur', 'Tebo'
    ]
  },
  {
    code: '16',
    name: 'Sumatera Selatan',
    cities: [
      'Palembang', 'Lubuklinggau', 'Pagar Alam', 'Prabumulih',
      'Banyuasin', 'Empat Lawang', 'Lahat', 'Muara Enim', 'Musi Banyuasin', 'Musi Rawas', 'Musi Rawas Utara',
      'Ogan Ilir', 'Ogan Komering Ilir', 'Ogan Komering Ulu', 'Ogan Komering Ulu Selatan', 'Ogan Komering Ulu Timur', 'Penukal Abab Lematang Ilir'
    ]
  },
  {
    code: '17',
    name: 'Bengkulu',
    cities: [
      'Bengkulu',
      'Bengkulu Selatan', 'Bengkulu Tengah', 'Bengkulu Utara', 'Kaur', 'Kepahiang', 'Lebong', 'Mukomuko', 'Rejang Lebong', 'Seluma'
    ]
  },
  {
    code: '18',
    name: 'Lampung',
    cities: [
      'Bandar Lampung', 'Metro',
      'Lampung Barat', 'Lampung Selatan', 'Lampung Tengah', 'Lampung Timur', 'Lampung Utara', 'Mesuji', 'Pesawaran',
      'Pesisir Barat', 'Pringsewu', 'Tanggamus', 'Tulang Bawang', 'Tulang Bawang Barat', 'Way Kanan'
    ]
  },
  {
    code: '19',
    name: 'Kepulauan Bangka Belitung',
    cities: [
      'Pangkalpinang',
      'Bangka', 'Bangka Barat', 'Bangka Selatan', 'Bangka Tengah', 'Belitung', 'Belitung Timur'
    ]
  },
  {
    code: '21',
    name: 'Kepulauan Riau',
    cities: [
      'Batam', 'Tanjungpinang',
      'Bintan', 'Karimun', 'Kepulauan Anambas', 'Lingga', 'Natuna'
    ]
  },
  {
    code: '31',
    name: 'DKI Jakarta',
    cities: [
      'Jakarta Pusat', 'Jakarta Utara', 'Jakarta Barat', 'Jakarta Selatan', 'Jakarta Timur', 'Kepulauan Seribu'
    ]
  },
  {
    code: '32',
    name: 'Jawa Barat',
    cities: [
      'Bandung', 'Bekasi', 'Bogor', 'Cimahi', 'Cirebon', 'Depok', 'Sukabumi', 'Tasikmalaya', 'Banjar',
      'Bandung', 'Bandung Barat', 'Bekasi', 'Bogor', 'Ciamis', 'Cianjur', 'Cirebon', 'Garut', 'Indramayu',
      'Karawang', 'Kuningan', 'Majalengka', 'Pangandaran', 'Purwakarta', 'Subang', 'Sukabumi', 'Sumedang', 'Tasikmalaya'
    ]
  },
  {
    code: '33',
    name: 'Jawa Tengah',
    cities: [
      'Semarang', 'Surakarta (Solo)', 'Magelang', 'Pekalongan', 'Salatiga', 'Tegal',
      'Banjarnegara', 'Banyumas (Purwokerto)', 'Batang', 'Blora', 'Boyolali', 'Brebes', 'Cilacap', 'Demak',
      'Grobogan', 'Jepara', 'Karanganyar', 'Kebumen', 'Kendal', 'Klaten', 'Kudus', 'Magelang', 'Pati',
      'Pekalongan', 'Pemalang', 'Purbalingga', 'Purworejo', 'Rembang', 'Semarang', 'Sragen', 'Sukoharjo', 'Tegal', 'Temanggung', 'Wonogiri', 'Wonosobo'
    ]
  },
  {
    code: '34',
    name: 'DI Yogyakarta',
    cities: [
      'Yogyakarta', 'Bantul', 'Gunungkidul', 'Kulon Progo', 'Sleman'
    ]
  },
  {
    code: '35',
    name: 'Jawa Timur',
    cities: [
      'Surabaya', 'Malang', 'Batu', 'Blitar', 'Kediri', 'Madiun', 'Mojokerto', 'Pasuruan', 'Probolinggo',
      'Bangkalan', 'Banyuwangi', 'Blitar', 'Bojonegoro', 'Bondowoso', 'Gresik', 'Jember', 'Jombang', 'Kediri',
      'Lamongan', 'Lumajang', 'Madiun', 'Magetan', 'Malang', 'Mojokerto', 'Nganjuk', 'Ngawi', 'Pacitan',
      'Pamekasan', 'Pasuruan', 'Ponorogo', 'Probolinggo', 'Sampang', 'Sidoarjo', 'Situbondo', 'Sumenep', 'Trenggalek', 'Tuban', 'Tulungagung'
    ]
  },
  {
    code: '36',
    name: 'Banten',
    cities: [
      'Serang', 'Cilegon', 'Tangerang', 'Tangerang Selatan',
      'Lebak', 'Pandeglang', 'Serang', 'Tangerang'
    ]
  },
  {
    code: '51',
    name: 'Bali',
    cities: [
      'Denpasar', 'Badung', 'Bangli', 'Buleleng', 'Gianyar', 'Jembrana', 'Karangasem', 'Klungkung', 'Tabanan'
    ]
  },
  {
    code: '52',
    name: 'Nusa Tenggara Barat',
    cities: [
      'Mataram', 'Bima',
      'Bima', 'Dompu', 'Lombok Barat', 'Lombok Tengah', 'Lombok Timur', 'Lombok Utara', 'Sumbawa', 'Sumbawa Barat'
    ]
  },
  {
    code: '53',
    name: 'Nusa Tenggara Timur',
    cities: [
      'Kupang',
      'Alor', 'Belu', 'Ende', 'Flores Timur', 'Kupang', 'Lembata', 'Malaka', 'Manggarai', 'Manggarai Barat (Labuan Bajo)',
      'Manggarai Timur', 'Nagekeo', 'Ngada', 'Rote Ndao', 'Sabu Raijua', 'Sikka', 'Sumba Barat', 'Sumba Barat Daya',
      'Sumba Tengah', 'Sumba Timur', 'Timor Tengah Selatan', 'Timor Tengah Utara'
    ]
  },
  {
    code: '61',
    name: 'Kalimantan Barat',
    cities: [
      'Pontianak', 'Singkawang',
      'Bengkayang', 'Kapuas Hulu', 'Kayong Utara', 'Ketapang', 'Kubu Raya', 'Landak', 'Melawi', 'Mempawah', 'Sambas', 'Sanggau', 'Sekadau', 'Sintang'
    ]
  },
  {
    code: '62',
    name: 'Kalimantan Tengah',
    cities: [
      'Palangka Raya',
      'Barito Selatan', 'Barito Timur', 'Barito Utara', 'Gunung Mas', 'Kapuas', 'Katingan', 'Kotawaringin Barat', 'Kotawaringin Timur', 'Lamandau', 'Murung Raya', 'Pulang Pisau', 'Sukamara', 'Seruyan'
    ]
  },
  {
    code: '63',
    name: 'Kalimantan Selatan',
    cities: [
      'Banjarmasin', 'Banjarbaru',
      'Balangan', 'Banjar', 'Barito Kuala', 'Hulu Sungai Selatan', 'Hulu Sungai Tengah', 'Hulu Sungai Utara', 'Kotabaru', 'Tabalong', 'Tanah Bumbu', 'Tanah Laut', 'Tapin'
    ]
  },
  {
    code: '64',
    name: 'Kalimantan Timur',
    cities: [
      'Samarinda', 'Balikpapan', 'Bontang', 'Nusantara (IKN)',
      'Berau', 'Kutai Barat', 'Kutai Kartanegara', 'Kutai Timur', 'Mahakam Ulu', 'Paser', 'Penajam Paser Utara'
    ]
  },
  {
    code: '65',
    name: 'Kalimantan Utara',
    cities: [
      'Tarakan',
      'Bulungan', 'Malinau', 'Nunukan', 'Tana Tidung'
    ]
  },
  {
    code: '71',
    name: 'Sulawesi Utara',
    cities: [
      'Manado', 'Bitung', 'Tomohon', 'Kotamobagu',
      'Bolaang Mongondow', 'Bolaang Mongondow Selatan', 'Bolaang Mongondow Timur', 'Bolaang Mongondow Utara',
      'Kepulauan Sangihe', 'Kepulauan Siau Tagulandang Biaro', 'Kepulauan Talaud', 'Minahasa', 'Minahasa Selatan', 'Minahasa Tenggara', 'Minahasa Utara'
    ]
  },
  {
    code: '72',
    name: 'Sulawesi Tengah',
    cities: [
      'Palu',
      'Banggai', 'Banggai Kepulauan', 'Banggai Laut', 'Buol', 'Donggala', 'Morowali', 'Morowali Utara', 'Parigi Moutong', 'Poso', 'Sigi', 'Tojo Una-Una', 'Toli-Toli'
    ]
  },
  {
    code: '73',
    name: 'Sulawesi Selatan',
    cities: [
      'Makassar', 'Palopo', 'Parepare',
      'Bantaeng', 'Barru', 'Bone', 'Bulukumba', 'Enrekang', 'Gowa', 'Jeneponto', 'Kepulauan Selayar', 'Luwu', 'Luwu Timur', 'Luwu Utara',
      'Maros', 'Pangkajene dan Kepulauan', 'Pinrang', 'Sidenreng Rappang', 'Sinjai', 'Soppeng', 'Takalar', 'Tana Toraja', 'Toraja Utara', 'Wajo'
    ]
  },
  {
    code: '74',
    name: 'Sulawesi Tenggara',
    cities: [
      'Kendari', 'Baubau',
      'Bombana', 'Buton', 'Buton Selatan', 'Buton Tengah', 'Buton Utara', 'Kolaka', 'Kolaka Timur', 'Kolaka Utara', 'Konawe', 'Konawe Kepulauan', 'Konawe Selatan', 'Konawe Utara', 'Muna', 'Muna Barat', 'Wakatobi'
    ]
  },
  {
    code: '75',
    name: 'Gorontalo',
    cities: [
      'Gorontalo',
      'Boalemo', 'Bone Bolango', 'Gorontalo', 'Gorontalo Utara', 'Pohuwato'
    ]
  },
  {
    code: '76',
    name: 'Sulawesi Barat',
    cities: [
      'Mamuju',
      'Majene', 'Mamasa', 'Mamuju Tengah', 'Pasangkayu', 'Polewali Mandar'
    ]
  },
  {
    code: '81',
    name: 'Maluku',
    cities: [
      'Ambon', 'Tual',
      'Buru', 'Buru Selatan', 'Kepulauan Aru', 'Kepulauan Tanimbar', 'Maluku Barat Daya', 'Maluku Tengah', 'Maluku Tenggara', 'Seram Bagian Barat', 'Seram Bagian Timur'
    ]
  },
  {
    code: '82',
    name: 'Maluku Utara',
    cities: [
      'Ternate', 'Tidore Kepulauan',
      'Halmahera Barat', 'Halmahera Tengah', 'Halmahera Timur', 'Halmahera Selatan', 'Halmahera Utara', 'Kepulauan Sula', 'Pulau Morotai', 'Pulau Taliabu'
    ]
  },
  {
    code: '91',
    name: 'Papua',
    cities: [
      'Jayapura',
      'Biak Numfor', 'Jayapura', 'Keerom', 'Kepulauan Yapen', 'Mamberamo Raya', 'Sarmi', 'Supiori', 'Waropen'
    ]
  },
  {
    code: '92',
    name: 'Papua Barat',
    cities: [
      'Manokwari',
      'Fakfak', 'Kaimana', 'Manokwari Selatan', 'Pegunungan Arfak', 'Teluk Bintuni', 'Teluk Wondama'
    ]
  },
  {
    code: '93',
    name: 'Papua Selatan',
    cities: [
      'Merauke', 'Asmat', 'Boven Digoel', 'Mappi'
    ]
  },
  {
    code: '94',
    name: 'Papua Tengah',
    cities: [
      'Nabire', 'Deiyai', 'Dogiyai', 'Intan Jaya', 'Mimika (Timika)', 'Paniai', 'Puncak', 'Puncak Jaya'
    ]
  },
  {
    code: '95',
    name: 'Papua Pegunungan',
    cities: [
      'Jayawijaya (Wamena)', 'Lanny Jaya', 'Mamberamo Tengah', 'Nduga', 'Pegunungan Bintang', 'Tolikara', 'Yahukimo', 'Yalimo'
    ]
  },
  {
    code: '96',
    name: 'Papua Barat Daya',
    cities: [
      'Sorong',
      'Maybrat', 'Raja Ampat', 'Sorong', 'Sorong Selatan', 'Tambrauw'
    ]
  }
];
