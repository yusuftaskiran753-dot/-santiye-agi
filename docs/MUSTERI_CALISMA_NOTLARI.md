# Web sitesi çalışma notları

## Google Search Console doğrulama dosyası

Kullanıcının açık talebiyle müşterinin sağladığı google374939bcca06824d.html dosyası kök GitHub Pages kaynağına ve yeni sitenin public/ klasörüne eklendi. Tarayıcının indirme sırasında eklediği (1) eki kullanılmadı; dosya içeriği birebir korundu. Sonraki statik derlemeler bu dosyayı da site köküne çıkarır. Dosyanın yayınlanması Search Console'da müşterinin Doğrula adımının başarıyla tamamlandığını veya sayfaların indekslendiğini kanıtlamaz; doğrulama dosyası yayından sonra kaldırılmamalıdır.

## 29 Ekim 2026

- Müşterinin yeni Şantiye Ağı HTML sayfası, görselleri ve çok sayfalı Next.js kaynakları eklendi. Mevcut GitHub geçmişi ve son robots.txt değişikliği korundu. Asfaltik'e ait kök HTML Şantiye sayfasının üzerine konmadı.
- GitHub Pages için eski yasal hash bağlantıları korundu; paketteki yanlış `/santiye-agi/` proje adresleri bu deponun `/-santiye-agi/` adresine uyarlandı. Lunavisore marka metinleri korundu.
- Yeni çok sayfalı site için IIS statik dışa aktarma komutu eklendi. Üretimde Node.js çalıştırma zorunluluğu kaldırıldı; derleme çıktıları Git'e eklenmez. HTTPS/DNS/API değişikliği yapılmaz.
- Canlı ihale verisi veya gerçek WhatsApp alıcısı bağlanmış gibi gösterilmedi. Müşterinin örnek kartları ve "Yakında" mağaza durumu korunur.
- Sunucu yayını, ayrı teslim paketinin kullanıcı tarafından çalıştırılmasını ve WEBSITE_UPDATED sonucunun doğrulanmasını bekler.
