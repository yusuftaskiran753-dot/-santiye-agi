/**
 * Mobil uygulamadaki makine türleri (88) ve kullanım alanına göre grupları.
 * Kaynak: uygulama `lib/models/models.dart` (MachineType) ve `lib/data/santiye_constants.dart` (kMakineGruplari), sürüm 2.1.2.
 * Bu dosya betikle üretilmiştir; uygulamada tür eklenirse yeniden üretin.
 */
export const MACHINE_GROUPS: ReadonlyArray<{ group: string; machines: readonly string[] }> = [
  {
    group: "Kazı ve yükleme",
    machines: ["Ekskavatör", "Mini ekskavatör", "Lastikli ekskavatör", "Uzun kol ekskavatör", "Hidrolik kırıcı (Kırıcı çekiç)", "Beko Loder", "Loder", "Lastikli loder", "Paletli loder", "Mini yükleyici / Bobcat", "Teleskopik yükleyici", "Hendek açma (Trencher)"],
  },
  {
    group: "Yol ve toprak",
    machines: ["Greyder", "Dozer", "Skrayper", "Silindir", "Tandem silindir", "Lastikli silindir", "Vibrasyonlu silindir", "Tek tamburlu toprak silindiri", "Koyun ayağı silindir", "Vibrasyonlu plaka / Tokmak", "Finişer", "Asfalt kazıma (Freze)", "Asfalt kesici", "Asfalt plenti", "Yol çizgi makinesi", "Kar küreme / Tuz serici"],
  },
  {
    group: "Nakliye",
    machines: ["Kamyon / Damper", "Kırkayak / 10 tekerli kamyon", "Kamyonet / Panelvan", "Tır (Çekici + Dorse)", "Çekici / Lowbed", "Damperli dorse", "Kayar tabla / Düz dorse", "Römork / Treyler", "Eklemli (belden kırma) damper", "Rijit maden damperi", "Şantiye damperi / Dumper", "Silobas", "Su tankeri", "Yakıt tankeri", "Bitüm / Zift tankeri", "Arazöz / Su tankı", "Vidanjör / Kanal temizleme", "Çöp kamyonu / Kompaktör", "Tomruk / Kereste taşıyıcı"],
  },
  {
    group: "Vinç ve kaldırma",
    machines: ["Mobil Vinç", "Paletli vinç", "Kule vinç", "Gezer köprülü / Portal vinç", "Hiyap / Kamyon üstü vinç", "Örümcek vinç", "Forklift", "Personel yükseltme / Manlift", "Sepetli araç / Hidrolik merdiven", "Şantiye asansörü"],
  },
  {
    group: "Beton",
    machines: ["Beton pompası", "Transmikser", "Beton santrali", "Helikopter mala / Beton vibratörü", "Karot / Beton delme"],
  },
  {
    group: "Sondaj, kazık ve tünel",
    machines: ["Fore kazık makinesi", "Kazık çakma / Palplanş makinesi", "Sondaj / Delici", "Kuyu / Zemin etüt sondajı", "Paletli kaya delici", "Jumbo (Tünel delici)", "Tünel açma makinesi (TBM)"],
  },
  {
    group: "Kırma, eleme ve maden",
    machines: ["Kırma eleme", "Mobil kırıcı", "Mobil elek / Eleme", "Konveyör bant", "Mermer tel testere / Katener", "Blok kesme / Zincirli kesici"],
  },
  {
    group: "Orman",
    machines: ["Tomruk yükleyici / Kıskaç", "Orman harvester", "Orman forwarder", "Skidder (Ağaç çekme)", "Ağaç parçalama (Çipper)", "Traktör"],
  },
  {
    group: "Yardımcı ekipman",
    machines: ["Kompresör", "Jeneratör", "Su pompası / Dalgıç pompa", "Kaynak makinesi / Kaynak jeneratörü", "Aydınlatma kulesi", "Konteyner / Şantiye kabini", "Diğer"],
  },
];

export const MACHINE_TYPE_COUNT = MACHINE_GROUPS.reduce((n, g) => n + g.machines.length, 0);
