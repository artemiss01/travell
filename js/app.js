/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
      226: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (
                (e =
                  Object.assign ||
                  function (e) {
                    for (var t, s = 1, i = arguments.length; s < i; s++)
                      for (var n in (t = arguments[s]))
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    return e;
                  }),
                e.apply(this, arguments)
              );
            },
            t = {
              afterAppendSlide: "lgAfterAppendSlide",
              init: "lgInit",
              hasVideo: "lgHasVideo",
              containerResize: "lgContainerResize",
              updateSlides: "lgUpdateSlides",
              afterAppendSubHtml: "lgAfterAppendSubHtml",
              beforeOpen: "lgBeforeOpen",
              afterOpen: "lgAfterOpen",
              slideItemLoad: "lgSlideItemLoad",
              beforeSlide: "lgBeforeSlide",
              afterSlide: "lgAfterSlide",
              posterClick: "lgPosterClick",
              dragStart: "lgDragStart",
              dragMove: "lgDragMove",
              dragEnd: "lgDragEnd",
              beforeNextSlide: "lgBeforeNextSlide",
              beforePrevSlide: "lgBeforePrevSlide",
              beforeClose: "lgBeforeClose",
              afterClose: "lgAfterClose",
              rotateLeft: "lgRotateLeft",
              rotateRight: "lgRotateRight",
              flipHorizontal: "lgFlipHorizontal",
              flipVertical: "lgFlipVertical",
              autoplay: "lgAutoplay",
              autoplayStart: "lgAutoplayStart",
              autoplayStop: "lgAutoplayStop",
            },
            s = {
              autoplay: !0,
              slideShowAutoplay: !1,
              slideShowInterval: 5e3,
              progressBar: !0,
              forceSlideShowAutoplay: !1,
              autoplayControls: !0,
              appendAutoplayControlsTo: ".lg-toolbar",
              autoplayPluginStrings: { toggleAutoplay: "Toggle Autoplay" },
            };
          return (function () {
            function i(t) {
              return (
                (this.core = t),
                (this.settings = e(e({}, s), this.core.settings)),
                this
              );
            }
            return (
              (i.prototype.init = function () {
                var e = this;
                this.settings.autoplay &&
                  ((this.interval = !1),
                  (this.fromAuto = !0),
                  (this.pausedOnTouchDrag = !1),
                  (this.pausedOnSlideChange = !1),
                  this.settings.autoplayControls && this.controls(),
                  this.settings.progressBar &&
                    this.core.outer.append(
                      '<div class="lg-progress-bar"><div class="lg-progress"></div></div>'
                    ),
                  this.settings.slideShowAutoplay &&
                    this.core.LGel.once(
                      t.slideItemLoad + ".autoplay",
                      function () {
                        e.startAutoPlay();
                      }
                    ),
                  this.core.LGel.on(
                    t.dragStart + ".autoplay touchstart.lg.autoplay",
                    function () {
                      e.interval &&
                        (e.stopAutoPlay(), (e.pausedOnTouchDrag = !0));
                    }
                  ),
                  this.core.LGel.on(
                    t.dragEnd + ".autoplay touchend.lg.autoplay",
                    function () {
                      !e.interval &&
                        e.pausedOnTouchDrag &&
                        (e.startAutoPlay(), (e.pausedOnTouchDrag = !1));
                    }
                  ),
                  this.core.LGel.on(t.beforeSlide + ".autoplay", function () {
                    e.showProgressBar(),
                      !e.fromAuto && e.interval
                        ? (e.stopAutoPlay(), (e.pausedOnSlideChange = !0))
                        : (e.pausedOnSlideChange = !1),
                      (e.fromAuto = !1);
                  }),
                  this.core.LGel.on(t.afterSlide + ".autoplay", function () {
                    e.pausedOnSlideChange &&
                      !e.interval &&
                      e.settings.forceSlideShowAutoplay &&
                      (e.startAutoPlay(), (e.pausedOnSlideChange = !1));
                  }),
                  this.showProgressBar());
              }),
              (i.prototype.showProgressBar = function () {
                var e = this;
                if (this.settings.progressBar && this.fromAuto) {
                  var t = this.core.outer.find(".lg-progress-bar"),
                    s = this.core.outer.find(".lg-progress");
                  this.interval &&
                    (s.removeAttr("style"),
                    t.removeClass("lg-start"),
                    setTimeout(function () {
                      s.css(
                        "transition",
                        "width " +
                          (e.core.settings.speed +
                            e.settings.slideShowInterval) +
                          "ms ease 0s"
                      ),
                        t.addClass("lg-start");
                    }, 20));
                }
              }),
              (i.prototype.controls = function () {
                var e = this,
                  t =
                    '<button aria-label="' +
                    this.settings.autoplayPluginStrings.toggleAutoplay +
                    '" type="button" class="lg-autoplay-button lg-icon"></button>';
                this.core.outer
                  .find(this.settings.appendAutoplayControlsTo)
                  .append(t),
                  this.core.outer
                    .find(".lg-autoplay-button")
                    .first()
                    .on("click.lg.autoplay", function () {
                      e.core.outer.hasClass("lg-show-autoplay")
                        ? e.stopAutoPlay()
                        : e.interval || e.startAutoPlay();
                    });
              }),
              (i.prototype.startAutoPlay = function () {
                var e = this;
                this.core.outer
                  .find(".lg-progress")
                  .css(
                    "transition",
                    "width " +
                      (this.core.settings.speed +
                        this.settings.slideShowInterval) +
                      "ms ease 0s"
                  ),
                  this.core.outer.addClass("lg-show-autoplay"),
                  this.core.outer.find(".lg-progress-bar").addClass("lg-start"),
                  this.core.LGel.trigger(t.autoplayStart, {
                    index: this.core.index,
                  }),
                  (this.interval = setInterval(function () {
                    e.core.index + 1 < e.core.galleryItems.length
                      ? e.core.index++
                      : (e.core.index = 0),
                      e.core.LGel.trigger(t.autoplay, { index: e.core.index }),
                      (e.fromAuto = !0),
                      e.core.slide(e.core.index, !1, !1, "next");
                  }, this.core.settings.speed +
                    this.settings.slideShowInterval));
              }),
              (i.prototype.stopAutoPlay = function () {
                this.interval &&
                  (this.core.LGel.trigger(t.autoplayStop, {
                    index: this.core.index,
                  }),
                  this.core.outer.find(".lg-progress").removeAttr("style"),
                  this.core.outer.removeClass("lg-show-autoplay"),
                  this.core.outer
                    .find(".lg-progress-bar")
                    .removeClass("lg-start")),
                  clearInterval(this.interval),
                  (this.interval = !1);
              }),
              (i.prototype.closeGallery = function () {
                this.stopAutoPlay();
              }),
              (i.prototype.destroy = function () {
                this.settings.autoplay &&
                  this.core.outer.find(".lg-progress-bar").remove(),
                  this.core.LGel.off(".lg.autoplay"),
                  this.core.LGel.off(".autoplay");
              }),
              i
            );
          })();
        })();
      },
      216: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (
                (e =
                  Object.assign ||
                  function (e) {
                    for (var t, s = 1, i = arguments.length; s < i; s++)
                      for (var n in (t = arguments[s]))
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    return e;
                  }),
                e.apply(this, arguments)
              );
            },
            t = {
              afterAppendSlide: "lgAfterAppendSlide",
              init: "lgInit",
              hasVideo: "lgHasVideo",
              containerResize: "lgContainerResize",
              updateSlides: "lgUpdateSlides",
              afterAppendSubHtml: "lgAfterAppendSubHtml",
              beforeOpen: "lgBeforeOpen",
              afterOpen: "lgAfterOpen",
              slideItemLoad: "lgSlideItemLoad",
              beforeSlide: "lgBeforeSlide",
              afterSlide: "lgAfterSlide",
              posterClick: "lgPosterClick",
              dragStart: "lgDragStart",
              dragMove: "lgDragMove",
              dragEnd: "lgDragEnd",
              beforeNextSlide: "lgBeforeNextSlide",
              beforePrevSlide: "lgBeforePrevSlide",
              beforeClose: "lgBeforeClose",
              afterClose: "lgAfterClose",
              rotateLeft: "lgRotateLeft",
              rotateRight: "lgRotateRight",
              flipHorizontal: "lgFlipHorizontal",
              flipVertical: "lgFlipVertical",
              autoplay: "lgAutoplay",
              autoplayStart: "lgAutoplayStart",
              autoplayStop: "lgAutoplayStop",
            },
            s = {
              commentBox: !1,
              fbComments: !1,
              disqusComments: !1,
              disqusConfig: { title: void 0, language: "en" },
              commentsMarkup:
                '<div id="lg-comment-box" class="lg-comment-box lg-fb-comment-box"><div class="lg-comment-header"><h3 class="lg-comment-title">Leave a comment.</h3><span class="lg-comment-close lg-icon"></span></div><div class="lg-comment-body"></div></div>',
              commentPluginStrings: { toggleComments: "Toggle Comments" },
            };
          return (function () {
            function i(t, i) {
              return (
                (this.core = t),
                (this.$LG = i),
                (this.settings = e(e({}, s), this.core.settings)),
                this
              );
            }
            return (
              (i.prototype.init = function () {
                this.settings.commentBox &&
                  (this.setMarkup(),
                  this.toggleCommentBox(),
                  this.settings.fbComments
                    ? this.addFbComments()
                    : this.settings.disqusComments && this.addDisqusComments());
              }),
              (i.prototype.setMarkup = function () {
                this.core.outer.append(
                  this.settings.commentsMarkup +
                    '<div class="lg-comment-overlay"></div>'
                );
                var e =
                  '<button type="button" aria-label="' +
                  this.settings.commentPluginStrings.toggleComments +
                  '" class="lg-comment-toggle lg-icon"></button>';
                this.core.$toolbar.append(e);
              }),
              (i.prototype.toggleCommentBox = function () {
                var e = this;
                this.core.outer
                  .find(".lg-comment-toggle")
                  .first()
                  .on("click.lg.comment", function () {
                    e.core.outer.toggleClass("lg-comment-active");
                  }),
                  this.core.outer
                    .find(".lg-comment-overlay")
                    .first()
                    .on("click.lg.comment", function () {
                      e.core.outer.removeClass("lg-comment-active");
                    }),
                  this.core.outer
                    .find(".lg-comment-close")
                    .first()
                    .on("click.lg.comment", function () {
                      e.core.outer.removeClass("lg-comment-active");
                    });
              }),
              (i.prototype.addFbComments = function () {
                var e = this,
                  s = this;
                this.core.LGel.on(t.beforeSlide + ".comment", function (t) {
                  var s = e.core.galleryItems[t.detail.index].fbHtml;
                  e.core.outer.find(".lg-comment-body").html(s);
                }),
                  this.core.LGel.on(t.afterSlide + ".comment", function () {
                    try {
                      FB.XFBML.parse();
                    } catch (e) {
                      s.$LG(window).on("fbAsyncInit", function () {
                        FB.XFBML.parse();
                      });
                    }
                  });
              }),
              (i.prototype.addDisqusComments = function () {
                var e = this,
                  s = this.$LG("#disqus_thread");
                s.remove(),
                  this.core.outer
                    .find(".lg-comment-body")
                    .append('<div id="disqus_thread"></div>'),
                  this.core.LGel.on(t.beforeSlide + ".comment", function () {
                    s.html("");
                  }),
                  this.core.LGel.on(t.afterSlide + ".comment", function (t) {
                    var s = t.detail.index,
                      i = e;
                    setTimeout(
                      function () {
                        try {
                          DISQUS.reset({
                            reload: !0,
                            config: function () {
                              (this.page.identifier =
                                i.core.galleryItems[s].disqusIdentifier),
                                (this.page.url =
                                  i.core.galleryItems[s].disqusURL),
                                (this.page.title =
                                  i.settings.disqusConfig.title),
                                (this.language =
                                  i.settings.disqusConfig.language);
                            },
                          });
                        } catch (e) {
                          console.error(
                            "Make sure you have included disqus JavaScript code in your document. Ex - https://lg-disqus.disqus.com/admin/install/platforms/universalcode/"
                          );
                        }
                      },
                      i.core.lGalleryOn ? 0 : 1e3
                    );
                  });
              }),
              (i.prototype.destroy = function () {
                this.core.LGel.off(".lg.comment"),
                  this.core.LGel.off(".comment");
              }),
              i
            );
          })();
        })();
      },
      797: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (
                (e =
                  Object.assign ||
                  function (e) {
                    for (var t, s = 1, i = arguments.length; s < i; s++)
                      for (var n in (t = arguments[s]))
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    return e;
                  }),
                e.apply(this, arguments)
              );
            },
            t = {
              fullScreen: !0,
              fullscreenPluginStrings: {
                toggleFullscreen: "Toggle Fullscreen",
              },
            };
          return (function () {
            function s(s, i) {
              return (
                (this.core = s),
                (this.$LG = i),
                (this.settings = e(e({}, t), this.core.settings)),
                this
              );
            }
            return (
              (s.prototype.init = function () {
                var e = "";
                if (this.settings.fullScreen) {
                  if (
                    !(
                      document.fullscreenEnabled ||
                      document.webkitFullscreenEnabled ||
                      document.mozFullScreenEnabled ||
                      document.msFullscreenEnabled
                    )
                  )
                    return;
                  (e =
                    '<button type="button" aria-label="' +
                    this.settings.fullscreenPluginStrings.toggleFullscreen +
                    '" class="lg-fullscreen lg-icon"></button>'),
                    this.core.$toolbar.append(e),
                    this.fullScreen();
                }
              }),
              (s.prototype.isFullScreen = function () {
                return (
                  document.fullscreenElement ||
                  document.mozFullScreenElement ||
                  document.webkitFullscreenElement ||
                  document.msFullscreenElement
                );
              }),
              (s.prototype.requestFullscreen = function () {
                var e = document.documentElement;
                e.requestFullscreen
                  ? e.requestFullscreen()
                  : e.msRequestFullscreen
                  ? e.msRequestFullscreen()
                  : e.mozRequestFullScreen
                  ? e.mozRequestFullScreen()
                  : e.webkitRequestFullscreen && e.webkitRequestFullscreen();
              }),
              (s.prototype.exitFullscreen = function () {
                document.exitFullscreen
                  ? document.exitFullscreen()
                  : document.msExitFullscreen
                  ? document.msExitFullscreen()
                  : document.mozCancelFullScreen
                  ? document.mozCancelFullScreen()
                  : document.webkitExitFullscreen &&
                    document.webkitExitFullscreen();
              }),
              (s.prototype.fullScreen = function () {
                var e = this;
                this.$LG(document).on(
                  "fullscreenchange.lg.global" +
                    this.core.lgId +
                    " \n            webkitfullscreenchange.lg.global" +
                    this.core.lgId +
                    " \n            mozfullscreenchange.lg.global" +
                    this.core.lgId +
                    " \n            MSFullscreenChange.lg.global" +
                    this.core.lgId,
                  function () {
                    e.core.lgOpened &&
                      e.core.outer.toggleClass("lg-fullscreen-on");
                  }
                ),
                  this.core.outer
                    .find(".lg-fullscreen")
                    .first()
                    .on("click.lg", function () {
                      e.isFullScreen()
                        ? e.exitFullscreen()
                        : e.requestFullscreen();
                    });
              }),
              (s.prototype.closeGallery = function () {
                this.isFullScreen() && this.exitFullscreen();
              }),
              (s.prototype.destroy = function () {
                this.$LG(document).off(
                  "fullscreenchange.lg.global" +
                    this.core.lgId +
                    " \n            webkitfullscreenchange.lg.global" +
                    this.core.lgId +
                    " \n            mozfullscreenchange.lg.global" +
                    this.core.lgId +
                    " \n            MSFullscreenChange.lg.global" +
                    this.core.lgId
                );
              }),
              s
            );
          })();
        })();
      },
      951: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
              return (
                (e =
                  Object.assign ||
                  function (e) {
                    for (var t, s = 1, i = arguments.length; s < i; s++)
                      for (var n in (t = arguments[s]))
                        Object.prototype.hasOwnProperty.call(t, n) &&
                          (e[n] = t[n]);
                    return e;
                  }),
                e.apply(this, arguments)
              );
            },
            t = {
              afterAppendSlide: "lgAfterAppendSlide",
              init: "lgInit",
              hasVideo: "lgHasVideo",
              containerResize: "lgContainerResize",
              updateSlides: "lgUpdateSlides",
              afterAppendSubHtml: "lgAfterAppendSubHtml",
              beforeOpen: "lgBeforeOpen",
              afterOpen: "lgAfterOpen",
              slideItemLoad: "lgSlideItemLoad",
              beforeSlide: "lgBeforeSlide",
              afterSlide: "lgAfterSlide",
              posterClick: "lgPosterClick",
              dragStart: "lgDragStart",
              dragMove: "lgDragMove",
              dragEnd: "lgDragEnd",
              beforeNextSlide: "lgBeforeNextSlide",
              beforePrevSlide: "lgBeforePrevSlide",
              beforeClose: "lgBeforeClose",
              afterClose: "lgAfterClose",
              rotateLeft: "lgRotateLeft",
              rotateRight: "lgRotateRight",
              flipHorizontal: "lgFlipHorizontal",
              flipVertical: "lgFlipVertical",
              autoplay: "lgAutoplay",
              autoplayStart: "lgAutoplayStart",
              autoplayStop: "lgAutoplayStop",
            },
            s = {
              rotate: !0,
              rotateSpeed: 400,
              rotateLeft: !0,
              rotateRight: !0,
              flipHorizontal: !0,
              flipVertical: !0,
              rotatePluginStrings: {
                flipVertical: "Flip vertical",
                flipHorizontal: "Flip horizontal",
                rotateLeft: "Rotate left",
                rotateRight: "Rotate right",
              },
            };
          return (function () {
            function i(t, i) {
              return (
                (this.core = t),
                (this.$LG = i),
                (this.settings = e(e({}, s), this.core.settings)),
                this
              );
            }
            return (
              (i.prototype.buildTemplates = function () {
                var e = "";
                this.settings.flipVertical &&
                  (e +=
                    '<button type="button" id="lg-flip-ver" aria-label="' +
                    this.settings.rotatePluginStrings.flipVertical +
                    '" class="lg-flip-ver lg-icon"></button>'),
                  this.settings.flipHorizontal &&
                    (e +=
                      '<button type="button" id="lg-flip-hor" aria-label="' +
                      this.settings.rotatePluginStrings.flipHorizontal +
                      '" class="lg-flip-hor lg-icon"></button>'),
                  this.settings.rotateLeft &&
                    (e +=
                      '<button type="button" id="lg-rotate-left" aria-label="' +
                      this.settings.rotatePluginStrings.rotateLeft +
                      '" class="lg-rotate-left lg-icon"></button>'),
                  this.settings.rotateRight &&
                    (e +=
                      '<button type="button" id="lg-rotate-right" aria-label="' +
                      this.settings.rotatePluginStrings.rotateRight +
                      '" class="lg-rotate-right lg-icon"></button>'),
                  this.core.$toolbar.append(e);
              }),
              (i.prototype.init = function () {
                var e = this;
                this.settings.rotate &&
                  (this.buildTemplates(),
                  (this.rotateValuesList = {}),
                  this.core.LGel.on(t.slideItemLoad + ".rotate", function (t) {
                    var s = t.detail.index;
                    e.core.getSlideItem(s).find(".lg-img-rotate").get() ||
                      (e.core
                        .getSlideItem(s)
                        .find(".lg-object")
                        .first()
                        .wrap("lg-img-rotate"),
                      e.core
                        .getSlideItem(e.core.index)
                        .find(".lg-img-rotate")
                        .css(
                          "transition-duration",
                          e.settings.rotateSpeed + "ms"
                        ));
                  }),
                  this.core.outer
                    .find("#lg-rotate-left")
                    .first()
                    .on("click.lg", this.rotateLeft.bind(this)),
                  this.core.outer
                    .find("#lg-rotate-right")
                    .first()
                    .on("click.lg", this.rotateRight.bind(this)),
                  this.core.outer
                    .find("#lg-flip-hor")
                    .first()
                    .on("click.lg", this.flipHorizontal.bind(this)),
                  this.core.outer
                    .find("#lg-flip-ver")
                    .first()
                    .on("click.lg", this.flipVertical.bind(this)),
                  this.core.LGel.on(t.beforeSlide + ".rotate", function (t) {
                    e.rotateValuesList[t.detail.index] ||
                      (e.rotateValuesList[t.detail.index] = {
                        rotate: 0,
                        flipHorizontal: 1,
                        flipVertical: 1,
                      });
                  }));
              }),
              (i.prototype.applyStyles = function () {
                this.core
                  .getSlideItem(this.core.index)
                  .find(".lg-img-rotate")
                  .first()
                  .css(
                    "transform",
                    "rotate(" +
                      this.rotateValuesList[this.core.index].rotate +
                      "deg) scale3d(" +
                      this.rotateValuesList[this.core.index].flipHorizontal +
                      ", " +
                      this.rotateValuesList[this.core.index].flipVertical +
                      ", 1)"
                  );
              }),
              (i.prototype.rotateLeft = function () {
                (this.rotateValuesList[this.core.index].rotate -= 90),
                  this.applyStyles(),
                  this.triggerEvents(t.rotateLeft, {
                    rotate: this.rotateValuesList[this.core.index].rotate,
                  });
              }),
              (i.prototype.rotateRight = function () {
                (this.rotateValuesList[this.core.index].rotate += 90),
                  this.applyStyles(),
                  this.triggerEvents(t.rotateRight, {
                    rotate: this.rotateValuesList[this.core.index].rotate,
                  });
              }),
              (i.prototype.getCurrentRotation = function (e) {
                if (!e) return 0;
                var t = this.$LG(e).style(),
                  s =
                    t.getPropertyValue("-webkit-transform") ||
                    t.getPropertyValue("-moz-transform") ||
                    t.getPropertyValue("-ms-transform") ||
                    t.getPropertyValue("-o-transform") ||
                    t.getPropertyValue("transform") ||
                    "none";
                if ("none" !== s) {
                  var i = s.split("(")[1].split(")")[0].split(",");
                  if (i) {
                    var n = Math.round(
                      Math.atan2(i[1], i[0]) * (180 / Math.PI)
                    );
                    return n < 0 ? n + 360 : n;
                  }
                }
                return 0;
              }),
              (i.prototype.flipHorizontal = function () {
                var e = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-rotate")
                    .first()
                    .get(),
                  s = this.getCurrentRotation(e),
                  i = "flipHorizontal";
                (90 !== s && 270 !== s) || (i = "flipVertical"),
                  (this.rotateValuesList[this.core.index][i] *= -1),
                  this.applyStyles(),
                  this.triggerEvents(t.flipHorizontal, {
                    flipHorizontal: this.rotateValuesList[this.core.index][i],
                  });
              }),
              (i.prototype.flipVertical = function () {
                var e = this.core
                    .getSlideItem(this.core.index)
                    .find(".lg-img-rotate")
                    .first()
                    .get(),
                  s = this.getCurrentRotation(e),
                  i = "flipVertical";
                (90 !== s && 270 !== s) || (i = "flipHorizontal"),
                  (this.rotateValuesList[this.core.index][i] *= -1),
                  this.applyStyles(),
                  this.triggerEvents(t.flipVertical, {
                    flipVertical: this.rotateValuesList[this.core.index][i],
                  });
              }),
              (i.prototype.triggerEvents = function (e, t) {
                var s = this;
                setTimeout(function () {
                  s.core.LGel.trigger(e, t);
                }, this.settings.rotateSpeed + 10);
              }),
              (i.prototype.isImageOrientationChanged = function () {
                var e = this.rotateValuesList[this.core.index],
                  t = Math.abs(e.rotate) % 360 != 0,
                  s = e.flipHorizontal < 0,
                  i = e.flipVertical < 0;
                return t || s || i;
              }),
              (i.prototype.closeGallery = function () {
                this.isImageOrientationChanged() &&
                  this.core.getSlideItem(this.core.index).css("opacity", 0),
                  (this.rotateValuesList = {});
              }),
              (i.prototype.destroy = function () {
                this.core.LGel.off(".lg.rotate"), this.core.LGel.off(".rotate");
              }),
              i
            );
          })();
        })();
      },
      571: function (e) {
        e.exports = (function () {
          "use strict";
          var e = function () {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t, s = 1, i = arguments.length; s < i; s++)
                    for (var n in (t = arguments[s]))
                      Object.prototype.hasOwnProperty.call(t, n) &&
                        (e[n] = t[n]);
                  return e;
                }),
              e.apply(this, arguments)
            );
          };
          function t() {
            for (var e = 0, t = 0, s = arguments.length; t < s; t++)
              e += arguments[t].length;
            var i = Array(e),
              n = 0;
            for (t = 0; t < s; t++)
              for (var r = arguments[t], o = 0, l = r.length; o < l; o++, n++)
                i[n] = r[o];
            return i;
          }
          var s = {
            share: !0,
            facebook: !0,
            facebookDropdownText: "Facebook",
            twitter: !0,
            twitterDropdownText: "Twitter",
            pinterest: !0,
            pinterestDropdownText: "Pinterest",
            additionalShareOptions: [],
            sharePluginStrings: { share: "Share" },
          };
          function i(e) {
            return (
              "//www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(e.facebookShareUrl || window.location.href)
            );
          }
          function n(e) {
            var t = "//twitter.com/intent/tweet?text=",
              s = encodeURIComponent(e.twitterShareUrl || window.location.href);
            return t + e.tweetText + "&url=" + s;
          }
          function r(e) {
            var t = "http://www.pinterest.com/pin/create/button/?url=",
              s = e.pinterestText,
              i = encodeURIComponent(e.src);
            return (
              t +
              encodeURIComponent(e.pinterestShareUrl || window.location.href) +
              "&media=" +
              i +
              "&description=" +
              s
            );
          }
          var o = {
            afterAppendSlide: "lgAfterAppendSlide",
            init: "lgInit",
            hasVideo: "lgHasVideo",
            containerResize: "lgContainerResize",
            updateSlides: "lgUpdateSlides",
            afterAppendSubHtml: "lgAfterAppendSubHtml",
            beforeOpen: "lgBeforeOpen",
            afterOpen: "lgAfterOpen",
            slideItemLoad: "lgSlideItemLoad",
            beforeSlide: "lgBeforeSlide",
            afterSlide: "lgAfterSlide",
            posterClick: "lgPosterClick",
            dragStart: "lgDragStart",
            dragMove: "lgDragMove",
            dragEnd: "lgDragEnd",
            beforeNextSlide: "lgBeforeNextSlide",
            beforePrevSlide: "lgBeforePrevSlide",
            beforeClose: "lgBeforeClose",
            afterClose: "lgAfterClose",
            rotateLeft: "lgRotateLeft",
            rotateRight: "lgRotateRight",
            flipHorizontal: "lgFlipHorizontal",
            flipVertical: "lgFlipVertical",
            autoplay: "lgAutoplay",
            autoplayStart: "lgAutoplayStart",
            autoplayStop: "lgAutoplayStop",
          };
          return (function () {
            function l(t) {
              return (
                (this.shareOptions = []),
                (this.core = t),
                (this.settings = e(e({}, s), this.core.settings)),
                this
              );
            }
            return (
              (l.prototype.init = function () {
                this.settings.share &&
                  ((this.shareOptions = t(
                    this.getDefaultShareOptions(),
                    this.settings.additionalShareOptions
                  )),
                  this.setLgShareMarkup(),
                  this.core.outer
                    .find(".lg-share .lg-dropdown")
                    .append(this.getShareListHtml()),
                  this.core.LGel.on(
                    o.afterSlide + ".share",
                    this.onAfterSlide.bind(this)
                  ));
              }),
              (l.prototype.getShareListHtml = function () {
                var e = "";
                return (
                  this.shareOptions.forEach(function (t) {
                    e += t.dropdownHTML;
                  }),
                  e
                );
              }),
              (l.prototype.setLgShareMarkup = function () {
                var e = this;
                this.core.$toolbar.append(
                  '<button type="button" aria-label="' +
                    this.settings.sharePluginStrings.share +
                    '" aria-haspopup="true" aria-expanded="false" class="lg-share lg-icon">\n                <ul class="lg-dropdown" style="position: absolute;"></ul></button>'
                ),
                  this.core.outer.append(
                    '<div class="lg-dropdown-overlay"></div>'
                  ),
                  this.core.outer
                    .find(".lg-share")
                    .first()
                    .on("click.lg", function () {
                      e.core.outer.toggleClass("lg-dropdown-active"),
                        e.core.outer.hasClass("lg-dropdown-active")
                          ? e.core.outer.attr("aria-expanded", !0)
                          : e.core.outer.attr("aria-expanded", !1);
                    }),
                  this.core.outer
                    .find(".lg-dropdown-overlay")
                    .first()
                    .on("click.lg", function () {
                      e.core.outer.removeClass("lg-dropdown-active"),
                        e.core.outer.attr("aria-expanded", !1);
                    });
              }),
              (l.prototype.onAfterSlide = function (e) {
                var t = this,
                  s = e.detail.index,
                  i = this.core.galleryItems[s];
                setTimeout(function () {
                  t.shareOptions.forEach(function (e) {
                    var s = e.selector;
                    t.core.outer.find(s).attr("href", e.generateLink(i));
                  });
                }, 100);
              }),
              (l.prototype.getShareListItemHTML = function (e, t) {
                return (
                  '<li><a class="lg-share-' +
                  e +
                  '" rel="noopener" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
                  t +
                  "</span></a></li>"
                );
              }),
              (l.prototype.getDefaultShareOptions = function () {
                return t(
                  this.settings.facebook
                    ? [
                        {
                          type: "facebook",
                          generateLink: i,
                          dropdownHTML: this.getShareListItemHTML(
                            "facebook",
                            this.settings.facebookDropdownText
                          ),
                          selector: ".lg-share-facebook",
                        },
                      ]
                    : [],
                  this.settings.twitter
                    ? [
                        {
                          type: "twitter",
                          generateLink: n,
                          dropdownHTML: this.getShareListItemHTML(
                            "twitter",
                            this.settings.twitterDropdownText
                          ),
                          selector: ".lg-share-twitter",
                        },
                      ]
                    : [],
                  this.settings.pinterest
                    ? [
                        {
                          type: "pinterest",
                          generateLink: r,
                          dropdownHTML: this.getShareListItemHTML(
                            "pinterest",
                            this.settings.pinterestDropdownText
                          ),
                          selector: ".lg-share-pinterest",
                        },
                      ]
                    : []
                );
              }),
              (l.prototype.destroy = function () {
                this.core.outer.find(".lg-dropdown-overlay").remove(),
                  this.core.outer.find(".lg-share").remove(),
                  this.core.LGel.off(".lg.share"),
                  this.core.LGel.off(".share");
              }),
              l
            );
          })();
        })();
      },
      732: function (e) {
        e.exports = (function () {
          "use strict";
          function e() {
            return (
              (e =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var s = arguments[t];
                    for (var i in s)
                      Object.prototype.hasOwnProperty.call(s, i) &&
                        (e[i] = s[i]);
                  }
                  return e;
                }),
              e.apply(this, arguments)
            );
          }
          var t = "undefined" != typeof window,
            s =
              (t && !("onscroll" in window)) ||
              ("undefined" != typeof navigator &&
                /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
            i = t && "IntersectionObserver" in window,
            n = t && "classList" in document.createElement("p"),
            r = t && window.devicePixelRatio > 1,
            o = {
              elements_selector: ".lazy",
              container: s || t ? document : null,
              threshold: 300,
              thresholds: null,
              data_src: "src",
              data_srcset: "srcset",
              data_sizes: "sizes",
              data_bg: "bg",
              data_bg_hidpi: "bg-hidpi",
              data_bg_multi: "bg-multi",
              data_bg_multi_hidpi: "bg-multi-hidpi",
              data_bg_set: "bg-set",
              data_poster: "poster",
              class_applied: "applied",
              class_loading: "loading",
              class_loaded: "loaded",
              class_error: "error",
              class_entered: "entered",
              class_exited: "exited",
              unobserve_completed: !0,
              unobserve_entered: !1,
              cancel_on_exit: !0,
              callback_enter: null,
              callback_exit: null,
              callback_applied: null,
              callback_loading: null,
              callback_loaded: null,
              callback_error: null,
              callback_finish: null,
              callback_cancel: null,
              use_native: !1,
              restore_on_error: !1,
            },
            l = function (t) {
              return e({}, o, t);
            },
            a = function (e, t) {
              var s,
                i = "LazyLoad::Initialized",
                n = new e(t);
              try {
                s = new CustomEvent(i, { detail: { instance: n } });
              } catch (e) {
                (s = document.createEvent("CustomEvent")).initCustomEvent(
                  i,
                  !1,
                  !1,
                  { instance: n }
                );
              }
              window.dispatchEvent(s);
            },
            c = "src",
            d = "srcset",
            u = "sizes",
            p = "poster",
            h = "llOriginalAttrs",
            g = "data",
            m = "loading",
            f = "loaded",
            v = "applied",
            y = "error",
            b = "native",
            S = "data-",
            w = "ll-status",
            C = function (e, t) {
              return e.getAttribute(S + t);
            },
            E = function (e) {
              return C(e, w);
            },
            x = function (e, t) {
              return (function (e, t, s) {
                var i = "data-ll-status";
                null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
              })(e, 0, t);
            },
            T = function (e) {
              return x(e, null);
            },
            L = function (e) {
              return null === E(e);
            },
            I = function (e) {
              return E(e) === b;
            },
            A = [m, f, v, y],
            O = function (e, t, s, i) {
              e &&
                (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
            },
            _ = function (e, t) {
              n
                ? e.classList.add(t)
                : (e.className += (e.className ? " " : "") + t);
            },
            P = function (e, t) {
              n
                ? e.classList.remove(t)
                : (e.className = e.className
                    .replace(new RegExp("(^|\\s+)" + t + "(\\s+|$)"), " ")
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, ""));
            },
            k = function (e) {
              return e.llTempImage;
            },
            M = function (e, t) {
              if (t) {
                var s = t._observer;
                s && s.unobserve(e);
              }
            },
            z = function (e, t) {
              e && (e.loadingCount += t);
            },
            D = function (e, t) {
              e && (e.toLoadCount = t);
            },
            $ = function (e) {
              for (var t, s = [], i = 0; (t = e.children[i]); i += 1)
                "SOURCE" === t.tagName && s.push(t);
              return s;
            },
            B = function (e, t) {
              var s = e.parentNode;
              s && "PICTURE" === s.tagName && $(s).forEach(t);
            },
            G = function (e, t) {
              $(e).forEach(t);
            },
            F = [c],
            H = [c, p],
            V = [c, d, u],
            q = [g],
            N = function (e) {
              return !!e[h];
            },
            R = function (e) {
              return e[h];
            },
            j = function (e) {
              return delete e[h];
            },
            W = function (e, t) {
              if (!N(e)) {
                var s = {};
                t.forEach(function (t) {
                  s[t] = e.getAttribute(t);
                }),
                  (e[h] = s);
              }
            },
            Y = function (e, t) {
              if (N(e)) {
                var s = R(e);
                t.forEach(function (t) {
                  !(function (e, t, s) {
                    s ? e.setAttribute(t, s) : e.removeAttribute(t);
                  })(e, t, s[t]);
                });
              }
            },
            X = function (e, t, s) {
              _(e, t.class_applied),
                x(e, v),
                s &&
                  (t.unobserve_completed && M(e, t),
                  O(t.callback_applied, e, s));
            },
            U = function (e, t, s) {
              _(e, t.class_loading),
                x(e, m),
                s && (z(s, 1), O(t.callback_loading, e, s));
            },
            K = function (e, t, s) {
              s && e.setAttribute(t, s);
            },
            Z = function (e, t) {
              K(e, u, C(e, t.data_sizes)),
                K(e, d, C(e, t.data_srcset)),
                K(e, c, C(e, t.data_src));
            },
            Q = {
              IMG: function (e, t) {
                B(e, function (e) {
                  W(e, V), Z(e, t);
                }),
                  W(e, V),
                  Z(e, t);
              },
              IFRAME: function (e, t) {
                W(e, F), K(e, c, C(e, t.data_src));
              },
              VIDEO: function (e, t) {
                G(e, function (e) {
                  W(e, F), K(e, c, C(e, t.data_src));
                }),
                  W(e, H),
                  K(e, p, C(e, t.data_poster)),
                  K(e, c, C(e, t.data_src)),
                  e.load();
              },
              OBJECT: function (e, t) {
                W(e, q), K(e, g, C(e, t.data_src));
              },
            },
            J = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
            ee = function (e, t) {
              !t ||
                (function (e) {
                  return e.loadingCount > 0;
                })(t) ||
                (function (e) {
                  return e.toLoadCount > 0;
                })(t) ||
                O(e.callback_finish, t);
            },
            te = function (e, t, s) {
              e.addEventListener(t, s), (e.llEvLisnrs[t] = s);
            },
            se = function (e, t, s) {
              e.removeEventListener(t, s);
            },
            ie = function (e) {
              return !!e.llEvLisnrs;
            },
            ne = function (e) {
              if (ie(e)) {
                var t = e.llEvLisnrs;
                for (var s in t) {
                  var i = t[s];
                  se(e, s, i);
                }
                delete e.llEvLisnrs;
              }
            },
            re = function (e, t, s) {
              !(function (e) {
                delete e.llTempImage;
              })(e),
                z(s, -1),
                (function (e) {
                  e && (e.toLoadCount -= 1);
                })(s),
                P(e, t.class_loading),
                t.unobserve_completed && M(e, s);
            },
            oe = function (e, t, s) {
              var i = k(e) || e;
              ie(i) ||
                (function (e, t, s) {
                  ie(e) || (e.llEvLisnrs = {});
                  var i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                  te(e, i, t), te(e, "error", s);
                })(
                  i,
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = I(t);
                      re(t, s, i),
                        _(t, s.class_loaded),
                        x(t, f),
                        O(s.callback_loaded, t, i),
                        n || ee(s, i);
                    })(0, e, t, s),
                      ne(i);
                  },
                  function (n) {
                    !(function (e, t, s, i) {
                      var n = I(t);
                      re(t, s, i),
                        _(t, s.class_error),
                        x(t, y),
                        O(s.callback_error, t, i),
                        s.restore_on_error && Y(t, V),
                        n || ee(s, i);
                    })(0, e, t, s),
                      ne(i);
                  }
                );
            },
            le = function (e, t, s) {
              !(function (e) {
                return J.indexOf(e.tagName) > -1;
              })(e)
                ? (function (e, t, s) {
                    !(function (e) {
                      e.llTempImage = document.createElement("IMG");
                    })(e),
                      oe(e, t, s),
                      (function (e) {
                        N(e) ||
                          (e[h] = { backgroundImage: e.style.backgroundImage });
                      })(e),
                      (function (e, t, s) {
                        var i = C(e, t.data_bg),
                          n = C(e, t.data_bg_hidpi),
                          o = r && n ? n : i;
                        o &&
                          ((e.style.backgroundImage = 'url("'.concat(o, '")')),
                          k(e).setAttribute(c, o),
                          U(e, t, s));
                      })(e, t, s),
                      (function (e, t, s) {
                        var i = C(e, t.data_bg_multi),
                          n = C(e, t.data_bg_multi_hidpi),
                          o = r && n ? n : i;
                        o && ((e.style.backgroundImage = o), X(e, t, s));
                      })(e, t, s),
                      (function (e, t, s) {
                        var i = C(e, t.data_bg_set);
                        if (i) {
                          var n = i.split("|"),
                            r = n.map(function (e) {
                              return "image-set(".concat(e, ")");
                            });
                          (e.style.backgroundImage = r.join()),
                            "" === e.style.backgroundImage &&
                              ((r = n.map(function (e) {
                                return "-webkit-image-set(".concat(e, ")");
                              })),
                              (e.style.backgroundImage = r.join())),
                            X(e, t, s);
                        }
                      })(e, t, s);
                  })(e, t, s)
                : (function (e, t, s) {
                    oe(e, t, s),
                      (function (e, t, s) {
                        var i = Q[e.tagName];
                        i && (i(e, t), U(e, t, s));
                      })(e, t, s);
                  })(e, t, s);
            },
            ae = function (e) {
              e.removeAttribute(c), e.removeAttribute(d), e.removeAttribute(u);
            },
            ce = function (e) {
              B(e, function (e) {
                Y(e, V);
              }),
                Y(e, V);
            },
            de = {
              IMG: ce,
              IFRAME: function (e) {
                Y(e, F);
              },
              VIDEO: function (e) {
                G(e, function (e) {
                  Y(e, F);
                }),
                  Y(e, H),
                  e.load();
              },
              OBJECT: function (e) {
                Y(e, q);
              },
            },
            ue = function (e, t) {
              (function (e) {
                var t = de[e.tagName];
                t
                  ? t(e)
                  : (function (e) {
                      if (N(e)) {
                        var t = R(e);
                        e.style.backgroundImage = t.backgroundImage;
                      }
                    })(e);
              })(e),
                (function (e, t) {
                  L(e) ||
                    I(e) ||
                    (P(e, t.class_entered),
                    P(e, t.class_exited),
                    P(e, t.class_applied),
                    P(e, t.class_loading),
                    P(e, t.class_loaded),
                    P(e, t.class_error));
                })(e, t),
                T(e),
                j(e);
            },
            pe = ["IMG", "IFRAME", "VIDEO"],
            he = function (e) {
              return e.use_native && "loading" in HTMLImageElement.prototype;
            },
            ge = function (e, t, s) {
              e.forEach(function (e) {
                return (function (e) {
                  return e.isIntersecting || e.intersectionRatio > 0;
                })(e)
                  ? (function (e, t, s, i) {
                      var n = (function (e) {
                        return A.indexOf(E(e)) >= 0;
                      })(e);
                      x(e, "entered"),
                        _(e, s.class_entered),
                        P(e, s.class_exited),
                        (function (e, t, s) {
                          t.unobserve_entered && M(e, s);
                        })(e, s, i),
                        O(s.callback_enter, e, t, i),
                        n || le(e, s, i);
                    })(e.target, e, t, s)
                  : (function (e, t, s, i) {
                      L(e) ||
                        (_(e, s.class_exited),
                        (function (e, t, s, i) {
                          s.cancel_on_exit &&
                            (function (e) {
                              return E(e) === m;
                            })(e) &&
                            "IMG" === e.tagName &&
                            (ne(e),
                            (function (e) {
                              B(e, function (e) {
                                ae(e);
                              }),
                                ae(e);
                            })(e),
                            ce(e),
                            P(e, s.class_loading),
                            z(i, -1),
                            T(e),
                            O(s.callback_cancel, e, t, i));
                        })(e, t, s, i),
                        O(s.callback_exit, e, t, i));
                    })(e.target, e, t, s);
              });
            },
            me = function (e) {
              return Array.prototype.slice.call(e);
            },
            fe = function (e) {
              return e.container.querySelectorAll(e.elements_selector);
            },
            ve = function (e) {
              return (function (e) {
                return E(e) === y;
              })(e);
            },
            ye = function (e, t) {
              return (function (e) {
                return me(e).filter(L);
              })(e || fe(t));
            },
            be = function (e, s) {
              var n = l(e);
              (this._settings = n),
                (this.loadingCount = 0),
                (function (e, t) {
                  i &&
                    !he(e) &&
                    (t._observer = new IntersectionObserver(
                      function (s) {
                        ge(s, e, t);
                      },
                      (function (e) {
                        return {
                          root: e.container === document ? null : e.container,
                          rootMargin: e.thresholds || e.threshold + "px",
                        };
                      })(e)
                    ));
                })(n, this),
                (function (e, s) {
                  t &&
                    ((s._onlineHandler = function () {
                      !(function (e, t) {
                        var s;
                        ((s = fe(e)), me(s).filter(ve)).forEach(function (t) {
                          P(t, e.class_error), T(t);
                        }),
                          t.update();
                      })(e, s);
                    }),
                    window.addEventListener("online", s._onlineHandler));
                })(n, this),
                this.update(s);
            };
          return (
            (be.prototype = {
              update: function (e) {
                var t,
                  n,
                  r = this._settings,
                  o = ye(e, r);
                D(this, o.length),
                  !s && i
                    ? he(r)
                      ? (function (e, t, s) {
                          e.forEach(function (e) {
                            -1 !== pe.indexOf(e.tagName) &&
                              (function (e, t, s) {
                                e.setAttribute("loading", "lazy"),
                                  oe(e, t, s),
                                  (function (e, t) {
                                    var s = Q[e.tagName];
                                    s && s(e, t);
                                  })(e, t),
                                  x(e, b);
                              })(e, t, s);
                          }),
                            D(s, 0);
                        })(o, r, this)
                      : ((n = o),
                        (function (e) {
                          e.disconnect();
                        })((t = this._observer)),
                        (function (e, t) {
                          t.forEach(function (t) {
                            e.observe(t);
                          });
                        })(t, n))
                    : this.loadAll(o);
              },
              destroy: function () {
                this._observer && this._observer.disconnect(),
                  t &&
                    window.removeEventListener("online", this._onlineHandler),
                  fe(this._settings).forEach(function (e) {
                    j(e);
                  }),
                  delete this._observer,
                  delete this._settings,
                  delete this._onlineHandler,
                  delete this.loadingCount,
                  delete this.toLoadCount;
              },
              loadAll: function (e) {
                var t = this,
                  s = this._settings;
                ye(e, s).forEach(function (e) {
                  M(e, t), le(e, s, t);
                });
              },
              restoreAll: function () {
                var e = this._settings;
                fe(e).forEach(function (t) {
                  ue(t, e);
                });
              },
            }),
            (be.load = function (e, t) {
              var s = l(t);
              le(e, s);
            }),
            (be.resetStatus = function (e) {
              T(e);
            }),
            t &&
              (function (e, t) {
                if (t)
                  if (t.length) for (var s, i = 0; (s = t[i]); i += 1) a(e, s);
                  else a(e, t);
              })(be, window.lazyLoadOptions),
            be
          );
        })();
      },
    },
    t = {};
  function s(i) {
    var n = t[i];
    if (void 0 !== n) return n.exports;
    var r = (t[i] = { exports: {} });
    return e[i].call(r.exports, r, r.exports, s), r.exports;
  }
  (() => {
    "use strict";
    function e(e) {
      this.type = e;
    }
    (e.prototype.init = function () {
      const e = this;
      (this.оbjects = []),
        (this.daClassname = "_dynamic_adapt_"),
        (this.nodes = document.querySelectorAll("[data-da]"));
      for (let e = 0; e < this.nodes.length; e++) {
        const t = this.nodes[e],
          s = t.dataset.da.trim().split(","),
          i = {};
        (i.element = t),
          (i.parent = t.parentNode),
          (i.destination = document.querySelector(s[0].trim())),
          (i.breakpoint = s[1] ? s[1].trim() : "767"),
          (i.place = s[2] ? s[2].trim() : "last"),
          (i.index = this.indexInParent(i.parent, i.element)),
          this.оbjects.push(i);
      }
      this.arraySort(this.оbjects),
        (this.mediaQueries = Array.prototype.map.call(
          this.оbjects,
          function (e) {
            return (
              "(" +
              this.type +
              "-width: " +
              e.breakpoint +
              "px)," +
              e.breakpoint
            );
          },
          this
        )),
        (this.mediaQueries = Array.prototype.filter.call(
          this.mediaQueries,
          function (e, t, s) {
            return Array.prototype.indexOf.call(s, e) === t;
          }
        ));
      for (let t = 0; t < this.mediaQueries.length; t++) {
        const s = this.mediaQueries[t],
          i = String.prototype.split.call(s, ","),
          n = window.matchMedia(i[0]),
          r = i[1],
          o = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === r;
          });
        n.addListener(function () {
          e.mediaHandler(n, o);
        }),
          this.mediaHandler(n, o);
      }
    }),
      (e.prototype.mediaHandler = function (e, t) {
        if (e.matches)
          for (let e = 0; e < t.length; e++) {
            const s = t[e];
            (s.index = this.indexInParent(s.parent, s.element)),
              this.moveTo(s.place, s.element, s.destination);
          }
        else
          for (let e = t.length - 1; e >= 0; e--) {
            const s = t[e];
            s.element.classList.contains(this.daClassname) &&
              this.moveBack(s.parent, s.element, s.index);
          }
      }),
      (e.prototype.moveTo = function (e, t, s) {
        t.classList.add(this.daClassname),
          "last" === e || e >= s.children.length
            ? s.insertAdjacentElement("beforeend", t)
            : "first" !== e
            ? s.children[e].insertAdjacentElement("beforebegin", t)
            : s.insertAdjacentElement("afterbegin", t);
      }),
      (e.prototype.moveBack = function (e, t, s) {
        t.classList.remove(this.daClassname),
          void 0 !== e.children[s]
            ? e.children[s].insertAdjacentElement("beforebegin", t)
            : e.insertAdjacentElement("beforeend", t);
      }),
      (e.prototype.indexInParent = function (e, t) {
        const s = Array.prototype.slice.call(e.children);
        return Array.prototype.indexOf.call(s, t);
      }),
      (e.prototype.arraySort = function (e) {
        "min" === this.type
          ? Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                  ? 1
                  : e.place - t.place
                : e.breakpoint - t.breakpoint;
            })
          : Array.prototype.sort.call(e, function (e, t) {
              return e.breakpoint === t.breakpoint
                ? e.place === t.place
                  ? 0
                  : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                  ? -1
                  : t.place - e.place
                : t.breakpoint - e.breakpoint;
            });
      });
    new e("max").init();
    class t {
      constructor(e) {
        let t = {
          logging: !0,
          init: !0,
          attributeOpenButton: "data-popup",
          attributeCloseButton: "data-close",
          fixElementSelector: "[data-lp]",
          youtubeAttribute: "data-youtube",
          youtubePlaceAttribute: "data-youtube-place",
          setAutoplayYoutube: !0,
          classes: {
            popup: "popup",
            popupContent: "popup__content",
            popupActive: "popup_show",
            bodyActive: "popup-show",
          },
          focusCatch: !0,
          closeEsc: !0,
          bodyLock: !0,
          bodyLockDelay: 500,
          hashSettings: { location: !0, goHash: !0 },
          on: {
            beforeOpen: function () {},
            afterOpen: function () {},
            beforeClose: function () {},
            afterClose: function () {},
          },
        };
        (this.isOpen = !1),
          (this.targetOpen = { selector: !1, element: !1 }),
          (this.previousOpen = { selector: !1, element: !1 }),
          (this.lastClosed = { selector: !1, element: !1 }),
          (this._dataValue = !1),
          (this.hash = !1),
          (this._reopen = !1),
          (this._selectorOpen = !1),
          (this.lastFocusEl = !1),
          (this._focusEl = [
            "a[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "button:not([disabled]):not([aria-hidden])",
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "area[href]",
            "iframe",
            "object",
            "embed",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ]),
          (this.options = {
            ...t,
            ...e,
            classes: { ...t.classes, ...e?.classes },
            hashSettings: { ...t.hashSettings, ...e?.hashSettings },
            on: { ...t.on, ...e?.on },
          }),
          this.options.init && this.initPopups();
      }
      initPopups() {
        this.popupLogging("Проснулся"), this.eventsPopup();
      }
      eventsPopup() {
        document.addEventListener(
          "click",
          function (e) {
            const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
            if (t)
              return (
                e.preventDefault(),
                (this._dataValue = t.getAttribute(
                  this.options.attributeOpenButton
                )
                  ? t.getAttribute(this.options.attributeOpenButton)
                  : "error"),
                "error" !== this._dataValue
                  ? (this.isOpen || (this.lastFocusEl = t),
                    (this.targetOpen.selector = `${this._dataValue}`),
                    (this._selectorOpen = !0),
                    void this.open())
                  : void this.popupLogging(
                      `Ой ой, не заполнен атрибут у ${t.classList}`
                    )
              );
            return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
              (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                this.isOpen)
              ? (e.preventDefault(), void this.close())
              : void 0;
          }.bind(this)
        ),
          document.addEventListener(
            "keydown",
            function (e) {
              if (
                this.options.closeEsc &&
                27 == e.which &&
                "Escape" === e.code &&
                this.isOpen
              )
                return e.preventDefault(), void this.close();
              this.options.focusCatch &&
                9 == e.which &&
                this.isOpen &&
                this._focusCatch(e);
            }.bind(this)
          ),
          document.querySelector("form[data-ajax],form[data-dev]") &&
            document.addEventListener(
              "formSent",
              function (e) {
                const t = e.detail.form.dataset.popupMessage;
                t && this.open(t);
              }.bind(this)
            ),
          this.options.hashSettings.goHash &&
            (window.addEventListener(
              "hashchange",
              function () {
                window.location.hash
                  ? this._openToHash()
                  : this.close(this.targetOpen.selector);
              }.bind(this)
            ),
            window.addEventListener(
              "load",
              function () {
                window.location.hash && this._openToHash();
              }.bind(this)
            ));
      }
      open(e) {
        if (
          (e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
          this.isOpen && ((this._reopen = !0), this.close()),
          this._selectorOpen ||
            (this.targetOpen.selector = this.lastClosed.selector),
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector
          )),
          this.targetOpen.element)
        ) {
          if (
            this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
          ) {
            const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(
                this.options.youtubeAttribute
              )}?rel=0&showinfo=0&autoplay=1`,
              t = document.createElement("iframe");
            t.setAttribute("allowfullscreen", "");
            const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
            t.setAttribute("allow", `${s}; encrypted-media`),
              t.setAttribute("src", e),
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ) &&
                this.targetOpen.element
                  .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                  .appendChild(t);
          }
          this.options.hashSettings.location &&
            (this._getHash(), this._setHash()),
            this.options.on.beforeOpen(this),
            this.targetOpen.element.classList.add(
              this.options.classes.popupActive
            ),
            document.body.classList.add(this.options.classes.bodyActive),
            this._reopen ? (this._reopen = !1) : a(),
            this.targetOpen.element.setAttribute("aria-hidden", "false"),
            (this.previousOpen.selector = this.targetOpen.selector),
            (this.previousOpen.element = this.targetOpen.element),
            (this._selectorOpen = !1),
            (this.isOpen = !0),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            document.dispatchEvent(
              new CustomEvent("afterPopupOpen", { detail: { popup: this } })
            ),
            this.popupLogging("Открыл попап");
        } else
          this.popupLogging(
            "Ой ой, такого попапа нет. Проверьте корректность ввода. "
          );
      }
      close(e) {
        e &&
          "string" == typeof e &&
          "" !== e.trim() &&
          (this.previousOpen.selector = e),
          this.isOpen &&
            l &&
            (this.options.on.beforeClose(this),
            this.targetOpen.element.hasAttribute(
              this.options.youtubeAttribute
            ) &&
              this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ) &&
              (this.targetOpen.element.querySelector(
                `[${this.options.youtubePlaceAttribute}]`
              ).innerHTML = ""),
            this.previousOpen.element.classList.remove(
              this.options.classes.popupActive
            ),
            this.previousOpen.element.setAttribute("aria-hidden", "true"),
            this._reopen ||
              (document.body.classList.remove(this.options.classes.bodyActive),
              a(),
              (this.isOpen = !1)),
            this._removeHash(),
            this._selectorOpen &&
              ((this.lastClosed.selector = this.previousOpen.selector),
              (this.lastClosed.element = this.previousOpen.element)),
            this.options.on.afterClose(this),
            setTimeout(() => {
              this._focusTrap();
            }, 50),
            this.popupLogging("Закрыл попап"));
      }
      _getHash() {
        this.options.hashSettings.location &&
          (this.hash = this.targetOpen.selector.includes("#")
            ? this.targetOpen.selector
            : this.targetOpen.selector.replace(".", "#"));
      }
      _openToHash() {
        let e = document.querySelector(
          `.${window.location.hash.replace("#", "")}`
        )
          ? `.${window.location.hash.replace("#", "")}`
          : document.querySelector(`${window.location.hash}`)
          ? `${window.location.hash}`
          : null;
        document.querySelector(
          `[${this.options.attributeOpenButton}="${e}"]`
        ) &&
          e &&
          this.open(e);
      }
      _setHash() {
        history.pushState("", "", this.hash);
      }
      _removeHash() {
        history.pushState("", "", window.location.href.split("#")[0]);
      }
      _focusCatch(e) {
        const t = this.targetOpen.element.querySelectorAll(this._focusEl),
          s = Array.prototype.slice.call(t),
          i = s.indexOf(document.activeElement);
        e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
          e.shiftKey ||
            i !== s.length - 1 ||
            (s[0].focus(), e.preventDefault());
      }
      _focusTrap() {
        const e = this.previousOpen.element.querySelectorAll(this._focusEl);
        !this.isOpen && this.lastFocusEl
          ? this.lastFocusEl.focus()
          : e[0].focus();
      }
      popupLogging(e) {
        this.options.logging && u(`[Попапос]: ${e}`);
      }
    }
    let i = {
      Android: function () {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function () {
        return (
          i.Android() || i.BlackBerry() || i.iOS() || i.Opera() || i.Windows()
        );
      },
    };
    let n = (e, t = 500, s = 0) => {
        e.classList.contains("_slide") ||
          (e.classList.add("_slide"),
          (e.style.transitionProperty = "height, margin, padding"),
          (e.style.transitionDuration = t + "ms"),
          (e.style.height = `${e.offsetHeight}px`),
          e.offsetHeight,
          (e.style.overflow = "hidden"),
          (e.style.height = s ? `${s}px` : "0px"),
          (e.style.paddingTop = 0),
          (e.style.paddingBottom = 0),
          (e.style.marginTop = 0),
          (e.style.marginBottom = 0),
          window.setTimeout(() => {
            (e.hidden = !s),
              !s && e.style.removeProperty("height"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              !s && e.style.removeProperty("overflow"),
              e.style.removeProperty("transition-duration"),
              e.style.removeProperty("transition-property"),
              e.classList.remove("_slide");
          }, t));
      },
      r = (e, t = 500, s = 0) => {
        if (!e.classList.contains("_slide")) {
          e.classList.add("_slide"),
            (e.hidden = !e.hidden && null),
            s && e.style.removeProperty("height");
          let i = e.offsetHeight;
          (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = i + "px"),
            e.style.removeProperty("padding-top"),
            e.style.removeProperty("padding-bottom"),
            e.style.removeProperty("margin-top"),
            e.style.removeProperty("margin-bottom"),
            window.setTimeout(() => {
              e.style.removeProperty("height"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide");
            }, t);
        }
      },
      o = (e, t = 500) => (e.hidden ? r(e, t) : n(e, t)),
      l = !0,
      a = (e = 500) => {
        document.documentElement.classList.contains("lock") ? c(e) : d(e);
      },
      c = (e = 500) => {
        let t = document.querySelector("body");
        if (l) {
          let s = document.querySelectorAll("[data-lp]");
          setTimeout(() => {
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight = "0px";
            }
            (t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock");
          }, e),
            (l = !1),
            setTimeout(function () {
              l = !0;
            }, e);
        }
      },
      d = (e = 500) => {
        let t = document.querySelector("body");
        if (l) {
          let s = document.querySelectorAll("[data-lp]");
          for (let e = 0; e < s.length; e++) {
            s[e].style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px";
          }
          (t.style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px"),
            document.documentElement.classList.add("lock"),
            (l = !1),
            setTimeout(function () {
              l = !0;
            }, e);
        }
      };
    function u(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function p(e, t) {
      const s = Array.from(e).filter(function (e, s, i) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (s.length) {
        const e = [];
        s.forEach((s) => {
          const i = {},
            n = s.dataset[t].split(",");
          (i.value = n[0]),
            (i.type = n[1] ? n[1].trim() : "max"),
            (i.item = s),
            e.push(i);
        });
        let i = e.map(function (e) {
          return (
            "(" +
            e.type +
            "-width: " +
            e.value +
            "px)," +
            e.value +
            "," +
            e.type
          );
        });
        i = (function (e) {
          return e.filter(function (e, t, s) {
            return s.indexOf(e) === t;
          });
        })(i);
        const n = [];
        if (i.length)
          return (
            i.forEach((t) => {
              const s = t.split(","),
                i = s[1],
                r = s[2],
                o = window.matchMedia(s[0]),
                l = e.filter(function (e) {
                  if (e.value === i && e.type === r) return !0;
                });
              n.push({ itemsArray: l, matchMedia: o });
            }),
            n
          );
      }
    }
    let h = (e, t = !1, s = 500, i = 0) => {
      const n = document.querySelector(e);
      if (n) {
        let r = "",
          o = 0;
        t &&
          ((r = "header.header"), (o = document.querySelector(r).offsetHeight));
        let l = {
          speedAsDuration: !0,
          speed: s,
          header: r,
          offset: i,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (c(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(n, "", l);
        else {
          let e = n.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: o ? e - o : e, behavior: "smooth" });
        }
        u(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else u(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    class g {
      constructor(e, t = null) {
        if (
          ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
          (this.selectClasses = {
            classSelect: "select",
            classSelectBody: "select__body",
            classSelectTitle: "select__title",
            classSelectValue: "select__value",
            classSelectLabel: "select__label",
            classSelectInput: "select__input",
            classSelectText: "select__text",
            classSelectLink: "select__link",
            classSelectOptions: "select__options",
            classSelectOptionsScroll: "select__scroll",
            classSelectOption: "select__option",
            classSelectContent: "select__content",
            classSelectRow: "select__row",
            classSelectData: "select__asset",
            classSelectDisabled: "_select-disabled",
            classSelectTag: "_select-tag",
            classSelectOpen: "_select-open",
            classSelectActive: "_select-active",
            classSelectFocus: "_select-focus",
            classSelectMultiple: "_select-multiple",
            classSelectCheckBox: "_select-checkbox",
            classSelectOptionSelected: "_select-selected",
          }),
          (this._this = this),
          this.config.init)
        ) {
          const e = t
            ? document.querySelectorAll(t)
            : document.querySelectorAll("select");
          e.length
            ? (this.selectsInit(e),
              this.setLogging(`Проснулся, построил селектов: (${e.length})`))
            : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
        }
      }
      getSelectClass(e) {
        return `.${e}`;
      }
      getSelectElement(e, t) {
        return {
          originalSelect: e.querySelector("select"),
          selectElement: e.querySelector(this.getSelectClass(t)),
        };
      }
      selectsInit(e) {
        e.forEach((e, t) => {
          this.selectInit(e, t + 1);
        }),
          document.addEventListener(
            "click",
            function (e) {
              this.selectsActions(e);
            }.bind(this)
          ),
          document.addEventListener(
            "keydown",
            function (e) {
              this.selectsActions(e);
            }.bind(this)
          ),
          document.addEventListener(
            "focusin",
            function (e) {
              this.selectsActions(e);
            }.bind(this)
          ),
          document.addEventListener(
            "focusout",
            function (e) {
              this.selectsActions(e);
            }.bind(this)
          );
      }
      selectInit(e, t) {
        const s = this;
        let i = document.createElement("div");
        if (
          (i.classList.add(this.selectClasses.classSelect),
          e.parentNode.insertBefore(i, e),
          i.appendChild(e),
          (e.hidden = !0),
          t && (e.dataset.id = t),
          i.insertAdjacentHTML(
            "beforeend",
            `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
          ),
          this.selectBuild(e),
          this.getSelectPlaceholder(e) &&
            ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
            this.getSelectPlaceholder(e).label.show))
        ) {
          this.getSelectElement(
            i,
            this.selectClasses.classSelectTitle
          ).selectElement.insertAdjacentHTML(
            "afterbegin",
            `<span class="${this.selectClasses.classSelectLabel}">${
              this.getSelectPlaceholder(e).label.text
                ? this.getSelectPlaceholder(e).label.text
                : this.getSelectPlaceholder(e).value
            }</span>`
          );
        }
        (e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
          e.addEventListener("change", function (e) {
            s.selectChange(e);
          });
      }
      selectBuild(e) {
        const t = e.parentElement;
        (t.dataset.id = e.dataset.id),
          t.classList.add(
            e.getAttribute("class") ? `select_${e.getAttribute("class")}` : ""
          ),
          e.multiple
            ? t.classList.add(this.selectClasses.classSelectMultiple)
            : t.classList.remove(this.selectClasses.classSelectMultiple),
          e.hasAttribute("data-checkbox") && e.multiple
            ? t.classList.add(this.selectClasses.classSelectCheckBox)
            : t.classList.remove(this.selectClasses.classSelectCheckBox),
          this.setSelectTitleValue(t, e),
          this.setOptions(t, e),
          e.hasAttribute("data-search") && this.searchActions(t),
          e.hasAttribute("data-open") && this.selectAction(t),
          this.selectDisabled(t, e);
      }
      selectsActions(e) {
        const t = e.target,
          s = e.type;
        if (
          t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
          t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
        ) {
          const i = t.closest(".select")
              ? t.closest(".select")
              : document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${
                    t.closest(
                      this.getSelectClass(this.selectClasses.classSelectTag)
                    ).dataset.selectId
                  }"]`
                ),
            n = this.getSelectElement(i).originalSelect;
          if ("click" === s) {
            if (!n.disabled)
              if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTag)
                )
              ) {
                const e = t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  ),
                  s = document.querySelector(
                    `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`
                  );
                this.optionAction(i, n, s);
              } else if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTitle)
                )
              )
                this.selectAction(i);
              else if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectOption)
                )
              ) {
                const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectOption)
                );
                this.optionAction(i, n, e);
              }
          } else
            "focusin" === s || "focusout" === s
              ? t.closest(
                  this.getSelectClass(this.selectClasses.classSelect)
                ) &&
                ("focusin" === s
                  ? i.classList.add(this.selectClasses.classSelectFocus)
                  : i.classList.remove(this.selectClasses.classSelectFocus))
              : "keydown" === s && "Escape" === e.code && this.selectsСlose();
        } else this.selectsСlose();
      }
      selectsСlose() {
        const e = document.querySelectorAll(
          `${this.getSelectClass(
            this.selectClasses.classSelect
          )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
        );
        e.length &&
          e.forEach((e) => {
            this.selectAction(e);
          });
      }
      selectAction(e) {
        const t = this.getSelectElement(e).originalSelect,
          s = this.getSelectElement(
            e,
            this.selectClasses.classSelectOptions
          ).selectElement;
        s.classList.contains("_slide") ||
          (e.classList.toggle(this.selectClasses.classSelectOpen),
          o(s, t.dataset.speed));
      }
      setSelectTitleValue(e, t) {
        const s = this.getSelectElement(
            e,
            this.selectClasses.classSelectBody
          ).selectElement,
          i = this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle
          ).selectElement;
        i && i.remove(),
          s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t));
      }
      getSelectTitleValue(e, t) {
        let s = this.getSelectedOptionsData(t, 2).html;
        if (
          (t.multiple &&
            t.hasAttribute("data-tags") &&
            ((s = this.getSelectedOptionsData(t)
              .elements.map(
                (t) =>
                  `<span role="button" data-select-id="${
                    e.dataset.id
                  }" data-value="${
                    t.value
                  }" class="_select-tag">${this.getSelectElementContent(
                    t
                  )}</span>`
              )
              .join("")),
            t.dataset.tags &&
              document.querySelector(t.dataset.tags) &&
              ((document.querySelector(t.dataset.tags).innerHTML = s),
              t.hasAttribute("data-search") && (s = !1))),
          (s = s.length ? s : t.dataset.placeholder),
          this.getSelectedOptionsData(t).values.length
            ? e.classList.add(this.selectClasses.classSelectActive)
            : e.classList.remove(this.selectClasses.classSelectActive),
          t.hasAttribute("data-search"))
        )
          return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
        {
          const e =
            this.getSelectedOptionsData(t).elements.length &&
            this.getSelectedOptionsData(t).elements[0].dataset.class
              ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
              : "";
          return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
        }
      }
      getSelectElementContent(e) {
        const t = e.dataset.asset ? `${e.dataset.asset}` : "",
          s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
        let i = "";
        return (
          (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
          (i += t
            ? `<span class="${this.selectClasses.classSelectData}">`
            : ""),
          (i += t ? s : ""),
          (i += t ? "</span>" : ""),
          (i += t
            ? `<span class="${this.selectClasses.classSelectText}">`
            : ""),
          (i += e.textContent),
          (i += t ? "</span>" : ""),
          (i += t ? "</span>" : ""),
          i
        );
      }
      getSelectPlaceholder(e) {
        const t = Array.from(e.options).find((e) => !e.value);
        if (t)
          return {
            value: t.textContent,
            show: t.hasAttribute("data-show"),
            label: {
              show: t.hasAttribute("data-label"),
              text: t.dataset.label,
            },
          };
      }
      getSelectedOptionsData(e, t) {
        let s = [];
        return (
          e.multiple
            ? (s = Array.from(e.options)
                .filter((e) => e.value)
                .filter((e) => e.selected))
            : s.push(e.options[e.selectedIndex]),
          {
            elements: s.map((e) => e),
            values: s.filter((e) => e.value).map((e) => e.value),
            html: s.map((e) => this.getSelectElementContent(e)),
          }
        );
      }
      getOptions(e) {
        let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
          s = e.dataset.scroll
            ? `style="max-height:${e.dataset.scroll}px"`
            : "",
          i = Array.from(e.options);
        if (i.length > 0) {
          let n = "";
          return (
            ((this.getSelectPlaceholder(e) &&
              !this.getSelectPlaceholder(e).show) ||
              e.multiple) &&
              (i = i.filter((e) => e.value)),
            (n += t
              ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
              : ""),
            i.forEach((t) => {
              n += this.getOption(t, e);
            }),
            (n += t ? "</div>" : ""),
            n
          );
        }
      }
      getOption(e, t) {
        const s =
            e.selected && t.multiple
              ? ` ${this.selectClasses.classSelectOptionSelected}`
              : "",
          i =
            e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
          n = e.dataset.class ? ` ${e.dataset.class}` : "",
          r = !!e.dataset.href && e.dataset.href,
          o = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
        let l = "";
        return (
          (l += r
            ? `<a ${o} ${i} href="${r}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
            : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
          (l += this.getSelectElementContent(e)),
          (l += r ? "</a>" : "</button>"),
          l
        );
      }
      setOptions(e, t) {
        this.getSelectElement(
          e,
          this.selectClasses.classSelectOptions
        ).selectElement.innerHTML = this.getOptions(t);
      }
      optionAction(e, t, s) {
        if (t.multiple) {
          s.classList.toggle(this.selectClasses.classSelectOptionSelected);
          this.getSelectedOptionsData(t).elements.forEach((e) => {
            e.removeAttribute("selected");
          });
          e.querySelectorAll(
            this.getSelectClass(this.selectClasses.classSelectOptionSelected)
          ).forEach((e) => {
            t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
              "selected",
              "selected"
            );
          });
        } else
          t.hasAttribute("data-show-selected") ||
            (e.querySelector(
              `${this.getSelectClass(
                this.selectClasses.classSelectOption
              )}[hidden]`
            ) &&
              (e.querySelector(
                `${this.getSelectClass(
                  this.selectClasses.classSelectOption
                )}[hidden]`
              ).hidden = !1),
            (s.hidden = !0)),
            (t.value = s.hasAttribute("data-value")
              ? s.dataset.value
              : s.textContent),
            this.selectAction(e);
        this.setSelectTitleValue(e, t), this.setSelectChange(t);
      }
      selectChange(e) {
        const t = e.target;
        this.selectBuild(t), this.setSelectChange(t);
      }
      setSelectChange(e) {
        if (
          (e.hasAttribute("data-validate") && f.validateInput(e),
          e.hasAttribute("data-submit") && e.value)
        ) {
          let t = document.createElement("button");
          (t.type = "submit"),
            e.closest("form").append(t),
            t.click(),
            t.remove();
        }
        const t = e.parentElement;
        this.selectCallback(t, e);
      }
      selectDisabled(e, t) {
        t.disabled
          ? (e.classList.add(this.selectClasses.classSelectDisabled),
            (this.getSelectElement(
              e,
              this.selectClasses.classSelectTitle
            ).selectElement.disabled = !0))
          : (e.classList.remove(this.selectClasses.classSelectDisabled),
            (this.getSelectElement(
              e,
              this.selectClasses.classSelectTitle
            ).selectElement.disabled = !1));
      }
      searchActions(e) {
        this.getSelectElement(e).originalSelect;
        const t = this.getSelectElement(
            e,
            this.selectClasses.classSelectInput
          ).selectElement,
          s = this.getSelectElement(
            e,
            this.selectClasses.classSelectOptions
          ).selectElement,
          i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
          n = this;
        t.addEventListener("input", function () {
          i.forEach((e) => {
            e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
              ? (e.hidden = !1)
              : (e.hidden = !0);
          }),
            !0 === s.hidden && n.selectAction(e);
        });
      }
      selectCallback(e, t) {
        document.dispatchEvent(
          new CustomEvent("selectCallback", { detail: { select: t } })
        );
      }
      setLogging(e) {
        this.config.logging && u(`[select]: ${e}`);
      }
    }
    const m = { inputMaskModule: null, selectModule: null };
    let f = {
      getErrors(e) {
        let t = 0,
          s = e.querySelectorAll("*[data-required]");
        return (
          s.length &&
            s.forEach((e) => {
              (null === e.offsetParent && "SELECT" !== e.tagName) ||
                e.disabled ||
                (t += this.validateInput(e));
            }),
          t
        );
      },
      validateInput(e) {
        let t = 0;
        return (
          "email" === e.dataset.required
            ? ((e.value = e.value.replace(" ", "")),
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
            : ("checkbox" !== e.type || e.checked) && e.value
            ? this.removeError(e)
            : (this.addError(e), t++),
          t
        );
      },
      addError(e) {
        e.classList.add("_form-error"),
          e.parentElement.classList.add("_form-error");
        let t = e.parentElement.querySelector(".form__error");
        t && e.parentElement.removeChild(t),
          e.dataset.error &&
            e.parentElement.insertAdjacentHTML(
              "beforeend",
              `<div class="form__error">${e.dataset.error}</div>`
            );
      },
      removeError(e) {
        e.classList.remove("_form-error"),
          e.parentElement.classList.remove("_form-error"),
          e.parentElement.querySelector(".form__error") &&
            e.parentElement.removeChild(
              e.parentElement.querySelector(".form__error")
            );
      },
      formClean(e) {
        e.reset(),
          setTimeout(() => {
            let t = e.querySelectorAll("input,textarea");
            for (let e = 0; e < t.length; e++) {
              const s = t[e];
              s.parentElement.classList.remove("_form-focus"),
                s.classList.remove("_form-focus"),
                f.removeError(s),
                (s.value = s.dataset.placeholder);
            }
            let s = e.querySelectorAll(".checkbox__input");
            if (s.length > 0)
              for (let e = 0; e < s.length; e++) {
                s[e].checked = !1;
              }
            if (m.selectModule) {
              let t = e.querySelectorAll(".select");
              if (t.length)
                for (let e = 0; e < t.length; e++) {
                  const s = t[e].querySelector("select");
                  m.selectModule.selectBuild(s);
                }
            }
          }, 0);
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    function v(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        "constructor" in e &&
        e.constructor === Object
      );
    }
    function y(e = {}, t = {}) {
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : v(t[s]) && v(e[s]) && Object.keys(t[s]).length > 0 && y(e[s], t[s]);
      });
    }
    const b = {
      body: {},
      addEventListener() {},
      removeEventListener() {},
      activeElement: { blur() {}, nodeName: "" },
      querySelector: () => null,
      querySelectorAll: () => [],
      getElementById: () => null,
      createEvent: () => ({ initEvent() {} }),
      createElement: () => ({
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {},
        getElementsByTagName: () => [],
      }),
      createElementNS: () => ({}),
      importNode: () => null,
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
    };
    function S() {
      const e = "undefined" != typeof document ? document : {};
      return y(e, b), e;
    }
    const w = {
      document: b,
      navigator: { userAgent: "" },
      location: {
        hash: "",
        host: "",
        hostname: "",
        href: "",
        origin: "",
        pathname: "",
        protocol: "",
        search: "",
      },
      history: { replaceState() {}, pushState() {}, go() {}, back() {} },
      CustomEvent: function () {
        return this;
      },
      addEventListener() {},
      removeEventListener() {},
      getComputedStyle: () => ({ getPropertyValue: () => "" }),
      Image() {},
      Date() {},
      screen: {},
      setTimeout() {},
      clearTimeout() {},
      matchMedia: () => ({}),
      requestAnimationFrame: (e) =>
        "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
      cancelAnimationFrame(e) {
        "undefined" != typeof setTimeout && clearTimeout(e);
      },
    };
    function C() {
      const e = "undefined" != typeof window ? window : {};
      return y(e, w), e;
    }
    function E(e, t = 0) {
      return setTimeout(e, t);
    }
    function x() {
      return Date.now();
    }
    function T(e, t = "x") {
      const s = C();
      let i, n, r;
      const o = (function (e) {
        const t = C();
        let s;
        return (
          t.getComputedStyle && (s = t.getComputedStyle(e, null)),
          !s && e.currentStyle && (s = e.currentStyle),
          s || (s = e.style),
          s
        );
      })(e);
      return (
        s.WebKitCSSMatrix
          ? ((n = o.transform || o.webkitTransform),
            n.split(",").length > 6 &&
              (n = n
                .split(", ")
                .map((e) => e.replace(",", "."))
                .join(", ")),
            (r = new s.WebKitCSSMatrix("none" === n ? "" : n)))
          : ((r =
              o.MozTransform ||
              o.OTransform ||
              o.MsTransform ||
              o.msTransform ||
              o.transform ||
              o
                .getPropertyValue("transform")
                .replace("translate(", "matrix(1, 0, 0, 1,")),
            (i = r.toString().split(","))),
        "x" === t &&
          (n = s.WebKitCSSMatrix
            ? r.m41
            : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
        "y" === t &&
          (n = s.WebKitCSSMatrix
            ? r.m42
            : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
        n || 0
      );
    }
    function L(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function I(...e) {
      const t = Object(e[0]),
        s = ["__proto__", "constructor", "prototype"];
      for (let n = 1; n < e.length; n += 1) {
        const r = e[n];
        if (
          null != r &&
          ((i = r),
          !("undefined" != typeof window && void 0 !== window.HTMLElement
            ? i instanceof HTMLElement
            : i && (1 === i.nodeType || 11 === i.nodeType)))
        ) {
          const e = Object.keys(Object(r)).filter((e) => s.indexOf(e) < 0);
          for (let s = 0, i = e.length; s < i; s += 1) {
            const i = e[s],
              n = Object.getOwnPropertyDescriptor(r, i);
            void 0 !== n &&
              n.enumerable &&
              (L(t[i]) && L(r[i])
                ? r[i].__swiper__
                  ? (t[i] = r[i])
                  : I(t[i], r[i])
                : !L(t[i]) && L(r[i])
                ? ((t[i] = {}), r[i].__swiper__ ? (t[i] = r[i]) : I(t[i], r[i]))
                : (t[i] = r[i]));
          }
        }
      }
      var i;
      return t;
    }
    function A(e, t, s) {
      e.style.setProperty(t, s);
    }
    function O({ swiper: e, targetPosition: t, side: s }) {
      const i = C(),
        n = -e.translate;
      let r,
        o = null;
      const l = e.params.speed;
      (e.wrapperEl.style.scrollSnapType = "none"),
        i.cancelAnimationFrame(e.cssModeFrameID);
      const a = t > n ? "next" : "prev",
        c = (e, t) => ("next" === a && e >= t) || ("prev" === a && e <= t),
        d = () => {
          (r = new Date().getTime()), null === o && (o = r);
          const a = Math.max(Math.min((r - o) / l, 1), 0),
            u = 0.5 - Math.cos(a * Math.PI) / 2;
          let p = n + u * (t - n);
          if ((c(p, t) && (p = t), e.wrapperEl.scrollTo({ [s]: p }), c(p, t)))
            return (
              (e.wrapperEl.style.overflow = "hidden"),
              (e.wrapperEl.style.scrollSnapType = ""),
              setTimeout(() => {
                (e.wrapperEl.style.overflow = ""),
                  e.wrapperEl.scrollTo({ [s]: p });
              }),
              void i.cancelAnimationFrame(e.cssModeFrameID)
            );
          e.cssModeFrameID = i.requestAnimationFrame(d);
        };
      d();
    }
    function _(e) {
      return (
        e.querySelector(".swiper-slide-transform") ||
        (e.shadowEl && e.shadowEl.querySelector(".swiper-slide-transform")) ||
        e
      );
    }
    function P(e, t = "") {
      return [...e.children].filter((e) => e.matches(t));
    }
    function k(e, t = []) {
      const s = document.createElement(e);
      return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
    }
    function M(e, t) {
      return C().getComputedStyle(e, null).getPropertyValue(t);
    }
    function z(e) {
      let t,
        s = e;
      if (s) {
        for (t = 0; null !== (s = s.previousSibling); )
          1 === s.nodeType && (t += 1);
        return t;
      }
    }
    function D(e, t) {
      const s = [];
      let i = e.parentElement;
      for (; i; )
        t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
      return s;
    }
    function $(e, t, s) {
      const i = C();
      return s
        ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue("width" === t ? "margin-right" : "margin-top")
            ) +
            parseFloat(
              i
                .getComputedStyle(e, null)
                .getPropertyValue(
                  "width" === t ? "margin-left" : "margin-bottom"
                )
            )
        : e.offsetWidth;
    }
    let B, G, F;
    function H() {
      return (
        B ||
          (B = (function () {
            const e = C(),
              t = S();
            return {
              smoothScroll:
                t.documentElement &&
                "scrollBehavior" in t.documentElement.style,
              touch: !!(
                "ontouchstart" in e ||
                (e.DocumentTouch && t instanceof e.DocumentTouch)
              ),
            };
          })()),
        B
      );
    }
    function V(e = {}) {
      return (
        G ||
          (G = (function ({ userAgent: e } = {}) {
            const t = H(),
              s = C(),
              i = s.navigator.platform,
              n = e || s.navigator.userAgent,
              r = { ios: !1, android: !1 },
              o = s.screen.width,
              l = s.screen.height,
              a = n.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = n.match(/(iPad).*OS\s([\d_]+)/);
            const d = n.match(/(iPod)(.*OS\s([\d_]+))?/),
              u = !c && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
              p = "Win32" === i;
            let h = "MacIntel" === i;
            return (
              !c &&
                h &&
                t.touch &&
                [
                  "1024x1366",
                  "1366x1024",
                  "834x1194",
                  "1194x834",
                  "834x1112",
                  "1112x834",
                  "768x1024",
                  "1024x768",
                  "820x1180",
                  "1180x820",
                  "810x1080",
                  "1080x810",
                ].indexOf(`${o}x${l}`) >= 0 &&
                ((c = n.match(/(Version)\/([\d.]+)/)),
                c || (c = [0, 1, "13_0_0"]),
                (h = !1)),
              a && !p && ((r.os = "android"), (r.android = !0)),
              (c || u || d) && ((r.os = "ios"), (r.ios = !0)),
              r
            );
          })(e)),
        G
      );
    }
    function q() {
      return (
        F ||
          (F = (function () {
            const e = C();
            let t = !1;
            function s() {
              const t = e.navigator.userAgent.toLowerCase();
              return (
                t.indexOf("safari") >= 0 &&
                t.indexOf("chrome") < 0 &&
                t.indexOf("android") < 0
              );
            }
            if (s()) {
              const s = String(e.navigator.userAgent);
              if (s.includes("Version/")) {
                const [e, i] = s
                  .split("Version/")[1]
                  .split(" ")[0]
                  .split(".")
                  .map((e) => Number(e));
                t = e < 16 || (16 === e && i < 2);
              }
            }
            return {
              isSafari: t || s(),
              needPerspectiveFix: t,
              isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                e.navigator.userAgent
              ),
            };
          })()),
        F
      );
    }
    const N = {
      on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const n = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][n](t);
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        function n(...s) {
          i.off(e, n),
            n.__emitterProxy && delete n.__emitterProxy,
            t.apply(i, s);
        }
        return (n.__emitterProxy = t), i.on(e, n, s);
      },
      onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed) return s;
        if ("function" != typeof e) return s;
        const i = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed
          ? s
          : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, n) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(n, 1);
                  });
            }),
            s)
          : s;
      },
      emit(...e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsListeners) return t;
        let s, i, n;
        "string" == typeof e[0] || Array.isArray(e[0])
          ? ((s = e[0]), (i = e.slice(1, e.length)), (n = t))
          : ((s = e[0].events), (i = e[0].data), (n = e[0].context || t)),
          i.unshift(n);
        return (
          (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
            t.eventsAnyListeners &&
              t.eventsAnyListeners.length &&
              t.eventsAnyListeners.forEach((t) => {
                t.apply(n, [e, ...i]);
              }),
              t.eventsListeners &&
                t.eventsListeners[e] &&
                t.eventsListeners[e].forEach((e) => {
                  e.apply(n, i);
                });
          }),
          t
        );
      },
    };
    const R = {
      updateSize: function () {
        const e = this;
        let t, s;
        const i = e.el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i.clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i.clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(M(i, "padding-left") || 0, 10) -
              parseInt(M(i, "padding-right") || 0, 10)),
            (s =
              s -
              parseInt(M(i, "padding-top") || 0, 10) -
              parseInt(M(i, "padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function s(e, s) {
          return parseFloat(e.getPropertyValue(t(s)) || 0);
        }
        const i = e.params,
          {
            wrapperEl: n,
            slidesEl: r,
            size: o,
            rtlTranslate: l,
            wrongRTL: a,
          } = e,
          c = e.virtual && i.virtual.enabled,
          d = c ? e.virtual.slides.length : e.slides.length,
          u = P(r, `.${e.params.slideClass}, swiper-slide`),
          p = c ? e.virtual.slides.length : u.length;
        let h = [];
        const g = [],
          m = [];
        let f = i.slidesOffsetBefore;
        "function" == typeof f && (f = i.slidesOffsetBefore.call(e));
        let v = i.slidesOffsetAfter;
        "function" == typeof v && (v = i.slidesOffsetAfter.call(e));
        const y = e.snapGrid.length,
          b = e.slidesGrid.length;
        let S = i.spaceBetween,
          w = -f,
          C = 0,
          E = 0;
        if (void 0 === o) return;
        "string" == typeof S &&
          S.indexOf("%") >= 0 &&
          (S = (parseFloat(S.replace("%", "")) / 100) * o),
          (e.virtualSize = -S),
          u.forEach((e) => {
            l ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = "");
          }),
          i.centeredSlides &&
            i.cssMode &&
            (A(n, "--swiper-centered-offset-before", ""),
            A(n, "--swiper-centered-offset-after", ""));
        const x = i.grid && i.grid.rows > 1 && e.grid;
        let T;
        x && e.grid.initSlides(p);
        const L =
          "auto" === i.slidesPerView &&
          i.breakpoints &&
          Object.keys(i.breakpoints).filter(
            (e) => void 0 !== i.breakpoints[e].slidesPerView
          ).length > 0;
        for (let n = 0; n < p; n += 1) {
          let r;
          if (
            ((T = 0),
            u[n] && (r = u[n]),
            x && e.grid.updateSlide(n, r, p, t),
            !u[n] || "none" !== M(r, "display"))
          ) {
            if ("auto" === i.slidesPerView) {
              L && (u[n].style[t("width")] = "");
              const o = getComputedStyle(r),
                l = r.style.transform,
                a = r.style.webkitTransform;
              if (
                (l && (r.style.transform = "none"),
                a && (r.style.webkitTransform = "none"),
                i.roundLengths)
              )
                T = e.isHorizontal() ? $(r, "width", !0) : $(r, "height", !0);
              else {
                const e = s(o, "width"),
                  t = s(o, "padding-left"),
                  i = s(o, "padding-right"),
                  n = s(o, "margin-left"),
                  l = s(o, "margin-right"),
                  a = o.getPropertyValue("box-sizing");
                if (a && "border-box" === a) T = e + n + l;
                else {
                  const { clientWidth: s, offsetWidth: o } = r;
                  T = e + t + i + n + l + (o - s);
                }
              }
              l && (r.style.transform = l),
                a && (r.style.webkitTransform = a),
                i.roundLengths && (T = Math.floor(T));
            } else
              (T = (o - (i.slidesPerView - 1) * S) / i.slidesPerView),
                i.roundLengths && (T = Math.floor(T)),
                u[n] && (u[n].style[t("width")] = `${T}px`);
            u[n] && (u[n].swiperSlideSize = T),
              m.push(T),
              i.centeredSlides
                ? ((w = w + T / 2 + C / 2 + S),
                  0 === C && 0 !== n && (w = w - o / 2 - S),
                  0 === n && (w = w - o / 2 - S),
                  Math.abs(w) < 0.001 && (w = 0),
                  i.roundLengths && (w = Math.floor(w)),
                  E % i.slidesPerGroup == 0 && h.push(w),
                  g.push(w))
                : (i.roundLengths && (w = Math.floor(w)),
                  (E - Math.min(e.params.slidesPerGroupSkip, E)) %
                    e.params.slidesPerGroup ==
                    0 && h.push(w),
                  g.push(w),
                  (w = w + T + S)),
              (e.virtualSize += T + S),
              (C = T),
              (E += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, o) + v),
          l &&
            a &&
            ("slide" === i.effect || "coverflow" === i.effect) &&
            (n.style.width = `${e.virtualSize + i.spaceBetween}px`),
          i.setWrapperSize &&
            (n.style[t("width")] = `${e.virtualSize + i.spaceBetween}px`),
          x && e.grid.updateWrapperSize(T, h, t),
          !i.centeredSlides)
        ) {
          const t = [];
          for (let s = 0; s < h.length; s += 1) {
            let n = h[s];
            i.roundLengths && (n = Math.floor(n)),
              h[s] <= e.virtualSize - o && t.push(n);
          }
          (h = t),
            Math.floor(e.virtualSize - o) - Math.floor(h[h.length - 1]) > 1 &&
              h.push(e.virtualSize - o);
        }
        if (c && i.loop) {
          const t = m[0] + S;
          if (i.slidesPerGroup > 1) {
            const s = Math.ceil(
                (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                  i.slidesPerGroup
              ),
              n = t * i.slidesPerGroup;
            for (let e = 0; e < s; e += 1) h.push(h[h.length - 1] + n);
          }
          for (
            let s = 0;
            s < e.virtual.slidesBefore + e.virtual.slidesAfter;
            s += 1
          )
            1 === i.slidesPerGroup && h.push(h[h.length - 1] + t),
              g.push(g[g.length - 1] + t),
              (e.virtualSize += t);
        }
        if ((0 === h.length && (h = [0]), 0 !== i.spaceBetween)) {
          const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
          u.filter(
            (e, t) => !(i.cssMode && !i.loop) || t !== u.length - 1
          ).forEach((e) => {
            e.style[s] = `${S}px`;
          });
        }
        if (i.centeredSlides && i.centeredSlidesBounds) {
          let e = 0;
          m.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
            (e -= i.spaceBetween);
          const t = e - o;
          h = h.map((e) => (e < 0 ? -f : e > t ? t + v : e));
        }
        if (i.centerInsufficientSlides) {
          let e = 0;
          if (
            (m.forEach((t) => {
              e += t + (i.spaceBetween ? i.spaceBetween : 0);
            }),
            (e -= i.spaceBetween),
            e < o)
          ) {
            const t = (o - e) / 2;
            h.forEach((e, s) => {
              h[s] = e - t;
            }),
              g.forEach((e, s) => {
                g[s] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: u,
            snapGrid: h,
            slidesGrid: g,
            slidesSizesGrid: m,
          }),
          i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
        ) {
          A(n, "--swiper-centered-offset-before", -h[0] + "px"),
            A(
              n,
              "--swiper-centered-offset-after",
              e.size / 2 - m[m.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (p !== d && e.emit("slidesLengthChange"),
          h.length !== y &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          g.length !== b && e.emit("slidesGridLengthChange"),
          i.watchSlidesProgress && e.updateSlidesOffset(),
          !(c || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
        ) {
          const t = `${i.containerModifierClass}backface-hidden`,
            s = e.el.classList.contains(t);
          p <= i.maxBackfaceHiddenSlides
            ? s || e.el.classList.add(t)
            : s && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled;
        let n,
          r = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const o = (e) => (i ? t.getSlideIndexByData(e) : t.slides[e]);
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || []).forEach((e) => {
              s.push(e);
            });
          else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !i) break;
              s.push(o(e));
            }
        else s.push(o(t.activeIndex));
        for (n = 0; n < s.length; n += 1)
          if (void 0 !== s[n]) {
            const e = s[n].offsetHeight;
            r = e > r ? e : r;
          }
        (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides,
          s = e.isElement
            ? e.isHorizontal()
              ? e.wrapperEl.offsetLeft
              : e.wrapperEl.offsetTop
            : 0;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset =
            (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s;
      },
      updateSlidesProgress: function (e = (this && this.translate) || 0) {
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: n, snapGrid: r } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let o = -e;
        n && (o = e),
          i.forEach((e) => {
            e.classList.remove(s.slideVisibleClass);
          }),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let e = 0; e < i.length; e += 1) {
          const l = i[e];
          let a = l.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (a -= i[0].swiperSlideOffset);
          const c =
              (o + (s.centeredSlides ? t.minTranslate() : 0) - a) /
              (l.swiperSlideSize + s.spaceBetween),
            d =
              (o - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - a) /
              (l.swiperSlideSize + s.spaceBetween),
            u = -(o - a),
            p = u + t.slidesSizesGrid[e];
          ((u >= 0 && u < t.size - 1) ||
            (p > 1 && p <= t.size) ||
            (u <= 0 && p >= t.size)) &&
            (t.visibleSlides.push(l),
            t.visibleSlidesIndexes.push(e),
            i[e].classList.add(s.slideVisibleClass)),
            (l.progress = n ? -c : c),
            (l.originalProgress = n ? -d : d);
        }
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: n, isBeginning: r, isEnd: o, progressLoop: l } = t;
        const a = r,
          c = o;
        if (0 === i) (n = 0), (r = !0), (o = !0);
        else {
          n = (e - t.minTranslate()) / i;
          const s = Math.abs(e - t.minTranslate()) < 1,
            l = Math.abs(e - t.maxTranslate()) < 1;
          (r = s || n <= 0), (o = l || n >= 1), s && (n = 0), l && (n = 1);
        }
        if (s.loop) {
          const s = t.getSlideIndexByData(0),
            i = t.getSlideIndexByData(t.slides.length - 1),
            n = t.slidesGrid[s],
            r = t.slidesGrid[i],
            o = t.slidesGrid[t.slidesGrid.length - 1],
            a = Math.abs(e);
          (l = a >= n ? (a - n) / o : (a + o - r) / o), l > 1 && (l -= 1);
        }
        Object.assign(t, {
          progress: n,
          progressLoop: l,
          isBeginning: r,
          isEnd: o,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          r && !a && t.emit("reachBeginning toEdge"),
          o && !c && t.emit("reachEnd toEdge"),
          ((a && !r) || (c && !o)) && t.emit("fromEdge"),
          t.emit("progress", n);
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i, activeIndex: n } = e,
          r = e.virtual && s.virtual.enabled,
          o = (e) => P(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let l;
        if (
          (t.forEach((e) => {
            e.classList.remove(
              s.slideActiveClass,
              s.slideNextClass,
              s.slidePrevClass
            );
          }),
          r)
        )
          if (s.loop) {
            let t = n - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t),
              t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
              (l = o(`[data-swiper-slide-index="${t}"]`));
          } else l = o(`[data-swiper-slide-index="${n}"]`);
        else l = t[n];
        if (l) {
          l.classList.add(s.slideActiveClass);
          let e = (function (e, t) {
            const s = [];
            for (; e.nextElementSibling; ) {
              const i = e.nextElementSibling;
              t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
            }
            return s;
          })(l, `.${s.slideClass}, swiper-slide`)[0];
          s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
          let i = (function (e, t) {
            const s = [];
            for (; e.previousElementSibling; ) {
              const i = e.previousElementSibling;
              t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
            }
            return s;
          })(l, `.${s.slideClass}, swiper-slide`)[0];
          s.loop && 0 === !i && (i = t[t.length - 1]),
            i && i.classList.add(s.slidePrevClass);
        }
        e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            snapGrid: i,
            params: n,
            activeIndex: r,
            realIndex: o,
            snapIndex: l,
          } = t;
        let a,
          c = e;
        const d = (e) => {
          let s = e - t.virtual.slidesBefore;
          return (
            s < 0 && (s = t.virtual.slides.length + s),
            s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
            s
          );
        };
        if (
          (void 0 === c &&
            (c = (function (e) {
              const { slidesGrid: t, params: s } = e,
                i = e.rtlTranslate ? e.translate : -e.translate;
              let n;
              for (let e = 0; e < t.length; e += 1)
                void 0 !== t[e + 1]
                  ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                    ? (n = e)
                    : i >= t[e] && i < t[e + 1] && (n = e + 1)
                  : i >= t[e] && (n = e);
              return (
                s.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0), n
              );
            })(t)),
          i.indexOf(s) >= 0)
        )
          a = i.indexOf(s);
        else {
          const e = Math.min(n.slidesPerGroupSkip, c);
          a = e + Math.floor((c - e) / n.slidesPerGroup);
        }
        if ((a >= i.length && (a = i.length - 1), c === r))
          return (
            a !== l && ((t.snapIndex = a), t.emit("snapIndexChange")),
            void (
              t.params.loop &&
              t.virtual &&
              t.params.virtual.enabled &&
              (t.realIndex = d(c))
            )
          );
        let u;
        (u =
          t.virtual && n.virtual.enabled && n.loop
            ? d(c)
            : t.slides[c]
            ? parseInt(
                t.slides[c].getAttribute("data-swiper-slide-index") || c,
                10
              )
            : c),
          Object.assign(t, {
            snapIndex: a,
            realIndex: u,
            previousIndex: r,
            activeIndex: c,
          }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          o !== u && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          s = t.params,
          i = e.closest(`.${s.slideClass}, swiper-slide`);
        let n,
          r = !1;
        if (i)
          for (let e = 0; e < t.slides.length; e += 1)
            if (t.slides[e] === i) {
              (r = !0), (n = e);
              break;
            }
        if (!i || !r)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = i),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                i.getAttribute("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = n),
          s.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    };
    const j = {
      getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
        const { params: t, rtlTranslate: s, translate: i, wrapperEl: n } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let r = T(n, e);
        return s && (r = -r), r || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: n, wrapperEl: r, progress: o } = s;
        let l,
          a = 0,
          c = 0;
        s.isHorizontal() ? (a = i ? -e : e) : (c = e),
          n.roundLengths && ((a = Math.floor(a)), (c = Math.floor(c))),
          n.cssMode
            ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -a : -c)
            : n.virtualTranslate ||
              (r.style.transform = `translate3d(${a}px, ${c}px, 0px)`),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? a : c);
        const d = s.maxTranslate() - s.minTranslate();
        (l = 0 === d ? 0 : (e - s.minTranslate()) / d),
          l !== o && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, n) {
        const r = this,
          { params: o, wrapperEl: l } = r;
        if (r.animating && o.preventInteractionOnTransition) return !1;
        const a = r.minTranslate(),
          c = r.maxTranslate();
        let d;
        if (
          ((d = i && e > a ? a : i && e < c ? c : e),
          r.updateProgress(d),
          o.cssMode)
        ) {
          const e = r.isHorizontal();
          if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -d;
          else {
            if (!r.support.smoothScroll)
              return (
                O({ swiper: r, targetPosition: -d, side: e ? "left" : "top" }),
                !0
              );
            l.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (r.setTransition(0),
              r.setTranslate(d),
              s &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionEnd")))
            : (r.setTransition(t),
              r.setTranslate(d),
              s &&
                (r.emit("beforeTransitionStart", t, n),
                r.emit("transitionStart")),
              r.animating ||
                ((r.animating = !0),
                r.onTranslateToWrapperTransitionEnd ||
                  (r.onTranslateToWrapperTransitionEnd = function (e) {
                    r &&
                      !r.destroyed &&
                      e.target === this &&
                      (r.wrapperEl.removeEventListener(
                        "transitionend",
                        r.onTranslateToWrapperTransitionEnd
                      ),
                      (r.onTranslateToWrapperTransitionEnd = null),
                      delete r.onTranslateToWrapperTransitionEnd,
                      s && r.emit("transitionEnd"));
                  }),
                r.wrapperEl.addEventListener(
                  "transitionend",
                  r.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    };
    function W({ swiper: e, runCallbacks: t, direction: s, step: i }) {
      const { activeIndex: n, previousIndex: r } = e;
      let o = s;
      if (
        (o || (o = n > r ? "next" : n < r ? "prev" : "reset"),
        e.emit(`transition${i}`),
        t && n !== r)
      ) {
        if ("reset" === o) return void e.emit(`slideResetTransition${i}`);
        e.emit(`slideChangeTransition${i}`),
          "next" === o
            ? e.emit(`slideNextTransition${i}`)
            : e.emit(`slidePrevTransition${i}`);
      }
    }
    const Y = {
      slideTo: function (e = 0, t = this.params.speed, s = !0, i, n) {
        "string" == typeof e && (e = parseInt(e, 10));
        const r = this;
        let o = e;
        o < 0 && (o = 0);
        const {
          params: l,
          snapGrid: a,
          slidesGrid: c,
          previousIndex: d,
          activeIndex: u,
          rtlTranslate: p,
          wrapperEl: h,
          enabled: g,
        } = r;
        if (
          (r.animating && l.preventInteractionOnTransition) ||
          (!g && !i && !n)
        )
          return !1;
        const m = Math.min(r.params.slidesPerGroupSkip, o);
        let f = m + Math.floor((o - m) / r.params.slidesPerGroup);
        f >= a.length && (f = a.length - 1);
        const v = -a[f];
        if (l.normalizeSlideIndex)
          for (let e = 0; e < c.length; e += 1) {
            const t = -Math.floor(100 * v),
              s = Math.floor(100 * c[e]),
              i = Math.floor(100 * c[e + 1]);
            void 0 !== c[e + 1]
              ? t >= s && t < i - (i - s) / 2
                ? (o = e)
                : t >= s && t < i && (o = e + 1)
              : t >= s && (o = e);
          }
        if (r.initialized && o !== u) {
          if (!r.allowSlideNext && v < r.translate && v < r.minTranslate())
            return !1;
          if (
            !r.allowSlidePrev &&
            v > r.translate &&
            v > r.maxTranslate() &&
            (u || 0) !== o
          )
            return !1;
        }
        let y;
        if (
          (o !== (d || 0) && s && r.emit("beforeSlideChangeStart"),
          r.updateProgress(v),
          (y = o > u ? "next" : o < u ? "prev" : "reset"),
          (p && -v === r.translate) || (!p && v === r.translate))
        )
          return (
            r.updateActiveIndex(o),
            l.autoHeight && r.updateAutoHeight(),
            r.updateSlidesClasses(),
            "slide" !== l.effect && r.setTranslate(v),
            "reset" !== y && (r.transitionStart(s, y), r.transitionEnd(s, y)),
            !1
          );
        if (l.cssMode) {
          const e = r.isHorizontal(),
            s = p ? v : -v;
          if (0 === t) {
            const t = r.virtual && r.params.virtual.enabled;
            t &&
              ((r.wrapperEl.style.scrollSnapType = "none"),
              (r._immediateVirtual = !0)),
              t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
                ? ((r._cssModeVirtualInitialSet = !0),
                  requestAnimationFrame(() => {
                    h[e ? "scrollLeft" : "scrollTop"] = s;
                  }))
                : (h[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (r.wrapperEl.style.scrollSnapType = ""),
                    (r._immediateVirtual = !1);
                });
          } else {
            if (!r.support.smoothScroll)
              return (
                O({ swiper: r, targetPosition: s, side: e ? "left" : "top" }),
                !0
              );
            h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          r.setTransition(t),
          r.setTranslate(v),
          r.updateActiveIndex(o),
          r.updateSlidesClasses(),
          r.emit("beforeTransitionStart", t, i),
          r.transitionStart(s, y),
          0 === t
            ? r.transitionEnd(s, y)
            : r.animating ||
              ((r.animating = !0),
              r.onSlideToWrapperTransitionEnd ||
                (r.onSlideToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onSlideToWrapperTransitionEnd
                    ),
                    (r.onSlideToWrapperTransitionEnd = null),
                    delete r.onSlideToWrapperTransitionEnd,
                    r.transitionEnd(s, y));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e = 0, t = this.params.speed, s = !0, i) {
        if ("string" == typeof e) {
          e = parseInt(e, 10);
        }
        const n = this;
        let r = e;
        return (
          n.params.loop &&
            (n.virtual && n.params.virtual.enabled
              ? (r += n.virtual.slidesBefore)
              : (r = n.getSlideIndexByData(r))),
          n.slideTo(r, t, s, i)
        );
      },
      slideNext: function (e = this.params.speed, t = !0, s) {
        const i = this,
          { enabled: n, params: r, animating: o } = i;
        if (!n) return i;
        let l = r.slidesPerGroup;
        "auto" === r.slidesPerView &&
          1 === r.slidesPerGroup &&
          r.slidesPerGroupAuto &&
          (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const a = i.activeIndex < r.slidesPerGroupSkip ? 1 : l,
          c = i.virtual && r.virtual.enabled;
        if (r.loop) {
          if (o && !c && r.loopPreventsSliding) return !1;
          i.loopFix({ direction: "next" }),
            (i._clientLeft = i.wrapperEl.clientLeft);
        }
        return r.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + a, e, t, s);
      },
      slidePrev: function (e = this.params.speed, t = !0, s) {
        const i = this,
          {
            params: n,
            snapGrid: r,
            slidesGrid: o,
            rtlTranslate: l,
            enabled: a,
            animating: c,
          } = i;
        if (!a) return i;
        const d = i.virtual && n.virtual.enabled;
        if (n.loop) {
          if (c && !d && n.loopPreventsSliding) return !1;
          i.loopFix({ direction: "prev" }),
            (i._clientLeft = i.wrapperEl.clientLeft);
        }
        function u(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = u(l ? i.translate : -i.translate),
          h = r.map((e) => u(e));
        let g = r[h.indexOf(p) - 1];
        if (void 0 === g && n.cssMode) {
          let e;
          r.forEach((t, s) => {
            p >= t && (e = s);
          }),
            void 0 !== e && (g = r[e > 0 ? e - 1 : e]);
        }
        let m = 0;
        if (
          (void 0 !== g &&
            ((m = o.indexOf(g)),
            m < 0 && (m = i.activeIndex - 1),
            "auto" === n.slidesPerView &&
              1 === n.slidesPerGroup &&
              n.slidesPerGroupAuto &&
              ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
              (m = Math.max(m, 0)))),
          n.rewind && i.isBeginning)
        ) {
          const n =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(n, e, t, s);
        }
        return i.slideTo(m, e, t, s);
      },
      slideReset: function (e = this.params.speed, t = !0, s) {
        return this.slideTo(this.activeIndex, e, t, s);
      },
      slideToClosest: function (e = this.params.speed, t = !0, s, i = 0.5) {
        const n = this;
        let r = n.activeIndex;
        const o = Math.min(n.params.slidesPerGroupSkip, r),
          l = o + Math.floor((r - o) / n.params.slidesPerGroup),
          a = n.rtlTranslate ? n.translate : -n.translate;
        if (a >= n.snapGrid[l]) {
          const e = n.snapGrid[l];
          a - e > (n.snapGrid[l + 1] - e) * i && (r += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[l - 1];
          a - e <= (n.snapGrid[l] - e) * i && (r -= n.params.slidesPerGroup);
        }
        return (
          (r = Math.max(r, 0)),
          (r = Math.min(r, n.slidesGrid.length - 1)),
          n.slideTo(r, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, slidesEl: s } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let n,
          r = e.clickedIndex;
        const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) return;
          (n = parseInt(
            e.clickedSlide.getAttribute("data-swiper-slide-index"),
            10
          )),
            t.centeredSlides
              ? r < e.loopedSlides - i / 2 ||
                r > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (r = e.getSlideIndex(
                    P(s, `${o}[data-swiper-slide-index="${n}"]`)[0]
                  )),
                  E(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r)
              : r > e.slides.length - i
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  P(s, `${o}[data-swiper-slide-index="${n}"]`)[0]
                )),
                E(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
        } else e.slideTo(r);
      },
    };
    const X = {
      loopCreate: function (e) {
        const t = this,
          { params: s, slidesEl: i } = t;
        if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
        P(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
          e.setAttribute("data-swiper-slide-index", t);
        }),
          t.loopFix({
            slideRealIndex: e,
            direction: s.centeredSlides ? void 0 : "next",
          });
      },
      loopFix: function ({
        slideRealIndex: e,
        slideTo: t = !0,
        direction: s,
        setTranslate: i,
        activeSlideIndex: n,
        byController: r,
        byMousewheel: o,
      } = {}) {
        const l = this;
        if (!l.params.loop) return;
        l.emit("beforeLoopFix");
        const {
          slides: a,
          allowSlidePrev: c,
          allowSlideNext: d,
          slidesEl: u,
          params: p,
        } = l;
        if (
          ((l.allowSlidePrev = !0),
          (l.allowSlideNext = !0),
          l.virtual && p.virtual.enabled)
        )
          return (
            t &&
              (p.centeredSlides || 0 !== l.snapIndex
                ? p.centeredSlides && l.snapIndex < p.slidesPerView
                  ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0)
                  : l.snapIndex === l.snapGrid.length - 1 &&
                    l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
                : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
            (l.allowSlidePrev = c),
            (l.allowSlideNext = d),
            void l.emit("loopFix")
          );
        const h =
          "auto" === p.slidesPerView
            ? l.slidesPerViewDynamic()
            : Math.ceil(parseFloat(p.slidesPerView, 10));
        let g = p.loopedSlides || h;
        g % p.slidesPerGroup != 0 &&
          (g += p.slidesPerGroup - (g % p.slidesPerGroup)),
          (l.loopedSlides = g);
        const m = [],
          f = [];
        let v = l.activeIndex;
        void 0 === n
          ? (n = l.getSlideIndex(
              l.slides.filter((e) =>
                e.classList.contains(p.slideActiveClass)
              )[0]
            ))
          : (v = n);
        const y = "next" === s || !s,
          b = "prev" === s || !s;
        let S = 0,
          w = 0;
        if (n < g) {
          S = Math.max(g - n, p.slidesPerGroup);
          for (let e = 0; e < g - n; e += 1) {
            const t = e - Math.floor(e / a.length) * a.length;
            m.push(a.length - t - 1);
          }
        } else if (n > l.slides.length - 2 * g) {
          w = Math.max(n - (l.slides.length - 2 * g), p.slidesPerGroup);
          for (let e = 0; e < w; e += 1) {
            const t = e - Math.floor(e / a.length) * a.length;
            f.push(t);
          }
        }
        if (
          (b &&
            m.forEach((e) => {
              u.prepend(l.slides[e]);
            }),
          y &&
            f.forEach((e) => {
              u.append(l.slides[e]);
            }),
          l.recalcSlides(),
          p.watchSlidesProgress && l.updateSlidesOffset(),
          t)
        )
          if (m.length > 0 && b)
            if (void 0 === e) {
              const e = l.slidesGrid[v],
                t = l.slidesGrid[v + S] - e;
              o
                ? l.setTranslate(l.translate - t)
                : (l.slideTo(v + S, 0, !1, !0),
                  i &&
                    (l.touches[l.isHorizontal() ? "startX" : "startY"] += t));
            } else i && l.slideToLoop(e, 0, !1, !0);
          else if (f.length > 0 && y)
            if (void 0 === e) {
              const e = l.slidesGrid[v],
                t = l.slidesGrid[v - w] - e;
              o
                ? l.setTranslate(l.translate - t)
                : (l.slideTo(v - w, 0, !1, !0),
                  i &&
                    (l.touches[l.isHorizontal() ? "startX" : "startY"] += t));
            } else l.slideToLoop(e, 0, !1, !0);
        if (
          ((l.allowSlidePrev = c),
          (l.allowSlideNext = d),
          l.controller && l.controller.control && !r)
        ) {
          const t = {
            slideRealIndex: e,
            slideTo: !1,
            direction: s,
            setTranslate: i,
            activeSlideIndex: n,
            byController: !0,
          };
          Array.isArray(l.controller.control)
            ? l.controller.control.forEach((e) => {
                !e.destroyed && e.params.loop && e.loopFix(t);
              })
            : l.controller.control instanceof l.constructor &&
              l.controller.control.params.loop &&
              l.controller.control.loopFix(t);
        }
        l.emit("loopFix");
      },
      loopDestroy: function () {
        const e = this,
          { params: t, slidesEl: s } = e;
        if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
        e.recalcSlides();
        const i = [];
        e.slides.forEach((e) => {
          const t =
            void 0 === e.swiperSlideIndex
              ? 1 * e.getAttribute("data-swiper-slide-index")
              : e.swiperSlideIndex;
          i[t] = e;
        }),
          e.slides.forEach((e) => {
            e.removeAttribute("data-swiper-slide-index");
          }),
          i.forEach((e) => {
            s.append(e);
          }),
          e.recalcSlides(),
          e.slideTo(e.realIndex, 0);
      },
    };
    function U(e) {
      const t = this,
        s = S(),
        i = C(),
        n = t.touchEventsData;
      n.evCache.push(e);
      const { params: r, touches: o, enabled: l } = t;
      if (!l) return;
      if (!r.simulateTouch && "mouse" === e.pointerType) return;
      if (t.animating && r.preventInteractionOnTransition) return;
      !t.animating && r.cssMode && r.loop && t.loopFix();
      let a = e;
      a.originalEvent && (a = a.originalEvent);
      let c = a.target;
      if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(c)) return;
      if ("which" in a && 3 === a.which) return;
      if ("button" in a && a.button > 0) return;
      if (n.isTouched && n.isMoved) return;
      const d = !!r.noSwipingClass && "" !== r.noSwipingClass,
        u = e.composedPath ? e.composedPath() : e.path;
      d && a.target && a.target.shadowRoot && u && (c = u[0]);
      const p = r.noSwipingSelector
          ? r.noSwipingSelector
          : `.${r.noSwipingClass}`,
        h = !(!a.target || !a.target.shadowRoot);
      if (
        r.noSwiping &&
        (h
          ? (function (e, t = this) {
              return (function t(s) {
                if (!s || s === S() || s === C()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t);
            })(p, c)
          : c.closest(p))
      )
        return void (t.allowClick = !0);
      if (r.swipeHandler && !c.closest(r.swipeHandler)) return;
      (o.currentX = a.pageX), (o.currentY = a.pageY);
      const g = o.currentX,
        m = o.currentY,
        f = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
        v = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
      if (f && (g <= v || g >= i.innerWidth - v)) {
        if ("prevent" !== f) return;
        e.preventDefault();
      }
      Object.assign(n, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
        (o.startX = g),
        (o.startY = m),
        (n.touchStartTime = x()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        r.threshold > 0 && (n.allowThresholdMove = !1);
      let y = !0;
      c.matches(n.focusableElements) &&
        ((y = !1), "SELECT" === c.nodeName && (n.isTouched = !1)),
        s.activeElement &&
          s.activeElement.matches(n.focusableElements) &&
          s.activeElement !== c &&
          s.activeElement.blur();
      const b = y && t.allowTouchMove && r.touchStartPreventDefault;
      (!r.touchStartForcePreventDefault && !b) ||
        c.isContentEditable ||
        a.preventDefault(),
        t.params.freeMode &&
          t.params.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !r.cssMode &&
          t.freeMode.onTouchStart(),
        t.emit("touchStart", a);
    }
    function K(e) {
      const t = S(),
        s = this,
        i = s.touchEventsData,
        { params: n, touches: r, rtlTranslate: o, enabled: l } = s;
      if (!l) return;
      if (!n.simulateTouch && "mouse" === e.pointerType) return;
      let a = e;
      if ((a.originalEvent && (a = a.originalEvent), !i.isTouched))
        return void (
          i.startMoving &&
          i.isScrolling &&
          s.emit("touchMoveOpposite", a)
        );
      const c = i.evCache.findIndex((e) => e.pointerId === a.pointerId);
      c >= 0 && (i.evCache[c] = a);
      const d = i.evCache.length > 1 ? i.evCache[0] : a,
        u = d.pageX,
        p = d.pageY;
      if (a.preventedByNestedSwiper) return (r.startX = u), void (r.startY = p);
      if (!s.allowTouchMove)
        return (
          a.target.matches(i.focusableElements) || (s.allowClick = !1),
          void (
            i.isTouched &&
            (Object.assign(r, {
              startX: u,
              startY: p,
              prevX: s.touches.currentX,
              prevY: s.touches.currentY,
              currentX: u,
              currentY: p,
            }),
            (i.touchStartTime = x()))
          )
        );
      if (n.touchReleaseOnEdges && !n.loop)
        if (s.isVertical()) {
          if (
            (p < r.startY && s.translate <= s.maxTranslate()) ||
            (p > r.startY && s.translate >= s.minTranslate())
          )
            return (i.isTouched = !1), void (i.isMoved = !1);
        } else if (
          (u < r.startX && s.translate <= s.maxTranslate()) ||
          (u > r.startX && s.translate >= s.minTranslate())
        )
          return;
      if (
        t.activeElement &&
        a.target === t.activeElement &&
        a.target.matches(i.focusableElements)
      )
        return (i.isMoved = !0), void (s.allowClick = !1);
      if (
        (i.allowTouchCallbacks && s.emit("touchMove", a),
        a.targetTouches && a.targetTouches.length > 1)
      )
        return;
      (r.currentX = u), (r.currentY = p);
      const h = r.currentX - r.startX,
        g = r.currentY - r.startY;
      if (s.params.threshold && Math.sqrt(h ** 2 + g ** 2) < s.params.threshold)
        return;
      if (void 0 === i.isScrolling) {
        let e;
        (s.isHorizontal() && r.currentY === r.startY) ||
        (s.isVertical() && r.currentX === r.startX)
          ? (i.isScrolling = !1)
          : h * h + g * g >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(g), Math.abs(h))) / Math.PI),
            (i.isScrolling = s.isHorizontal()
              ? e > n.touchAngle
              : 90 - e > n.touchAngle));
      }
      if (
        (i.isScrolling && s.emit("touchMoveOpposite", a),
        void 0 === i.startMoving &&
          ((r.currentX === r.startX && r.currentY === r.startY) ||
            (i.startMoving = !0)),
        i.isScrolling ||
          (s.zoom &&
            s.params.zoom &&
            s.params.zoom.enabled &&
            i.evCache.length > 1))
      )
        return void (i.isTouched = !1);
      if (!i.startMoving) return;
      (s.allowClick = !1),
        !n.cssMode && a.cancelable && a.preventDefault(),
        n.touchMoveStopPropagation && !n.nested && a.stopPropagation();
      let m = s.isHorizontal() ? h : g,
        f = s.isHorizontal()
          ? r.currentX - r.previousX
          : r.currentY - r.previousY;
      n.oneWayMovement &&
        ((m = Math.abs(m) * (o ? 1 : -1)), (f = Math.abs(f) * (o ? 1 : -1))),
        (r.diff = m),
        (m *= n.touchRatio),
        o && ((m = -m), (f = -f));
      const v = s.touchesDirection;
      (s.swipeDirection = m > 0 ? "prev" : "next"),
        (s.touchesDirection = f > 0 ? "prev" : "next");
      const y = s.params.loop && !n.cssMode;
      if (!i.isMoved) {
        if (
          (y && s.loopFix({ direction: s.swipeDirection }),
          (i.startTranslate = s.getTranslate()),
          s.setTransition(0),
          s.animating)
        ) {
          const e = new window.CustomEvent("transitionend", {
            bubbles: !0,
            cancelable: !0,
          });
          s.wrapperEl.dispatchEvent(e);
        }
        (i.allowMomentumBounce = !1),
          !n.grabCursor ||
            (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
            s.setGrabCursor(!0),
          s.emit("sliderFirstMove", a);
      }
      let b;
      i.isMoved &&
        v !== s.touchesDirection &&
        y &&
        Math.abs(m) >= 1 &&
        (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }),
        (b = !0)),
        s.emit("sliderMove", a),
        (i.isMoved = !0),
        (i.currentTranslate = m + i.startTranslate);
      let w = !0,
        C = n.resistanceRatio;
      if (
        (n.touchReleaseOnEdges && (C = 0),
        m > 0
          ? (y &&
              !b &&
              i.currentTranslate >
                (n.centeredSlides
                  ? s.minTranslate() - s.size / 2
                  : s.minTranslate()) &&
              s.loopFix({
                direction: "prev",
                setTranslate: !0,
                activeSlideIndex: 0,
              }),
            i.currentTranslate > s.minTranslate() &&
              ((w = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + m) ** C)))
          : m < 0 &&
            (y &&
              !b &&
              i.currentTranslate <
                (n.centeredSlides
                  ? s.maxTranslate() + s.size / 2
                  : s.maxTranslate()) &&
              s.loopFix({
                direction: "next",
                setTranslate: !0,
                activeSlideIndex:
                  s.slides.length -
                  ("auto" === n.slidesPerView
                    ? s.slidesPerViewDynamic()
                    : Math.ceil(parseFloat(n.slidesPerView, 10))),
              }),
            i.currentTranslate < s.maxTranslate() &&
              ((w = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - m) ** C))),
        w && (a.preventedByNestedSwiper = !0),
        !s.allowSlideNext &&
          "next" === s.swipeDirection &&
          i.currentTranslate < i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev &&
          "prev" === s.swipeDirection &&
          i.currentTranslate > i.startTranslate &&
          (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev ||
          s.allowSlideNext ||
          (i.currentTranslate = i.startTranslate),
        n.threshold > 0)
      ) {
        if (!(Math.abs(m) > n.threshold || i.allowThresholdMove))
          return void (i.currentTranslate = i.startTranslate);
        if (!i.allowThresholdMove)
          return (
            (i.allowThresholdMove = !0),
            (r.startX = r.currentX),
            (r.startY = r.currentY),
            (i.currentTranslate = i.startTranslate),
            void (r.diff = s.isHorizontal()
              ? r.currentX - r.startX
              : r.currentY - r.startY)
          );
      }
      n.followFinger &&
        !n.cssMode &&
        (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
          n.watchSlidesProgress) &&
          (s.updateActiveIndex(), s.updateSlidesClasses()),
        s.params.freeMode &&
          n.freeMode.enabled &&
          s.freeMode &&
          s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate));
    }
    function Z(e) {
      const t = this,
        s = t.touchEventsData,
        i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
      if (
        (i >= 0 && s.evCache.splice(i, 1),
        ["pointercancel", "pointerout", "pointerleave"].includes(e.type))
      ) {
        if (
          !(
            "pointercancel" === e.type &&
            (t.browser.isSafari || t.browser.isWebView)
          )
        )
          return;
      }
      const {
        params: n,
        touches: r,
        rtlTranslate: o,
        slidesGrid: l,
        enabled: a,
      } = t;
      if (!a) return;
      if (!n.simulateTouch && "mouse" === e.pointerType) return;
      let c = e;
      if (
        (c.originalEvent && (c = c.originalEvent),
        s.allowTouchCallbacks && t.emit("touchEnd", c),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
      )
        return (
          s.isMoved && n.grabCursor && t.setGrabCursor(!1),
          (s.isMoved = !1),
          void (s.startMoving = !1)
        );
      n.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const d = x(),
        u = d - s.touchStartTime;
      if (t.allowClick) {
        const e = c.path || (c.composedPath && c.composedPath());
        t.updateClickedSlide((e && e[0]) || c.target),
          t.emit("tap click", c),
          u < 300 &&
            d - s.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", c);
      }
      if (
        ((s.lastClickTime = x()),
        E(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !s.isTouched ||
          !s.isMoved ||
          !t.swipeDirection ||
          0 === r.diff ||
          s.currentTranslate === s.startTranslate)
      )
        return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
      let p;
      if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (p = n.followFinger
          ? o
            ? t.translate
            : -t.translate
          : -s.currentTranslate),
        n.cssMode)
      )
        return;
      if (t.params.freeMode && n.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: p });
      let h = 0,
        g = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < l.length;
        e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
      ) {
        const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        void 0 !== l[e + t]
          ? p >= l[e] && p < l[e + t] && ((h = e), (g = l[e + t] - l[e]))
          : p >= l[e] && ((h = e), (g = l[l.length - 1] - l[l.length - 2]));
      }
      let m = null,
        f = null;
      n.rewind &&
        (t.isBeginning
          ? (f =
              t.params.virtual && t.params.virtual.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (m = 0));
      const v = (p - l[h]) / g,
        y = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      if (u > n.longSwipesMs) {
        if (!n.longSwipes) return void t.slideTo(t.activeIndex);
        "next" === t.swipeDirection &&
          (v >= n.longSwipesRatio
            ? t.slideTo(n.rewind && t.isEnd ? m : h + y)
            : t.slideTo(h)),
          "prev" === t.swipeDirection &&
            (v > 1 - n.longSwipesRatio
              ? t.slideTo(h + y)
              : null !== f && v < 0 && Math.abs(v) > n.longSwipesRatio
              ? t.slideTo(f)
              : t.slideTo(h));
      } else {
        if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (c.target === t.navigation.nextEl || c.target === t.navigation.prevEl)
          ? c.target === t.navigation.nextEl
            ? t.slideTo(h + y)
            : t.slideTo(h)
          : ("next" === t.swipeDirection && t.slideTo(null !== m ? m : h + y),
            "prev" === t.swipeDirection && t.slideTo(null !== f ? f : h));
      }
    }
    let Q;
    function J() {
      const e = this,
        { params: t, el: s } = e;
      if (s && 0 === s.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: i, allowSlidePrev: n, snapGrid: r } = e,
        o = e.virtual && e.params.virtual.enabled;
      (e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
      const l = o && t.loop;
      !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
      !e.isEnd ||
      e.isBeginning ||
      e.params.centeredSlides ||
      l
        ? e.params.loop && !o
          ? e.slideToLoop(e.realIndex, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0)
        : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          (clearTimeout(Q),
          (Q = setTimeout(() => {
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              e.autoplay.resume();
          }, 500))),
        (e.allowSlidePrev = n),
        (e.allowSlideNext = i),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
    function ee(e) {
      const t = this;
      t.enabled &&
        (t.allowClick ||
          (t.params.preventClicks && e.preventDefault(),
          t.params.preventClicksPropagation &&
            t.animating &&
            (e.stopPropagation(), e.stopImmediatePropagation())));
    }
    function te() {
      const e = this,
        { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
      if (!i) return;
      let n;
      (e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
      const r = e.maxTranslate() - e.minTranslate();
      (n = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
        n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1);
    }
    const se = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
      );
      if (s) {
        const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        t && t.remove();
      }
    };
    function ie(e) {
      se(this, e.target), this.update();
    }
    let ne = !1;
    function re() {}
    const oe = (e, t) => {
      const s = S(),
        { params: i, el: n, wrapperEl: r, device: o } = e,
        l = !!i.nested,
        a = "on" === t ? "addEventListener" : "removeEventListener",
        c = t;
      n[a]("pointerdown", e.onTouchStart, { passive: !1 }),
        s[a]("pointermove", e.onTouchMove, { passive: !1, capture: l }),
        s[a]("pointerup", e.onTouchEnd, { passive: !0 }),
        s[a]("pointercancel", e.onTouchEnd, { passive: !0 }),
        s[a]("pointerout", e.onTouchEnd, { passive: !0 }),
        s[a]("pointerleave", e.onTouchEnd, { passive: !0 }),
        (i.preventClicks || i.preventClicksPropagation) &&
          n[a]("click", e.onClick, !0),
        i.cssMode && r[a]("scroll", e.onScroll),
        i.updateOnWindowResize
          ? e[c](
              o.ios || o.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
              J,
              !0
            )
          : e[c]("observerUpdate", J, !0),
        n[a]("load", e.onLoad, { capture: !0 });
    };
    const le = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    const ae = {
      init: !0,
      direction: "horizontal",
      oneWayMovement: !1,
      touchEventsTarget: "wrapper",
      initialSlide: 0,
      speed: 300,
      cssMode: !1,
      updateOnWindowResize: !0,
      resizeObserver: !0,
      nested: !1,
      createElements: !1,
      enabled: !0,
      focusableElements:
        "input, select, option, textarea, button, video, label",
      width: null,
      height: null,
      preventInteractionOnTransition: !1,
      userAgent: null,
      url: null,
      edgeSwipeDetection: !1,
      edgeSwipeThreshold: 20,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: "slide",
      breakpoints: void 0,
      breakpointsBase: "window",
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerGroup: 1,
      slidesPerGroupSkip: 0,
      slidesPerGroupAuto: !1,
      centeredSlides: !1,
      centeredSlidesBounds: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      centerInsufficientSlides: !1,
      watchOverflow: !0,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 5,
      touchMoveStopPropagation: !1,
      touchStartPreventDefault: !0,
      touchStartForcePreventDefault: !1,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      loop: !1,
      loopedSlides: null,
      loopPreventsSliding: !0,
      rewind: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: "swiper-no-swiping",
      noSwipingSelector: null,
      passiveListeners: !0,
      maxBackfaceHiddenSlides: 10,
      containerModifierClass: "swiper-",
      slideClass: "swiper-slide",
      slideActiveClass: "swiper-slide-active",
      slideVisibleClass: "swiper-slide-visible",
      slideNextClass: "swiper-slide-next",
      slidePrevClass: "swiper-slide-prev",
      wrapperClass: "swiper-wrapper",
      lazyPreloaderClass: "swiper-lazy-preloader",
      runCallbacksOnInit: !0,
      _emitClasses: !1,
    };
    function ce(e, t) {
      return function (s = {}) {
        const i = Object.keys(s)[0],
          n = s[i];
        "object" == typeof n && null !== n
          ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
              !0 === e[i] &&
              (e[i] = { auto: !0 }),
            i in e && "enabled" in n
              ? (!0 === e[i] && (e[i] = { enabled: !0 }),
                "object" != typeof e[i] ||
                  "enabled" in e[i] ||
                  (e[i].enabled = !0),
                e[i] || (e[i] = { enabled: !1 }),
                I(t, s))
              : I(t, s))
          : I(t, s);
      };
    }
    const de = {
        eventsEmitter: N,
        update: R,
        translate: j,
        transition: {
          setTransition: function (e, t) {
            const s = this;
            s.params.cssMode ||
              (s.wrapperEl.style.transitionDuration = `${e}ms`),
              s.emit("setTransition", e, t);
          },
          transitionStart: function (e = !0, t) {
            const s = this,
              { params: i } = s;
            i.cssMode ||
              (i.autoHeight && s.updateAutoHeight(),
              W({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e = !0, t) {
            const s = this,
              { params: i } = s;
            (s.animating = !1),
              i.cssMode ||
                (s.setTransition(0),
                W({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
          },
        },
        slide: Y,
        loop: X,
        grabCursor: {
          setGrabCursor: function (e) {
            const t = this;
            if (
              !t.params.simulateTouch ||
              (t.params.watchOverflow && t.isLocked) ||
              t.params.cssMode
            )
              return;
            const s =
              "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
            t.isElement && (t.__preventObserver__ = !0),
              (s.style.cursor = "move"),
              (s.style.cursor = e ? "grabbing" : "grab"),
              t.isElement &&
                requestAnimationFrame(() => {
                  t.__preventObserver__ = !1;
                });
          },
          unsetGrabCursor: function () {
            const e = this;
            (e.params.watchOverflow && e.isLocked) ||
              e.params.cssMode ||
              (e.isElement && (e.__preventObserver__ = !0),
              (e[
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
              ].style.cursor = ""),
              e.isElement &&
                requestAnimationFrame(() => {
                  e.__preventObserver__ = !1;
                }));
          },
        },
        events: {
          attachEvents: function () {
            const e = this,
              t = S(),
              { params: s } = e;
            (e.onTouchStart = U.bind(e)),
              (e.onTouchMove = K.bind(e)),
              (e.onTouchEnd = Z.bind(e)),
              s.cssMode && (e.onScroll = te.bind(e)),
              (e.onClick = ee.bind(e)),
              (e.onLoad = ie.bind(e)),
              ne || (t.addEventListener("touchstart", re), (ne = !0)),
              oe(e, "on");
          },
          detachEvents: function () {
            oe(this, "off");
          },
        },
        breakpoints: {
          setBreakpoint: function () {
            const e = this,
              { realIndex: t, initialized: s, params: i, el: n } = e,
              r = i.breakpoints;
            if (!r || (r && 0 === Object.keys(r).length)) return;
            const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
            if (!o || e.currentBreakpoint === o) return;
            const l = (o in r ? r[o] : void 0) || e.originalParams,
              a = le(e, i),
              c = le(e, l),
              d = i.enabled;
            a && !c
              ? (n.classList.remove(
                  `${i.containerModifierClass}grid`,
                  `${i.containerModifierClass}grid-column`
                ),
                e.emitContainerClasses())
              : !a &&
                c &&
                (n.classList.add(`${i.containerModifierClass}grid`),
                ((l.grid.fill && "column" === l.grid.fill) ||
                  (!l.grid.fill && "column" === i.grid.fill)) &&
                  n.classList.add(`${i.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
              ["navigation", "pagination", "scrollbar"].forEach((t) => {
                const s = i[t] && i[t].enabled,
                  n = l[t] && l[t].enabled;
                s && !n && e[t].disable(), !s && n && e[t].enable();
              });
            const u = l.direction && l.direction !== i.direction,
              p = i.loop && (l.slidesPerView !== i.slidesPerView || u);
            u && s && e.changeDirection(), I(e.params, l);
            const h = e.params.enabled;
            Object.assign(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev,
            }),
              d && !h ? e.disable() : !d && h && e.enable(),
              (e.currentBreakpoint = o),
              e.emit("_beforeBreakpoint", l),
              p && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
              e.emit("breakpoint", l);
          },
          getBreakpoint: function (e, t = "window", s) {
            if (!e || ("container" === t && !s)) return;
            let i = !1;
            const n = C(),
              r = "window" === t ? n.innerHeight : s.clientHeight,
              o = Object.keys(e).map((e) => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  const t = parseFloat(e.substr(1));
                  return { value: r * t, point: e };
                }
                return { value: e, point: e };
              });
            o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < o.length; e += 1) {
              const { point: r, value: l } = o[e];
              "window" === t
                ? n.matchMedia(`(min-width: ${l}px)`).matches && (i = r)
                : l <= s.clientWidth && (i = r);
            }
            return i || "max";
          },
        },
        checkOverflow: {
          checkOverflow: function () {
            const e = this,
              { isLocked: t, params: s } = e,
              { slidesOffsetBefore: i } = s;
            if (i) {
              const t = e.slides.length - 1,
                s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
              e.isLocked = e.size > s;
            } else e.isLocked = 1 === e.snapGrid.length;
            !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
              !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
              t && t !== e.isLocked && (e.isEnd = !1),
              t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
          },
        },
        classes: {
          addClasses: function () {
            const e = this,
              { classNames: t, params: s, rtl: i, el: n, device: r } = e,
              o = (function (e, t) {
                const s = [];
                return (
                  e.forEach((e) => {
                    "object" == typeof e
                      ? Object.keys(e).forEach((i) => {
                          e[i] && s.push(t + i);
                        })
                      : "string" == typeof e && s.push(t + e);
                  }),
                  s
                );
              })(
                [
                  "initialized",
                  s.direction,
                  { "free-mode": e.params.freeMode && s.freeMode.enabled },
                  { autoheight: s.autoHeight },
                  { rtl: i },
                  { grid: s.grid && s.grid.rows > 1 },
                  {
                    "grid-column":
                      s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                  },
                  { android: r.android },
                  { ios: r.ios },
                  { "css-mode": s.cssMode },
                  { centered: s.cssMode && s.centeredSlides },
                  { "watch-progress": s.watchSlidesProgress },
                ],
                s.containerModifierClass
              );
            t.push(...o), n.classList.add(...t), e.emitContainerClasses();
          },
          removeClasses: function () {
            const { el: e, classNames: t } = this;
            e.classList.remove(...t), this.emitContainerClasses();
          },
        },
      },
      ue = {};
    class pe {
      constructor(...e) {
        let t, s;
        1 === e.length &&
        e[0].constructor &&
        "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
          ? (s = e[0])
          : ([t, s] = e),
          s || (s = {}),
          (s = I({}, s)),
          t && !s.el && (s.el = t);
        const i = S();
        if (
          s.el &&
          "string" == typeof s.el &&
          i.querySelectorAll(s.el).length > 1
        ) {
          const e = [];
          return (
            i.querySelectorAll(s.el).forEach((t) => {
              const i = I({}, s, { el: t });
              e.push(new pe(i));
            }),
            e
          );
        }
        const n = this;
        (n.__swiper__ = !0),
          (n.support = H()),
          (n.device = V({ userAgent: s.userAgent })),
          (n.browser = q()),
          (n.eventsListeners = {}),
          (n.eventsAnyListeners = []),
          (n.modules = [...n.__modules__]),
          s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
        const r = {};
        n.modules.forEach((e) => {
          e({
            params: s,
            swiper: n,
            extendParams: ce(s, r),
            on: n.on.bind(n),
            once: n.once.bind(n),
            off: n.off.bind(n),
            emit: n.emit.bind(n),
          });
        });
        const o = I({}, ae, r);
        return (
          (n.params = I({}, o, ue, s)),
          (n.originalParams = I({}, n.params)),
          (n.passedParams = I({}, s)),
          n.params &&
            n.params.on &&
            Object.keys(n.params.on).forEach((e) => {
              n.on(e, n.params.on[e]);
            }),
          n.params && n.params.onAny && n.onAny(n.params.onAny),
          Object.assign(n, {
            enabled: n.params.enabled,
            el: t,
            classNames: [],
            slides: [],
            slidesGrid: [],
            snapGrid: [],
            slidesSizesGrid: [],
            isHorizontal: () => "horizontal" === n.params.direction,
            isVertical: () => "vertical" === n.params.direction,
            activeIndex: 0,
            realIndex: 0,
            isBeginning: !0,
            isEnd: !1,
            translate: 0,
            previousTranslate: 0,
            progress: 0,
            velocity: 0,
            animating: !1,
            allowSlideNext: n.params.allowSlideNext,
            allowSlidePrev: n.params.allowSlidePrev,
            touchEventsData: {
              isTouched: void 0,
              isMoved: void 0,
              allowTouchCallbacks: void 0,
              touchStartTime: void 0,
              isScrolling: void 0,
              currentTranslate: void 0,
              startTranslate: void 0,
              allowThresholdMove: void 0,
              focusableElements: n.params.focusableElements,
              lastClickTime: x(),
              clickTimeout: void 0,
              velocities: [],
              allowMomentumBounce: void 0,
              startMoving: void 0,
              evCache: [],
            },
            allowClick: !0,
            allowTouchMove: n.params.allowTouchMove,
            touches: {
              startX: 0,
              startY: 0,
              currentX: 0,
              currentY: 0,
              diff: 0,
            },
            imagesToLoad: [],
            imagesLoaded: 0,
          }),
          n.emit("_swiper"),
          n.params.init && n.init(),
          n
        );
      }
      getSlideIndex(e) {
        const { slidesEl: t, params: s } = this,
          i = z(P(t, `.${s.slideClass}, swiper-slide`)[0]);
        return z(e) - i;
      }
      getSlideIndexByData(e) {
        return this.getSlideIndex(
          this.slides.filter(
            (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
          )[0]
        );
      }
      recalcSlides() {
        const { slidesEl: e, params: t } = this;
        this.slides = P(e, `.${t.slideClass}, swiper-slide`);
      }
      enable() {
        const e = this;
        e.enabled ||
          ((e.enabled = !0),
          e.params.grabCursor && e.setGrabCursor(),
          e.emit("enable"));
      }
      disable() {
        const e = this;
        e.enabled &&
          ((e.enabled = !1),
          e.params.grabCursor && e.unsetGrabCursor(),
          e.emit("disable"));
      }
      setProgress(e, t) {
        const s = this;
        e = Math.min(Math.max(e, 0), 1);
        const i = s.minTranslate(),
          n = (s.maxTranslate() - i) * e + i;
        s.translateTo(n, void 0 === t ? 0 : t),
          s.updateActiveIndex(),
          s.updateSlidesClasses();
      }
      emitContainerClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = e.el.className
          .split(" ")
          .filter(
            (t) =>
              0 === t.indexOf("swiper") ||
              0 === t.indexOf(e.params.containerModifierClass)
          );
        e.emit("_containerClasses", t.join(" "));
      }
      getSlideClasses(e) {
        const t = this;
        return t.destroyed
          ? ""
          : e.className
              .split(" ")
              .filter(
                (e) =>
                  0 === e.indexOf("swiper-slide") ||
                  0 === e.indexOf(t.params.slideClass)
              )
              .join(" ");
      }
      emitSlidesClasses() {
        const e = this;
        if (!e.params._emitClasses || !e.el) return;
        const t = [];
        e.slides.forEach((s) => {
          const i = e.getSlideClasses(s);
          t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
        }),
          e.emit("_slideClasses", t);
      }
      slidesPerViewDynamic(e = "current", t = !1) {
        const {
          params: s,
          slides: i,
          slidesGrid: n,
          slidesSizesGrid: r,
          size: o,
          activeIndex: l,
        } = this;
        let a = 1;
        if (s.centeredSlides) {
          let e,
            t = i[l].swiperSlideSize;
          for (let s = l + 1; s < i.length; s += 1)
            i[s] &&
              !e &&
              ((t += i[s].swiperSlideSize), (a += 1), t > o && (e = !0));
          for (let s = l - 1; s >= 0; s -= 1)
            i[s] &&
              !e &&
              ((t += i[s].swiperSlideSize), (a += 1), t > o && (e = !0));
        } else if ("current" === e)
          for (let e = l + 1; e < i.length; e += 1) {
            (t ? n[e] + r[e] - n[l] < o : n[e] - n[l] < o) && (a += 1);
          }
        else
          for (let e = l - 1; e >= 0; e -= 1) {
            n[l] - n[e] < o && (a += 1);
          }
        return a;
      }
      update() {
        const e = this;
        if (!e || e.destroyed) return;
        const { snapGrid: t, params: s } = e;
        function i() {
          const t = e.rtlTranslate ? -1 * e.translate : e.translate,
            s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
          e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
        }
        let n;
        s.breakpoints && e.setBreakpoint(),
          [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
            t.complete && se(e, t);
          }),
          e.updateSize(),
          e.updateSlides(),
          e.updateProgress(),
          e.updateSlidesClasses(),
          e.params.freeMode && e.params.freeMode.enabled
            ? (i(), e.params.autoHeight && e.updateAutoHeight())
            : ((n =
                ("auto" === e.params.slidesPerView ||
                  e.params.slidesPerView > 1) &&
                e.isEnd &&
                !e.params.centeredSlides
                  ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                  : e.slideTo(e.activeIndex, 0, !1, !0)),
              n || i()),
          s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
          e.emit("update");
      }
      changeDirection(e, t = !0) {
        const s = this,
          i = s.params.direction;
        return (
          e || (e = "horizontal" === i ? "vertical" : "horizontal"),
          e === i ||
            ("horizontal" !== e && "vertical" !== e) ||
            (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            (s.params.direction = e),
            s.slides.forEach((t) => {
              "vertical" === e ? (t.style.width = "") : (t.style.height = "");
            }),
            s.emit("changeDirection"),
            t && s.update()),
          s
        );
      }
      changeLanguageDirection(e) {
        const t = this;
        (t.rtl && "rtl" === e) ||
          (!t.rtl && "ltr" === e) ||
          ((t.rtl = "rtl" === e),
          (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
          t.rtl
            ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "rtl"))
            : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
              (t.el.dir = "ltr")),
          t.update());
      }
      mount(e) {
        const t = this;
        if (t.mounted) return !0;
        let s = e || t.params.el;
        if (("string" == typeof s && (s = document.querySelector(s)), !s))
          return !1;
        (s.swiper = t), s.shadowEl && (t.isElement = !0);
        const i = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let n = (() => {
          if (s && s.shadowRoot && s.shadowRoot.querySelector) {
            return s.shadowRoot.querySelector(i());
          }
          return P(s, i())[0];
        })();
        return (
          !n &&
            t.params.createElements &&
            ((n = k("div", t.params.wrapperClass)),
            s.append(n),
            P(s, `.${t.params.slideClass}`).forEach((e) => {
              n.append(e);
            })),
          Object.assign(t, {
            el: s,
            wrapperEl: n,
            slidesEl: t.isElement ? s : n,
            mounted: !0,
            rtl: "rtl" === s.dir.toLowerCase() || "rtl" === M(s, "direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === s.dir.toLowerCase() || "rtl" === M(s, "direction")),
            wrongRTL: "-webkit-box" === M(n, "display"),
          }),
          !0
        );
      }
      init(e) {
        const t = this;
        if (t.initialized) return t;
        return (
          !1 === t.mount(e) ||
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled
              ? t.slideTo(
                  t.params.initialSlide + t.virtual.slidesBefore,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0
                ),
            t.params.loop && t.loopCreate(),
            t.attachEvents(),
            [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e) => {
              e.complete
                ? se(t, e)
                : e.addEventListener("load", (e) => {
                    se(t, e.target);
                  });
            }),
            (t.initialized = !0),
            t.emit("init"),
            t.emit("afterInit")),
          t
        );
      }
      destroy(e = !0, t = !0) {
        const s = this,
          { params: i, el: n, wrapperEl: r, slides: o } = s;
        return (
          void 0 === s.params ||
            s.destroyed ||
            (s.emit("beforeDestroy"),
            (s.initialized = !1),
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t &&
              (s.removeClasses(),
              n.removeAttribute("style"),
              r.removeAttribute("style"),
              o &&
                o.length &&
                o.forEach((e) => {
                  e.classList.remove(
                    i.slideVisibleClass,
                    i.slideActiveClass,
                    i.slideNextClass,
                    i.slidePrevClass
                  ),
                    e.removeAttribute("style"),
                    e.removeAttribute("data-swiper-slide-index");
                })),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach((e) => {
              s.off(e);
            }),
            !1 !== e &&
              ((s.el.swiper = null),
              (function (e) {
                const t = e;
                Object.keys(t).forEach((e) => {
                  try {
                    t[e] = null;
                  } catch (e) {}
                  try {
                    delete t[e];
                  } catch (e) {}
                });
              })(s)),
            (s.destroyed = !0)),
          null
        );
      }
      static extendDefaults(e) {
        I(ue, e);
      }
      static get extendedDefaults() {
        return ue;
      }
      static get defaults() {
        return ae;
      }
      static installModule(e) {
        pe.prototype.__modules__ || (pe.prototype.__modules__ = []);
        const t = pe.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => pe.installModule(e)), pe)
          : (pe.installModule(e), pe);
      }
    }
    Object.keys(de).forEach((e) => {
      Object.keys(de[e]).forEach((t) => {
        pe.prototype[t] = de[e][t];
      });
    }),
      pe.use([
        function ({ swiper: e, on: t, emit: s }) {
          const i = C();
          let n = null,
            r = null;
          const o = () => {
              e &&
                !e.destroyed &&
                e.initialized &&
                (s("beforeResize"), s("resize"));
            },
            l = () => {
              e && !e.destroyed && e.initialized && s("orientationchange");
            };
          t("init", () => {
            e.params.resizeObserver && void 0 !== i.ResizeObserver
              ? e &&
                !e.destroyed &&
                e.initialized &&
                ((n = new ResizeObserver((t) => {
                  r = i.requestAnimationFrame(() => {
                    const { width: s, height: i } = e;
                    let n = s,
                      r = i;
                    t.forEach(
                      ({ contentBoxSize: t, contentRect: s, target: i }) => {
                        (i && i !== e.el) ||
                          ((n = s ? s.width : (t[0] || t).inlineSize),
                          (r = s ? s.height : (t[0] || t).blockSize));
                      }
                    ),
                      (n === s && r === i) || o();
                  });
                })),
                n.observe(e.el))
              : (i.addEventListener("resize", o),
                i.addEventListener("orientationchange", l));
          }),
            t("destroy", () => {
              r && i.cancelAnimationFrame(r),
                n && n.unobserve && e.el && (n.unobserve(e.el), (n = null)),
                i.removeEventListener("resize", o),
                i.removeEventListener("orientationchange", l);
            });
        },
        function ({ swiper: e, extendParams: t, on: s, emit: i }) {
          const n = [],
            r = C(),
            o = (t, s = {}) => {
              const o = new (r.MutationObserver || r.WebkitMutationObserver)(
                (t) => {
                  if (e.__preventObserver__) return;
                  if (1 === t.length) return void i("observerUpdate", t[0]);
                  const s = function () {
                    i("observerUpdate", t[0]);
                  };
                  r.requestAnimationFrame
                    ? r.requestAnimationFrame(s)
                    : r.setTimeout(s, 0);
                }
              );
              o.observe(t, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData,
              }),
                n.push(o);
            };
          t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            s("init", () => {
              if (e.params.observer) {
                if (e.params.observeParents) {
                  const t = D(e.el);
                  for (let e = 0; e < t.length; e += 1) o(t[e]);
                }
                o(e.el, { childList: e.params.observeSlideChildren }),
                  o(e.wrapperEl, { attributes: !1 });
              }
            }),
            s("destroy", () => {
              n.forEach((e) => {
                e.disconnect();
              }),
                n.splice(0, n.length);
            });
        },
      ]);
    const he = pe;
    function ge(e, t, s, i) {
      return (
        e.params.createElements &&
          Object.keys(i).forEach((n) => {
            if (!s[n] && !0 === s.auto) {
              let r = P(e.el, `.${i[n]}`)[0];
              r || ((r = k("div", i[n])), (r.className = i[n]), e.el.append(r)),
                (s[n] = r),
                (t[n] = r);
            }
          }),
        s
      );
    }
    function me({ swiper: e, extendParams: t, on: s, emit: i }) {
      t({
        navigation: {
          nextEl: null,
          prevEl: null,
          hideOnClick: !1,
          disabledClass: "swiper-button-disabled",
          hiddenClass: "swiper-button-hidden",
          lockClass: "swiper-button-lock",
          navigationDisabledClass: "swiper-navigation-disabled",
        },
      }),
        (e.navigation = { nextEl: null, prevEl: null });
      const n = (e) => (Array.isArray(e) || (e = [e].filter((e) => !!e)), e);
      function r(t) {
        let s;
        return t &&
          "string" == typeof t &&
          e.isElement &&
          ((s = e.el.shadowRoot.querySelector(t)), s)
          ? s
          : (t &&
              ("string" == typeof t && (s = [...document.querySelectorAll(t)]),
              e.params.uniqueNavElements &&
                "string" == typeof t &&
                s.length > 1 &&
                1 === e.el.querySelectorAll(t).length &&
                (s = e.el.querySelector(t))),
            t && !s ? t : s);
      }
      function o(t, s) {
        const i = e.params.navigation;
        (t = n(t)).forEach((t) => {
          t &&
            (t.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
            "BUTTON" === t.tagName && (t.disabled = s),
            e.params.watchOverflow &&
              e.enabled &&
              t.classList[e.isLocked ? "add" : "remove"](i.lockClass));
        });
      }
      function l() {
        const { nextEl: t, prevEl: s } = e.navigation;
        if (e.params.loop) return o(s, !1), void o(t, !1);
        o(s, e.isBeginning && !e.params.rewind),
          o(t, e.isEnd && !e.params.rewind);
      }
      function a(t) {
        t.preventDefault(),
          (!e.isBeginning || e.params.loop || e.params.rewind) &&
            (e.slidePrev(), i("navigationPrev"));
      }
      function c(t) {
        t.preventDefault(),
          (!e.isEnd || e.params.loop || e.params.rewind) &&
            (e.slideNext(), i("navigationNext"));
      }
      function d() {
        const t = e.params.navigation;
        if (
          ((e.params.navigation = ge(
            e,
            e.originalParams.navigation,
            e.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
          )),
          !t.nextEl && !t.prevEl)
        )
          return;
        let s = r(t.nextEl),
          i = r(t.prevEl);
        Object.assign(e.navigation, { nextEl: s, prevEl: i }),
          (s = n(s)),
          (i = n(i));
        const o = (s, i) => {
          s && s.addEventListener("click", "next" === i ? c : a),
            !e.enabled && s && s.classList.add(...t.lockClass.split(" "));
        };
        s.forEach((e) => o(e, "next")), i.forEach((e) => o(e, "prev"));
      }
      function u() {
        let { nextEl: t, prevEl: s } = e.navigation;
        (t = n(t)), (s = n(s));
        const i = (t, s) => {
          t.removeEventListener("click", "next" === s ? c : a),
            t.classList.remove(...e.params.navigation.disabledClass.split(" "));
        };
        t.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
      }
      s("init", () => {
        !1 === e.params.navigation.enabled ? p() : (d(), l());
      }),
        s("toEdge fromEdge lock unlock", () => {
          l();
        }),
        s("destroy", () => {
          u();
        }),
        s("enable disable", () => {
          let { nextEl: t, prevEl: s } = e.navigation;
          (t = n(t)),
            (s = n(s)),
            [...t, ...s]
              .filter((e) => !!e)
              .forEach((t) =>
                t.classList[e.enabled ? "remove" : "add"](
                  e.params.navigation.lockClass
                )
              );
        }),
        s("click", (t, s) => {
          let { nextEl: r, prevEl: o } = e.navigation;
          (r = n(r)), (o = n(o));
          const l = s.target;
          if (
            e.params.navigation.hideOnClick &&
            !o.includes(l) &&
            !r.includes(l)
          ) {
            if (
              e.pagination &&
              e.params.pagination &&
              e.params.pagination.clickable &&
              (e.pagination.el === l || e.pagination.el.contains(l))
            )
              return;
            let t;
            r.length
              ? (t = r[0].classList.contains(e.params.navigation.hiddenClass))
              : o.length &&
                (t = o[0].classList.contains(e.params.navigation.hiddenClass)),
              i(!0 === t ? "navigationShow" : "navigationHide"),
              [...r, ...o]
                .filter((e) => !!e)
                .forEach((t) =>
                  t.classList.toggle(e.params.navigation.hiddenClass)
                );
          }
        });
      const p = () => {
        e.el.classList.add(
          ...e.params.navigation.navigationDisabledClass.split(" ")
        ),
          u();
      };
      Object.assign(e.navigation, {
        enable: () => {
          e.el.classList.remove(
            ...e.params.navigation.navigationDisabledClass.split(" ")
          ),
            d(),
            l();
        },
        disable: p,
        update: l,
        init: d,
        destroy: u,
      });
    }
    function fe(e = "") {
      return `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`;
    }
    function ve({ swiper: e, extendParams: t, on: s, emit: i }) {
      const n = "swiper-pagination";
      let r;
      t({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: !1,
          hideOnClick: !1,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: !1,
          type: "bullets",
          dynamicBullets: !1,
          dynamicMainBullets: 1,
          formatFractionCurrent: (e) => e,
          formatFractionTotal: (e) => e,
          bulletClass: `${n}-bullet`,
          bulletActiveClass: `${n}-bullet-active`,
          modifierClass: `${n}-`,
          currentClass: `${n}-current`,
          totalClass: `${n}-total`,
          hiddenClass: `${n}-hidden`,
          progressbarFillClass: `${n}-progressbar-fill`,
          progressbarOppositeClass: `${n}-progressbar-opposite`,
          clickableClass: `${n}-clickable`,
          lockClass: `${n}-lock`,
          horizontalClass: `${n}-horizontal`,
          verticalClass: `${n}-vertical`,
          paginationDisabledClass: `${n}-disabled`,
        },
      }),
        (e.pagination = { el: null, bullets: [] });
      let o = 0;
      const l = (e) => (Array.isArray(e) || (e = [e].filter((e) => !!e)), e);
      function a() {
        return (
          !e.params.pagination.el ||
          !e.pagination.el ||
          (Array.isArray(e.pagination.el) && 0 === e.pagination.el.length)
        );
      }
      function c(t, s) {
        const { bulletActiveClass: i } = e.params.pagination;
        t &&
          (t = t[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          (t.classList.add(`${i}-${s}`),
          (t = t[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
            t.classList.add(`${i}-${s}-${s}`));
      }
      function d(t) {
        const s = t.target.closest(fe(e.params.pagination.bulletClass));
        if (!s) return;
        t.preventDefault();
        const i = z(s) * e.params.slidesPerGroup;
        if (e.params.loop) {
          if (e.realIndex === i) return;
          (i < e.loopedSlides || i > e.slides.length - e.loopedSlides) &&
            e.loopFix({
              direction: i < e.loopedSlides ? "prev" : "next",
              activeSlideIndex: i,
              slideTo: !1,
            }),
            e.slideToLoop(i);
        } else e.slideTo(i);
      }
      function u() {
        const t = e.rtl,
          s = e.params.pagination;
        if (a()) return;
        let n,
          d = e.pagination.el;
        d = l(d);
        const u =
            e.virtual && e.params.virtual.enabled
              ? e.virtual.slides.length
              : e.slides.length,
          p = e.params.loop
            ? Math.ceil(u / e.params.slidesPerGroup)
            : e.snapGrid.length;
        if (
          ((n = e.params.loop
            ? e.params.slidesPerGroup > 1
              ? Math.floor(e.realIndex / e.params.slidesPerGroup)
              : e.realIndex
            : void 0 !== e.snapIndex
            ? e.snapIndex
            : e.activeIndex || 0),
          "bullets" === s.type &&
            e.pagination.bullets &&
            e.pagination.bullets.length > 0)
        ) {
          const i = e.pagination.bullets;
          let l, a, u;
          if (
            (s.dynamicBullets &&
              ((r = $(i[0], e.isHorizontal() ? "width" : "height", !0)),
              d.forEach((t) => {
                t.style[e.isHorizontal() ? "width" : "height"] =
                  r * (s.dynamicMainBullets + 4) + "px";
              }),
              s.dynamicMainBullets > 1 &&
                void 0 !== e.previousIndex &&
                ((o += n - (e.previousIndex || 0)),
                o > s.dynamicMainBullets - 1
                  ? (o = s.dynamicMainBullets - 1)
                  : o < 0 && (o = 0)),
              (l = Math.max(n - o, 0)),
              (a = l + (Math.min(i.length, s.dynamicMainBullets) - 1)),
              (u = (a + l) / 2)),
            i.forEach((e) => {
              const t = [
                ...[
                  "",
                  "-next",
                  "-next-next",
                  "-prev",
                  "-prev-prev",
                  "-main",
                ].map((e) => `${s.bulletActiveClass}${e}`),
              ]
                .map((e) =>
                  "string" == typeof e && e.includes(" ") ? e.split(" ") : e
                )
                .flat();
              e.classList.remove(...t);
            }),
            d.length > 1)
          )
            i.forEach((e) => {
              const t = z(e);
              t === n && e.classList.add(...s.bulletActiveClass.split(" ")),
                s.dynamicBullets &&
                  (t >= l &&
                    t <= a &&
                    e.classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" ")
                    ),
                  t === l && c(e, "prev"),
                  t === a && c(e, "next"));
            });
          else {
            const e = i[n];
            if (
              (e && e.classList.add(...s.bulletActiveClass.split(" ")),
              s.dynamicBullets)
            ) {
              const e = i[l],
                t = i[a];
              for (let e = l; e <= a; e += 1)
                i[e] &&
                  i[e].classList.add(
                    ...`${s.bulletActiveClass}-main`.split(" ")
                  );
              c(e, "prev"), c(t, "next");
            }
          }
          if (s.dynamicBullets) {
            const n = Math.min(i.length, s.dynamicMainBullets + 4),
              o = (r * n - r) / 2 - u * r,
              l = t ? "right" : "left";
            i.forEach((t) => {
              t.style[e.isHorizontal() ? l : "top"] = `${o}px`;
            });
          }
        }
        d.forEach((t, r) => {
          if (
            ("fraction" === s.type &&
              (t.querySelectorAll(fe(s.currentClass)).forEach((e) => {
                e.textContent = s.formatFractionCurrent(n + 1);
              }),
              t.querySelectorAll(fe(s.totalClass)).forEach((e) => {
                e.textContent = s.formatFractionTotal(p);
              })),
            "progressbar" === s.type)
          ) {
            let i;
            i = s.progressbarOpposite
              ? e.isHorizontal()
                ? "vertical"
                : "horizontal"
              : e.isHorizontal()
              ? "horizontal"
              : "vertical";
            const r = (n + 1) / p;
            let o = 1,
              l = 1;
            "horizontal" === i ? (o = r) : (l = r),
              t.querySelectorAll(fe(s.progressbarFillClass)).forEach((t) => {
                (t.style.transform = `translate3d(0,0,0) scaleX(${o}) scaleY(${l})`),
                  (t.style.transitionDuration = `${e.params.speed}ms`);
              });
          }
          "custom" === s.type && s.renderCustom
            ? ((t.innerHTML = s.renderCustom(e, n + 1, p)),
              0 === r && i("paginationRender", t))
            : (0 === r && i("paginationRender", t), i("paginationUpdate", t)),
            e.params.watchOverflow &&
              e.enabled &&
              t.classList[e.isLocked ? "add" : "remove"](s.lockClass);
        });
      }
      function p() {
        const t = e.params.pagination;
        if (a()) return;
        const s =
          e.virtual && e.params.virtual.enabled
            ? e.virtual.slides.length
            : e.slides.length;
        let n = e.pagination.el;
        n = l(n);
        let r = "";
        if ("bullets" === t.type) {
          let i = e.params.loop
            ? Math.ceil(s / e.params.slidesPerGroup)
            : e.snapGrid.length;
          e.params.freeMode && e.params.freeMode.enabled && i > s && (i = s);
          for (let s = 0; s < i; s += 1)
            t.renderBullet
              ? (r += t.renderBullet.call(e, s, t.bulletClass))
              : (r += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
        }
        "fraction" === t.type &&
          (r = t.renderFraction
            ? t.renderFraction.call(e, t.currentClass, t.totalClass)
            : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
          "progressbar" === t.type &&
            (r = t.renderProgressbar
              ? t.renderProgressbar.call(e, t.progressbarFillClass)
              : `<span class="${t.progressbarFillClass}"></span>`),
          (e.pagination.bullets = []),
          n.forEach((s) => {
            "custom" !== t.type && (s.innerHTML = r || ""),
              "bullets" === t.type &&
                e.pagination.bullets.push(
                  ...s.querySelectorAll(fe(t.bulletClass))
                );
          }),
          "custom" !== t.type && i("paginationRender", n[0]);
      }
      function h() {
        e.params.pagination = ge(
          e,
          e.originalParams.pagination,
          e.params.pagination,
          { el: "swiper-pagination" }
        );
        const t = e.params.pagination;
        if (!t.el) return;
        let s;
        "string" == typeof t.el &&
          e.isElement &&
          (s = e.el.shadowRoot.querySelector(t.el)),
          s ||
            "string" != typeof t.el ||
            (s = [...document.querySelectorAll(t.el)]),
          s || (s = t.el),
          s &&
            0 !== s.length &&
            (e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              ((s = [...e.el.querySelectorAll(t.el)]),
              s.length > 1 &&
                (s = s.filter((t) => D(t, ".swiper")[0] === e.el)[0])),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(e.pagination, { el: s }),
            (s = l(s)),
            s.forEach((s) => {
              "bullets" === t.type &&
                t.clickable &&
                s.classList.add(t.clickableClass),
                s.classList.add(t.modifierClass + t.type),
                s.classList.add(
                  e.isHorizontal() ? t.horizontalClass : t.verticalClass
                ),
                "bullets" === t.type &&
                  t.dynamicBullets &&
                  (s.classList.add(`${t.modifierClass}${t.type}-dynamic`),
                  (o = 0),
                  t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type &&
                  t.progressbarOpposite &&
                  s.classList.add(t.progressbarOppositeClass),
                t.clickable && s.addEventListener("click", d),
                e.enabled || s.classList.add(t.lockClass);
            }));
      }
      function g() {
        const t = e.params.pagination;
        if (a()) return;
        let s = e.pagination.el;
        s &&
          ((s = l(s)),
          s.forEach((s) => {
            s.classList.remove(t.hiddenClass),
              s.classList.remove(t.modifierClass + t.type),
              s.classList.remove(
                e.isHorizontal() ? t.horizontalClass : t.verticalClass
              ),
              t.clickable && s.removeEventListener("click", d);
          })),
          e.pagination.bullets &&
            e.pagination.bullets.forEach((e) =>
              e.classList.remove(...t.bulletActiveClass.split(" "))
            );
      }
      s("init", () => {
        !1 === e.params.pagination.enabled ? m() : (h(), p(), u());
      }),
        s("activeIndexChange", () => {
          void 0 === e.snapIndex && u();
        }),
        s("snapIndexChange", () => {
          u();
        }),
        s("snapGridLengthChange", () => {
          p(), u();
        }),
        s("destroy", () => {
          g();
        }),
        s("enable disable", () => {
          let { el: t } = e.pagination;
          t &&
            ((t = l(t)),
            t.forEach((t) =>
              t.classList[e.enabled ? "remove" : "add"](
                e.params.pagination.lockClass
              )
            ));
        }),
        s("lock unlock", () => {
          u();
        }),
        s("click", (t, s) => {
          const n = s.target;
          let { el: r } = e.pagination;
          if (
            (Array.isArray(r) || (r = [r].filter((e) => !!e)),
            e.params.pagination.el &&
              e.params.pagination.hideOnClick &&
              r &&
              r.length > 0 &&
              !n.classList.contains(e.params.pagination.bulletClass))
          ) {
            if (
              e.navigation &&
              ((e.navigation.nextEl && n === e.navigation.nextEl) ||
                (e.navigation.prevEl && n === e.navigation.prevEl))
            )
              return;
            const t = r[0].classList.contains(e.params.pagination.hiddenClass);
            i(!0 === t ? "paginationShow" : "paginationHide"),
              r.forEach((t) =>
                t.classList.toggle(e.params.pagination.hiddenClass)
              );
          }
        });
      const m = () => {
        e.el.classList.add(e.params.pagination.paginationDisabledClass);
        let { el: t } = e.pagination;
        t &&
          ((t = l(t)),
          t.forEach((t) =>
            t.classList.add(e.params.pagination.paginationDisabledClass)
          )),
          g();
      };
      Object.assign(e.pagination, {
        enable: () => {
          e.el.classList.remove(e.params.pagination.paginationDisabledClass);
          let { el: t } = e.pagination;
          t &&
            ((t = l(t)),
            t.forEach((t) =>
              t.classList.remove(e.params.pagination.paginationDisabledClass)
            )),
            h(),
            p(),
            u();
        },
        disable: m,
        render: p,
        update: u,
        init: h,
        destroy: g,
      });
    }
    function ye({ swiper: e, extendParams: t, on: s, emit: i, params: n }) {
      let r, o;
      (e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
        t({
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
            pauseOnMouseEnter: !1,
          },
        });
      let l,
        a,
        c,
        d,
        u,
        p,
        h,
        g = n && n.autoplay ? n.autoplay.delay : 3e3,
        m = n && n.autoplay ? n.autoplay.delay : 3e3,
        f = new Date().getTime;
      function v(t) {
        e &&
          !e.destroyed &&
          e.wrapperEl &&
          t.target === e.wrapperEl &&
          (e.wrapperEl.removeEventListener("transitionend", v), x());
      }
      const y = () => {
          if (e.destroyed || !e.autoplay.running) return;
          e.autoplay.paused ? (a = !0) : a && ((m = l), (a = !1));
          const t = e.autoplay.paused ? l : f + m - new Date().getTime();
          (e.autoplay.timeLeft = t),
            i("autoplayTimeLeft", t, t / g),
            (o = requestAnimationFrame(() => {
              y();
            }));
        },
        b = (t) => {
          if (e.destroyed || !e.autoplay.running) return;
          cancelAnimationFrame(o), y();
          let s = void 0 === t ? e.params.autoplay.delay : t;
          (g = e.params.autoplay.delay), (m = e.params.autoplay.delay);
          const n = (() => {
            let t;
            if (
              ((t =
                e.virtual && e.params.virtual.enabled
                  ? e.slides.filter((e) =>
                      e.classList.contains("swiper-slide-active")
                    )[0]
                  : e.slides[e.activeIndex]),
              !t)
            )
              return;
            return parseInt(t.getAttribute("data-swiper-autoplay"), 10);
          })();
          !Number.isNaN(n) &&
            n > 0 &&
            void 0 === t &&
            ((s = n), (g = n), (m = n)),
            (l = s);
          const a = e.params.speed,
            c = () => {
              e &&
                !e.destroyed &&
                (e.params.autoplay.reverseDirection
                  ? !e.isBeginning || e.params.loop || e.params.rewind
                    ? (e.slidePrev(a, !0, !0), i("autoplay"))
                    : e.params.autoplay.stopOnLastSlide ||
                      (e.slideTo(e.slides.length - 1, a, !0, !0), i("autoplay"))
                  : !e.isEnd || e.params.loop || e.params.rewind
                  ? (e.slideNext(a, !0, !0), i("autoplay"))
                  : e.params.autoplay.stopOnLastSlide ||
                    (e.slideTo(0, a, !0, !0), i("autoplay")),
                e.params.cssMode &&
                  ((f = new Date().getTime()),
                  requestAnimationFrame(() => {
                    b();
                  })));
            };
          return (
            s > 0
              ? (clearTimeout(r),
                (r = setTimeout(() => {
                  c();
                }, s)))
              : requestAnimationFrame(() => {
                  c();
                }),
            s
          );
        },
        w = () => {
          (e.autoplay.running = !0), b(), i("autoplayStart");
        },
        C = () => {
          (e.autoplay.running = !1),
            clearTimeout(r),
            cancelAnimationFrame(o),
            i("autoplayStop");
        },
        E = (t, s) => {
          if (e.destroyed || !e.autoplay.running) return;
          clearTimeout(r), t || (h = !0);
          const n = () => {
            i("autoplayPause"),
              e.params.autoplay.waitForTransition
                ? e.wrapperEl.addEventListener("transitionend", v)
                : x();
          };
          if (((e.autoplay.paused = !0), s))
            return p && (l = e.params.autoplay.delay), (p = !1), void n();
          const o = l || e.params.autoplay.delay;
          (l = o - (new Date().getTime() - f)),
            (e.isEnd && l < 0 && !e.params.loop) || (l < 0 && (l = 0), n());
        },
        x = () => {
          (e.isEnd && l < 0 && !e.params.loop) ||
            e.destroyed ||
            !e.autoplay.running ||
            ((f = new Date().getTime()),
            h ? ((h = !1), b(l)) : b(),
            (e.autoplay.paused = !1),
            i("autoplayResume"));
        },
        T = () => {
          if (e.destroyed || !e.autoplay.running) return;
          const t = S();
          "hidden" === t.visibilityState && ((h = !0), E(!0)),
            "visible" === t.visibilityState && x();
        },
        L = (e) => {
          "mouse" === e.pointerType && ((h = !0), E(!0));
        },
        I = (t) => {
          "mouse" === t.pointerType && e.autoplay.paused && x();
        };
      s("init", () => {
        e.params.autoplay.enabled &&
          (e.params.autoplay.pauseOnMouseEnter &&
            (e.el.addEventListener("pointerenter", L),
            e.el.addEventListener("pointerleave", I)),
          S().addEventListener("visibilitychange", T),
          (f = new Date().getTime()),
          w());
      }),
        s("destroy", () => {
          e.el.removeEventListener("pointerenter", L),
            e.el.removeEventListener("pointerleave", I),
            S().removeEventListener("visibilitychange", T),
            e.autoplay.running && C();
        }),
        s("beforeTransitionStart", (t, s, i) => {
          !e.destroyed &&
            e.autoplay.running &&
            (i || !e.params.autoplay.disableOnInteraction ? E(!0, !0) : C());
        }),
        s("sliderFirstMove", () => {
          !e.destroyed &&
            e.autoplay.running &&
            (e.params.autoplay.disableOnInteraction
              ? C()
              : ((c = !0),
                (d = !1),
                (h = !1),
                (u = setTimeout(() => {
                  (h = !0), (d = !0), E(!0);
                }, 200))));
        }),
        s("touchEnd", () => {
          if (!e.destroyed && e.autoplay.running && c) {
            if (
              (clearTimeout(u),
              clearTimeout(r),
              e.params.autoplay.disableOnInteraction)
            )
              return (d = !1), void (c = !1);
            d && e.params.cssMode && x(), (d = !1), (c = !1);
          }
        }),
        s("slideChange", () => {
          !e.destroyed && e.autoplay.running && (p = !0);
        }),
        Object.assign(e.autoplay, { start: w, stop: C, pause: E, resume: x });
    }
    function be(e, t) {
      const s = _(t);
      return (
        s !== t &&
          ((s.style.backfaceVisibility = "hidden"),
          (s.style["-webkit-backface-visibility"] = "hidden")),
        s
      );
    }
    function Se({
      swiper: e,
      duration: t,
      transformElements: s,
      allSlides: i,
    }) {
      const { activeIndex: n } = e;
      if (e.params.virtualTranslate && 0 !== t) {
        let t,
          r = !1;
        (t = i
          ? s
          : s.filter((t) => {
              const s = t.classList.contains("swiper-slide-transform")
                ? ((t) => {
                    if (!t.parentElement)
                      return e.slides.filter(
                        (e) => e.shadowEl && e.shadowEl === t.parentNode
                      )[0];
                    return t.parentElement;
                  })(t)
                : t;
              return e.getSlideIndex(s) === n;
            })),
          t.forEach((t) => {
            !(function (e, t) {
              t &&
                e.addEventListener("transitionend", function s(i) {
                  i.target === e &&
                    (t.call(e, i), e.removeEventListener("transitionend", s));
                });
            })(t, () => {
              if (r) return;
              if (!e || e.destroyed) return;
              (r = !0), (e.animating = !1);
              const t = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
              });
              e.wrapperEl.dispatchEvent(t);
            });
          });
      }
    }
    function we({ swiper: e, extendParams: t, on: s }) {
      t({ fadeEffect: { crossFade: !1 } });
      !(function (e) {
        const {
          effect: t,
          swiper: s,
          on: i,
          setTranslate: n,
          setTransition: r,
          overwriteParams: o,
          perspective: l,
          recreateShadows: a,
          getEffectParams: c,
        } = e;
        let d;
        i("beforeInit", () => {
          if (s.params.effect !== t) return;
          s.classNames.push(`${s.params.containerModifierClass}${t}`),
            l &&
              l() &&
              s.classNames.push(`${s.params.containerModifierClass}3d`);
          const e = o ? o() : {};
          Object.assign(s.params, e), Object.assign(s.originalParams, e);
        }),
          i("setTranslate", () => {
            s.params.effect === t && n();
          }),
          i("setTransition", (e, i) => {
            s.params.effect === t && r(i);
          }),
          i("transitionEnd", () => {
            if (s.params.effect === t && a) {
              if (!c || !c().slideShadows) return;
              s.slides.forEach((e) => {
                e.querySelectorAll(
                  ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
                ).forEach((e) => e.remove());
              }),
                a();
            }
          }),
          i("virtualUpdate", () => {
            s.params.effect === t &&
              (s.slides.length || (d = !0),
              requestAnimationFrame(() => {
                d && s.slides && s.slides.length && (n(), (d = !1));
              }));
          });
      })({
        effect: "fade",
        swiper: e,
        on: s,
        setTranslate: () => {
          const { slides: t } = e;
          e.params.fadeEffect;
          for (let s = 0; s < t.length; s += 1) {
            const t = e.slides[s];
            let i = -t.swiperSlideOffset;
            e.params.virtualTranslate || (i -= e.translate);
            let n = 0;
            e.isHorizontal() || ((n = i), (i = 0));
            const r = e.params.fadeEffect.crossFade
                ? Math.max(1 - Math.abs(t.progress), 0)
                : 1 + Math.min(Math.max(t.progress, -1), 0),
              o = be(0, t);
            (o.style.opacity = r),
              (o.style.transform = `translate3d(${i}px, ${n}px, 0px)`);
          }
        },
        setTransition: (t) => {
          const s = e.slides.map((e) => _(e));
          s.forEach((e) => {
            e.style.transitionDuration = `${t}ms`;
          }),
            Se({ swiper: e, duration: t, transformElements: s, allSlides: !0 });
        },
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: !0,
          spaceBetween: 0,
          virtualTranslate: !e.params.cssMode,
        }),
      });
    }
    function Ce() {
      let e = document.querySelectorAll(
        '[class*="__swiper"]:not(.swiper-wrapper)'
      );
      e &&
        e.forEach((e) => {
          e.parentElement.classList.add("swiper"),
            e.classList.add("swiper-wrapper");
          for (const t of e.children) t.classList.add("swiper-slide");
        });
    }
    let Ee;
    window.addEventListener("load", function (e) {
      Ce(),
        document.querySelector(".swiper") &&
          new he(".slider-full-screen__slider", {
            modules: [me, ve, we, ye],
            effect: "fade",
            autoplay: { delay: 6e3, disableOnInteraction: !1 },
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: !1,
            speed: 800,
            pagination: {
              el: ".slider-full-screen__pagination",
              type: "bullets",
              clickable: !0,
            },
            navigation: {
              nextEl: ".slider-full-screen__button-next",
              prevEl: ".slider-full-screen__button-prev",
            },
            on: {},
          }),
        document.querySelector(".swiper") &&
          new he(".destinations__slider", {
            modules: [me, ye],
            observer: !0,
            observeParents: !0,
            spaceBetween: 32,
            autoHeight: !1,
            speed: 800,
            navigation: {
              nextEl: ".destinations-slide-btn-next",
              prevEl: ".destinations-slide-btn-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2.177 },
              1152.98: { slidesPerView: 2.725 },
              1440.98: { slidesPerView: 3.349 },
            },
            on: {},
          }),
        document.querySelector(".swiper") &&
          new he(".offers__slider", {
            modules: [me, ye],
            observer: !0,
            observeParents: !0,
            spaceBetween: 32,
            autoHeight: !1,
            speed: 800,
            navigation: {
              nextEl: ".offers-slide-btn-next",
              prevEl: ".offers-slide-btn-prev",
            },
            breakpoints: {
              768.98: { slidesPerView: 2 },
              992: { slidesPerView: 2.6 },
              1152: { slidesPerView: 3 },
            },
            on: {},
          }),
        document.querySelector(".swiper") &&
          new he(".gallery-destination__slider", {
            modules: [me, ye],
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 32,
            autoHeight: !1,
            speed: 800,
            navigation: {
              nextEl: ".gallery-destination-btn-next",
              prevEl: ".gallery-destination-btn-prev",
            },
          }),
        document.querySelector(".swiper") &&
          new he(".experiences__slider", {
            modules: [me, ye],
            observer: !0,
            observeParents: !0,
            spaceBetween: 32,
            speed: 800,
            navigation: {
              nextEl: ".experiences-slide-btn-next",
              prevEl: ".experiences-slide-btn-prev",
            },
            breakpoints: {
              320: { slidesPerView: 1 },
              575.98: { slidesPerView: 1.44 },
              768: { slidesPerView: 1.9 },
              992: { slidesPerView: 2.168 },
              1152.98: { slidesPerView: 2.425 },
              1440.98: { slidesPerView: 2.55 },
            },
          }),
        Te(xe);
    });
    let xe = window.matchMedia("(max-width: 767.98px)");
    function Te(e) {
      e.matches
        ? null != Ee && Ee.destroy(!0, !0)
        : document.querySelector(".planners-trip__slider") &&
          document.querySelector(".swiper") &&
          (Ee = new he(".planners-trip__slider", {
            modules: [me, ye],
            autoplay: { delay: 3e3, disableOnInteraction: !1 },
            observer: !0,
            observeParents: !0,
            slidesPerView: 3.832,
            spaceBetween: 32,
            autoHeight: !1,
            speed: 800,
            simulateTouch: !0,
            breakpoints: {
              320: { slidesPerView: 1 },
              768: { slidesPerView: 1.35 },
              889: { slidesPerView: 1.67 },
              992: { slidesPerView: 2.33 },
              1152.98: { slidesPerView: 2.849 },
              1440.98: { slidesPerView: 3.832 },
            },
            on: {},
          }));
    }
    xe.addEventListener("change", Te), Te(xe);
    new (s(732))({
      elements_selector: "[data-src]",
      class_loaded: "_lazy-loaded",
      use_native: !0,
    }).update();
    let Le = !1;
    setTimeout(() => {
      if (Le) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    var Ie = function () {
      return (
        (Ie =
          Object.assign ||
          function (e) {
            for (var t, s = 1, i = arguments.length; s < i; s++)
              for (var n in (t = arguments[s]))
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e;
          }),
        Ie.apply(this, arguments)
      );
    };
    var Ae = "lgAfterAppendSlide",
      Oe = "lgInit",
      _e = "lgHasVideo",
      Pe = "lgContainerResize",
      ke = "lgUpdateSlides",
      Me = "lgAfterAppendSubHtml",
      ze = "lgBeforeOpen",
      De = "lgAfterOpen",
      $e = "lgSlideItemLoad",
      Be = "lgBeforeSlide",
      Ge = "lgAfterSlide",
      Fe = "lgPosterClick",
      He = "lgDragStart",
      Ve = "lgDragMove",
      qe = "lgDragEnd",
      Ne = "lgBeforeNextSlide",
      Re = "lgBeforePrevSlide",
      je = "lgBeforeClose",
      We = "lgAfterClose",
      Ye = {
        mode: "lg-slide",
        easing: "ease",
        speed: 400,
        licenseKey: "0000-0000-000-0000",
        height: "100%",
        width: "100%",
        addClass: "",
        startClass: "lg-start-zoom",
        backdropDuration: 300,
        container: "",
        startAnimationDuration: 400,
        zoomFromOrigin: !0,
        hideBarsDelay: 0,
        showBarsAfter: 1e4,
        slideDelay: 0,
        supportLegacyBrowser: !0,
        allowMediaOverlap: !1,
        videoMaxSize: "1280-720",
        loadYouTubePoster: !0,
        defaultCaptionHeight: 0,
        ariaLabelledby: "",
        ariaDescribedby: "",
        resetScrollPosition: !0,
        hideScrollbar: !1,
        closable: !0,
        swipeToClose: !0,
        closeOnTap: !0,
        showCloseIcon: !0,
        showMaximizeIcon: !1,
        loop: !0,
        escKey: !0,
        keyPress: !0,
        trapFocus: !0,
        controls: !0,
        slideEndAnimation: !0,
        hideControlOnEnd: !1,
        mousewheel: !1,
        getCaptionFromTitleOrAlt: !0,
        appendSubHtmlTo: ".lg-sub-html",
        subHtmlSelectorRelative: !1,
        preload: 2,
        numberOfSlideItemsInDom: 10,
        selector: "",
        selectWithin: "",
        nextHtml: "",
        prevHtml: "",
        index: 0,
        iframeWidth: "100%",
        iframeHeight: "100%",
        iframeMaxWidth: "100%",
        iframeMaxHeight: "100%",
        download: !0,
        counter: !0,
        appendCounterTo: ".lg-toolbar",
        swipeThreshold: 50,
        enableSwipe: !0,
        enableDrag: !0,
        dynamic: !1,
        dynamicEl: [],
        extraProps: [],
        exThumbImage: "",
        isMobile: void 0,
        mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
        plugins: [],
        strings: {
          closeGallery: "Close gallery",
          toggleMaximize: "Toggle maximize",
          previousSlide: "Previous slide",
          nextSlide: "Next slide",
          download: "Download",
          playVideo: "Play video",
        },
      };
    var Xe = (function () {
      function e(e) {
        return (
          (this.cssVenderPrefixes = [
            "TransitionDuration",
            "TransitionTimingFunction",
            "Transform",
            "Transition",
          ]),
          (this.selector = this._getSelector(e)),
          (this.firstElement = this._getFirstEl()),
          this
        );
      }
      return (
        (e.generateUUID = function () {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (16 * Math.random()) | 0;
              return ("x" == e ? t : (3 & t) | 8).toString(16);
            }
          );
        }),
        (e.prototype._getSelector = function (e, t) {
          return (
            void 0 === t && (t = document),
            "string" != typeof e
              ? e
              : ((t = t || document),
                "#" === e.substring(0, 1)
                  ? t.querySelector(e)
                  : t.querySelectorAll(e))
          );
        }),
        (e.prototype._each = function (e) {
          return this.selector
            ? (void 0 !== this.selector.length
                ? [].forEach.call(this.selector, e)
                : e(this.selector, 0),
              this)
            : this;
        }),
        (e.prototype._setCssVendorPrefix = function (e, t, s) {
          var i = t.replace(/-([a-z])/gi, function (e, t) {
            return t.toUpperCase();
          });
          -1 !== this.cssVenderPrefixes.indexOf(i)
            ? ((e.style[i.charAt(0).toLowerCase() + i.slice(1)] = s),
              (e.style["webkit" + i] = s),
              (e.style["moz" + i] = s),
              (e.style["ms" + i] = s),
              (e.style["o" + i] = s))
            : (e.style[i] = s);
        }),
        (e.prototype._getFirstEl = function () {
          return this.selector && void 0 !== this.selector.length
            ? this.selector[0]
            : this.selector;
        }),
        (e.prototype.isEventMatched = function (e, t) {
          var s = t.split(".");
          return e
            .split(".")
            .filter(function (e) {
              return e;
            })
            .every(function (e) {
              return -1 !== s.indexOf(e);
            });
        }),
        (e.prototype.attr = function (e, t) {
          return void 0 === t
            ? this.firstElement
              ? this.firstElement.getAttribute(e)
              : ""
            : (this._each(function (s) {
                s.setAttribute(e, t);
              }),
              this);
        }),
        (e.prototype.find = function (e) {
          return Ue(this._getSelector(e, this.selector));
        }),
        (e.prototype.first = function () {
          return this.selector && void 0 !== this.selector.length
            ? Ue(this.selector[0])
            : Ue(this.selector);
        }),
        (e.prototype.eq = function (e) {
          return Ue(this.selector[e]);
        }),
        (e.prototype.parent = function () {
          return Ue(this.selector.parentElement);
        }),
        (e.prototype.get = function () {
          return this._getFirstEl();
        }),
        (e.prototype.removeAttr = function (e) {
          var t = e.split(" ");
          return (
            this._each(function (e) {
              t.forEach(function (t) {
                return e.removeAttribute(t);
              });
            }),
            this
          );
        }),
        (e.prototype.wrap = function (e) {
          if (!this.firstElement) return this;
          var t = document.createElement("div");
          return (
            (t.className = e),
            this.firstElement.parentNode.insertBefore(t, this.firstElement),
            this.firstElement.parentNode.removeChild(this.firstElement),
            t.appendChild(this.firstElement),
            this
          );
        }),
        (e.prototype.addClass = function (e) {
          return (
            void 0 === e && (e = ""),
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.add(e);
              });
            }),
            this
          );
        }),
        (e.prototype.removeClass = function (e) {
          return (
            this._each(function (t) {
              e.split(" ").forEach(function (e) {
                e && t.classList.remove(e);
              });
            }),
            this
          );
        }),
        (e.prototype.hasClass = function (e) {
          return !!this.firstElement && this.firstElement.classList.contains(e);
        }),
        (e.prototype.hasAttribute = function (e) {
          return !!this.firstElement && this.firstElement.hasAttribute(e);
        }),
        (e.prototype.toggleClass = function (e) {
          return this.firstElement
            ? (this.hasClass(e) ? this.removeClass(e) : this.addClass(e), this)
            : this;
        }),
        (e.prototype.css = function (e, t) {
          var s = this;
          return (
            this._each(function (i) {
              s._setCssVendorPrefix(i, e, t);
            }),
            this
          );
        }),
        (e.prototype.on = function (t, s) {
          var i = this;
          return this.selector
            ? (t.split(" ").forEach(function (t) {
                Array.isArray(e.eventListeners[t]) ||
                  (e.eventListeners[t] = []),
                  e.eventListeners[t].push(s),
                  i.selector.addEventListener(t.split(".")[0], s);
              }),
              this)
            : this;
        }),
        (e.prototype.once = function (e, t) {
          var s = this;
          return (
            this.on(e, function () {
              s.off(e), t(e);
            }),
            this
          );
        }),
        (e.prototype.off = function (t) {
          var s = this;
          return this.selector
            ? (Object.keys(e.eventListeners).forEach(function (i) {
                s.isEventMatched(t, i) &&
                  (e.eventListeners[i].forEach(function (e) {
                    s.selector.removeEventListener(i.split(".")[0], e);
                  }),
                  (e.eventListeners[i] = []));
              }),
              this)
            : this;
        }),
        (e.prototype.trigger = function (e, t) {
          if (!this.firstElement) return this;
          var s = new CustomEvent(e.split(".")[0], { detail: t || null });
          return this.firstElement.dispatchEvent(s), this;
        }),
        (e.prototype.load = function (e) {
          var t = this;
          return (
            fetch(e)
              .then(function (e) {
                return e.text();
              })
              .then(function (e) {
                t.selector.innerHTML = e;
              }),
            this
          );
        }),
        (e.prototype.html = function (e) {
          return void 0 === e
            ? this.firstElement
              ? this.firstElement.innerHTML
              : ""
            : (this._each(function (t) {
                t.innerHTML = e;
              }),
              this);
        }),
        (e.prototype.append = function (e) {
          return (
            this._each(function (t) {
              "string" == typeof e
                ? t.insertAdjacentHTML("beforeend", e)
                : t.appendChild(e);
            }),
            this
          );
        }),
        (e.prototype.prepend = function (e) {
          return (
            this._each(function (t) {
              t.insertAdjacentHTML("afterbegin", e);
            }),
            this
          );
        }),
        (e.prototype.remove = function () {
          return (
            this._each(function (e) {
              e.parentNode.removeChild(e);
            }),
            this
          );
        }),
        (e.prototype.empty = function () {
          return (
            this._each(function (e) {
              e.innerHTML = "";
            }),
            this
          );
        }),
        (e.prototype.scrollTop = function (e) {
          return void 0 !== e
            ? ((document.body.scrollTop = e),
              (document.documentElement.scrollTop = e),
              this)
            : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
        }),
        (e.prototype.scrollLeft = function (e) {
          return void 0 !== e
            ? ((document.body.scrollLeft = e),
              (document.documentElement.scrollLeft = e),
              this)
            : window.pageXOffset ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0;
        }),
        (e.prototype.offset = function () {
          if (!this.firstElement) return { left: 0, top: 0 };
          var e = this.firstElement.getBoundingClientRect(),
            t = Ue("body").style().marginLeft;
          return {
            left: e.left - parseFloat(t) + this.scrollLeft(),
            top: e.top + this.scrollTop(),
          };
        }),
        (e.prototype.style = function () {
          return this.firstElement
            ? this.firstElement.currentStyle ||
                window.getComputedStyle(this.firstElement)
            : {};
        }),
        (e.prototype.width = function () {
          var e = this.style();
          return (
            this.firstElement.clientWidth -
            parseFloat(e.paddingLeft) -
            parseFloat(e.paddingRight)
          );
        }),
        (e.prototype.height = function () {
          var e = this.style();
          return (
            this.firstElement.clientHeight -
            parseFloat(e.paddingTop) -
            parseFloat(e.paddingBottom)
          );
        }),
        (e.eventListeners = {}),
        e
      );
    })();
    function Ue(e) {
      return (
        (function () {
          if ("function" == typeof window.CustomEvent) return !1;
          window.CustomEvent = function (e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: null };
            var s = document.createEvent("CustomEvent");
            return s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s;
          };
        })(),
        Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector),
        new Xe(e)
      );
    }
    var Ke = [
      "src",
      "sources",
      "subHtml",
      "subHtmlUrl",
      "html",
      "video",
      "poster",
      "slideName",
      "responsive",
      "srcset",
      "sizes",
      "iframe",
      "downloadUrl",
      "download",
      "width",
      "facebookShareUrl",
      "tweetText",
      "iframeTitle",
      "twitterShareUrl",
      "pinterestShareUrl",
      "pinterestText",
      "fbHtml",
      "disqusIdentifier",
      "disqusUrl",
    ];
    function Ze(e) {
      return "href" === e
        ? "src"
        : (e = (e =
            (e = e.replace("data-", "")).charAt(0).toLowerCase() +
            e.slice(1)).replace(/-([a-z])/g, function (e) {
            return e[1].toUpperCase();
          }));
    }
    var Qe = function (e, t, s, i) {
        void 0 === s && (s = 0);
        var n = Ue(e).attr("data-lg-size") || i;
        if (n) {
          var r = n.split(",");
          if (r[1])
            for (var o = window.innerWidth, l = 0; l < r.length; l++) {
              var a = r[l];
              if (parseInt(a.split("-")[2], 10) > o) {
                n = a;
                break;
              }
              l === r.length - 1 && (n = a);
            }
          var c = n.split("-"),
            d = parseInt(c[0], 10),
            u = parseInt(c[1], 10),
            p = t.width(),
            h = t.height() - s,
            g = Math.min(p, d),
            m = Math.min(h, u),
            f = Math.min(g / d, m / u);
          return { width: d * f, height: u * f };
        }
      },
      Je = function (e, t, s, i, n) {
        if (n) {
          var r = Ue(e).find("img").first();
          if (r.get()) {
            var o = t.get().getBoundingClientRect(),
              l = o.width,
              a = t.height() - (s + i),
              c = r.width(),
              d = r.height(),
              u = r.style(),
              p =
                (l - c) / 2 -
                r.offset().left +
                (parseFloat(u.paddingLeft) || 0) +
                (parseFloat(u.borderLeft) || 0) +
                Ue(window).scrollLeft() +
                o.left,
              h =
                (a - d) / 2 -
                r.offset().top +
                (parseFloat(u.paddingTop) || 0) +
                (parseFloat(u.borderTop) || 0) +
                Ue(window).scrollTop() +
                s;
            return (
              "translate3d(" +
              (p *= -1) +
              "px, " +
              (h *= -1) +
              "px, 0) scale3d(" +
              c / n.width +
              ", " +
              d / n.height +
              ", 1)"
            );
          }
        }
      },
      et = function (e, t, s, i, n, r) {
        return (
          '<div class="lg-video-cont lg-has-iframe" style="width:' +
          e +
          "; max-width:" +
          s +
          "; height: " +
          t +
          "; max-height:" +
          i +
          '">\n                    <iframe class="lg-object" frameborder="0" ' +
          (r ? 'title="' + r + '"' : "") +
          ' src="' +
          n +
          '"  allowfullscreen="true"></iframe>\n                </div>'
        );
      },
      tt = function (e, t, s, i, n, r) {
        var o =
            "<img " +
            s +
            " " +
            (i ? 'srcset="' + i + '"' : "") +
            "  " +
            (n ? 'sizes="' + n + '"' : "") +
            ' class="lg-object lg-image" data-index="' +
            e +
            '" src="' +
            t +
            '" />',
          l = "";
        r &&
          (l = ("string" == typeof r ? JSON.parse(r) : r).map(function (e) {
            var t = "";
            return (
              Object.keys(e).forEach(function (s) {
                t += " " + s + '="' + e[s] + '"';
              }),
              "<source " + t + "></source>"
            );
          }));
        return "" + l + o;
      },
      st = function (e) {
        for (var t = [], s = [], i = "", n = 0; n < e.length; n++) {
          var r = e[n].split(" ");
          "" === r[0] && r.splice(0, 1), s.push(r[0]), t.push(r[1]);
        }
        for (var o = window.innerWidth, l = 0; l < t.length; l++)
          if (parseInt(t[l], 10) > o) {
            i = s[l];
            break;
          }
        return i;
      },
      it = function (e) {
        return !!e && !!e.complete && 0 !== e.naturalWidth;
      },
      nt = function (e, t, s, i, n) {
        return (
          '<div class="lg-video-cont ' +
          (n && n.youtube
            ? "lg-has-youtube"
            : n && n.vimeo
            ? "lg-has-vimeo"
            : "lg-has-html5") +
          '" style="' +
          s +
          '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
          i +
          '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
          i +
          '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
          (t || "") +
          '\n            <img class="lg-object lg-video-poster" src="' +
          e +
          '" />\n        </div>'
        );
      },
      rt = function (e) {
        var t = e.querySelectorAll(
          'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'
        );
        return [].filter.call(t, function (e) {
          var t = window.getComputedStyle(e);
          return "none" !== t.display && "hidden" !== t.visibility;
        });
      },
      ot = function (e, t, s, i) {
        var n = [],
          r = (function () {
            for (var e = 0, t = 0, s = arguments.length; t < s; t++)
              e += arguments[t].length;
            var i = Array(e),
              n = 0;
            for (t = 0; t < s; t++)
              for (var r = arguments[t], o = 0, l = r.length; o < l; o++, n++)
                i[n] = r[o];
            return i;
          })(Ke, t);
        return (
          [].forEach.call(e, function (e) {
            for (var t = {}, o = 0; o < e.attributes.length; o++) {
              var l = e.attributes[o];
              if (l.specified) {
                var a = Ze(l.name),
                  c = "";
                r.indexOf(a) > -1 && (c = a), c && (t[c] = l.value);
              }
            }
            var d = Ue(e),
              u = d.find("img").first().attr("alt"),
              p = d.attr("title"),
              h = i ? d.attr(i) : d.find("img").first().attr("src");
            (t.thumb = h),
              s && !t.subHtml && (t.subHtml = p || u || ""),
              (t.alt = u || p || ""),
              n.push(t);
          }),
          n
        );
      },
      lt = function () {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      },
      at = function (e, t, s) {
        if (!e)
          return t
            ? { html5: !0 }
            : void console.error(
                "lightGallery :- data-src is not provided on slide item " +
                  (s + 1) +
                  ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
              );
        var i = e.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
          ),
          n = e.match(
            /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
          ),
          r = e.match(
            /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
          );
        return i
          ? { youtube: i }
          : n
          ? { vimeo: n }
          : r
          ? { wistia: r }
          : void 0;
      },
      ct = 0,
      dt = (function () {
        function e(e, t) {
          if (
            ((this.lgOpened = !1),
            (this.index = 0),
            (this.plugins = []),
            (this.lGalleryOn = !1),
            (this.lgBusy = !1),
            (this.currentItemsInDom = []),
            (this.prevScrollTop = 0),
            (this.bodyPaddingRight = 0),
            (this.isDummyImageRemoved = !1),
            (this.dragOrSwipeEnabled = !1),
            (this.mediaContainerPosition = { top: 0, bottom: 0 }),
            !e)
          )
            return this;
          if (
            (ct++,
            (this.lgId = ct),
            (this.el = e),
            (this.LGel = Ue(e)),
            this.generateSettings(t),
            this.buildModules(),
            this.settings.dynamic &&
              void 0 !== this.settings.dynamicEl &&
              !Array.isArray(this.settings.dynamicEl))
          )
            throw "When using dynamic mode, you must also define dynamicEl as an Array.";
          return (
            (this.galleryItems = this.getItems()),
            this.normalizeSettings(),
            this.init(),
            this.validateLicense(),
            this
          );
        }
        return (
          (e.prototype.generateSettings = function (e) {
            if (
              ((this.settings = Ie(Ie({}, Ye), e)),
              this.settings.isMobile &&
              "function" == typeof this.settings.isMobile
                ? this.settings.isMobile()
                : lt())
            ) {
              var t = Ie(
                Ie({}, this.settings.mobileSettings),
                this.settings.mobileSettings
              );
              this.settings = Ie(Ie({}, this.settings), t);
            }
          }),
          (e.prototype.normalizeSettings = function () {
            this.settings.slideEndAnimation &&
              (this.settings.hideControlOnEnd = !1),
              this.settings.closable || (this.settings.swipeToClose = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              this.settings.dynamic && (this.zoomFromOrigin = !1),
              this.settings.container ||
                (this.settings.container = document.body),
              (this.settings.preload = Math.min(
                this.settings.preload,
                this.galleryItems.length
              ));
          }),
          (e.prototype.init = function () {
            var e = this;
            this.addSlideVideoInfo(this.galleryItems),
              this.buildStructure(),
              this.LGel.trigger(Oe, { instance: this }),
              this.settings.keyPress && this.keyPress(),
              setTimeout(function () {
                e.enableDrag(), e.enableSwipe(), e.triggerPosterClick();
              }, 50),
              this.arrow(),
              this.settings.mousewheel && this.mousewheel(),
              this.settings.dynamic || this.openGalleryOnItemClick();
          }),
          (e.prototype.openGalleryOnItemClick = function () {
            for (
              var e = this,
                t = function (t) {
                  var i = s.items[t],
                    n = Ue(i),
                    r = Xe.generateUUID();
                  n.attr("data-lg-id", r).on(
                    "click.lgcustom-item-" + r,
                    function (s) {
                      s.preventDefault();
                      var n = e.settings.index || t;
                      e.openGallery(n, i);
                    }
                  );
                },
                s = this,
                i = 0;
              i < this.items.length;
              i++
            )
              t(i);
          }),
          (e.prototype.buildModules = function () {
            var e = this;
            this.settings.plugins.forEach(function (t) {
              e.plugins.push(new t(e, Ue));
            });
          }),
          (e.prototype.validateLicense = function () {
            this.settings.licenseKey
              ? "0000-0000-000-0000" === this.settings.licenseKey &&
                console.warn(
                  "lightGallery: " +
                    this.settings.licenseKey +
                    " license key is not valid for production use"
                )
              : console.error("Please provide a valid license key");
          }),
          (e.prototype.getSlideItem = function (e) {
            return Ue(this.getSlideItemId(e));
          }),
          (e.prototype.getSlideItemId = function (e) {
            return "#lg-item-" + this.lgId + "-" + e;
          }),
          (e.prototype.getIdName = function (e) {
            return e + "-" + this.lgId;
          }),
          (e.prototype.getElementById = function (e) {
            return Ue("#" + this.getIdName(e));
          }),
          (e.prototype.manageSingleSlideClassName = function () {
            this.galleryItems.length < 2
              ? this.outer.addClass("lg-single-item")
              : this.outer.removeClass("lg-single-item");
          }),
          (e.prototype.buildStructure = function () {
            var e = this;
            if (!(this.$container && this.$container.get())) {
              var t = "",
                s = "";
              this.settings.controls &&
                (t =
                  '<button type="button" id="' +
                  this.getIdName("lg-prev") +
                  '" aria-label="' +
                  this.settings.strings.previousSlide +
                  '" class="lg-prev lg-icon"> ' +
                  this.settings.prevHtml +
                  ' </button>\n                <button type="button" id="' +
                  this.getIdName("lg-next") +
                  '" aria-label="' +
                  this.settings.strings.nextSlide +
                  '" class="lg-next lg-icon"> ' +
                  this.settings.nextHtml +
                  " </button>"),
                ".lg-item" !== this.settings.appendSubHtmlTo &&
                  (s =
                    '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
              var i = "";
              this.settings.allowMediaOverlap && (i += "lg-media-overlap ");
              var n = this.settings.ariaLabelledby
                  ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                  : "",
                r = this.settings.ariaDescribedby
                  ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                  : "",
                o =
                  "lg-container " +
                  this.settings.addClass +
                  " " +
                  (document.body !== this.settings.container
                    ? "lg-inline"
                    : ""),
                l =
                  this.settings.closable && this.settings.showCloseIcon
                    ? '<button type="button" aria-label="' +
                      this.settings.strings.closeGallery +
                      '" id="' +
                      this.getIdName("lg-close") +
                      '" class="lg-close lg-icon"></button>'
                    : "",
                a = this.settings.showMaximizeIcon
                  ? '<button type="button" aria-label="' +
                    this.settings.strings.toggleMaximize +
                    '" id="' +
                    this.getIdName("lg-maximize") +
                    '" class="lg-maximize lg-icon"></button>'
                  : "",
                c =
                  '\n        <div class="' +
                  o +
                  '" id="' +
                  this.getIdName("lg-container") +
                  '" tabindex="-1" aria-modal="true" ' +
                  n +
                  " " +
                  r +
                  ' role="dialog"\n        >\n            <div id="' +
                  this.getIdName("lg-backdrop") +
                  '" class="lg-backdrop"></div>\n\n            <div id="' +
                  this.getIdName("lg-outer") +
                  '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                  i +
                  ' ">\n\n              <div id="' +
                  this.getIdName("lg-content") +
                  '" class="lg-content">\n                <div id="' +
                  this.getIdName("lg-inner") +
                  '" class="lg-inner">\n                </div>\n                ' +
                  t +
                  '\n              </div>\n                <div id="' +
                  this.getIdName("lg-toolbar") +
                  '" class="lg-toolbar lg-group">\n                    ' +
                  a +
                  "\n                    " +
                  l +
                  "\n                    </div>\n                    " +
                  (".lg-outer" === this.settings.appendSubHtmlTo ? s : "") +
                  '\n                <div id="' +
                  this.getIdName("lg-components") +
                  '" class="lg-components">\n                    ' +
                  (".lg-sub-html" === this.settings.appendSubHtmlTo ? s : "") +
                  "\n                </div>\n            </div>\n        </div>\n        ";
              Ue(this.settings.container).append(c),
                document.body !== this.settings.container &&
                  Ue(this.settings.container).css("position", "relative"),
                (this.outer = this.getElementById("lg-outer")),
                (this.$lgComponents = this.getElementById("lg-components")),
                (this.$backdrop = this.getElementById("lg-backdrop")),
                (this.$container = this.getElementById("lg-container")),
                (this.$inner = this.getElementById("lg-inner")),
                (this.$content = this.getElementById("lg-content")),
                (this.$toolbar = this.getElementById("lg-toolbar")),
                this.$backdrop.css(
                  "transition-duration",
                  this.settings.backdropDuration + "ms"
                );
              var d = this.settings.mode + " ";
              this.manageSingleSlideClassName(),
                this.settings.enableDrag && (d += "lg-grab "),
                this.outer.addClass(d),
                this.$inner.css(
                  "transition-timing-function",
                  this.settings.easing
                ),
                this.$inner.css(
                  "transition-duration",
                  this.settings.speed + "ms"
                ),
                this.settings.download &&
                  this.$toolbar.append(
                    '<a id="' +
                      this.getIdName("lg-download") +
                      '" target="_blank" rel="noopener" aria-label="' +
                      this.settings.strings.download +
                      '" download class="lg-download lg-icon"></a>'
                  ),
                this.counter(),
                Ue(window).on(
                  "resize.lg.global" +
                    this.lgId +
                    " orientationchange.lg.global" +
                    this.lgId,
                  function () {
                    e.refreshOnResize();
                  }
                ),
                this.hideBars(),
                this.manageCloseGallery(),
                this.toggleMaximize(),
                this.initModules();
            }
          }),
          (e.prototype.refreshOnResize = function () {
            if (this.lgOpened) {
              var e = this.galleryItems[this.index].__slideVideoInfo;
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var t = this.mediaContainerPosition,
                s = t.top,
                i = t.bottom;
              if (
                ((this.currentImageSize = Qe(
                  this.items[this.index],
                  this.outer,
                  s + i,
                  e && this.settings.videoMaxSize
                )),
                e && this.resizeVideoSlide(this.index, this.currentImageSize),
                this.zoomFromOrigin && !this.isDummyImageRemoved)
              ) {
                var n = this.getDummyImgStyles(this.currentImageSize);
                this.outer
                  .find(".lg-current .lg-dummy-img")
                  .first()
                  .attr("style", n);
              }
              this.LGel.trigger(Pe);
            }
          }),
          (e.prototype.resizeVideoSlide = function (e, t) {
            var s = this.getVideoContStyle(t);
            this.getSlideItem(e).find(".lg-video-cont").attr("style", s);
          }),
          (e.prototype.updateSlides = function (e, t) {
            if (
              (this.index > e.length - 1 && (this.index = e.length - 1),
              1 === e.length && (this.index = 0),
              e.length)
            ) {
              var s = this.galleryItems[t].src;
              (this.galleryItems = e),
                this.updateControls(),
                this.$inner.empty(),
                (this.currentItemsInDom = []);
              var i = 0;
              this.galleryItems.some(function (e, t) {
                return e.src === s && ((i = t), !0);
              }),
                (this.currentItemsInDom = this.organizeSlideItems(i, -1)),
                this.loadContent(i, !0),
                this.getSlideItem(i).addClass("lg-current"),
                (this.index = i),
                this.updateCurrentCounter(i),
                this.LGel.trigger(ke);
            } else this.closeGallery();
          }),
          (e.prototype.getItems = function () {
            if (((this.items = []), this.settings.dynamic))
              return this.settings.dynamicEl || [];
            if ("this" === this.settings.selector) this.items.push(this.el);
            else if (this.settings.selector)
              if ("string" == typeof this.settings.selector)
                if (this.settings.selectWithin) {
                  var e = Ue(this.settings.selectWithin);
                  this.items = e.find(this.settings.selector).get();
                } else
                  this.items = this.el.querySelectorAll(this.settings.selector);
              else this.items = this.settings.selector;
            else this.items = this.el.children;
            return ot(
              this.items,
              this.settings.extraProps,
              this.settings.getCaptionFromTitleOrAlt,
              this.settings.exThumbImage
            );
          }),
          (e.prototype.shouldHideScrollbar = function () {
            return (
              this.settings.hideScrollbar &&
              document.body === this.settings.container
            );
          }),
          (e.prototype.hideScrollbar = function () {
            if (this.shouldHideScrollbar()) {
              this.bodyPaddingRight = parseFloat(
                Ue("body").style().paddingRight
              );
              var e = document.documentElement.getBoundingClientRect(),
                t = window.innerWidth - e.width;
              Ue(document.body).css(
                "padding-right",
                t + this.bodyPaddingRight + "px"
              ),
                Ue(document.body).addClass("lg-overlay-open");
            }
          }),
          (e.prototype.resetScrollBar = function () {
            this.shouldHideScrollbar() &&
              (Ue(document.body).css(
                "padding-right",
                this.bodyPaddingRight + "px"
              ),
              Ue(document.body).removeClass("lg-overlay-open"));
          }),
          (e.prototype.openGallery = function (e, t) {
            var s = this;
            if ((void 0 === e && (e = this.settings.index), !this.lgOpened)) {
              (this.lgOpened = !0),
                this.outer.removeClass("lg-hide-items"),
                this.hideScrollbar(),
                this.$container.addClass("lg-show");
              var i = this.getItemsToBeInsertedToDom(e, e);
              this.currentItemsInDom = i;
              var n = "";
              i.forEach(function (e) {
                n = n + '<div id="' + e + '" class="lg-item"></div>';
              }),
                this.$inner.append(n),
                this.addHtml(e);
              var r = "";
              this.mediaContainerPosition = this.getMediaContainerPosition();
              var o = this.mediaContainerPosition,
                l = o.top,
                a = o.bottom;
              this.settings.allowMediaOverlap ||
                this.setMediaContainerPosition(l, a);
              var c = this.galleryItems[e].__slideVideoInfo;
              this.zoomFromOrigin &&
                t &&
                ((this.currentImageSize = Qe(
                  t,
                  this.outer,
                  l + a,
                  c && this.settings.videoMaxSize
                )),
                (r = Je(t, this.outer, l, a, this.currentImageSize))),
                (this.zoomFromOrigin && r) ||
                  (this.outer.addClass(this.settings.startClass),
                  this.getSlideItem(e).removeClass("lg-complete"));
              var d = this.settings.zoomFromOrigin
                ? 100
                : this.settings.backdropDuration;
              setTimeout(function () {
                s.outer.addClass("lg-components-open");
              }, d),
                (this.index = e),
                this.LGel.trigger(ze),
                this.getSlideItem(e).addClass("lg-current"),
                (this.lGalleryOn = !1),
                (this.prevScrollTop = Ue(window).scrollTop()),
                setTimeout(function () {
                  if (s.zoomFromOrigin && r) {
                    var t = s.getSlideItem(e);
                    t.css("transform", r),
                      setTimeout(function () {
                        t
                          .addClass("lg-start-progress lg-start-end-progress")
                          .css(
                            "transition-duration",
                            s.settings.startAnimationDuration + "ms"
                          ),
                          s.outer.addClass("lg-zoom-from-image");
                      }),
                      setTimeout(function () {
                        t.css("transform", "translate3d(0, 0, 0)");
                      }, 100);
                  }
                  setTimeout(function () {
                    s.$backdrop.addClass("in"),
                      s.$container.addClass("lg-show-in");
                  }, 10),
                    setTimeout(function () {
                      s.settings.trapFocus &&
                        document.body === s.settings.container &&
                        s.trapFocus();
                    }, s.settings.backdropDuration + 50),
                    (s.zoomFromOrigin && r) ||
                      setTimeout(function () {
                        s.outer.addClass("lg-visible");
                      }, s.settings.backdropDuration),
                    s.slide(e, !1, !1, !1),
                    s.LGel.trigger(De);
                }),
                document.body === this.settings.container &&
                  Ue("html").addClass("lg-on");
            }
          }),
          (e.prototype.getMediaContainerPosition = function () {
            if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
            var e = this.$toolbar.get().clientHeight || 0,
              t = this.outer.find(".lg-components .lg-sub-html").get(),
              s =
                this.settings.defaultCaptionHeight ||
                (t && t.clientHeight) ||
                0,
              i = this.outer.find(".lg-thumb-outer").get();
            return { top: e, bottom: (i ? i.clientHeight : 0) + s };
          }),
          (e.prototype.setMediaContainerPosition = function (e, t) {
            void 0 === e && (e = 0),
              void 0 === t && (t = 0),
              this.$content.css("top", e + "px").css("bottom", t + "px");
          }),
          (e.prototype.hideBars = function () {
            var e = this;
            setTimeout(function () {
              e.outer.removeClass("lg-hide-items"),
                e.settings.hideBarsDelay > 0 &&
                  (e.outer.on(
                    "mousemove.lg click.lg touchstart.lg",
                    function () {
                      e.outer.removeClass("lg-hide-items"),
                        clearTimeout(e.hideBarTimeout),
                        (e.hideBarTimeout = setTimeout(function () {
                          e.outer.addClass("lg-hide-items");
                        }, e.settings.hideBarsDelay));
                    }
                  ),
                  e.outer.trigger("mousemove.lg"));
            }, this.settings.showBarsAfter);
          }),
          (e.prototype.initPictureFill = function (e) {
            if (this.settings.supportLegacyBrowser)
              try {
                picturefill({ elements: [e.get()] });
              } catch (e) {
                console.warn(
                  "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                );
              }
          }),
          (e.prototype.counter = function () {
            if (this.settings.counter) {
              var e =
                '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                this.getIdName("lg-counter-current") +
                '" class="lg-counter-current">' +
                (this.index + 1) +
                ' </span> /\n                <span id="' +
                this.getIdName("lg-counter-all") +
                '" class="lg-counter-all">' +
                this.galleryItems.length +
                " </span></div>";
              this.outer.find(this.settings.appendCounterTo).append(e);
            }
          }),
          (e.prototype.addHtml = function (e) {
            var t, s;
            if (
              (this.galleryItems[e].subHtmlUrl
                ? (s = this.galleryItems[e].subHtmlUrl)
                : (t = this.galleryItems[e].subHtml),
              !s)
            )
              if (t) {
                var i = t.substring(0, 1);
                ("." !== i && "#" !== i) ||
                  (t =
                    this.settings.subHtmlSelectorRelative &&
                    !this.settings.dynamic
                      ? Ue(this.items).eq(e).find(t).first().html()
                      : Ue(t).first().html());
              } else t = "";
            if (".lg-item" !== this.settings.appendSubHtmlTo)
              s
                ? this.outer.find(".lg-sub-html").load(s)
                : this.outer.find(".lg-sub-html").html(t);
            else {
              var n = Ue(this.getSlideItemId(e));
              s
                ? n.load(s)
                : n.append('<div class="lg-sub-html">' + t + "</div>");
            }
            null != t &&
              ("" === t
                ? this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .addClass("lg-empty-html")
                : this.outer
                    .find(this.settings.appendSubHtmlTo)
                    .removeClass("lg-empty-html")),
              this.LGel.trigger(Me, { index: e });
          }),
          (e.prototype.preload = function (e) {
            for (
              var t = 1;
              t <= this.settings.preload &&
              !(t >= this.galleryItems.length - e);
              t++
            )
              this.loadContent(e + t, !1);
            for (var s = 1; s <= this.settings.preload && !(e - s < 0); s++)
              this.loadContent(e - s, !1);
          }),
          (e.prototype.getDummyImgStyles = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                margin-left: -" +
                  e.width / 2 +
                  "px;\n                margin-top: -" +
                  e.height / 2 +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getVideoContStyle = function (e) {
            return e
              ? "width:" +
                  e.width +
                  "px;\n                height:" +
                  e.height +
                  "px"
              : "";
          }),
          (e.prototype.getDummyImageContent = function (e, t, s) {
            var i;
            if ((this.settings.dynamic || (i = Ue(this.items).eq(t)), i)) {
              var n = void 0;
              if (
                !(n = this.settings.exThumbImage
                  ? i.attr(this.settings.exThumbImage)
                  : i.find("img").first().attr("src"))
              )
                return "";
              var r =
                "<img " +
                s +
                ' style="' +
                this.getDummyImgStyles(this.currentImageSize) +
                '" class="lg-dummy-img" src="' +
                n +
                '" />';
              return (
                e.addClass("lg-first-slide"),
                this.outer.addClass("lg-first-slide-loading"),
                r
              );
            }
            return "";
          }),
          (e.prototype.setImgMarkup = function (e, t, s) {
            var i = this.galleryItems[s],
              n = i.alt,
              r = i.srcset,
              o = i.sizes,
              l = i.sources,
              a = n ? 'alt="' + n + '"' : "",
              c =
                '<picture class="lg-img-wrap"> ' +
                (this.isFirstSlideWithZoomAnimation()
                  ? this.getDummyImageContent(t, s, a)
                  : tt(s, e, a, r, o, l)) +
                "</picture>";
            t.prepend(c);
          }),
          (e.prototype.onSlideObjectLoad = function (e, t, s, i) {
            var n = e.find(".lg-object").first();
            it(n.get()) || t
              ? s()
              : (n.on("load.lg error.lg", function () {
                  s && s();
                }),
                n.on("error.lg", function () {
                  i && i();
                }));
          }),
          (e.prototype.onLgObjectLoad = function (e, t, s, i, n, r) {
            var o = this;
            this.onSlideObjectLoad(
              e,
              r,
              function () {
                o.triggerSlideItemLoad(e, t, s, i, n);
              },
              function () {
                e.addClass("lg-complete lg-complete_"),
                  e.html(
                    '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                  );
              }
            );
          }),
          (e.prototype.triggerSlideItemLoad = function (e, t, s, i, n) {
            var r = this,
              o = this.galleryItems[t],
              l = n && "video" === this.getSlideType(o) && !o.poster ? i : 0;
            setTimeout(function () {
              e.addClass("lg-complete lg-complete_"),
                r.LGel.trigger($e, {
                  index: t,
                  delay: s || 0,
                  isFirstSlide: n,
                });
            }, l);
          }),
          (e.prototype.isFirstSlideWithZoomAnimation = function () {
            return !(
              this.lGalleryOn ||
              !this.zoomFromOrigin ||
              !this.currentImageSize
            );
          }),
          (e.prototype.addSlideVideoInfo = function (e) {
            var t = this;
            e.forEach(function (e, s) {
              (e.__slideVideoInfo = at(e.src, !!e.video, s)),
                e.__slideVideoInfo &&
                  t.settings.loadYouTubePoster &&
                  !e.poster &&
                  e.__slideVideoInfo.youtube &&
                  (e.poster =
                    "//img.youtube.com/vi/" +
                    e.__slideVideoInfo.youtube[1] +
                    "/maxresdefault.jpg");
            });
          }),
          (e.prototype.loadContent = function (e, t) {
            var s = this,
              i = this.galleryItems[e],
              n = Ue(this.getSlideItemId(e)),
              r = i.poster,
              o = i.srcset,
              l = i.sizes,
              a = i.sources,
              c = i.src,
              d = i.video,
              u = d && "string" == typeof d ? JSON.parse(d) : d;
            if (i.responsive) {
              var p = i.responsive.split(",");
              c = st(p) || c;
            }
            var h = i.__slideVideoInfo,
              g = "",
              m = !!i.iframe,
              f = !this.lGalleryOn,
              v = 0;
            if (
              (f &&
                (v =
                  this.zoomFromOrigin && this.currentImageSize
                    ? this.settings.startAnimationDuration + 10
                    : this.settings.backdropDuration + 10),
              !n.hasClass("lg-loaded"))
            ) {
              if (h) {
                var y = this.mediaContainerPosition,
                  b = y.top,
                  S = y.bottom,
                  w = Qe(
                    this.items[e],
                    this.outer,
                    b + S,
                    h && this.settings.videoMaxSize
                  );
                g = this.getVideoContStyle(w);
              }
              if (m) {
                var C = et(
                  this.settings.iframeWidth,
                  this.settings.iframeHeight,
                  this.settings.iframeMaxWidth,
                  this.settings.iframeMaxHeight,
                  c,
                  i.iframeTitle
                );
                n.prepend(C);
              } else if (r) {
                var E = "";
                f &&
                  this.zoomFromOrigin &&
                  this.currentImageSize &&
                  (E = this.getDummyImageContent(n, e, ""));
                C = nt(r, E || "", g, this.settings.strings.playVideo, h);
                n.prepend(C);
              } else if (h) {
                C = '<div class="lg-video-cont " style="' + g + '"></div>';
                n.prepend(C);
              } else if ((this.setImgMarkup(c, n, e), o || a)) {
                var x = n.find(".lg-object");
                this.initPictureFill(x);
              }
              (r || h) &&
                this.LGel.trigger(_e, {
                  index: e,
                  src: c,
                  html5Video: u,
                  hasPoster: !!r,
                }),
                this.LGel.trigger(Ae, { index: e }),
                this.lGalleryOn &&
                  ".lg-item" === this.settings.appendSubHtmlTo &&
                  this.addHtml(e);
            }
            var T = 0;
            v && !Ue(document.body).hasClass("lg-from-hash") && (T = v),
              this.isFirstSlideWithZoomAnimation() &&
                (setTimeout(function () {
                  n.removeClass(
                    "lg-start-end-progress lg-start-progress"
                  ).removeAttr("style");
                }, this.settings.startAnimationDuration + 100),
                n.hasClass("lg-loaded") ||
                  setTimeout(function () {
                    if ("image" === s.getSlideType(i)) {
                      var t = i.alt,
                        d = t ? 'alt="' + t + '"' : "";
                      if (
                        (n
                          .find(".lg-img-wrap")
                          .append(tt(e, c, d, o, l, i.sources)),
                        o || a)
                      ) {
                        var u = n.find(".lg-object");
                        s.initPictureFill(u);
                      }
                    }
                    ("image" === s.getSlideType(i) ||
                      ("video" === s.getSlideType(i) && r)) &&
                      (s.onLgObjectLoad(n, e, v, T, !0, !1),
                      s.onSlideObjectLoad(
                        n,
                        !(!h || !h.html5 || r),
                        function () {
                          s.loadContentOnFirstSlideLoad(e, n, T);
                        },
                        function () {
                          s.loadContentOnFirstSlideLoad(e, n, T);
                        }
                      ));
                  }, this.settings.startAnimationDuration + 100)),
              n.addClass("lg-loaded"),
              (this.isFirstSlideWithZoomAnimation() &&
                ("video" !== this.getSlideType(i) || r)) ||
                this.onLgObjectLoad(n, e, v, T, f, !(!h || !h.html5 || r)),
              (this.zoomFromOrigin && this.currentImageSize) ||
                !n.hasClass("lg-complete_") ||
                this.lGalleryOn ||
                setTimeout(function () {
                  n.addClass("lg-complete");
                }, this.settings.backdropDuration),
              (this.lGalleryOn = !0),
              !0 === t &&
                (n.hasClass("lg-complete_")
                  ? this.preload(e)
                  : n
                      .find(".lg-object")
                      .first()
                      .on("load.lg error.lg", function () {
                        s.preload(e);
                      }));
          }),
          (e.prototype.loadContentOnFirstSlideLoad = function (e, t, s) {
            var i = this;
            setTimeout(function () {
              t.find(".lg-dummy-img").remove(),
                t.removeClass("lg-first-slide"),
                i.outer.removeClass("lg-first-slide-loading"),
                (i.isDummyImageRemoved = !0),
                i.preload(e);
            }, s + 300);
          }),
          (e.prototype.getItemsToBeInsertedToDom = function (e, t, s) {
            var i = this;
            void 0 === s && (s = 0);
            var n = [],
              r = Math.max(s, 3);
            r = Math.min(r, this.galleryItems.length);
            var o = "lg-item-" + this.lgId + "-" + t;
            if (this.galleryItems.length <= 3)
              return (
                this.galleryItems.forEach(function (e, t) {
                  n.push("lg-item-" + i.lgId + "-" + t);
                }),
                n
              );
            if (e < (this.galleryItems.length - 1) / 2) {
              for (var l = e; l > e - r / 2 && l >= 0; l--)
                n.push("lg-item-" + this.lgId + "-" + l);
              var a = n.length;
              for (l = 0; l < r - a; l++)
                n.push("lg-item-" + this.lgId + "-" + (e + l + 1));
            } else {
              for (
                l = e;
                l <= this.galleryItems.length - 1 && l < e + r / 2;
                l++
              )
                n.push("lg-item-" + this.lgId + "-" + l);
              for (a = n.length, l = 0; l < r - a; l++)
                n.push("lg-item-" + this.lgId + "-" + (e - l - 1));
            }
            return (
              this.settings.loop &&
                (e === this.galleryItems.length - 1
                  ? n.push("lg-item-" + this.lgId + "-0")
                  : 0 === e &&
                    n.push(
                      "lg-item-" +
                        this.lgId +
                        "-" +
                        (this.galleryItems.length - 1)
                    )),
              -1 === n.indexOf(o) && n.push("lg-item-" + this.lgId + "-" + t),
              n
            );
          }),
          (e.prototype.organizeSlideItems = function (e, t) {
            var s = this,
              i = this.getItemsToBeInsertedToDom(
                e,
                t,
                this.settings.numberOfSlideItemsInDom
              );
            return (
              i.forEach(function (e) {
                -1 === s.currentItemsInDom.indexOf(e) &&
                  s.$inner.append('<div id="' + e + '" class="lg-item"></div>');
              }),
              this.currentItemsInDom.forEach(function (e) {
                -1 === i.indexOf(e) && Ue("#" + e).remove();
              }),
              i
            );
          }),
          (e.prototype.getPreviousSlideIndex = function () {
            var e = 0;
            try {
              var t = this.outer.find(".lg-current").first().attr("id");
              e = parseInt(t.split("-")[3]) || 0;
            } catch (t) {
              e = 0;
            }
            return e;
          }),
          (e.prototype.setDownloadValue = function (e) {
            if (this.settings.download) {
              var t = this.galleryItems[e];
              if (!1 === t.downloadUrl || "false" === t.downloadUrl)
                this.outer.addClass("lg-hide-download");
              else {
                var s = this.getElementById("lg-download");
                this.outer.removeClass("lg-hide-download"),
                  s.attr("href", t.downloadUrl || t.src),
                  t.download && s.attr("download", t.download);
              }
            }
          }),
          (e.prototype.makeSlideAnimation = function (e, t, s) {
            var i = this;
            this.lGalleryOn && s.addClass("lg-slide-progress"),
              setTimeout(
                function () {
                  i.outer.addClass("lg-no-trans"),
                    i.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-next-slide"),
                    "prev" === e
                      ? (t.addClass("lg-prev-slide"),
                        s.addClass("lg-next-slide"))
                      : (t.addClass("lg-next-slide"),
                        s.addClass("lg-prev-slide")),
                    setTimeout(function () {
                      i.outer.find(".lg-item").removeClass("lg-current"),
                        t.addClass("lg-current"),
                        i.outer.removeClass("lg-no-trans");
                    }, 50);
                },
                this.lGalleryOn ? this.settings.slideDelay : 0
              );
          }),
          (e.prototype.slide = function (e, t, s, i) {
            var n = this,
              r = this.getPreviousSlideIndex();
            if (
              ((this.currentItemsInDom = this.organizeSlideItems(e, r)),
              !this.lGalleryOn || r !== e)
            ) {
              var o = this.galleryItems.length;
              if (!this.lgBusy) {
                this.settings.counter && this.updateCurrentCounter(e);
                var l = this.getSlideItem(e),
                  a = this.getSlideItem(r),
                  c = this.galleryItems[e],
                  d = c.__slideVideoInfo;
                if (
                  (this.outer.attr("data-lg-slide-type", this.getSlideType(c)),
                  this.setDownloadValue(e),
                  d)
                ) {
                  var u = this.mediaContainerPosition,
                    p = u.top,
                    h = u.bottom,
                    g = Qe(
                      this.items[e],
                      this.outer,
                      p + h,
                      d && this.settings.videoMaxSize
                    );
                  this.resizeVideoSlide(e, g);
                }
                if (
                  (this.LGel.trigger(Be, {
                    prevIndex: r,
                    index: e,
                    fromTouch: !!t,
                    fromThumb: !!s,
                  }),
                  (this.lgBusy = !0),
                  clearTimeout(this.hideBarTimeout),
                  this.arrowDisable(e),
                  i || (e < r ? (i = "prev") : e > r && (i = "next")),
                  t)
                ) {
                  this.outer
                    .find(".lg-item")
                    .removeClass("lg-prev-slide lg-current lg-next-slide");
                  var m = void 0,
                    f = void 0;
                  o > 2
                    ? ((m = e - 1),
                      (f = e + 1),
                      ((0 === e && r === o - 1) || (e === o - 1 && 0 === r)) &&
                        ((f = 0), (m = o - 1)))
                    : ((m = 0), (f = 1)),
                    "prev" === i
                      ? this.getSlideItem(f).addClass("lg-next-slide")
                      : this.getSlideItem(m).addClass("lg-prev-slide"),
                    l.addClass("lg-current");
                } else this.makeSlideAnimation(i, l, a);
                this.lGalleryOn
                  ? setTimeout(function () {
                      n.loadContent(e, !0),
                        ".lg-item" !== n.settings.appendSubHtmlTo &&
                          n.addHtml(e);
                    }, this.settings.speed +
                      50 +
                      (t ? 0 : this.settings.slideDelay))
                  : this.loadContent(e, !0),
                  setTimeout(function () {
                    (n.lgBusy = !1),
                      a.removeClass("lg-slide-progress"),
                      n.LGel.trigger(Ge, {
                        prevIndex: r,
                        index: e,
                        fromTouch: t,
                        fromThumb: s,
                      });
                  }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                    (t ? 0 : this.settings.slideDelay));
              }
              this.index = e;
            }
          }),
          (e.prototype.updateCurrentCounter = function (e) {
            this.getElementById("lg-counter-current").html(e + 1 + "");
          }),
          (e.prototype.updateCounterTotal = function () {
            this.getElementById("lg-counter-all").html(
              this.galleryItems.length + ""
            );
          }),
          (e.prototype.getSlideType = function (e) {
            return e.__slideVideoInfo ? "video" : e.iframe ? "iframe" : "image";
          }),
          (e.prototype.touchMove = function (e, t, s) {
            var i = t.pageX - e.pageX,
              n = t.pageY - e.pageY,
              r = !1;
            if (
              (this.swipeDirection
                ? (r = !0)
                : Math.abs(i) > 15
                ? ((this.swipeDirection = "horizontal"), (r = !0))
                : Math.abs(n) > 15 &&
                  ((this.swipeDirection = "vertical"), (r = !0)),
              r)
            ) {
              var o = this.getSlideItem(this.index);
              if ("horizontal" === this.swipeDirection) {
                null == s || s.preventDefault(),
                  this.outer.addClass("lg-dragging"),
                  this.setTranslate(o, i, 0);
                var l = o.get().offsetWidth,
                  a = (15 * l) / 100 - Math.abs((10 * i) / 100);
                this.setTranslate(
                  this.outer.find(".lg-prev-slide").first(),
                  -l + i - a,
                  0
                ),
                  this.setTranslate(
                    this.outer.find(".lg-next-slide").first(),
                    l + i + a,
                    0
                  );
              } else if (
                "vertical" === this.swipeDirection &&
                this.settings.swipeToClose
              ) {
                null == s || s.preventDefault(),
                  this.$container.addClass("lg-dragging-vertical");
                var c = 1 - Math.abs(n) / window.innerHeight;
                this.$backdrop.css("opacity", c);
                var d = 1 - Math.abs(n) / (2 * window.innerWidth);
                this.setTranslate(o, 0, n, d, d),
                  Math.abs(n) > 100 &&
                    this.outer
                      .addClass("lg-hide-items")
                      .removeClass("lg-components-open");
              }
            }
          }),
          (e.prototype.touchEnd = function (e, t, s) {
            var i,
              n = this;
            "lg-slide" !== this.settings.mode &&
              this.outer.addClass("lg-slide"),
              setTimeout(function () {
                n.$container.removeClass("lg-dragging-vertical"),
                  n.outer
                    .removeClass("lg-dragging lg-hide-items")
                    .addClass("lg-components-open");
                var r = !0;
                if ("horizontal" === n.swipeDirection) {
                  i = e.pageX - t.pageX;
                  var o = Math.abs(e.pageX - t.pageX);
                  i < 0 && o > n.settings.swipeThreshold
                    ? (n.goToNextSlide(!0), (r = !1))
                    : i > 0 &&
                      o > n.settings.swipeThreshold &&
                      (n.goToPrevSlide(!0), (r = !1));
                } else if ("vertical" === n.swipeDirection) {
                  if (
                    ((i = Math.abs(e.pageY - t.pageY)),
                    n.settings.closable && n.settings.swipeToClose && i > 100)
                  )
                    return void n.closeGallery();
                  n.$backdrop.css("opacity", 1);
                }
                if (
                  (n.outer.find(".lg-item").removeAttr("style"),
                  r && Math.abs(e.pageX - t.pageX) < 5)
                ) {
                  var l = Ue(s.target);
                  n.isPosterElement(l) && n.LGel.trigger(Fe);
                }
                n.swipeDirection = void 0;
              }),
              setTimeout(function () {
                n.outer.hasClass("lg-dragging") ||
                  "lg-slide" === n.settings.mode ||
                  n.outer.removeClass("lg-slide");
              }, this.settings.speed + 100);
          }),
          (e.prototype.enableSwipe = function () {
            var e = this,
              t = {},
              s = {},
              i = !1,
              n = !1;
            this.settings.enableSwipe &&
              (this.$inner.on("touchstart.lg", function (s) {
                e.dragOrSwipeEnabled = !0;
                var i = e.getSlideItem(e.index);
                (!Ue(s.target).hasClass("lg-item") &&
                  !i.get().contains(s.target)) ||
                  e.outer.hasClass("lg-zoomed") ||
                  e.lgBusy ||
                  1 !== s.touches.length ||
                  ((n = !0),
                  (e.touchAction = "swipe"),
                  e.manageSwipeClass(),
                  (t = {
                    pageX: s.touches[0].pageX,
                    pageY: s.touches[0].pageY,
                  }));
              }),
              this.$inner.on("touchmove.lg", function (r) {
                n &&
                  "swipe" === e.touchAction &&
                  1 === r.touches.length &&
                  ((s = {
                    pageX: r.touches[0].pageX,
                    pageY: r.touches[0].pageY,
                  }),
                  e.touchMove(t, s, r),
                  (i = !0));
              }),
              this.$inner.on("touchend.lg", function (r) {
                if ("swipe" === e.touchAction) {
                  if (i) (i = !1), e.touchEnd(s, t, r);
                  else if (n) {
                    var o = Ue(r.target);
                    e.isPosterElement(o) && e.LGel.trigger(Fe);
                  }
                  (e.touchAction = void 0), (n = !1);
                }
              }));
          }),
          (e.prototype.enableDrag = function () {
            var e = this,
              t = {},
              s = {},
              i = !1,
              n = !1;
            this.settings.enableDrag &&
              (this.outer.on("mousedown.lg", function (s) {
                e.dragOrSwipeEnabled = !0;
                var n = e.getSlideItem(e.index);
                (Ue(s.target).hasClass("lg-item") ||
                  n.get().contains(s.target)) &&
                  (e.outer.hasClass("lg-zoomed") ||
                    e.lgBusy ||
                    (s.preventDefault(),
                    e.lgBusy ||
                      (e.manageSwipeClass(),
                      (t = { pageX: s.pageX, pageY: s.pageY }),
                      (i = !0),
                      (e.outer.get().scrollLeft += 1),
                      (e.outer.get().scrollLeft -= 1),
                      e.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                      e.LGel.trigger(He))));
              }),
              Ue(window).on("mousemove.lg.global" + this.lgId, function (r) {
                i &&
                  e.lgOpened &&
                  ((n = !0),
                  (s = { pageX: r.pageX, pageY: r.pageY }),
                  e.touchMove(t, s),
                  e.LGel.trigger(Ve));
              }),
              Ue(window).on("mouseup.lg.global" + this.lgId, function (r) {
                if (e.lgOpened) {
                  var o = Ue(r.target);
                  n
                    ? ((n = !1), e.touchEnd(s, t, r), e.LGel.trigger(qe))
                    : e.isPosterElement(o) && e.LGel.trigger(Fe),
                    i &&
                      ((i = !1),
                      e.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                }
              }));
          }),
          (e.prototype.triggerPosterClick = function () {
            var e = this;
            this.$inner.on("click.lg", function (t) {
              !e.dragOrSwipeEnabled &&
                e.isPosterElement(Ue(t.target)) &&
                e.LGel.trigger(Fe);
            });
          }),
          (e.prototype.manageSwipeClass = function () {
            var e = this.index + 1,
              t = this.index - 1;
            this.settings.loop &&
              this.galleryItems.length > 2 &&
              (0 === this.index
                ? (t = this.galleryItems.length - 1)
                : this.index === this.galleryItems.length - 1 && (e = 0)),
              this.outer
                .find(".lg-item")
                .removeClass("lg-next-slide lg-prev-slide"),
              t > -1 && this.getSlideItem(t).addClass("lg-prev-slide"),
              this.getSlideItem(e).addClass("lg-next-slide");
          }),
          (e.prototype.goToNextSlide = function (e) {
            var t = this,
              s = this.settings.loop;
            e && this.galleryItems.length < 3 && (s = !1),
              this.lgBusy ||
                (this.index + 1 < this.galleryItems.length
                  ? (this.index++,
                    this.LGel.trigger(Ne, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : s
                  ? ((this.index = 0),
                    this.LGel.trigger(Ne, { index: this.index }),
                    this.slide(this.index, !!e, !1, "next"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-right-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-right-end");
                    }, 400)));
          }),
          (e.prototype.goToPrevSlide = function (e) {
            var t = this,
              s = this.settings.loop;
            e && this.galleryItems.length < 3 && (s = !1),
              this.lgBusy ||
                (this.index > 0
                  ? (this.index--,
                    this.LGel.trigger(Re, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : s
                  ? ((this.index = this.galleryItems.length - 1),
                    this.LGel.trigger(Re, { index: this.index, fromTouch: e }),
                    this.slide(this.index, !!e, !1, "prev"))
                  : this.settings.slideEndAnimation &&
                    !e &&
                    (this.outer.addClass("lg-left-end"),
                    setTimeout(function () {
                      t.outer.removeClass("lg-left-end");
                    }, 400)));
          }),
          (e.prototype.keyPress = function () {
            var e = this;
            Ue(window).on("keydown.lg.global" + this.lgId, function (t) {
              e.lgOpened &&
                !0 === e.settings.escKey &&
                27 === t.keyCode &&
                (t.preventDefault(),
                e.settings.allowMediaOverlap &&
                e.outer.hasClass("lg-can-toggle") &&
                e.outer.hasClass("lg-components-open")
                  ? e.outer.removeClass("lg-components-open")
                  : e.closeGallery()),
                e.lgOpened &&
                  e.galleryItems.length > 1 &&
                  (37 === t.keyCode && (t.preventDefault(), e.goToPrevSlide()),
                  39 === t.keyCode && (t.preventDefault(), e.goToNextSlide()));
            });
          }),
          (e.prototype.arrow = function () {
            var e = this;
            this.getElementById("lg-prev").on("click.lg", function () {
              e.goToPrevSlide();
            }),
              this.getElementById("lg-next").on("click.lg", function () {
                e.goToNextSlide();
              });
          }),
          (e.prototype.arrowDisable = function (e) {
            if (!this.settings.loop && this.settings.hideControlOnEnd) {
              var t = this.getElementById("lg-prev"),
                s = this.getElementById("lg-next");
              e + 1 === this.galleryItems.length
                ? s.attr("disabled", "disabled").addClass("disabled")
                : s.removeAttr("disabled").removeClass("disabled"),
                0 === e
                  ? t.attr("disabled", "disabled").addClass("disabled")
                  : t.removeAttr("disabled").removeClass("disabled");
            }
          }),
          (e.prototype.setTranslate = function (e, t, s, i, n) {
            void 0 === i && (i = 1),
              void 0 === n && (n = 1),
              e.css(
                "transform",
                "translate3d(" +
                  t +
                  "px, " +
                  s +
                  "px, 0px) scale3d(" +
                  i +
                  ", " +
                  n +
                  ", 1)"
              );
          }),
          (e.prototype.mousewheel = function () {
            var e = this,
              t = 0;
            this.outer.on("wheel.lg", function (s) {
              if (s.deltaY && !(e.galleryItems.length < 2)) {
                s.preventDefault();
                var i = new Date().getTime();
                i - t < 1e3 ||
                  ((t = i),
                  s.deltaY > 0
                    ? e.goToNextSlide()
                    : s.deltaY < 0 && e.goToPrevSlide());
              }
            });
          }),
          (e.prototype.isSlideElement = function (e) {
            return (
              e.hasClass("lg-outer") ||
              e.hasClass("lg-item") ||
              e.hasClass("lg-img-wrap")
            );
          }),
          (e.prototype.isPosterElement = function (e) {
            var t = this.getSlideItem(this.index)
              .find(".lg-video-play-button")
              .get();
            return (
              e.hasClass("lg-video-poster") ||
              e.hasClass("lg-video-play-button") ||
              (t && t.contains(e.get()))
            );
          }),
          (e.prototype.toggleMaximize = function () {
            var e = this;
            this.getElementById("lg-maximize").on("click.lg", function () {
              e.$container.toggleClass("lg-inline"), e.refreshOnResize();
            });
          }),
          (e.prototype.invalidateItems = function () {
            for (var e = 0; e < this.items.length; e++) {
              var t = Ue(this.items[e]);
              t.off("click.lgcustom-item-" + t.attr("data-lg-id"));
            }
          }),
          (e.prototype.trapFocus = function () {
            var e = this;
            this.$container.get().focus({ preventScroll: !0 }),
              Ue(window).on("keydown.lg.global" + this.lgId, function (t) {
                if (e.lgOpened && ("Tab" === t.key || 9 === t.keyCode)) {
                  var s = rt(e.$container.get()),
                    i = s[0],
                    n = s[s.length - 1];
                  t.shiftKey
                    ? document.activeElement === i &&
                      (n.focus(), t.preventDefault())
                    : document.activeElement === n &&
                      (i.focus(), t.preventDefault());
                }
              });
          }),
          (e.prototype.manageCloseGallery = function () {
            var e = this;
            if (this.settings.closable) {
              var t = !1;
              this.getElementById("lg-close").on("click.lg", function () {
                e.closeGallery();
              }),
                this.settings.closeOnTap &&
                  (this.outer.on("mousedown.lg", function (s) {
                    var i = Ue(s.target);
                    t = !!e.isSlideElement(i);
                  }),
                  this.outer.on("mousemove.lg", function () {
                    t = !1;
                  }),
                  this.outer.on("mouseup.lg", function (s) {
                    var i = Ue(s.target);
                    e.isSlideElement(i) &&
                      t &&
                      (e.outer.hasClass("lg-dragging") || e.closeGallery());
                  }));
            }
          }),
          (e.prototype.closeGallery = function (e) {
            var t = this;
            if (!this.lgOpened || (!this.settings.closable && !e)) return 0;
            this.LGel.trigger(je),
              this.settings.resetScrollPosition &&
                !this.settings.hideScrollbar &&
                Ue(window).scrollTop(this.prevScrollTop);
            var s,
              i = this.items[this.index];
            if (this.zoomFromOrigin && i) {
              var n = this.mediaContainerPosition,
                r = n.top,
                o = n.bottom,
                l = this.galleryItems[this.index],
                a = l.__slideVideoInfo,
                c = l.poster,
                d = Qe(
                  i,
                  this.outer,
                  r + o,
                  a && c && this.settings.videoMaxSize
                );
              s = Je(i, this.outer, r, o, d);
            }
            this.zoomFromOrigin && s
              ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                this.getSlideItem(this.index)
                  .addClass("lg-start-end-progress")
                  .css(
                    "transition-duration",
                    this.settings.startAnimationDuration + "ms"
                  )
                  .css("transform", s))
              : (this.outer.addClass("lg-hide-items"),
                this.outer.removeClass("lg-zoom-from-image")),
              this.destroyModules(),
              (this.lGalleryOn = !1),
              (this.isDummyImageRemoved = !1),
              (this.zoomFromOrigin = this.settings.zoomFromOrigin),
              clearTimeout(this.hideBarTimeout),
              (this.hideBarTimeout = !1),
              Ue("html").removeClass("lg-on"),
              this.outer.removeClass("lg-visible lg-components-open"),
              this.$backdrop.removeClass("in").css("opacity", 0);
            var u =
              this.zoomFromOrigin && s
                ? Math.max(
                    this.settings.startAnimationDuration,
                    this.settings.backdropDuration
                  )
                : this.settings.backdropDuration;
            return (
              this.$container.removeClass("lg-show-in"),
              setTimeout(function () {
                t.zoomFromOrigin &&
                  s &&
                  t.outer.removeClass("lg-zoom-from-image"),
                  t.$container.removeClass("lg-show"),
                  t.resetScrollBar(),
                  t.$backdrop
                    .removeAttr("style")
                    .css(
                      "transition-duration",
                      t.settings.backdropDuration + "ms"
                    ),
                  t.outer.removeClass("lg-closing " + t.settings.startClass),
                  t.getSlideItem(t.index).removeClass("lg-start-end-progress"),
                  t.$inner.empty(),
                  t.lgOpened && t.LGel.trigger(We, { instance: t }),
                  t.$container.get() && t.$container.get().blur(),
                  (t.lgOpened = !1);
              }, u + 100),
              u + 100
            );
          }),
          (e.prototype.initModules = function () {
            this.plugins.forEach(function (e) {
              try {
                e.init();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly initiated"
                );
              }
            });
          }),
          (e.prototype.destroyModules = function (e) {
            this.plugins.forEach(function (t) {
              try {
                e ? t.destroy() : t.closeGallery && t.closeGallery();
              } catch (e) {
                console.warn(
                  "lightGallery:- make sure lightGallery module is properly destroyed"
                );
              }
            });
          }),
          (e.prototype.refresh = function (e) {
            this.settings.dynamic || this.invalidateItems(),
              (this.galleryItems = e || this.getItems()),
              this.updateControls(),
              this.openGalleryOnItemClick(),
              this.LGel.trigger(ke);
          }),
          (e.prototype.updateControls = function () {
            this.addSlideVideoInfo(this.galleryItems),
              this.updateCounterTotal(),
              this.manageSingleSlideClassName();
          }),
          (e.prototype.destroyGallery = function () {
            this.destroyModules(!0),
              this.settings.dynamic || this.invalidateItems(),
              Ue(window).off(".lg.global" + this.lgId),
              this.LGel.off(".lg"),
              this.$container.remove();
          }),
          (e.prototype.destroy = function () {
            var e = this.closeGallery(!0);
            return (
              e
                ? setTimeout(this.destroyGallery.bind(this), e)
                : this.destroyGallery(),
              e
            );
          }),
          e
        );
      })();
    const ut = function (e, t) {
      return new dt(e, t);
    };
    var pt = s(571),
      ht = s(797),
      gt = s(216),
      mt = s(951),
      ft = s(226);
    const vt = document.querySelectorAll("[data-gallery]");
    vt.length &&
      vt.forEach((e) => {
        ut(e, {
          plugins: [pt, ht, gt, mt, ft],
          licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
          speed: 500,
        });
      });
    document.getElementsByTagName("body")[0];
    let yt = document.querySelector(".preloader");
    document.documentElement.classList.add("lock"),
      (window.onload = function () {
        yt &&
          (yt.classList.add("hide-preloader"),
          setInterval(function () {
            yt.classList.add("preloader-hidden");
          }, 990)),
          document.documentElement.classList.remove("lock");
      }),
      (window.FLS = !0),
      (function (e) {
        let t = new Image();
        (t.onload = t.onerror =
          function () {
            e(2 == t.height);
          }),
          (t.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
      })(function (e) {
        let t = !0 === e ? "webp" : "no-webp";
        document.documentElement.classList.add(t);
      }),
      (function () {
        let e = document.querySelector(".icon-menu");
        e &&
          e.addEventListener("click", function (e) {
            l && (a(), document.documentElement.classList.toggle("menu-open"));
          });
      })(),
      (function () {
        if (document.querySelectorAll("[data-fullscreen]").length && i.any()) {
          function e() {
            let e = 0.01 * window.innerHeight;
            document.documentElement.style.setProperty("--vh", `${e}px`);
          }
          window.addEventListener("resize", e), e();
        }
      })(),
      (function () {
        const e = document.querySelectorAll("[data-spollers]");
        if (e.length > 0) {
          const t = Array.from(e).filter(function (e, t, s) {
            return !e.dataset.spollers.split(",")[0];
          });
          t.length && i(t);
          let s = p(e, "spollers");
          function i(e, t = !1) {
            e.forEach((e) => {
              (e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    r(e),
                    e.addEventListener("click", l))
                  : (e.classList.remove("_spoller-init"),
                    r(e, !1),
                    e.removeEventListener("click", l));
            });
          }
          function r(e, t = !0) {
            const s = e.querySelectorAll("[data-spoller]");
            s.length > 0 &&
              s.forEach((e) => {
                t
                  ? (e.removeAttribute("tabindex"),
                    e.classList.contains("_spoller-active") ||
                      (e.nextElementSibling.hidden = !0))
                  : (e.setAttribute("tabindex", "-1"),
                    (e.nextElementSibling.hidden = !1));
              });
          }
          function l(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const s = t.closest("[data-spoller]"),
                i = s.closest("[data-spollers]"),
                n = !!i.hasAttribute("data-one-spoller");
              i.querySelectorAll("._slide").length ||
                (n && !s.classList.contains("_spoller-active") && a(i),
                s.classList.toggle("_spoller-active"),
                o(s.nextElementSibling, 500)),
                e.preventDefault();
            }
          }
          function a(e) {
            const t = e.querySelector("[data-spoller]._spoller-active");
            t &&
              (t.classList.remove("_spoller-active"),
              n(t.nextElementSibling, 500));
          }
          s &&
            s.length &&
            s.forEach((e) => {
              e.matchMedia.addEventListener("change", function () {
                i(e.itemsArray, e.matchMedia);
              }),
                i(e.itemsArray, e.matchMedia);
            });
        }
      })(),
      new t({}),
      (function () {
        const e = document.querySelectorAll(
          "input[placeholder],textarea[placeholder]"
        );
        e.length &&
          e.forEach((e) => {
            e.dataset.placeholder = e.placeholder;
          }),
          document.body.addEventListener("focusin", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = ""),
              t.classList.add("_form-focus"),
              t.parentElement.classList.add("_form-focus"),
              f.removeError(t));
          }),
          document.body.addEventListener("focusout", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
              t.classList.remove("_form-focus"),
              t.parentElement.classList.remove("_form-focus"),
              t.hasAttribute("data-validate") && f.validateInput(t));
          });
      })(),
      (function (e) {
        const t = document.forms;
        if (t.length)
          for (const e of t)
            e.addEventListener("submit", function (e) {
              s(e.target, e);
            }),
              e.addEventListener("reset", function (e) {
                const t = e.target;
                f.formClean(t);
              });
        async function s(t, s) {
          if (0 === (e ? f.getErrors(t) : 0)) {
            if (t.hasAttribute("data-ajax")) {
              s.preventDefault();
              const e = t.getAttribute("action")
                  ? t.getAttribute("action").trim()
                  : "#",
                n = t.getAttribute("method")
                  ? t.getAttribute("method").trim()
                  : "GET",
                r = new FormData(t);
              t.classList.add("_sending");
              const o = await fetch(e, { method: n, body: r });
              if (o.ok) {
                await o.json();
                t.classList.remove("_sending"), i(t);
              } else alert("Ошибка"), t.classList.remove("_sending");
            } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
          } else {
            s.preventDefault();
            const e = t.querySelector("._form-error");
            e && t.hasAttribute("data-goto-error") && h(e, !0, 1e3);
          }
        }
        function i(e) {
          document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: e } })
          ),
            f.formClean(e),
            u(`[Формы]: ${"Форма отправлена!"}`);
        }
      })(!0),
      (function () {
        const e = document.querySelectorAll(".rating");
        e.length > 0 &&
          (function () {
            let t, s;
            for (let t = 0; t < e.length; t++) {
              i(e[t]);
            }
            function i(e) {
              n(e), r(), e.classList.contains("rating_set") && o(e);
            }
            function n(e) {
              (t = e.querySelector(".rating__active")),
                (s = e.querySelector(".rating__value"));
            }
            function r(e = s.innerHTML) {
              const i = e / 0.05;
              t.style.width = `${i}%`;
            }
            function o(e) {
              const t = e.querySelectorAll(".rating__item");
              for (let i = 0; i < t.length; i++) {
                const o = t[i];
                o.addEventListener("mouseenter", function (t) {
                  n(e), r(o.value);
                }),
                  o.addEventListener("mouseleave", function (e) {
                    r();
                  }),
                  o.addEventListener("click", function (t) {
                    n(e),
                      e.dataset.ajax
                        ? l(o.value, e)
                        : ((s.innerHTML = i + 1), r());
                  });
              }
            }
            async function l(e, t) {
              if (!t.classList.contains("rating_sending")) {
                t.classList.add("rating_sending");
                let e = await fetch("rating.json", { method: "GET" });
                if (e.ok) {
                  const i = (await e.json()).newRating;
                  (s.innerHTML = i), r(), t.classList.remove("rating_sending");
                } else alert("Ошибка"), t.classList.remove("rating_sending");
              }
            }
          })();
      })(),
      (m.selectModule = new g({}));
  })();
})();
