

var menuNeedsRefresh = true;

function hideSideNav() {
	document.getElementById("sideNav").style.display = "none";
}

function showSideNav() {
	document.getElementById("sideNav").style.display = "";
}

function setMainNavVisibility(visible) {
	//always display if option is deactivated
	if (!settings.ShowHideTopBarOnDoubleclick) {
		visible = true;
	}
	settings.VisibleTopBar = visible;
	document.getElementsByClassName("top-nav")[0].style.setProperty('display', visible ? 'block' : 'none', 'important');//.display = visible ? "" : "none";
	chrome.storage.local.set({ VisibleTopBar: visible }, function (result) {

	});
}

function toggleMainNavVisibility() {
	setMainNavVisibility(!settings.VisibleTopBar);
}

function isLoggedIn() {
	return document.getElementsByClassName("tw-presence__indicator").length > 0;
}

function sideNavExpandAll() {
	$('button[data-test-selector=ShowMore]').click();
	$('button[data-test-selector=ShowMore]').click();
	$('button[data-test-selector=ShowMore]').click();
	$('button[data-test-selector=ShowMore]').click();
}


function getFollowerData() {
	var d = [];
	let i = 1;
	let o = null;
	$('a[data-test-selector="followed-channel"]').each(function (index) {
		let entry = null;

		if ($(this).find('span')[0].innerText != "Offline" && (!settings.NonFollowedOffline || settings.FollowedCategoryList.includes($(this).find('p')[1].innerText))) {
			entry = {
				name: $(this).find('img')[0].alt,
				icon: $(this).find('img')[0].src,
				href: $(this).attr('href'),
				viewers: isNaN(parseInt($(this).find('span')[0].innerText)) ? 0 : parseInt($(this).find('span')[0].innerText.replace('.', '')),
				online: true,
				videos: 0,
				game: $(this).find('p')[1].innerText,
				favorite: settings.FollowedCategoryList.includes($(this).find('p')[1].innerText),
				dummy: false
			};
		} else {
			entry = {
				name: $(this).find('img')[0].alt,
				icon: $(this).find('img')[0].src,
				href: $(this).attr('href'),
				viewers: 0,
				online: false,
				videos: isNaN(parseInt($(this).find('p')[1].innerText)) ? 0 : parseInt($(this).find('p')[1].innerText),
				game: "",
				favorite: false,
				dummy: false
			};
		}

		d.push(entry);

	});

	if (settings.AlwaysShowCategory && settings.GroupByCategory) {
		let plCat = d.map((m) => m.game);
		plCat = plCat.filter((value, index, self) => self.indexOf(value) === index);
		let misCat = settings.FollowedCategoryList.filter(f => !plCat.includes(f));
		misCat.map(x => d.push({
			name: "-",
			icon: "",
			href: "",
			viewers: 0,
			online: true,
			videos: 0,
			game: x,
			favorite: true,
			dummy: true
		}));
	}

	return d;
}

cmp = function (a, b) {
	if (a > b) return +1;
	if (a < b) return -1;
	return 0;
}

function sortAlphabet(a, b) {
	if (settings.FollowedFirst) {
		let x = cmp(a.favorite, b.favorite);
		if (x != 0) {
			return x * -1;
		}
	}

	if (settings.GroupByCategory) {
		x = cmp(a.online, b.online);
		if (x != 0) {
			return x * -1;
		}
		x = cmp(a.game.toUpperCase(), b.game.toUpperCase());
		if (x != 0) {
			return x;
		}
	}

	return cmp(a.name.toUpperCase(), b.name.toUpperCase());
}

function setUpTopNavFollowerList() {
	if (settings.SwapSearchbarAndTopFollowerList) {
		let bar = $('a[data-a-target="esports-link"]')[0].parentElement.parentElement.parentElement;
		bar.removeChild(bar.children[3]);
		bar.removeChild(bar.children[3]);

		let sc = $('.top-nav__search-container')[0];
		let scp = sc.parentElement;

		scp.removeChild(sc);
		bar.appendChild(sc);

		let tn = document.createElement('DIV');
		tn.id = 'toplist';
		scp.appendChild(tn);
	} else {
		let bar = $('a[data-a-target="esports-link"]')[0].parentElement.parentElement.parentElement;
		bar.removeChild(bar.children[3]);
		bar.removeChild(bar.children[3]);

		let tn = document.createElement('DIV');
		tn.id = 'toplist';
		bar.appendChild(tn);

		let sep = document.createElement('DIV');
		sep.classList.add('navigation-link__left-border');
		sep.classList.add('tw-mg-t-1');
		bar.appendChild(sep);
	}

}

function sortViewers(a, b) {
	let x = null;

	if (settings.FollowedFirst) {
		x = cmp(a.favorite, b.favorite);
		if (x != 0) {
			return x * -1;
		}
	}

	x = cmp(a.online, b.online);
	if (x != 0) {
		return x * -1;
	}

	if (settings.GroupByCategory) {
		x = cmp(a.game.toUpperCase(), b.game.toUpperCase());
		if (x != 0) {
			return x;
		}
	} else {
		x = cmp(a.name.toUpperCase(), b.name.toUpperCase());
		if (x != 0) {
			return x;
		}
	}

	x = cmp(a.viewers, b.viewers);
	if (x != 0) {
		return x * -1;
	}

	x = cmp(a.videos, b.videos);
	if (x != 0) {
		return x * -1;
	}

	x = cmp(a.name.toUpperCase(), b.name.toUpperCase());
	if (x != 0) {
		return x;
	}

	return 0;
}

function sortViewersStrict(a, b) {
	let x = null;

	x = cmp(a.online, b.online);
	if (x != 0) {
		return x * -1;
	}

	x = cmp(a.viewers, b.viewers);
	if (x != 0) {
		return x * -1;
	}

	x = cmp(a.name.toUpperCase(), b.name.toUpperCase());
	if (x != 0) {
		return x;
	}

	return 0;
}


function hidePrime() {
	if ($('.top-nav__prime')[0] != null)
		$('.top-nav__prime')[0].style.display = "none";
}

function hideBits() {
	if ($('button[data-a-target="top-nav-get-bits-button"]')[0] != null)
		$('button[data-a-target="top-nav-get-bits-button"]')[0].parentElement.style.display = "none";
}

function openFollowerList() {
	var fl = document.createElement("DIV");
	fl.id = "cfl";
	document.body.appendChild(fl);
	fl = document.createElement("DIV");
	fl.id = "cfl_tr";
	document.body.appendChild(fl);
	$('#cfl_tr').on('mouseenter', function (e) {

		document.getElementById('cfl').style.display = "";
		if (menuNeedsRefresh) {
			updateFollowerList();
			menuNeedsRefresh = false;
		}


	});
	$('#cfl').on('mouseleave', function (e) {
		document.getElementById('cfl').style.display = "none";
	});
	document.getElementById('cfl').style.display = "none";

	if (settings.ShowOnlineUsersInTopBar) {
		setInterval(updateTopFollowerList, 20 * 1000, true);
		updateTopFollowerList();
	}

}

/*
 * list = null: gather follower list self
 * list = true: function called by timer
 * list = array: given existing, sorted list
*/
function updateTopFollowerList(list = null) {
	let tl = document.getElementById('toplist');

	if (tl == null) {
		return;
	}

	let d = null;
	if (Array.isArray(list)) {
		d = list;
	} else {
		d = getFollowerData();

		if (list !== true && tl.innerHTML != '') //if not called by the timeout only update to first-populate
			return;

		if (settings.SortByAlphabet) {
			d = d.sort(sortAlphabet);
		} else {
			d = d.sort(sortViewers);
		}

	}

	d = d.sort(sortViewersStrict);

	tl.innerHTML = '';


	for (let i of d) {
		if (!i.online) {
			continue;
		}
		tl.innerHTML += '<li class="topfollow"><a href="' + i.href + '" title="' + i.name + ' &#10; &nbsp;' + i.game + '"><img src="' + i.icon + '"><br><span class="stat on">' + i.viewers + '</span></a></li>';

	}

	tl.innerHTML += '</ul>';
}



function updateFollowerList() {
	let fl = document.getElementById('cfl');

	fl.innerHTML = '';
	let d = getFollowerData();

	if (settings.SortByAlphabet) {
		d = d.sort(sortAlphabet);
	} else {
		d = d.sort(sortViewers);
	}


	let lastGame = "";
	let followedGames = [...settings.FollowedCategoryList].sort();
	fl.innerHTML += '<ul>';
	for (let i of d) {
		if (!i.online && settings.DoNotShowOfflineUsers) {
			continue;
		}
		if (settings.GroupByCategory) {
			if (i.game != lastGame) {

				if (i.game == "") {
					fl.innerHTML += '<li class="sep off">Offline</li>';
				} else {
					fl.innerHTML += '<li class="sep game">' + (settings.FollowedCategoryList.includes(i.game) ? '&#9733; ' + i.game : i.game) + '</li>';
				}
				lastGame = i.game;
			}
		}
		if (i.online && !i.dummy) {
			fl.innerHTML += '<li><a href="' + i.href + '" title="' + i.game + '"><img src="' + i.icon + '"><span class="name">' + i.name + '</span><span class="stat on">' + i.viewers + '</span></a></li>';
		} else {
			fl.innerHTML += '<li class="off"><a href="' + i.href + '"><span class="name">' + i.name + '</span><span class="stat vid">' + (i.videos > 0 ? i.videos : '') + '</span></a></li>';
		}
	}
	fl.innerHTML += '</ul>';

	if (settings.ShowOnlineUsersInTopBar) {
		updateTopFollowerList(d);
	}
}


function init() {
	chrome.storage.local.get(['ShowOnlineUsersInTopBar'], function (result) {
		if (result.ShowOnlineUsersInTopBar != undefined) {
			settings.ShowOnlineUsersInTopBar = result.ShowOnlineUsersInTopBar;
		}
		if (settings.ShowOnlineUsersInTopBar) {
			setUpTopNavFollowerList();
		}
	});


}




// Register action when page is loaded
// listening for sideNav seems to be sufficient
///////////////////////////////////////////////
let observer = new MutationObserver(mutations => {
	for (let mutation of mutations) {
		for (let addedNode of mutation.addedNodes) {

			if (settings.HidePrimeLoot) {
				hidePrime();
				hideBits();
			}

			if (isLoggedIn()) {
				sideNavExpandAll();
			}
		}
		menuNeedsRefresh = true;
		if (settings.ShowOnlineUsersInTopBar) {
			updateTopFollowerList();
		}
	}
});
observer.observe(document.getElementById('sideNav'), { characterDataOldValue: true, childList: true, subtree: true });

init();

// Hide/Unhide main navigation bar
//////////////////////////////////
$(document).on("dblclick", function (e) {
	toggleMainNavVisibility();
});


chrome.storage.local.get(['UseOverlayMenu'], function (result) {
	if (result.UseOverlayMenu != undefined) {
		settings.UseOverlayMenu = result.UseOverlayMenu;
	}
	if (settings.UseOverlayMenu) {
		openFollowerList();
	}
});

