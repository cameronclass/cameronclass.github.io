<!doctype html>
<html lang="ru">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="robots" content="index, follow">
  <!-- MetaTags -->
  <meta name="description" content="Description of the page less than 150 characters">
  <meta name="keywords" content="KeyWords">
  <!-- OG tags -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com">
  <meta property="og:title" content="Content Title">
  <meta property="og:image" content="https://www.developmentlogics.com/wp-content/uploads/2017/07/4.jpg">
  <meta property="og:description" content="Description Here">
  <meta property="og:site_name" content="Site Name">
  <meta property="og:locale" content="ru_RU">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Site Name">
  <meta name="twitter:description" content="Description Here">
  <meta name="twitter:image" content="https://www.developmentlogics.com/wp-content/uploads/2017/07/4.jpg">
  <!-- Favivon -->
  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
  <link rel="icon" type="image/png" href="https://example.com/favicon.png">
  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" href="/custom-icon.png">
  <!-- Styles CSS -->
  <link rel="stylesheet" href="css/libs.css">
  <link rel="stylesheet" href="css/style.css">
  <!-- Fonts and Icons-->
  <title>Marlin PHP</title>
</head>

<body>
  <!-- Preloader -->
  <div id="page-preloader">
    <div class="cssload-wraper">
      <div class="cssload-dots"></div>
    </div>
  </div>
  <!-- Header -->
  <header class="container">
    <h1>Привет</h1>
    <div class="d-flex mb-3">
      <a href="create.php" class="btn btn-success d-block">Добавить</a>
    </div>
  </header>
  <!-- Main -->
  <main class="container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Названия</th>
          <th scope="col">Описания</th>
          <th scope="col">Картинка</th>
          <th scope="col">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td><a href="show.php">Компьтер</a></td>
          <td>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum, accusantium!</td>
          <td><img src="https://picsum.photos/100" alt=""></td>
          <td class="d-flex flex-column">
            <a href="#" class="btn btn-warning d-block mb-2">Изменить</a>
            <a href="#" onclick="promt('ДА')" class="btn btn-danger d-block">Удалить</a>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
  <!-- Footer -->
  <footer></footer>
  <!-- Scripts -->
  <script src="js/libs.min.js"></script>
  <script src="js/main.js"></script>
</body>

</html>