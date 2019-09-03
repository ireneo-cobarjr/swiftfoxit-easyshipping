<nav class="navbar navbar-expand-lg navbar-dark bg-transparent" id="navbar">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="img/logo_new_black.png" alt="header logo">
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">

        <?php
          $links = [
            'Home', 'About', 'Track', 'Help', 'Ship', 'Pricing'
          ];
        ?>

        @foreach ($links as $link)
          <li class="nav-item">
            <a class="nav-link nav-{{ $slot }}" href="{{ $link }}">{{ $link }}</a>
          </li>
        @endforeach
          <li class="nav-item">
            <a class="nav-link nav-{{ $slot }}" href="login" style="margin-left:50px;">Log In</a>
          </li>

      </ul>
    </div>
  </div>
</nav>
