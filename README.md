# Seleksi Asisten Labpro - Single Service Backend
## **Author**
Antonio Natthan Krishna - 13521162

## **How to Run The Program**
1. Clone this repository
```sh
git clone https://github.com/natthankrish/Labpro_SingleServiceBE.git
```
2. Change the current directory to `Labpro_SingleServiceBE` folder
```sh
cd Labpro_SingleServiceBE
```
3. Build and run the container <br>
Your app should be running at port :80 or just simply open localhost
```sh
docker-compose up --build
```

## **Config**
Aplikasi akan berjalan pada port 3000 dengan database pada port 5432. Database yang digunakan PostgreSQL. 

## **Design Patterns**
1. Template Method Pattern <br>
BarangAgent dan PerusahaanAgent merupakan template method yang dibutuhkan oleh fungsi fungsi controller. Fungsi controller akan memanggil template function pada BarangAgent dan PerusahaanAgent sesuai dengan karakteristik yang dibutuhkannya. Pembangunan BarangAgent dan PerusahaanAgent didasarkan pada entitas Barang dan Perusahaan yang menjadi struktur dari tabel.

2. Mediator <br>
Folder Agent berisikan mediator antara Folder Entitas dan Folder Controller. Hal ini dimaksudkan agar controller tidak secara langsung menyentuh database melainkan dengan pertolongan agent yang memegang kendali atas entitas entitas pada folder Entity

3. Composite <br>
Function routes terdiri atas repository user, barang, dan perusahaan yang dibangun SATU KALI selama berjalannya aplikasi. Fungsi lain yang memerlukan repository tersebut mendapat data melalui passing parameter dari function routes. 


## **Tech Stack**
PostgreSQL, ExpressJS

## **SOLID**
1. Single Responsibility Principle <br>
Setiap kebutuhan sudah dipecah menjadi fungsi fungsi yang hanya memiliki SATU tujuan. Sehingga, tidak terdapat fungsi dan entitas yang menangani dua hal sekaligus.

2. Open Closed Principle <br>
Apabila diperlukan penambahan route maka dapat dibuat controller baru yang sesuai TANPA mengubah agent yang sudah ada. Apabila sebaliknya terdapat perubahan algoritma pada agent, maka kita tidak perlu merubah apapun yang ada pada controller.

3. Liskov Substitution Principle <br>
Tidak ada inheritence yang digunakan dalam repository ini.

4. Interface Segregation <br>
Setiap controller dan agent dibangun berdasarkan entitas yang ditanganinya. 

5. Dependency Injection <br>
Tidak ada penggunaan dependency injection dalam repository ini.
