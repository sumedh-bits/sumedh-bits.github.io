var plugin, gallery, jgplugin, jsondata;
fetch("./info2.json")
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		jsondata = data;
		i = 0;
		for (i = 0; i < data.images.length; i++) {
			var loc = data.images[i].location
				? "<span><span class='material-icons'>place</span><span style='display:inline-block; width: 3px;'></span>" +
				  data.images[i].location +
				  "<span style='display:inline-block; width: 3px;'></span> • <span style='display:inline-block; width: 2px;'></span></span>"
				: "";
			var settings = data.images[i].settings.replace(
				"ISO",
				"<span class='iso-bold'>ISO</span>&emsp14;"
			);
			var desc = data.images[i].description
				? data.images[i].description +
				  "<span style='display:inline-block; width: 3px;'></span> • <span style='display:inline-block; width: 3px;'></span>"
				: "";
			document
				.getElementById("animated-thumbnails")
				.insertAdjacentHTML(
					"beforeend",
					'<a href="assets/images/thumb/' +
						data.images[i].name +
						'" data-lg-size="' +
						data.images[i].dimensions +
						"\" data-sub-html=\"<div class='caption-text'>" +
						desc +
						loc +
						"<span class='cam-settings'>" +
						settings +
						'</span>" data-download-url="assets/images/full/' +
						data.images[i].name +
						'" data-filter-attr="' +
						data.images[i].group +
						'"><img alt="' +
						data.images[i].description +
						'" src="assets/images/thumb/' +
						data.images[i].name +
						'"/></a>'
				);
		}
	})
	.then((data) => {
		gallery = $("#animated-thumbnails");
		gallery.justifiedGallery({
			randomize: true,
			captions: true,
			lastRow: "center",
			rowHeight: 250,
			margins: 10,
			html: true,
			counter: true,
			zoomFromOrigin: true,
			zoom: false,
		});
		setTimeout(() => {
			plugin = lightGallery(
				document.getElementById("animated-thumbnails"),
				{
					pager: false,
					galleryId: "nature",
					plugins: [lgThumbnail],
					mode: "lg-fade",
					mobileSettings: {
						controls: false,
						showCloseIcon: true,
						download: true,
						rotate: false,
					},
				}
			);
		}, 100);
		Array.from(gallery.find("a")).forEach(function (element, index) {
			$(element).addClass("gallery-item");
			//$(element).addClass(data.images[index].location)
		});
		//gallery.isotope({sele})
	});

function filter(param) {
	filterValue = $(param).attr("filter-attr");
	temp = $(".btn-primary");
	temp.removeClass("btn-primary");
	temp.addClass("btn-outline-primary");
	$(param).addClass("btn-primary");
	$(param).removeClass("btn-outline-primary");

	gallery.justifiedGallery("destroy");
	gallery.justifiedGallery({
		randomize: false,
		captions: true,
		lastRow: "center",
		rowHeight: 250,
		margins: 10,
		html: true,
		counter: true,
		zoomFromOrigin: true,
		zoom: false,
		selector:
			filterValue == "*"
				? ".gallery-item"
				: `[data-filter-attr='${filterValue}']`,
	});

	timeout = plugin.destroy();
	plugin = null;
	setTimeout(() => {
		plugin = window.lightGallery(
			document.getElementById("animated-thumbnails"),
			{
				pager: false,
				galleryId: "nature",
				plugins: [lgThumbnail],
				mode: "lg-fade",
				selector:
					filterValue == "*"
						? false
						: document.querySelectorAll(
								`[data-filter-attr='${filterValue}']`
						  ),
				mobileSettings: {
					controls: false,
					showCloseIcon: true,
					download: true,
					rotate: false,
				},
			}
		);
	}, timeout);
}
function test2() {
	plugin.destroy();
}
