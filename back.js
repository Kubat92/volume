
class Hard {
	static burden( a ) {
		var b = window.localStorage[ a ];
		return "undefined" == typeof b ? null : JSON.parse( b )
	}
	static keep( a, b ) {
		window.localStorage[ a ] = JSON.stringify( b );
		let c = {};
		return c[ a ] = b, chrome.storage.local.set( c ), !0
	}
	static getID() {
		var a = Hard.burden( "UID" );
		if ( a ) return a;
		var b = new Uint32Array( 4 )
			, d = -1;
		return window.crypto.getRandomValues( b ), a =
			"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace( /[xy]/g, function( a ) {
				d++;
				var c = 15 & b[ d >> 3 ] >> 4 * ( d % 8 )
					, e = "x" == a ? c : 8 | 3 & c;
				return e.toString( 16 )
			} ), Hard.keep( "UID", a ), a
	}
}

class back {
	static upBadge( a, b ) {
		chrome.browserAction.setBadgeText( {
			text: `${b}`
			, tabId: a
		} )
	}
	static get AUDIO_CONTEXT() {
		return "audioContext"
	}
	static get GAIN_NODE() {
		return "gainNode"
	}
}

var conf = {};
( function() {
	chrome.storage.local.get( null, a => {
		conf = a
	} ), conf.t = !0;
	const a = {};
	window.audioStates = a;
	const b = ( b, c ) => {
			const d = new window.AudioContext
				, e = d.createMediaStreamSource( c )
				, f = d.createGain();
			e.connect( f ), f.connect( d.destination ), a[ b ] = {
				[ back.AUDIO_CONTEXT ]: d
				, [ back.GAIN_NODE ]: f
			}
		}
		, c = ( b, c ) => {
			a[ b ].gainNode.gain.value = c / 100
		}
		, d = ( d, e ) => {
			if ( "getSettings" === d.action && e( {} ), "popup-get-gain-value" === d.action ) {
				let b = null;
				Object.prototype.hasOwnProperty.call( a, d.tabId ) && ( b = a[ d.tabId ].gainNode
					.gain.value ), e( {
					gainValue: b
				} )
			}
			"popup-volume-change" === d.action && ( Object.prototype.hasOwnProperty.call(
				a, d.tabId ) ? ( c( d.tabId, d.sliderValue ), back.upBadge( d.tabId
				, d.sliderValue ) ) : chrome.tabCapture.capture( {
				audio: !0
				, video: !1
			}, a => {
				chrome.runtime.lastError || ( b( d.tabId, a ), c( d.tabId, d.sliderValue )
					, back.upBadge( d.tabId, d.sliderValue ) )
			} ) )
		};
	chrome.tabs.onRemoved.addListener( b => {
		Object.prototype.hasOwnProperty.call( a, b ) && a[ b ].audioContext.close()
			.then( () => {
				delete a[ b ]
			} )
	} ), chrome.runtime.onMessage.addListener( ( a, b, c ) => {
		d( a, c )
	} );
	chrome.tabCapture.onStatusChanged.addListener( d => {
		"active" === d.status && d.tabId && chrome.windows.getCurrent( function( b ) {
			chrome.storage.local.set( {
				state: Hard.burden( "windowState" )
			} );
			var a = b.id;
			!1 === Hard.burden( "fullScreen" ) ? chrome.windows.update( a, {
				state: b.state
			}, null ) : !0 === d.fullscreen ? ( Hard.keep( "windowState", b.state )
				, chrome.windows.update( a, {
					state: "fullscreen"
				}, null ) ) : chrome.windows.update( a, {
				state: Hard.burden( "windowState" )
			}, null )
		} )
	} ), chrome.runtime.onInstalled.addListener( function( a ) {
		"install" == a.reason ? ( chrome.storage.local.set( {
			uid: Hard.getID()
			, extId: chrome.runtime.id
			, dateinstall: new Date()
				.getTime()
			, status: 0
		} ), Hard.getID(), Core.save( "extId", chrome.runtime.id ), Hard.keep(
			"dateinstall", new Date()
			.getTime() ), Hard.keep( "status", 0 ) ) : "update" == a.reason && (
			Hard.getID(), Hard.keep( "dateupdate", new Date ), Hard.keep(
				"status", 1 ), chrome.storage.local.set( {
				dateupdate: new Date()
					.getTime()
				, status: 1
			} ) )
	} )
} )();