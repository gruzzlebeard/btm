
//
//  CONFIGURATION
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var settings =
{
	//Top Bar visibility can be toggled by doubleclicking anywhere on the page
	ShowHideTopBarOnDoubleclick: true,

	//Hides all users in the overlay follower list that are offline
	DoNotShowOfflineUsers: false,

	//Removes Prime Loot and other Payment stuff
	HidePrimeLoot: false,

	//Stores the current state of the Top Bar's visibility. 
	//This value is not used when ShowHideTopBarOnDoubleclick is false
	//There's no need to change this value by hand
	HiddenTopBar: false,

	//If false, the classic follower menu of Twitch will be used
	UseOverlayMenu: true,

	//When false, no grouping will be performed (like in Twitch menu)
	GroupByCategory: true,

	//When grouping, always show the category even when nobody streams it
	AlwaysShowCategory: false,

	//Sort-Priority is Alphabet-then-Viewers instead of Viewers-then-Alphabet
	SortByAlphabet: false,

	//Followed categories come always on top
	FollowedFirst: true,

	//Consider users streaming non-followed categories as offline
	NonFollowedOffline: false,

	//Shows all online streams that are followed (additionally) in the top navigation bar
	ShowOnlineUsersInTopBar: true,

	//Swaps the position of the search bar and the top followerlist (if ShowOnlineUsersInTopBar is true)
	SwapSearchbarAndTopFollowerList: false,

	//List of categories that are followed. 
	//The category name has to match exactly as shown on the page
	FollowedCategoryList: []
};




//
//  DO NOT CHANGE CODE BELOW
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

var optionPage = document.getElementById('ShowHideTopBarOnDoubleclick') != null;

function loadSettings() {
	chrome.storage.local.get(['SwapSearchbarAndTopFollowerList', 'ShowOnlineUsersInTopBar', 'NonFollowedOffline', 'AlwaysShowCategory', 'FollowedFirst', 'GroupByCategory', 'SortByAlphabet', 'ShowHideTopBarOnDoubleclick', 'DoNotShowOfflineUsers', 'HidePrimeLoot', 'FollowedCategoryList', 'UseOverlayMenu'], function (result) {

		if (result.ShowHideTopBarOnDoubleclick != undefined) {
			settings.ShowHideTopBarOnDoubleclick = result.ShowHideTopBarOnDoubleclick;
		}
		if (result.DoNotShowOfflineUsers != undefined) {
			settings.DoNotShowOfflineUsers = result.DoNotShowOfflineUsers;
		}
		if (result.HidePrimeLoot != undefined) {
			settings.HidePrimeLoot = result.HidePrimeLoot;
		}
		if (result.FollowedCategoryList != undefined) {
			settings.FollowedCategoryList = result.FollowedCategoryList;
		}
		if (result.UseOverlayMenu != undefined) {
			settings.UseOverlayMenu = result.UseOverlayMenu;
		}
		if (result.SortByAlphabet != undefined) {
			settings.SortByAlphabet = result.SortByAlphabet;
		}
		if (result.GroupByCategory != undefined) {
			settings.GroupByCategory = result.GroupByCategory;
		}
		if (result.FollowedFirst != undefined) {
			settings.FollowedFirst = result.FollowedFirst;
		}
		if (result.AlwaysShowCategory != undefined) {
			settings.AlwaysShowCategory = result.AlwaysShowCategory;
		}
		if (result.NonFollowedOffline != undefined) {
			settings.NonFollowedOffline = result.NonFollowedOffline;
		}
		if (result.ShowOnlineUsersInTopBar != undefined) {
			settings.ShowOnlineUsersInTopBar = result.ShowOnlineUsersInTopBar;
		}
		if (result.SwapSearchbarAndTopFollowerList != undefined) {
			settings.SwapSearchbarAndTopFollowerList = result.SwapSearchbarAndTopFollowerList;
		}

		initSettingsPanel();
	});
}

function initSettingsPanel() {
	if (optionPage) {
		document.getElementById('ShowHideTopBarOnDoubleclick').checked = settings.ShowHideTopBarOnDoubleclick;
		document.getElementById('DoNotShowOfflineUsers').checked = settings.DoNotShowOfflineUsers;
		document.getElementById('HidePrimeLoot').checked = settings.HidePrimeLoot;
		document.getElementById('UseOverlayMenu').checked = settings.UseOverlayMenu;
		document.getElementById('SortByAlphabet').checked = settings.SortByAlphabet;
		document.getElementById('GroupByCategory').checked = settings.GroupByCategory;
		document.getElementById('FollowedFirst').checked = settings.FollowedFirst;
		document.getElementById('NonFollowedOffline').checked = settings.NonFollowedOffline;
		document.getElementById('AlwaysShowCategory').checked = settings.AlwaysShowCategory;
		document.getElementById('ShowOnlineUsersInTopBar').checked = settings.ShowOnlineUsersInTopBar;
		document.getElementById('SwapSearchbarAndTopFollowerList').checked = settings.SwapSearchbarAndTopFollowerList;
		document.getElementById('FollowedCategoryList').innerHTML = settings.FollowedCategoryList.map(x => '<option>' + x + '</option>');
	}
}

function saveSetting() {
	var setting = {};
	if (this.type == "checkbox") {
		setting[this.id] = this.checked;
		chrome.storage.local.set(setting, function (result) { });
	}
}

function applySettings() {
	setMainNavVisibility(!settings.ShowHideTopBarOnDoubleclick);
}



if (optionPage) {
	document.getElementById('ShowHideTopBarOnDoubleclick').addEventListener('change', saveSetting);
	document.getElementById('DoNotShowOfflineUsers').addEventListener('change', saveSetting);
	document.getElementById('HidePrimeLoot').addEventListener('change', saveSetting);
	document.getElementById('UseOverlayMenu').addEventListener('change', saveSetting);
	document.getElementById('GroupByCategory').addEventListener('change', saveSetting);
	document.getElementById('SortByAlphabet').addEventListener('change', saveSetting);
	document.getElementById('FollowedFirst').addEventListener('change', saveSetting);
	document.getElementById('AlwaysShowCategory').addEventListener('change', saveSetting);
	document.getElementById('NonFollowedOffline').addEventListener('change', saveSetting);
	document.getElementById('ShowOnlineUsersInTopBar').addEventListener('change', saveSetting);
	document.getElementById('SwapSearchbarAndTopFollowerList').addEventListener('change', saveSetting);
}

loadSettings();




