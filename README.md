# Şantiye Ağı web sitesi

Müşterinin 29 Ekim 2026 tarihli güncel site kaynakları.

- Kök `index.html` ve görseller: mevcut GitHub Pages adresini ve eski `#gizlilik`, `#hesap-silme`, `#kvkk`, `#kullanim-kosullari` bağlantılarını koruyan güncel tek sayfa sürümü.
- `santiye-agi-web/`: müşterinin yeni Next.js / TypeScript / Tailwind çok sayfalı sitesi. Ana site, makine/şehir sayfaları, iletişim, SSS, sosyal akış/ihale tanıtımları ve ayrı yasal sayfalar içerir.
- ZIP'in kökündeki Asfaltik sayfası bu deponun ana sayfası yapılmadı; Asfaltik sitesi değiştirilmedi.
- Önceden onaylanan `by Lunavisore` ve `2023/145155` marka açıklaması korundu.

## IIS için statik yayın

Node.js yalnız derleme bilgisayarında gerekir; IIS sunucusunda Next.js/Node servisi veya yeni veritabanı kurulmaz.

```powershell
cd santiye-agi-web
npm ci --ignore-scripts
npm run export:iis
npm run verify
npm run verify:schema
```

Yayın dosyaları `santiye-agi-web/out/` içine çıkar. `out/`, `.next/`, `node_modules/` ve yerel ortam dosyaları Git'e eklenmez. `export:iis` temiz URL'ler için klasör/index.html yapısını ve IIS MIME/default-document ayarlarını üretir. URL Rewrite eklentisi gerektirmez. Eski `/santiye-agi/` sayfası da pakette tutulur; ana sayfadaki yasal hash bağlantıları yeni yasal sayfalara gider.

Sunucu teslimi ayrı ZIP ve `site-guncelle.ps1` dosyasıdır. Mevcut `SantiyeAgi-Web` sitesi için yeni sürüm klasörü oluşturur, dosya özetlerini kontrol eder, eski yolu korur ve yalnız bu sitenin içerik yolunu değiştirir. API, Asfaltik, DNS ve sertifika ayarları değiştirilmez. Canlı çalıştırma başarılı çıktı alınmadan tamamlanmış sayılmaz.

WhatsApp numarası ve mağaza bağlantıları müşterinin kaynaklarında boş bırakılmıştır: form kullanıcıya alıcı seçtirir, mağaza düğmeleri "Yakında" gösterir. İhale kartları açıkça örnektir; statik yayın canlı API akışı değildir. Bu alanlara doğrulanmamış numara/mağaza adresi uydurulmadı.
