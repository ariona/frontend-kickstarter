# Frontend Kickstarter
---
## Intro
Frontend Kickstarter ini adalah starting point ketika mengerjakan project-project front-end (slicing PSDtoHTML). Teknologi yang digunakan antara lain: Jade untuk HTML templating, Sass untuk CSS Preprocessor, JS-hint untuk pemeriksaan file JS + Babel jika anda menggunakan syntax ES6\. Semuanya dibundle dalam Gulp sebagai build tools.

## Instalasi

1.  Download atau clone project ini dari [http://github.com/ariona/frontend-kickstarter](http://github.com/ariona/frontend-kickstarter)

2.  Silahkan rename folder dengan nama project anda.

3.  Masuk ke folder anda, lalu jalankan perintah `NPM install` Untuk menginstall package2 yang dibutuhkan oleh build tool, untuk langkah ini perlu koneksi internet ya :D, silahkan lihat bagian tips jika anda pernah menginstall package2 yang ada di project ini.

4.  Buka file `gulpfile.js`, Silahkan rubah pengaturan project sesuai nama project anda

    ```js
    var settings = {
    	projectName : 'frontend-kickstarter',
    	version     : '1.0.0',
    	srcDir      : 'source',
    	destDir     : 'dist'
    };
    ```

    Pengaturan ini akan digunakan untuk prosess building & bundling. srcDir & destDir bisa anda rubah jika anda menggunakan struktur yang berbeda

5.  Jalankan perintah `gulp watch` untuk memulai proses monitoring.

6.  Jalankan perintah `gulp bundle` untuk memulai proses bundling project yang akan di kirim ke client :)

## Struktur Folder

```plain
dist
 |_ assets
    |_ js
    |_ css
    |_ images
source
 |_ jade
 |_ sass
 |_ js
 |  |_ plugins
 |_ main.js
```

### 1\. Folder `dist`

Setiap file source yang telah diproses akan masuk ke dalam folder ini. Pada dasarnya folder inilah yang akan kita deliver ke client.

Khusus untuk assets berupa image, langsung dimasukkan kedalam folder /dist/images (tidak ke dalam folder source), untuk menghemat space.

### 2\. Folder `source`

Folder ini berisi source-source code sass, js, dan jade. Semuanya masuk ke masing-masing folder sesuai namanya.

### 3\. Folder `source/jade/`

Folder ini digunakan, jika anda ingin menggunakan jade sebagai HTML templating, setiap file jade yang ada diroot folder ini, akan dicompile menjadi file HTML. So untuk file2 HTML yang bersifat partial dalem folder gak akan dicompile menjadi file HTML.

### 4\. Folder `source/js/`

Untuk Semua plugins JS/jQuery dimasukkan ke dalam folder ini. Nantinya semua file yang ada dalam folder ini akan disatukan, di compress dan dimasukkan ke dalam file `dist/assets/js/plugins.js`

### 5\. Folder `source/sass`

File utama Sass adalah main.scss, jadi hanya file ini yang akan di monitor.

## Dibalik Layar

Apa yang terjadi dibalik proses building ini adalah:

*   Integrasi BrowserSync memungkinkan kita untuk bekerja tanpa harus merefresh browser secara manual, karena setiap perubahan pada file source kita akan secara otomatis diinject pada halaman web (untuk CSS) dan reload ketika file js/jade berubah.

*   Kompilasi file sass disertai dengan autoprefixer untuk penambahan prefix secara otomatis.

*   Untuk Javascript, setiap perubahan akan melewati prosess jshint untuk mengaudit kode javascript kita, dan semua warning akan muncul di terminal/command prompt.

*   Prosess bundling dengan perintah `gulp bundle` akan membuat file zip dari folder `dist`, File inilah yang akan di kirim kepada client :).

## Credit

Grid animation dibuat oleh bang [Guillaume Gouessan](http://codepen.io/superguigui) dari CodePennya yang berjudul [Grid Interactive](http://codepen.io/superguigui/pen/Hzqhs)