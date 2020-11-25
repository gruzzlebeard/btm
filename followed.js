

function getFollowedCategories() {
	let d = [];

	$('div[data-test-selector="tw-card-title"] h3').each(function (index) {
		let o = $(this)[0];
		d.push(o.innerText);
		o.style.color = "limegreen";
		followedObserver.disconnect();
	});

	return d;
}

let followedObserver = new MutationObserver(mutations => {
	let d = getFollowedCategories();
	chrome.storage.local.set({ "FollowedCategoryList": d }, function (result) { });
});
chrome.storage.local.set({ "FollowedCategoryList": null }, function (result) { });
followedObserver.observe(document, { childList: true, subtree: true });
