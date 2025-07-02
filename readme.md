# Hisse Takip Uygulaması

Bu proje, kullanıcıların hisse senetlerini takip etmelerini sağlayan masaüstü ve web tabanlı bir uygulamadır. Kullanıcılar kayıt olabilir, giriş yapabilir, harici API'den çekilen hisse senedi listesinden seçim yaparak takip ettiklerini kaydedebilir ve takip ettikleri hisseleri görüntüleyebilirler.

---

## Temel Özellikler

- Kullanıcı kayıt ve giriş sistemi (JWT ile oturum yönetimi)
- BigPara Hürriyet API'den hisse senedi verilerinin çekilip SQLite veritabanına kaydedilmesi
- Kullanıcı bazlı hisse takip listesi oluşturma ve görüntüleme
- React tabanlı kullanıcı arayüzü
- Node.js ve Express tabanlı backend
- Responsive tasarım için Bootstrap kullanımı

---

## Kullanılan Teknolojiler ve Kütüphaneler

### Backend

- Node.js
- Express
- Sequelize (ORM)
- SQLite (veritabanı)
- bcrypt (şifreleme için)
- jsonwebtoken (JWT ile oturum yönetimi)
- axios (HTTP istekleri)
- dotenv (çevresel değişken yönetimi)
- iconv-lite (API’den gelen verilerin kodlamasını dönüştürmek için)

### Frontend

- React
- React Router DOM (sayfa yönlendirme)
- Axios (API çağrıları)
- Bootstrap (stil ve responsive tasarım)

---

## Kurulum ve Çalıştırma

### Backend

1. Proje kök dizininde terminal açın.
2. Gerekli paketleri yükleyin:
   ```bash
   npm install
**3**.Proje kökünde .env dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:

JWT_SECRET=buraya_gizli_anahtarınızı_yazın

PORT=4000

4. Backend sunucusunu başlatın:
```bash
node server.js
npx nodemon server.js


### Frontend
1.Frontend klasörüne geçiş yapın:
cd frontend
2.Gerekli paketleri yükleyin:
npm install
3.React uygulamasını başlatın:
npm start
4.Tarayıcınızda http://localhost:5173 (veya terminalde belirtilen port) adresini açın.
