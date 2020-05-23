/*
 Highcharts JS v8.0.0 (2019-12-10)

 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (f) {
    "object" === typeof module && module.exports ? (f["default"] = f, module.exports = f) : "function" === typeof define && define.amd ? define("highcharts/modules/exporting", ["src/main/webapp/assets/js/highcharts/highcharts"], function (k) {
        f(k);
        f.Highcharts = k;
        return f
    }) : f("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function (f) {
    function k(e, g, f, H) {
        e.hasOwnProperty(g) || (e[g] = H.apply(null, f))
    }

    f = f ? f._modules : {};
    k(f, "modules/full-screen.src.js", [f["parts/Globals.js"]], function (e) {
        (e.FullScreen = function (e) {
            this.init(e.parentNode)
        }).prototype =
            {
                init: function (e) {
                    var g;
                    e.requestFullscreen ? g = e.requestFullscreen() : e.mozRequestFullScreen ? g = e.mozRequestFullScreen() : e.webkitRequestFullscreen ? g = e.webkitRequestFullscreen() : e.msRequestFullscreen && (g = e.msRequestFullscreen());
                    if (g) g["catch"](function () {
                        alert("Full screen is not supported inside a frame")
                    })
                }
            }
    });
    k(f, "mixins/navigation.js", [], function () {
        return {
            initUpdate: function (e) {
                e.navigation || (e.navigation = {
                    updates: [], update: function (e, f) {
                        this.updates.forEach(function (g) {
                            g.update.call(g.context, e,
                                f)
                        })
                    }
                })
            }, addUpdate: function (e, g) {
                g.navigation || this.initUpdate(g);
                g.navigation.updates.push({update: e, context: g})
            }
        }
    });
    k(f, "modules/exporting.src.js", [f["parts/Globals.js"], f["parts/Utilities.js"], f["mixins/navigation.js"]], function (e, g, f) {
        var k = g.discardElement, t = g.extend, I = g.isObject, C = g.objectEach, r = g.pick;
        g = e.defaultOptions;
        var w = e.doc, A = e.Chart, x = e.addEvent, J = e.removeEvent, B = e.fireEvent, v = e.createElement, n = e.css,
            p = e.merge, K = e.isTouchDevice, y = e.win, F = y.navigator.userAgent, D = e.SVGRenderer,
            G = e.Renderer.prototype.symbols,
            L = /Edge\/|Trident\/|MSIE /.test(F), M = /firefox/i.test(F);
        t(g.lang, {
            viewFullscreen: "View in full screen",
            printChart: "Print chart",
            downloadPNG: "Download PNG image",
            downloadJPEG: "Download JPEG image",
            downloadPDF: "Download PDF document",
            downloadSVG: "Download SVG vector image",
            contextButtonTitle: "Chart context menu"
        });
        g.navigation || (g.navigation = {});
        p(!0, g.navigation, {
            buttonOptions: {
                theme: {},
                symbolSize: 14,
                symbolX: 12.5,
                symbolY: 10.5,
                align: "right",
                buttonSpacing: 3,
                height: 22,
                verticalAlign: "top",
                width: 24
            }
        });
        p(!0, g.navigation, {
            menuStyle: {border: "1px solid #999999", background: "#ffffff", padding: "5px 0"},
            menuItemStyle: {
                padding: "0.5em 1em",
                color: "#333333",
                background: "none",
                fontSize: K ? "14px" : "11px",
                transition: "background 250ms, color 250ms"
            },
            menuItemHoverStyle: {background: "#335cad", color: "#ffffff"},
            buttonOptions: {symbolFill: "#666666", symbolStroke: "#666666", symbolStrokeWidth: 3, theme: {padding: 5}}
        });
        g.exporting = {
            type: "image/png", url: "https://export.highcharts.com/", printMaxWidth: 780, scale: 2, buttons: {
                contextButton: {
                    className: "highcharts-contextbutton",
                    menuClassName: "highcharts-contextmenu",
                    symbol: "menu",
                    titleKey: "contextButtonTitle",
                    menuItems: "viewFullscreen printChart separator downloadPNG downloadJPEG downloadPDF downloadSVG".split(" ")
                }
            }, menuItemDefinitions: {
                viewFullscreen: {
                    textKey: "viewFullscreen", onclick: function () {
                        this.fullscreen = new e.FullScreen(this.container)
                    }
                }, printChart: {
                    textKey: "printChart", onclick: function () {
                        this.print()
                    }
                }, separator: {separator: !0}, downloadPNG: {
                    textKey: "downloadPNG", onclick: function () {
                        this.exportChart()
                    }
                }, downloadJPEG: {
                    textKey: "downloadJPEG",
                    onclick: function () {
                        this.exportChart({type: "image/jpeg"})
                    }
                }, downloadPDF: {
                    textKey: "downloadPDF", onclick: function () {
                        this.exportChart({type: "application/pdf"})
                    }
                }, downloadSVG: {
                    textKey: "downloadSVG", onclick: function () {
                        this.exportChart({type: "image/svg+xml"})
                    }
                }
            }
        };
        e.post = function (a, b, c) {
            var d = v("form", p({
                method: "post",
                action: a,
                enctype: "multipart/form-data"
            }, c), {display: "none"}, w.body);
            C(b, function (a, b) {
                v("input", {type: "hidden", name: b, value: a}, null, d)
            });
            d.submit();
            k(d)
        };
        e.isSafari && e.win.matchMedia("print").addListener(function (a) {
            e.printingChart &&
            (a.matches ? e.printingChart.beforePrint() : e.printingChart.afterPrint())
        });
        t(A.prototype, {
            sanitizeSVG: function (a, b) {
                var c = a.indexOf("</svg>") + 6, d = a.substr(c);
                a = a.substr(0, c);
                b && b.exporting && b.exporting.allowHTML && d && (d = '<foreignObject x="0" y="0" width="' + b.chart.width + '" height="' + b.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + d + "</body></foreignObject>", a = a.replace("</svg>", d + "</svg>"));
                a = a.replace(/zIndex="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g,
                    "").replace(/url\(("|&quot;)(.*?)("|&quot;);?\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+:)href=/g, " xlink:href=").replace(/\n/, " ").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, "\u00a0").replace(/&shy;/g, "\u00ad");
                this.ieSanitizeSVG && (a = this.ieSanitizeSVG(a));
                return a
            }, getChartHTML: function () {
                this.styledMode && this.inlineStyles();
                return this.container.innerHTML
            }, getSVG: function (a) {
                var b, c = p(this.options, a);
                c.plotOptions = p(this.userOptions.plotOptions, a && a.plotOptions);
                c.time = p(this.userOptions.time, a && a.time);
                var d = v("div", null, {
                    position: "absolute",
                    top: "-9999em",
                    width: this.chartWidth + "px",
                    height: this.chartHeight + "px"
                }, w.body);
                var g = this.renderTo.style.width;
                var q = this.renderTo.style.height;
                g = c.exporting.sourceWidth || c.chart.width || /px$/.test(g) && parseInt(g, 10) || (c.isGantt ? 800 : 600);
                q = c.exporting.sourceHeight || c.chart.height ||
                    /px$/.test(q) && parseInt(q, 10) || 400;
                t(c.chart, {animation: !1, renderTo: d, forExport: !0, renderer: "SVGRenderer", width: g, height: q});
                c.exporting.enabled = !1;
                delete c.data;
                c.series = [];
                this.series.forEach(function (a) {
                    b = p(a.userOptions, {
                        animation: !1,
                        enableMouseTracking: !1,
                        showCheckbox: !1,
                        visible: a.visible
                    });
                    b.isInternal || c.series.push(b)
                });
                this.axes.forEach(function (a) {
                    a.userOptions.internalKey || (a.userOptions.internalKey = e.uniqueKey())
                });
                var f = new e.Chart(c, this.callback);
                a && ["xAxis", "yAxis", "series"].forEach(function (b) {
                    var d =
                        {};
                    a[b] && (d[b] = a[b], f.update(d))
                });
                this.axes.forEach(function (a) {
                    var b = e.find(f.axes, function (b) {
                        return b.options.internalKey === a.userOptions.internalKey
                    }), d = a.getExtremes(), c = d.userMin;
                    d = d.userMax;
                    b && ("undefined" !== typeof c && c !== b.min || "undefined" !== typeof d && d !== b.max) && b.setExtremes(c, d, !0, !1)
                });
                g = f.getChartHTML();
                B(this, "getSVG", {chartCopy: f});
                g = this.sanitizeSVG(g, c);
                c = null;
                f.destroy();
                k(d);
                return g
            }, getSVGForExport: function (a, b) {
                var c = this.options.exporting;
                return this.getSVG(p({chart: {borderRadius: 0}},
                    c.chartOptions, b, {
                        exporting: {
                            sourceWidth: a && a.sourceWidth || c.sourceWidth,
                            sourceHeight: a && a.sourceHeight || c.sourceHeight
                        }
                    }))
            }, getFilename: function () {
                var a = this.userOptions.title && this.userOptions.title.text, b = this.options.exporting.filename;
                if (b) return b.replace(/\//g, "-");
                "string" === typeof a && (b = a.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "").replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-]/g, "").replace(/^[\-]+/g, "").replace(/[\-]+/g, "-").substr(0, 24).replace(/[\-]+$/g, ""));
                if (!b || 5 > b.length) b = "chart";
                return b
            }, exportChart: function (a, b) {
                b = this.getSVGForExport(a, b);
                a = p(this.options.exporting, a);
                e.post(a.url, {
                    filename: a.filename ? a.filename.replace(/\//g, "-") : this.getFilename(),
                    type: a.type,
                    width: a.width || 0,
                    scale: a.scale,
                    svg: b
                }, a.formAttributes)
            }, moveContainers: function (a) {
                (this.fixedDiv ? [this.fixedDiv, this.scrollingContainer] : [this.container]).forEach(function (b) {
                    a.appendChild(b)
                })
            }, beforePrint: function () {
                var a = w.body, b = this.options.exporting.printMaxWidth, c = {
                    childNodes: a.childNodes, origDisplay: [],
                    resetParams: void 0
                };
                this.isPrinting = !0;
                this.pointer.reset(null, 0);
                B(this, "beforePrint");
                b && this.chartWidth > b && (c.resetParams = [this.options.chart.width, void 0, !1], this.setSize(b, void 0, !1));
                [].forEach.call(c.childNodes, function (a, b) {
                    1 === a.nodeType && (c.origDisplay[b] = a.style.display, a.style.display = "none")
                });
                this.moveContainers(a);
                this.printReverseInfo = c
            }, afterPrint: function () {
                if (this.printReverseInfo) {
                    var a = this.printReverseInfo.childNodes, b = this.printReverseInfo.origDisplay,
                        c = this.printReverseInfo.resetParams;
                    this.moveContainers(this.renderTo);
                    [].forEach.call(a, function (a, c) {
                        1 === a.nodeType && (a.style.display = b[c] || "")
                    });
                    this.isPrinting = !1;
                    c && this.setSize.apply(this, c);
                    delete this.printReverseInfo;
                    delete e.printingChart;
                    B(this, "afterPrint")
                }
            }, print: function () {
                var a = this;
                a.isPrinting || (e.printingChart = a, e.isSafari || a.beforePrint(), setTimeout(function () {
                    y.focus();
                    y.print();
                    e.isSafari || setTimeout(function () {
                        a.afterPrint()
                    }, 1E3)
                }, 1))
            }, contextMenu: function (a, b, c, d, g, f, E) {
                var h = this, q = h.options.navigation, p = h.chartWidth,
                    z = h.chartHeight, m = "cache-" + a, l = h[m], u = Math.max(g, f);
                if (!l) {
                    h.exportContextMenu = h[m] = l = v("div", {className: a}, {
                        position: "absolute",
                        zIndex: 1E3,
                        padding: u + "px",
                        pointerEvents: "auto"
                    }, h.fixedDiv || h.container);
                    var k = v("ul", {className: "highcharts-menu"}, {listStyle: "none", margin: 0, padding: 0}, l);
                    h.styledMode || n(k, t({
                        MozBoxShadow: "3px 3px 10px #888",
                        WebkitBoxShadow: "3px 3px 10px #888",
                        boxShadow: "3px 3px 10px #888"
                    }, q.menuStyle));
                    l.hideMenu = function () {
                        n(l, {display: "none"});
                        E && E.setState(0);
                        h.openMenu = !1;
                        n(h.renderTo,
                            {overflow: "hidden"});
                        e.clearTimeout(l.hideTimer);
                        B(h, "exportMenuHidden")
                    };
                    h.exportEvents.push(x(l, "mouseleave", function () {
                        l.hideTimer = y.setTimeout(l.hideMenu, 500)
                    }), x(l, "mouseenter", function () {
                        e.clearTimeout(l.hideTimer)
                    }), x(w, "mouseup", function (b) {
                        h.pointer.inClass(b.target, a) || l.hideMenu()
                    }), x(l, "click", function () {
                        h.openMenu && l.hideMenu()
                    }));
                    b.forEach(function (a) {
                        "string" === typeof a && (a = h.options.exporting.menuItemDefinitions[a]);
                        if (I(a, !0)) {
                            if (a.separator) var b = v("hr", null, null, k); else b = v("li",
                                {
                                    className: "highcharts-menu-item", onclick: function (b) {
                                        b && b.stopPropagation();
                                        l.hideMenu();
                                        a.onclick && a.onclick.apply(h, arguments)
                                    }, innerHTML: a.text || h.options.lang[a.textKey]
                                }, null, k), h.styledMode || (b.onmouseover = function () {
                                n(this, q.menuItemHoverStyle)
                            }, b.onmouseout = function () {
                                n(this, q.menuItemStyle)
                            }, n(b, t({cursor: "pointer"}, q.menuItemStyle)));
                            h.exportDivElements.push(b)
                        }
                    });
                    h.exportDivElements.push(k, l);
                    h.exportMenuWidth = l.offsetWidth;
                    h.exportMenuHeight = l.offsetHeight
                }
                b = {display: "block"};
                c + h.exportMenuWidth >
                p ? b.right = p - c - g - u + "px" : b.left = c - u + "px";
                d + f + h.exportMenuHeight > z && "top" !== E.alignOptions.verticalAlign ? b.bottom = z - d - u + "px" : b.top = d + f - u + "px";
                n(l, b);
                n(h.renderTo, {overflow: ""});
                h.openMenu = !0;
                B(h, "exportMenuShown")
            }, addButton: function (a) {
                var b = this, c = b.renderer, d = p(b.options.navigation.buttonOptions, a), e = d.onclick,
                    g = d.menuItems, f = d.symbolSize || 12;
                b.btnCount || (b.btnCount = 0);
                b.exportDivElements || (b.exportDivElements = [], b.exportSVGElements = []);
                if (!1 !== d.enabled) {
                    var h = d.theme, k = h.states, n = k && k.hover;
                    k = k &&
                        k.select;
                    var z;
                    b.styledMode || (h.fill = r(h.fill, "#ffffff"), h.stroke = r(h.stroke, "none"));
                    delete h.states;
                    e ? z = function (a) {
                        a && a.stopPropagation();
                        e.call(b, a)
                    } : g && (z = function (a) {
                        a && a.stopPropagation();
                        b.contextMenu(m.menuClassName, g, m.translateX, m.translateY, m.width, m.height, m);
                        m.setState(2)
                    });
                    d.text && d.symbol ? h.paddingLeft = r(h.paddingLeft, 25) : d.text || t(h, {
                        width: d.width,
                        height: d.height,
                        padding: 0
                    });
                    b.styledMode || (h["stroke-linecap"] = "round", h.fill = r(h.fill, "#ffffff"), h.stroke = r(h.stroke, "none"));
                    var m = c.button(d.text,
                        0, 0, z, h, n, k).addClass(a.className).attr({title: r(b.options.lang[d._titleKey || d.titleKey], "")});
                    m.menuClassName = a.menuClassName || "highcharts-menu-" + b.btnCount++;
                    if (d.symbol) {
                        var l = c.symbol(d.symbol, d.symbolX - f / 2, d.symbolY - f / 2, f, f, {
                            width: f,
                            height: f
                        }).addClass("highcharts-button-symbol").attr({zIndex: 1}).add(m);
                        b.styledMode || l.attr({
                            stroke: d.symbolStroke,
                            fill: d.symbolFill,
                            "stroke-width": d.symbolStrokeWidth || 1
                        })
                    }
                    m.add(b.exportingGroup).align(t(d, {width: m.width, x: r(d.x, b.buttonOffset)}), !0, "spacingBox");
                    b.buttonOffset += (m.width + d.buttonSpacing) * ("right" === d.align ? -1 : 1);
                    b.exportSVGElements.push(m, l)
                }
            }, destroyExport: function (a) {
                var b = a ? a.target : this;
                a = b.exportSVGElements;
                var c = b.exportDivElements, d = b.exportEvents, g;
                a && (a.forEach(function (a, d) {
                    a && (a.onclick = a.ontouchstart = null, g = "cache-" + a.menuClassName, b[g] && delete b[g], b.exportSVGElements[d] = a.destroy())
                }), a.length = 0);
                b.exportingGroup && (b.exportingGroup.destroy(), delete b.exportingGroup);
                c && (c.forEach(function (a, d) {
                    e.clearTimeout(a.hideTimer);
                    J(a,
                        "mouseleave");
                    b.exportDivElements[d] = a.onmouseout = a.onmouseover = a.ontouchstart = a.onclick = null;
                    k(a)
                }), c.length = 0);
                d && (d.forEach(function (a) {
                    a()
                }), d.length = 0)
            }
        });
        D.prototype.inlineToAttributes = "fill stroke strokeLinecap strokeLinejoin strokeWidth textAnchor x y".split(" ");
        D.prototype.inlineBlacklist = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/, /[lL]ogical(Width|Height)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/];
        D.prototype.unstyledElements = ["clipPath", "defs", "desc"];
        A.prototype.inlineStyles =
            function () {
                function a(a) {
                    return a.replace(/([A-Z])/g, function (a, b) {
                        return "-" + b.toLowerCase()
                    })
                }

                function b(c) {
                    function m(b, f) {
                        u = n = !1;
                        if (g) {
                            for (q = g.length; q-- && !n;) n = g[q].test(f);
                            u = !n
                        }
                        "transform" === f && "none" === b && (u = !0);
                        for (q = e.length; q-- && !u;) u = e[q].test(f) || "function" === typeof b;
                        u || x[f] === b && "svg" !== c.nodeName || h[c.nodeName][f] === b || (-1 !== d.indexOf(f) ? c.setAttribute(a(f), b) : l += a(f) + ":" + b + ";")
                    }

                    var l = "", u, n, q;
                    if (1 === c.nodeType && -1 === f.indexOf(c.nodeName)) {
                        var t = y.getComputedStyle(c, null);
                        var x = "svg" ===
                        c.nodeName ? {} : y.getComputedStyle(c.parentNode, null);
                        if (!h[c.nodeName]) {
                            k = r.getElementsByTagName("svg")[0];
                            var v = r.createElementNS(c.namespaceURI, c.nodeName);
                            k.appendChild(v);
                            h[c.nodeName] = p(y.getComputedStyle(v, null));
                            "text" === c.nodeName && delete h.text.fill;
                            k.removeChild(v)
                        }
                        if (M || L) for (var w in t) m(t[w], w); else C(t, m);
                        l && (t = c.getAttribute("style"), c.setAttribute("style", (t ? t + ";" : "") + l));
                        "svg" === c.nodeName && c.setAttribute("stroke-width", "1px");
                        "text" !== c.nodeName && [].forEach.call(c.children || c.childNodes,
                            b)
                    }
                }

                var c = this.renderer, d = c.inlineToAttributes, e = c.inlineBlacklist, g = c.inlineWhitelist,
                    f = c.unstyledElements, h = {}, k;
                c = w.createElement("iframe");
                n(c, {width: "1px", height: "1px", visibility: "hidden"});
                w.body.appendChild(c);
                var r = c.contentWindow.document;
                r.open();
                r.write('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
                r.close();
                b(this.container.querySelector("svg"));
                k.parentNode.removeChild(k)
            };
        G.menu = function (a, b, c, d) {
            return ["M", a, b + 2.5, "L", a + c, b + 2.5, "M", a, b + d / 2 + .5, "L", a + c, b + d / 2 + .5, "M", a, b + d - 1.5, "L",
                a + c, b + d - 1.5]
        };
        G.menuball = function (a, b, c, d) {
            a = [];
            d = d / 3 - 2;
            return a = a.concat(this.circle(c - d, b, d, d), this.circle(c - d, b + d + 4, d, d), this.circle(c - d, b + 2 * (d + 4), d, d))
        };
        A.prototype.renderExporting = function () {
            var a = this, b = a.options.exporting, c = b.buttons, d = a.isDirtyExporting || !a.exportSVGElements;
            a.buttonOffset = 0;
            a.isDirtyExporting && a.destroyExport();
            d && !1 !== b.enabled && (a.exportEvents = [], a.exportingGroup = a.exportingGroup || a.renderer.g("exporting-group").attr({zIndex: 3}).add(), C(c, function (b) {
                a.addButton(b)
            }), a.isDirtyExporting =
                !1);
            x(a, "destroy", a.destroyExport)
        };
        x(A, "init", function () {
            var a = this;
            a.exporting = {
                update: function (b, c) {
                    a.isDirtyExporting = !0;
                    p(!0, a.options.exporting, b);
                    r(c, !0) && a.redraw()
                }
            };
            f.addUpdate(function (b, c) {
                a.isDirtyExporting = !0;
                p(!0, a.options.navigation, b);
                r(c, !0) && a.redraw()
            }, a)
        });
        A.prototype.callbacks.push(function (a) {
            a.renderExporting();
            x(a, "redraw", a.renderExporting)
        })
    });
    k(f, "masters/modules/exporting.src.js", [], function () {
    })
});
//# sourceMappingURL=exporting.js.map