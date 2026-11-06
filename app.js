// Wyszukiwarka i filtry strony glownej (bez serwera: karty sa w HTML).
(function () {
  var list = document.getElementById("deals");
  if (!list) return;
  var q = document.getElementById("q"), sort = document.getElementById("sort"),
      max = document.getElementById("max"), fresh = document.getElementById("fresh"),
      count = document.getElementById("count"), empty = document.getElementById("empty");
  var cards = Array.prototype.slice.call(list.children);

  function apply() {
    var words = q.value.toLowerCase().split(/\s+/).filter(Boolean);
    var limit = parseFloat(max.value) || Infinity, shown = 0;
    cards.forEach(function (c) {
      var ok = words.every(function (w) { return c.dataset.title.indexOf(w) >= 0; })
        && parseFloat(c.dataset.price) <= limit
        && (!fresh.checked || c.dataset.fresh === "1");
      c.hidden = !ok;
      if (ok) shown++;
    });
    var key = sort.value;
    cards.slice().sort(function (a, b) {
      if (key === "price") return a.dataset.price - b.dataset.price;
      if (key === "saving") return b.dataset.saving - a.dataset.saving;
      return b.dataset.date - a.dataset.date;
    }).forEach(function (c) { list.appendChild(c); });
    count.textContent = shown + " okazji";
    empty.hidden = shown > 0;
  }
  [q, sort, max, fresh].forEach(function (el) {
    el.addEventListener(el === q ? "input" : "change", apply);
  });
})();
