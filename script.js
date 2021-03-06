"use strict";
$( document )
	.ready( function() {
		let a, b = 100;
		var c = {};
		chrome.storage.local.get( a => c = a );
		const d = document.querySelector( ".sec-title" )
			, e = document.querySelector( ".sec-list" )
			, f = () => {
				chrome.runtime.sendMessage( {
					action: "popup-get-gain-value"
					, tabId: a
				}, a => {
					if ( null !== a.gainValue ) {
						const d = a.gainValue;
						var c = 230 * ( 100 * d ) / 600;
						q.curCx = c, $( "#circleId" )
							.attr( "cx", c ), $( "#lineF" )
							.attr( "x2", c ), 600 <= d && ( $( "#circleId" )
								.attr( "cx", 100 ), $( "#lineF" )
								.attr( "x2", 100 ) ), b = c
					} else $( "#circleId" )
						.attr( "cx", 50 ), q.curCx = 50
				} )
			}
			, g = () => {
				chrome.tabs.query( {
					audible: !0
				}, a => {
					a.sort( ( b, c ) => c.id - b.id ), d.textContent = 0 < a.length ?
						chrome.i18n.getMessage( "popup_list_tabs" ) : chrome.i18n.getMessage(
							"popup_list_tabs_no_play" ), a.forEach( a => {
							const b = document.getElementById( "template-section" )
								.content;
							b.querySelector( ".tab" )
								.dataset.tabId = a.id, b.querySelector( ".link-image" )
								.src = a.favIconUrl, b.querySelector( ".link-title" )
								.textContent = a.title, e.appendChild( document.importNode( b, !0 ) )
						} )
				} )
			};
		e.addEventListener( "click", e => {
			e.preventDefault();
			const a = e.target
				, b = a.closest( ".tab" )
				, c = parseInt( b.dataset.tabId, 10 );
			chrome.tabs.update( c, {
				active: !0
			}, b => {
				chrome.windows.update( b.windowId, {
					focused: !0
				} )
			} )
		} ), document.documentElement.addEventListener( "keypress", b => {
			b.preventDefault(), "r" === b.key.toLowerCase() && window.location.reload()
		} ), chrome.tabs.query( {
			active: !0
			, currentWindow: !0
		}, b => {
			a = b[ 0 ].id, chrome.runtime.lastError || ( chrome.storage.local.set( {
				currentTabId: a
			} ), f(), g() )
		} );
		var h = function() {
				var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] :
					"";
				return document.querySelector( a )
			}
			, i = function( a, b ) {
				var c = 2 < arguments.length && arguments[ 2 ] !== void 0 ? arguments[ 2 ] :
					0;
				return a + ( b - a ) * c
			}
			, j = function() {
				var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] : {};
				return {
					x: ( +a.getAttribute( "x1" ) + +a.getAttribute( "x2" ) ) / 2
					, y: ( +a.getAttribute( "y1" ) + +a.getAttribute( "y2" ) ) / 2
				}
			}
			, k = function() {
				var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] : {}
					, b = !( 1 < arguments.length && arguments[ 1 ] !== void 0 ) || arguments[
						1 ];
				if ( !b ) {
					var c = a.getBBox();
					return {
						x: c.x + c.width / 2
						, y: c.y + c.height / 2
					}
				}
				var d = a.getBoundingClientRect();
				return {
					x: d.width / 2
					, y: d.height / 2
				}
			}
			, l = {
				spB: h( "#spB" )
				, spBB: h( "#spBB" )
				, spSB: h( "#spSB" )
				, spF: h( "#spF" )
				, spBF: h( "#spBF" )
				, spSF: h( "#spSF" )
				, lineRB: h( "#lineRB" )
				, lineRT: h( "#lineRT" )
				, circleId: h( "#circleId" )
				, lineF: h( "#lineF" )
				, lineB: h( "#lineB" )
			}
			, m = {
				arcBigLen: l.spBF.getTotalLength()
				, arcSmLen: l.spSF.getTotalLength()
				, speakLen: l.spF.getTotalLength()
			}
			, n = {
				translate3D: function() {
					var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] :
						0
						, b = 1 < arguments.length && arguments[ 1 ] !== void 0 ? arguments[ 1 ] :
						0
						, c = 2 < arguments.length && arguments[ 2 ] !== void 0 ? arguments[ 2 ] :
						0
						, d = 3 < arguments.length && arguments[ 3 ] !== void 0 ? arguments[ 3 ] :
						"px";
					return "translate3D(" + a + d + ", " + b + d + ", " + c + d + ")"
				}
				, translate: function() {
					var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] :
						0
						, b = 1 < arguments.length && arguments[ 1 ] !== void 0 ? arguments[ 1 ] :
						0
						, c = 2 < arguments.length && arguments[ 2 ] !== void 0 ? arguments[ 2 ] :
						"px";
					return "translate(" + a + c + ", " + b + c + ")"
				}
				, rotate3d: function() {
					var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] :
						0
						, b = 1 < arguments.length && arguments[ 1 ] !== void 0 ? arguments[ 1 ] :
						0
						, c = 2 < arguments.length && arguments[ 2 ] !== void 0 ? arguments[ 2 ] :
						0
						, d = 3 < arguments.length && arguments[ 3 ] !== void 0 ? arguments[ 3 ] :
						0;
					return "rotate3d(" + a + ", " + b + ", " + c + ", " + d + "deg)"
				}
				, rotate: function() {
					var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] :
						0;
					return "rotate(" + a + "deg)"
				}
				, scale: function() {
					var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] :
						1
						, b = 1 < arguments.length && arguments[ 1 ] !== void 0 ? arguments[ 1 ] :
						1;
					return "scale(" + a + ", " + b + ")"
				}
				, perspective: function() {
					var a = 0 < arguments.length && arguments[ 0 ] !== void 0 ? arguments[ 0 ] :
						0
						, b = 1 < arguments.length && arguments[ 1 ] !== void 0 ? arguments[ 1 ] :
						"px";
					return "perspective(" + a + b + ")"
				}
			}
			, o = {
				inCubic: function( a, e, b, c ) {
					var d = ( a /= c ) * a
						, f = d * a;
					return e + b * ( 1.7 * f * d - 2.05 * d * d + 1.5 * f - .2 * d + .05 * a )
				}
				, outElastic: function( a, e, b, c ) {
					var d = ( a /= c ) * a
						, f = d * a;
					return e + b * ( 33 * f * d + -106 * d * d + 126 * f + -67 * d + 15 * a )
				}
				, customSin: function( a, e, b, c ) {
					var d = ( a /= c ) * a
						, f = d * a;
					return e + b * ( 81 * f * d + -210 * d * d + 190 * f + -70 * d + 10 * a )
				}
			}
			, p = {
				dx: 1 / 5
				, ds: .03
				, flag: !0
				, step: 0
				, speed: 5
				, curPosBig: {
					x: 0
					, y: 0
					, scale: 1
				}
				, curPosSm: {
					x: 0
					, y: 0
					, scale: 1
				}
				, curPos: 1
				, off: !1
				, offCurStep: 100
				, offMaxStep: 100
				, offSpeed: 2
				, offRefresh: function() {
					this.offCurStep = this.offMaxStep, this.off = !0
				}
				, on: !1
				, onCurStep: 0
				, onMaxStep: 20
				, onSpeed: 2
				, onRefresh: function() {
					this.off = !1, this.onCurStep = 0, this.on = !0
				}
				, pointLbRt: j( l.lineRT )
				, pointLtRb: j( l.lineRB )
				, animation: function() {
					var a = this;
					if ( this.off ) {
						[ l.spBB, l.spBF, l.spSB, l.spSF ].forEach( function( a ) {
							a.setAttribute( "visibility", "hidden" )
						} ), [ l.lineRT, l.lineRB ].forEach( function( a ) {
							a.setAttribute( "visibility", "visible" )
						} );
						var b = m.speakLen
							, c = this.offMaxStep - 20
							, d = .7;
						if ( this.offCurStep >= this.offMaxStep - 20 ) {
							var e = ( 20 + this.offCurStep - this.offMaxStep ) / 20
								, f = i( 1, d, 1 - e );
							l.spF.setAttribute( "stroke-dasharray", b * e + "," + 1.05 * b ), l.spF
								.setAttribute( "stroke-dashoffset", -b * ( 1 - e ) / 2 + "" ), l.spB.setAttribute(
									"stroke-dasharray", b * f + "," + 1.05 * b ), l.spB.setAttribute(
									"stroke-dashoffset", -b * ( 1 - f ) / 2 + "" )
						}
						if ( this.offCurStep < c && this.offCurStep >= c - 20 ) {
							var g = 1 - ( this.offCurStep - c + 20 ) / 20
								, h = i( d, 1, g );
							l.spB.setAttribute( "stroke-dasharray", b * h + "," + 1.05 * b ), l.spB
								.setAttribute( "stroke-dashoffset", -b * ( 1 - h ) / 2 + "" )
						}
						if ( this.offCurStep < c && 0 <= this.offCurStep ) {
							l.spF.setAttribute( "visibility", "hidden" );
							var j = this.offCurStep / c;
							[ l.lineRT, l.lineRB ].forEach( function( b, c ) {
								var d = o.outElastic( 1 - j, 0, 1, 1 )
									, e = 0 == c ? o.customSin( 1 - j, -3, 3, 1 ) : o.customSin( 1 - j
										, -2, 2, 1 )
									, f = 0 == c ? o.customSin( 1 - j, -2, 2, 1 ) : o.customSin( 1 - j
										, 2, -2, 1 )
									, g = -a.pointLbRt.x * ( d - 1 ) + e
									, h = -a.pointLbRt.y * ( d - 1 ) + f;
								b.setAttribute( "transform", n.translate( g, h, "" ) + n.scale( d
									, d ) )
							} )
						}
						this.offCurStep += -this.offSpeed
					} else {
						if ( this.on ) {
							[ l.spF, l.spBB, l.spSB, l.spSF ].forEach( function( a ) {
								a.setAttribute( "visibility", "visible" )
							} ), [ l.lineRT, l.lineRB ].forEach( function( a ) {
								a.setAttribute( "visibility", "hidden" ), a.setAttribute(
									"transform", "scale(0)" )
							} );
							var k = m.speakLen
								, r = this.onCurStep / this.onMaxStep;
							l.spF.setAttribute( "stroke-dasharray", k * r + "," + 1.05 * k ), l.spF
								.setAttribute( "stroke-dashoffset", -k * ( 1 - r ) / 2 + "" ), this.onCurStep +=
								this.onSpeed
						}
						var s, t, u, v;
						this.step >= this.speed && ( this.flag = !this.flag, this.step = 0 );
						var w = this.step / this.speed
							, x = 1 - o.inCubic( 1 - this.curPos, 0, 1, .5 )
							, z = 1 - o.inCubic( 1 - this.curPos, 0, 1, 1 );
						.5 > this.curPos && ( x = 0 ), ( 0 >= z || !z ) && ( z = 0 ), this.flag ?
							( s = i( 0, 3 * this.dx, w ), t = i( 0, 2 * -this.dx, w ), u = i( 0
								, this.ds, w ), v = i( 0, -this.ds, w ) ) : ( s = i( 3 * this.dx, 0
								, w ), t = i( 2 * -this.dx, 0, w ), u = i( this.ds, 0, w ), v = i( -
								this.ds, 0, w ) ), [ l.spBF, l.spBB ].forEach( function( b ) {
								var c = a.curPosBig.scale + u * x
									, d = 1.5 * ( -q.pointBig.y * ( c - 1 ) );
								b.setAttribute( "transform", n.translate( a.curPosBig.x + s * x, d
									, "" ) + n.scale( c, c ) )
							} ), [ l.spSF, l.spSB ].forEach( function( b ) {
								var c = a.curPosSm.scale + v * z
									, d = 3 * ( -q.pointSm.y * ( c - 1 ) );
								b.setAttribute( "transform", n.translate( a.curPosSm.x + t * z, d
									, "" ) + n.scale( c, c ) )
							} ), this.step++
					}
					requestAnimationFrame( this.animation.bind( p ) )
				}
			};
		requestAnimationFrame( p.animation.bind( p ) );
		const q = {
			dx: 0
			, maxX: +l.circleId.getAttribute( "cx" )
			, minX: +l.lineF.getAttribute( "x1" )
			, curCx: +l.circleId.getAttribute( "cx" )
			, pointBig: k( l.spBF )
			, pointSm: k( l.spSF )
			, interact: !1
			, animateDrag: function() {
				var b = this;
				this.curCx += q.dx;
				var c = this.curCx
					, d = m.arcSmLen
					, e = m.arcBigLen;
				c > this.maxX && ( c = this.maxX ), c < this.minX && ( c = this.minX );
				var f = ( c - this.minX ) / ( this.maxX - this.minX );
				p.curPos = f, l.circleId.setAttribute( "cx", c ), l.lineF.setAttribute(
					"x2", c );
				var g = i( 1, .85, 1 - f )
					, h = i( 0, -3, 1 - f )
					, j = i( 0, -1, 1 - f );
				if ( [ l.spBF, l.spBB ].forEach( function( a ) {
						p.curPosBig.x = -b.pointBig.x * ( g - 1 ) + h, p.curPosBig.y = 1.5 *
							( -b.pointBig.y * ( g - 1 ) ), p.curPosBig.scale = g, a.setAttribute(
								"transform", n.translate( p.curPosBig.x, p.curPosBig.y, "" ) + n.scale(
									g, g ) )
					} ), [ l.spSF, l.spSB ].forEach( function( a ) {
						p.curPosSm.x = -b.pointSm.x * ( g - 1 ) + j, p.curPosSm.y = 3 * ( -b.pointSm
							.y * ( g - 1 ) ), p.curPosSm.scale = g, a.setAttribute( "transform"
							, n.translate( p.curPosSm.x, p.curPosSm.y, "" ) + n.scale( g, g ) )
					} ), .5 < f ) {
					p.off && p.onRefresh();
					var k = i( 1, -1, 1 - f );
					l.spBF.setAttribute( "visibility", "visible" ), l.spSF.setAttribute(
							"visibility", "visible" ), l.spBF.setAttribute( "stroke-dasharray", e *
							k + "," + 1.05 * e ), l.spBF.setAttribute( "stroke-dashoffset", -e *
							( 1 - k ) / 2 + "" ), l.spSF.setAttribute( "stroke-dasharray", d + "" )
						, l.spSF.setAttribute( "stroke-dashoffset", "0" )
				}
				if ( .5 >= f && 0 < f ) {
					p.off && p.onRefresh();
					var o = i( 1, 0, 1 - 2 * f );
					l.spBF.setAttribute( "visibility", "hidden" ), l.spSF.setAttribute(
						"visibility", "visible" ), l.spSF.setAttribute( "stroke-dasharray", d *
						o + "," + 1.05 * d ), l.spSF.setAttribute( "stroke-dashoffset", -d *
						( 1 - o ) / 2 + "" )
				}
				0 >= f && ( l.spSF.setAttribute( "visibility", "hidden" ), !1 == p.off &&
					p.offRefresh() );
				let r = parseInt( 600 * f );
				chrome.runtime.sendMessage( {
					action: "popup-volume-change"
					, tabId: a
					, sliderValue: r
				} )
			}
		};
		$( document )
			.on( "mousedown touchstart", "#circleId, #lineB, #lineF", function( a ) {
				var b = a.pageX || a.originalEvent.touches[ 0 ].pageX;
				if ( 261 < b && ( b = 261 ), a.preventDefault(), q.interact = !0, this ==
					l.lineB || this == l.lineF ) {
					var c = l.circleId.getBoundingClientRect()
						, d = ( c.left + c.right ) / 2;
					q.dx = b - d, q.animateDrag()
				}
				$( document )
					.on( "mousemove touchmove", function( a ) {
						a.preventDefault();
						var c = a.pageX || a.originalEvent.touches[ 0 ].pageX;
						q.dx = c - b, b = c, q.animateDrag()
					} ), $( document )
					.on( "mouseup touchend", function() {
						q.curCx < q.minX && ( q.curCx = q.minX ), q.curCx > q.maxX && ( q.curCx =
								q.maxX ), $( document )
							.off( "mousemove touchmove mouseup touchend" )
					} )
			} );
		var r = {
			flag: !1
			, last: 0
		};
		$( document )
			.on( "mousedown touchstart", ".sp_wrap", function( a ) {
				a.preventDefault(), q.interact = !0, q.dx = 0, r.flag ? ( r.flag = !1, r.last =
					q.curCx, q.curCx = 0, q.animateDrag() ) : ( r.flag = !0, q.curCx = r.last
					, q.animateDrag() )
			} )
	} );

function substitute( a, b ) {
	var c = b.replace( /__MSG_(\w+)__/g, function( a, b ) {
		return b ? chrome.i18n.getMessage( b ) : ""
	} );
	c != b && ( a.innerHTML = c )
}

function spotPage() {
	var a = document.querySelectorAll( "[data-i18n]" );
	for ( var b in a )
		if ( a.hasOwnProperty( b ) ) {
			var c = a[ b ]
				, d = c.getAttribute( "data-i18n" )
				.toString();
			substitute( c, d )
		}
	for ( var e = document.getElementsByTagName( "html" ), f = 0; f < e.length; f++ ) {
		var c = e[ f ]
			, d = c.innerHTML.toString();
		substitute( c, d )
	}
}
spotPage();