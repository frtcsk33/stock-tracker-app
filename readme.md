# 📊 Hisse Takip Uygulaması

Bu proje, kullanıcıların kayıt olup giriş yaparak ilgilendikleri hisseleri seçip takip edebilecekleri bir masaüstü hisse senedi takip uygulamasıdır.\
**React + Node.js + SQLite** teknolojileriyle geliştirilmiştir.

---

## 🚀 Kurulum ve Çalıştırma Talimatları

### 1. Repozitoriyi klonla:

```bash
git clone <repo-link>
cd proje-klasoru
```

### 2. Backend'i başlat:

```bash
cd backend
npm install
node server.js
```

> Backend sunucusu varsayılan olarak `http://localhost:4000` portunda çalışır.

### 3. Frontend'i başlat:

```bash
cd frontend
npm install
npm run dev
```

> Frontend sunucusu `http://localhost:5173` üzerinden erişilebilir.

### 4. Ortam Değişkenlerini Ayarla (`.env`):

Proje kök dizininde `.env` dosyası oluşturun ve aşağıdaki gibi yapılandırın:

```
JWT_SECRET=çok_gizli_bir_anahtar_yazın
PORT=4000
```

> `JWT_SECRET`: Bu değeri rastgele ve tahmin edilmesi zor bir metin olarak belirleyin. Örneğin:
>
> ```bash
> JWT_SECRET=SDFkj234LKjsdf9832JKLsdflkj923
> ```
>
> Bu anahtar, kullanıcıların oturumlarını güvenli şekilde yönetmek için kullanılır.

---

## 🧹 Projenin Temel Özellikleri

- 👤 **Kayıt Ol / Giriş Yap**: Kullanıcılar kayıt olabilir ve JWT ile güvenli giriş yapabilir.
- 📈 **Hisse Listesi Gösterimi**: Harici API'den alınan hisse senetleri listelenir.
- ✅ **Seçili Hisseleri Takip Et**: Kullanıcılar ilgilendikleri hisseleri seçip kendi listelerine kaydedebilir.
- 📋 **Takip Listesi Görüntüleme**: Giriş yapan kullanıcı, daha önce seçtiği hisseleri görebilir.
- 💾 **Veritabanı**: SQLite kullanılarak kullanıcı ve hisse verileri saklanır.

---

## 💠 Kullanılan Teknolojiler ve Kütüphaneler

### Backend (Node.js + Express):

- `express` – HTTP sunucusu oluşturmak için
- `sequelize` – ORM (Object-Relational Mapping)
- `sqlite3` – Hafif veritabanı çözümü
- `jsonwebtoken` – JWT token üretimi ve kontrolü
- `bcrypt` – Şifrelerin güvenli bir şekilde hashlenmesi
- `dotenv` – Ortam değişkenlerini yönetmek için
- `axios` – API'den veri çekmek için
- `cors` – Cross-Origin istekleri için
- `iconv-lite` – Türkçe karakter sorununu çözmek için (API decoding)

### Frontend (React + Vite):

- `react-router-dom` – Sayfa yönlendirmeleri için
- `axios` – Backend ile HTTP iletişimi için
- `bootstrap` – UI stil ve bileşenleri
- `react-toastify` – Bildirim göstermek için (toast mesajları)


## 📬 Geri Bildirim

Her türlü geri bildirim ve katkı için PR gönderebilir ya da benimle iletişime geçebilirsiniz.

