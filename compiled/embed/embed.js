(function() {
  var stylesheet = document.createElement('link');
  stylesheet.setAttribute('rel','stylesheet');
  stylesheet.setAttribute('href','https://ds7m19ykmc97j.cloudfront.net/embed/embed.css');
  stylesheet.setAttribute('type','text/css');
  stylesheet.setAttribute('media','all');
  document.head.appendChild(stylesheet);
  var desiredWidth = 1440;
  var iframe = document.getElementById('impact-investing-timeline');
  var container = iframe.parentNode;
  function doResize() {
    if (window.innerWidth > container.clientWidth) {
      var currentDesiredWidth = Math.min(desiredWidth,window.innerWidth);
      var outerPadding = (currentDesiredWidth - container.clientWidth) / -2;
      iframe.style.width = currentDesiredWidth + 'px';
      iframe.style.marginRight = iframe.style.marginLeft = outerPadding + 'px';
    } else {
      iframe.style.width = '100%';
      iframe.style.marginRight = iframe.style.marginLeft = 0;
    }
  }
  doResize();
  window.addEventListener('resize',doResize,true);
})();
