/* global jQuery */
(function ($) {
  "use strict";

  if (!$) return;

  const $mail = $(".mail-composition");

  $mail.on("click", function () {
    $(this).toggleClass("is-active");
  });

  $mail.on("mousemove", function (event) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bounds = this.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 3;
    const rotateX = -((event.clientY - bounds.top) / bounds.height - 0.5) * 3;

    $(this).css("transform", `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  });

  $mail.on("mouseleave", function () {
    $(this).css("transform", "");
  });

  const $aboutCard = $(".about-card");
  const $changingWord = $(".changing-word");
  const words = ["ideas", "conceptos", "historias", "marcas"];
  let wordIndex = 0;

  $aboutCard.on("click", function () {
    const isActive = $(this).toggleClass("is-active").hasClass("is-active");
    $(this).attr("aria-pressed", String(isActive));
  });

  if ($changingWord.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(function () {
      $changingWord.addClass("is-changing");

      window.setTimeout(function () {
        wordIndex = (wordIndex + 1) % words.length;
        $changingWord.text(words[wordIndex]).removeClass("is-changing");
      }, 180);
    }, 2400);
  }

  const $videoCards = $(".project-video-card");

  function getYouTubeId(url) {
    if (!url || url.includes("PEGA_AQUI")) return "";

    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
    return match ? match[1] : "";
  }

  function startProjectVideo(card) {
    const $card = $(card);
    const videoId = getYouTubeId($card.attr("data-youtube-url"));
    const $player = $card.find(".project-youtube");

    if (!videoId || !$player.length) return;

    if (!$player.children().length) {
      const playerUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&controls=0&rel=0&modestbranding=1`;
      $("<iframe>", {
        src: playerUrl,
        title: $card.attr("aria-label"),
        allow: "autoplay; encrypted-media; picture-in-picture",
        allowfullscreen: "allowfullscreen",
        tabindex: "-1",
      }).appendTo($player);
    }

    $player.attr("aria-hidden", "false");
    $card.addClass("is-playing");
  }

  function stopProjectVideo(card) {
    const $card = $(card);
    const $player = $card.find(".project-youtube");

    $player.empty().attr("aria-hidden", "true");
    $card.removeClass("is-playing");
  }

  $videoCards.on("mouseenter focusin", function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    startProjectVideo(this);
  });

  $videoCards.on("mouseleave focusout", function () {
    stopProjectVideo(this);
  });

  $videoCards.on("click", function () {
    if ($(this).hasClass("is-playing")) stopProjectVideo(this);
    else startProjectVideo(this);
  });

  const revealSections = function () {
    $(".reveal").each(function () {
      const sectionTop = this.getBoundingClientRect().top;
      if (sectionTop < window.innerHeight * 0.88) {
        $(this).addClass("is-visible");
      }
    });
  };

  $(window).on("scroll resize", revealSections);
  revealSections();
})(window.jQuery);
