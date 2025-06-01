const colorMap = {
	Grey: "#808080",
	Antibrass: "#A87C6F",
	Anticopper: "#8C6037",
	Antigold: "#D4AF37",
	Antisilver: "#C0C0C0",
	Apricot: "#FBCEB1",
	Aquamarine: "#7FFFD4",
	"Baby Blue": "#89CFF0",
	Beach: "#F4A460",
	Beige: "#F5F5DC",
	Black: "#000000",
	"Black Nickel": "#413E3E",
	Blossome: "#FFC0CB",
	Blue: "#4444ff",
	Bronze: "#CD7F32",
	Brown: "#A52A2A",
	Burgandy: "#800020",
	Charcoal: "#36454F",
	Chocolate: "#D2691E",
	Copper: "#B87333",
	Cream: "#FFFDD0",
	Customized: "#FF69B4",
	Cyan: "#00FFFF",
	"Dark Blue": "#00008B",
	"Dark Brown": "#654321",
	"Dark Indigo": "#2C2F4A",
	"Dark-blue": "#00008B",
	"Deep Green": "#006400",
	DTM: "#123456",
	"Dyeable White": "#FFFFF0",
	Ecru: "#C2B280",
	Emerald: "#50C878",
	"Foloecent - White": "#F8F8FF",
	Gold: "#FFD700",
	Golden: "#DAA520",
	Green: "#008000",
	Greige: "#B2BEB5",
	Gunmetal: "#2a3439",
	Indigo: "#4B0082",
	Lavender: "#E6E6FA",
	LEMON: "#FFF44F",
	"Light Brown": "#FFA07A",
	Lime: "#32CD32",
	Magenta: "#FF00FF",
	Maroon: "#800000",
	"Medium Brown": "#8B4513",
	"Metal-Golden": "#B8860B",
	Multicolor: "linear-gradient(90deg, red, blue, yellow, green)",
	NA: "#999999",
	Natural: "#DEB887",
	"Natural B": "#D2B48C",
	"Natural Brown": "#8B4513",
	"Natural Color": "#F5DEB3",
	NAVY: "#000080",
	"Navy blue": "navy",
	"Ni-Free Nickle": "#A9A9A9",
	Nil: "#Ffffff",
	Nill: "#Ffffff",
	Nude: "#F2D2BD",
	"Off-White": "#F8F8FF",
	Olive: "#808000",
	Opaque: "#CCCCCC",
	Orange: "#FFA500",
	"Orange-Red": "#FF4500",
	Others: "#CCCCCC",
	"Oxidized Silver": "#6E7F80",
	Peach: "#FFDAB9",
	Pink: "#FFC0CB",
	Pur: "#800080",
	Purple: "#800080",
	Raw: "#D3D3D3",
	RED: "ff0000d4",
	Red: "#ff0000d4",
	RFD: "#B2BEB5",
	Silver: "#C0C0C0",
	Skin: "#FAD6A5",
	"SKY BLUE": "#87CEEB",
	TAN: "#D2B48C",
	Teal: "#008080",
	TF: "#654321",
	Transparent: "transparent",
	Turquoise: "#40E0D0",
	Violet: "#EE82EE",
	White: "#FFFFFF",
	Yellow: "#FFFF00",
};

function redirect() {
	$(location).attr(
		"href",
		base_url + "categories/search/" + $("#pro_name").val()
	);
}
$(function () {
	$("#searchText").keydown(function () {
		var val = $("#searchText").val().trim();
		val = val.replace(/\s+/g, "");
		if (val.length > 3) {
			//for checking 3 characters
			$("#start_val").html("0");
			filter_product();
		}
	});
});

function validateEmail($email) {
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

	return emailReg.test($email);
}

function forget_password_validation() {
	var password = $("#password").val();
	var confirmPassword = $("#password_confirm").val();

	if (confirmPassword == "") {
		$("#password_confirm").focus();
		$("#error_div").removeClass("d-none");
		$("#error_div").text("Confirm Password Required");
		return false;
	}

	if (password != confirmPassword) {
		$("#error_div").removeClass("d-none");
		$("#error_div").text("Confirm password not matched");
		return false;
	} else {
		$("#error_div").addClass("d-none");
		$("#error_div").text("");
	}
}

var start = "0";

function filter_product() {
	var sub_cat_hint = $("#filter_form  #sub_cat_hint").val();
	var cat_id = $("#filter_form  #cat").val();
	var sub_cat = $("#filter_form  #sub_cat").val();
	var location = $("#filter_form  #location").val();
	var design = $("#filter_form  #design").val();

	var companies = $("#filter_form #companies").val();
	var conBaseSearch = $("#filter_form  #conBaseSearch").val();
	var certi = $("#filter_form  #certi").val();
	if (design == "gold") {
		$("#breadcrumb-slide").text("Gold");
	} else if (design == "lat_desi") {
		$("#breadcrumb-slide").text("Latest Design");
	} else if (design == "featured") {
		$("#breadcrumb-slide").text("Featured");
	} else if (design == "certi_fab") {
		$("#breadcrumb-slide").text("Certified Fabrics");
	} else {
		$("#breadcrumb-slide").text("Listed Products");
	}
	var error_found = 0;
	if (error_found) {
		return false;
	} else {
		start = $("#start_val").text();
		$("body").addClass("waiting");
		$.ajax({
			url: base_url + "filter-product",
			type: "POST",
			data: {
				sub_cat_hint: sub_cat_hint,
				cat_id: cat_id,
				sub_cat: sub_cat,
				location: location,
				design: design,
				companies: companies,
				certi: certi,
				start: start,
				conBaseSearch: conBaseSearch,
				csrf_test_name: csrf_hash,
			},
			success: function (response) {
				data = $.parseJSON(response);
				$("body").removeClass("waiting");
				$(".category-toggle-sidebar").removeClass("open");
				if (start >= data.products.end) {
					console.log("more products not exist");
					return false;
				}
				start = data.products.end;
				if (data.products.status == "error") {
					$("#product_div").html(
						'<img id="prodNotFound" src="' +
							base_url +
							'assets/images/home/prodNotFound.jpg">'
					);
					$("#showing_product").html("0");
					$("#btn_more").html("");
					return false;
				}
				if (data.products.noofProduct >= 1) {
					$("#product_div #prodNotFound").remove("");
				}
				$("#showing_product").html(data.products.noofProduct);
				if (data.products.status == "error") {
					return false;
				}

				$("#start_val").html(start);
				$.each(data.products.product, function (i, v) {
					var tag = "";
					var tag_content = "";
					if (v["featured"] == "Y") {
						var tag = "gold";
						var tag_content = '<div class="tag-featured">Featured</div>';
					} else if (v["gold"] == "Y") {
						var tag = "featured";
						var tag_content = '<div class="tag-featured">Gold</div>';
					} else if (v["lat_des"] == "Y") {
						var tag = "featured";
						var tag_content = '<div class="tag-featured">Latest Design</div>';
					}

					var rating = Math.round(v["rating"]);
					var rat_string = "";
					for (var i = 0; i < rating; i++) {
						rat_string = rat_string + '<i class="fa fa-star checked"></i>';
					}
					for (var j = rating; j < 5; j++) {
						rat_string = rat_string + '<i class="fa fa-star"></i>';
					}
					if (v["certi_fab"] == "Y") {
						var sust =
							'<i class="fa fa-check" aria-hidden="true"></i> Certified';
					} else {
						var sust = "";
					}
					var fb_link =
						"https://www.facebook.com/sharer/sharer.php?u=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var twit_link =
						"https://twitter.com/intent/tweet?url=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var linkedin_link =
						"https://www.linkedin.com/sharing/share-offsite/?url=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var whats_link =
						"https://web.whatsapp.com/send?text=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var color_str = "";
					var colorCount = 1;
					$.each(v["prod_col"], function (i, v) {
						if (colorCount > 4) {
							return false;
						}
						if (colorMap[v.color]) {
							color_str += `<div class="mx-0 ms-1" title="${
								v.color
							}" style="height: 15px; width: 15px; background: ${
								colorMap[v.color]
							}; border:black 1px solid;"></div>`;
						} else {
							color_str +=
								'<div class="mx-0 ms-1" title="' +
								v["color"] +
								'" style="height: 15px; width: 15px; background-color: ' +
								v["color"] +
								';border:black 1px solid;"></div>';
						}

						colorCount++;
					});

					$("#product_div").append(
						'<div class="col-sm-6 col-md-4"> <div class="product-thumb">' +
							tag_content +
							'<div class="image"> ' +
							'<img src="' +
							base_url +
							"assets/images/Product/" +
							v["image"][0] +
							'" alt="" class="img-fluid"> <div class="overlay"><div class="button"> <a href="' +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/product-detail/" +
							v["unique_id"] +
							'" class="btn btn-outline-dark link" target="_blank"><i class="fa fa-eye" aria-hidden="true"></i> View Detail</a> </div> </div> </div> <div class="product-disc"><div class="row"> <div class="col-10"><h6 class="name" ><a class="title fw-bold" title="' +
							v["sub_cat"].toLowerCase().toUpperCase().replace(/-/g, " ") +
							'" style="color: #110c5a; font-size: 18px; !important"  href="' +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/product-detail/" +
							v["unique_id"] +
							'" target="_blank">' +
							v["sub_cat"].toLowerCase().toUpperCase().replace(/-/g, " ") +
							'</a></h6></div><div class="col-2"><div class="text-end mt-1"><i class="fa-solid fa-share-from-square fa-xl" style="font-size: 20px; color:#666; cursor: pointer;"  alt="" class="share-alt" id="share' +
							v["unique_id"] +
							'" onclick="show_share_div(' +
							"'" +
							v["unique_id"] +
							"'" +
							')"></i></div></div><div class="col-6" style="font-size: 16px; font-weight: 400;" title=" ' +
							v["city"] +
							'">  ' +
							v["city"] +
							'</div><div class="col-6 d-flex justify-content-end">' +
							color_str +
							'</div><div class="col-8 "style="color:rgba(63, 63, 63, 0.76);">' +
							v["content"].substr(0, 15) +
							'</div><div class="col-4 d-flex justify-content-end"><div><i class="fa-solid fa-eye fa-xl" style="color:goldenrod;"></i><span class="ms-1">' +
							v["view"] +
							'</span></div></div></div><div class="certification-prod-div" style="position: absolute; top: -19px; left:-22px;"><img style="scale: 0.5;" src="' +
							base_url +
							"assets/img/text_certificate/" +
							v["certi_img"] +
							'" /></div><div class="product-thumb-share" id="share_div' +
							v["unique_id"] +
							'"> ' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-fb.png" alt="" onclick="window.open(&#39;' +
							fb_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-tw.png" alt="" onclick="window.open(&#39;' +
							linkedin_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-in.png" alt="" onclick="window.open(&#39;' +
							twit_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-wap.png" alt="" onclick="window.open(&#39;' +
							whats_link +
							')"></a></a> </div></div></div> </div>'
					);
					color_str = "";
				});
				// assured
				$("#btn_more").html("");
				if (data.products.noofProduct > 11) {
					$(
						'<button class="btn btn-success" onclick="filter_product();">Load More</button>'
					).appendTo("#btn_more");
				}
				if (start >= data.products.noofProduct) {
					$("#btn_more").html("");
				}

				$("#filter_form #companies").html("");
				$("#filter_form #companies").html(
					'<option selected="" value="All Companies">All Companies</option>'
				);
				$.each(data.products.orgs, function (i, v) {
					$("#filter_form #companies").append(
						'<option value="' + v["orgId"] + '">' + v["orgName"] + "</option>"
					);
				});
				// $("#filter_form #location").val(location);
				// console.log(data.products.cities);
				// alert("he negi");return false;sdsd
				if (location != "All cities") {
					$("#filter_form #location").html("");
					$("#filter_form #location").append(
						'<option selected="" value="All Cities">Location</option>'
					);
					$.each(data.products.cities, function (i, v) {
						$("#filter_form #location").append(
							'<option value="' + v["cityId"] + '">' + v["name"] + "</option>"
						);
					});
					$("#filter_form #location").val(location);
					// alert(location);
				}

				if (certi != "All Certi") {
					$("#filter_form #certi").html("");
					$("#filter_form #certi").append(
						'<option selected="" value="All Certi">Certification</option>'
					);
					$.each(data.products.certi, function (i, v) {
						$("#filter_form #certi").append(
							'<option value="' + i + '">' + v + "</option>"
						);
					});
					$("#filter_form #certi").val(certi);
				}
				if (sub_cat != "0") {
					$("#filter_form #sub_cat").html("");
					$("#filter_form #sub_cat").append(
						'<option value="0">All Sub Category</option>'
					);
					$.each(data.products.sub_cats, function (i, v) {
						$("#filter_form #sub_cat").append(
							'<option value="' +
								v["subCategoryId"] +
								'">' +
								v["subCategoryName"] +
								"</option>"
						);
					});
					$("#filter_form #sub_cat").val(sub_cat);
				}

				if (companies != "All Companies") {
					$("#filter_form  #companies").html("");
					$("#filter_form  #companies").append(
						'<option selected value="All Companies">All Companies</option>'
					);
					$.each(data.products.orgs, function (i, v) {
						$("#filter_form  #companies").append(
							'<option value="' + v["orgId"] + '">' + v["orgName"] + "</option>"
						);
					});
					$("#filter_form  #companies").val(companies);
				}
			},
		});
	}
}

function latest_des_filter() {
	console.log("function called");

	var searchText = $("#filter_form #searchText").val();
	var sub_cat = $("#filter_form #sub_cat").val();
	var cat_id = $("#filter_form #cat").val();
	var size = $("#filter_form #size_drp_dwn").val();
	var size_text = $("#filter_form #size_drp_dwn option:selected").text().trim();
	var content = $("#filter_form #content").val();
	var country = $("#filter_form #country").val();
	var states = $("#filter_form #state").val();
	var cities = $("#filter_form #city").val();
	var companies = $("#filter_form #companies").val();
	var color = $("#filter_form #color_div option:selected").text().trim();
	var error_found = 0;

	if (error_found) {
		return false;
	} else {
		start = $("#start_val").text();
		$.ajax({
			url: base_url + "latest-design-filter",
			type: "POST",
			data: {
				cat_id: cat_id,
				start: start,
				content: content,
				states: states,
				sub_cat: sub_cat,
				size: size,
				color: color,
				size_text: size_text,
				companies: companies,
				country: country,
				cities: cities,
				searchText: searchText,
				csrf_test_name: csrf_hash,
			},
			success: function (response) {
				data = $.parseJSON(response);
				start = data.end;
				$(".category-toggle-sidebar").removeClass("open");
				if (data.status == "error") {
					$("#btn_more").html("");
					$("#product_div").html(
						'<img src="' + base_url + 'assets/images/home/prodNotFound.jpg">'
					);
					$("#showing_product").html("0");
					return false;
				}
				if (data.noofProduct >= 1) {
					$("#product_div #prodNotFound").remove("");
				}
				$("#showing_product").html(data.noofProduct);

				if (data.data == "blank") {
					return false;
				}

				$("#start_val").html(start);
				$.each(data.product, function (i, v) {
					var tag = "";
					var tag_content = "";
					if (v["featured"] == "Y") {
						var tag = "gold";
						var tag_content = "featured";
					} else if (v["gold"] == "Y") {
						var tag = "featured";
						var tag_content = "Gold";
					}
					var fb_link =
						"https://www.facebook.com/sharer/sharer.php?u=" +
						base_url +
						v["comp"] +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"] +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var twit_link =
						"https://twitter.com/intent/tweet?url=" +
						base_url +
						v["comp"] +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"] +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var linkedin_link =
						"https://www.linkedin.com/sharing/share-offsite/?url=" +
						base_url +
						v["comp"] +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"] +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var whats_link =
						"https://web.whatsapp.com/send?text=" +
						base_url +
						v["comp"] +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"] +
						"/product-detail/" +
						v["unique_id"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					$("#product_div").append(
						'<div class="col-sm-6 col-md-4"> <div class="product-thumb"><div class="tag-featured">' +
							tag_content +
							'</div> <div class="image"> ' +
							'<img src="' +
							base_url +
							"assets/images/Product/" +
							v["image"][0] +
							'" alt="" class="img-fluid"> <div class="overlay"><div class="button"> <a href="' +
							base_url +
							v["comp"] +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"] +
							"/product-detail/" +
							v["unique_id"] +
							'" class="btn btn-outline-dark link" target="_blank"><i class="fa fa-eye" aria-hidden="true" ></i> View Detail</a> </div> </div> </div> <div class="product-disc"> <div class="row"> <div class="col-6">' +
							' <h6 class="text-warning name"><a href="' +
							base_url +
							v["comp"] +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"] +
							"/product-detail/" +
							v["unique_id"] +
							'">' +
							v["sub_cat"]
								.toLowerCase()
								.replace(/\b\w/g, (char) => char.toUpperCase()) +
							'</a></h6> </div> <div class="col-4"> <div class=" text-success">  <img style="scale:2.4; position:absolute; right:50px;" src="https://sowtex.com/assets/images/sowtex/assurity_image.png"/></div> ' +
							'</div> <div class="col-2"> <div class="text-end mt-1"> <i class="fa-regular fa-share-from-square fa-lg me-3" style="font-size:20px; color:#666;" id="share' +
							v["unique_id"] +
							'" onclick="show_share_div(' +
							"'" +
							v["unique_id"] +
							"'" +
							')"> </i>' +
							'</div> </div> <div class="col-6"><strong>City:</strong> ' +
							v["city"] +
							'</div> <div class="col-6"><strong>Views:</strong> 599</div> <div class="col-6"><strong>Color/Finish:</strong> White</div> <div class="col-6"> ' +
							'<div class="rating"> <i class="fa fa-star checked" aria-hidden="true"></i> <i class="fa fa-star checked" aria-hidden="true"></i> <i class="fa fa-star checled" aria-hidden="true"></i> <i class="fa fa-star" aria-hidden="true">' +
							'</i> <i class="fa fa-star" aria-hidden="true"></i> </div> </div> </div> <div class="product-thumb-share" id="share_div' +
							v["unique_id"] +
							'"> ' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-fb.png" alt="" onclick="window.open(&#39;' +
							fb_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-tw.png" alt="" onclick="window.open(&#39;' +
							linkedin_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-in.png" alt="" onclick="window.open(&#39;' +
							twit_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-wap.png" alt="" onclick="window.open(&#39;' +
							whats_link +
							')"></a></a> </div> </div> </div> </div>'
					);
				});
				$("#sub_cat").html("");
				$("#sub_cat").html('<option value="0">All Sub Category</option>');
				$.each(data.sub_cats, function (i, v) {
					$("#sub_cat").append(
						'<option value="' +
							v["subCategoryId"] +
							'">' +
							v["subCategoryName"] +
							"</option>"
					);
				});
				$("#sub_cat").val(sub_cat);
				$("#companies").html("");
				$("#companies").html(
					'<option selected="" value="All Companies">All Companies</option>'
				);
				$.each(data.orgs, function (i, v) {
					$("#companies").append(
						'<option value="' + v["id"] + '">' + v["orgName"] + "</option>"
					);
				});
				$("#size_drp_dwn").html("");
				$("#size_drp_dwn").html(
					'<option selected="Size" value="All Size">All Size</option>'
				);
				$.each(data.sizes, function (i, v) {
					$("#size_drp_dwn").append(
						"<option value=" + v + ">" + v + "</option>"
					);
				});
				$("#size_drp_dwn option:contains(" + size_text + ")").attr(
					"selected",
					"selected"
				);

				$("#color_div").html("");
				$("#color_div").html(
					'<option selected="All Colors">All Colors</option>'
				);
				$.each(data.colors, function (i, v) {
					$("#color_div").append(
						'<option value="' + v["color"] + '">' + v["color"] + "</option>"
					);
				});
				$("#color_div option:contains(" + color + ")").attr(
					"selected",
					"selected"
				);

				$("#country").html("");
				$("#country").html(
					'<option selected="" value="All Country">All Country</option>'
				);
				$.each(data.country, function (i, v) {
					$("#country").append(
						'<option value="' + v["id"] + '">' + v["name"] + "</option>"
					);
				});
				$("#country").val(country);
				$("#companies").val(companies);
				if (country == "All Country") {
					$("#state").html("");
					$("#state").append(
						'<option selected="" value="All States">All State</option>'
					);
					$("#city").html("");
					$("#city").append(
						'<option selected="" value="All City">All City</option>'
					);
					return false;
				}
				if (country != "All Country") {
					$("#state").html("");
					$("#state").append(
						'<option selected="" value="All States">All State</option>'
					);
					$("#city").html("");
					$("#city").append(
						'<option selected="" value="All City">All City</option>'
					);

					$.each(data.states, function (i, v) {
						$("#state").append(
							'<option value="' + v["id"] + '">' + v["name"] + "</option>"
						);
					});
					$("#state").val(states);
				}
				if (states == "All States") {
					$("#city").html("");
					$("#city").append(
						'<option selected="" value="All City">All City</option>'
					);
				}
				if (states != "All States") {
					$("#city").html("");
					$("#city").append(
						'<option selected="" value="All City">All City</option>'
					);
					$.each(data.cities, function (i, v) {
						$("#city").append(
							'<option value="' + v["id"] + '">' + v["name"] + "</option>"
						);
					});
					$("#city").val(cities);
				}
			},
		});
	}
}
$(function () {
	$("#searchTextSurplus").keydown(function () {
		var val = $("#searchTextSurplus").val().trim();
		val = val.replace(/\s+/g, "");
		if (val.length >= 3) {
			//for checking 3 characters
			surplus();
		}
	});
});
var start = "0";

function surplus() {
	var sub_cat_hint = $("#filter_form_2  #sub_cat_hint").val();
	var cat_id = $("#filter_form_2 #cat").val();
	var sub_cat = $("#filter_form_2 #sub_cat").val();
	var location = $("#filter_form_2  #location").val();
	var deals = $("#filter_form_2  #deals").val();
	// var cities = $("#filter_form_2 #city").val();
	var companies = $("#filter_form_2 #companies").val();
	var conBaseSearch = $("#filter_form_2  #conBaseSearch").val();
	var min = $("#filter_form_2 #minValue").val().replace(/[^\d]/g, "");
	var max = $("#filter_form_2 #maxValue").val().replace(/[^\d]/g, "");
	console.log(min);
	console.log(" ");
	console.log(max);

	if (deals == "hot_deal") {
		$("#breadcrumb-stock").text("Hot Deals");
	} else if (deals == "verified") {
		$("#breadcrumb-stock").text("Assured Stock");
	} else if (deals == "both") {
		$("#breadcrumb-stock").text("Hot Deals and Assured Stock");
	} else {
		$("#breadcrumb-stock").text("Total Stocks");
	}
	var error_found = 0;
	if (error_found) {
		return false;
	} else {
		start = $("#start_val").text();
		$("body").addClass("waiting");

		// if (start == '' || start == 0) {
		//     return false;
		// }
		$.ajax({
			url: base_url + "filter-stock",
			type: "POST",
			data: {
				sub_cat_hint: sub_cat_hint,
				cat_id: cat_id,
				sub_cat: sub_cat,
				companies: companies,
				location: location,
				deals: deals,
				start: start,
				min: min,
				max: max,
				conBaseSearch: conBaseSearch,
				csrf_test_name: csrf_hash,
			},
			success: function (response) {
				var user_id = "";
				$("body").removeClass("waiting");
				$(".category-toggle-sidebar").removeClass("open");
				//$("#product_div").html('');
				data = $.parseJSON(response);
				if (start > data.noofstock) {
					return false;
				}
				start = data.end;
				if (data.status == "error") {
					$("#product_div").html(
						'<img id="prodNotFound" src="' +
							base_url +
							'assets/images/home/prodNotFound.jpg">'
					);
					$("#showing_product").html("0");
					$("#btn_more").html("");
					return false;
				}

				if (data.noofStock >= 1) {
					$("#product_div #prodNotFound").remove("");
				}
				$("#showing_product").html(data.noofStock);
				//alert(data.noofStock);
				if (data.status == "error") {
					return false;
				}
				$("#start_val").html(start);
				$.each(data.products, function (i, v) {
					if (v["assured"] == "Y") {
						var assured =
							'<img style="scale:2.4; position:absolute; right:22px; top:5px;" src="' +
							base_url +
							'assets/images/sowtex/assurity_image.png"/>';
					} else {
						var assured = "";
					}
					if (user_id == "") {
						var link = 'data-bs-toggle="modal" data-bs-target="#modal-login"';
					} else {
						var link =
							"onclick=shorlist_product('" + v["id"] + "'," + user_id + ")";
					}
					var fb_link =
						"https://www.facebook.com/sharer/sharer.php?u=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/stock-detail/" +
						v["stockUniqueId"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var twit_link =
						"https://twitter.com/intent/tweet?url=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/stock-detail/" +
						v["stockUniqueId"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var linkedin_link =
						"https://www.linkedin.com/sharing/share-offsite/?url=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/stock-detail/" +
						v["stockUniqueId"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					var whats_link =
						"https://web.whatsapp.com/send?text=" +
						base_url +
						v["comp"].toLowerCase() +
						"/" +
						v["cat"].toLowerCase() +
						"/" +
						v["sub_cat"].toLowerCase() +
						"/stock-detail/" +
						v["stockUniqueId"] +
						"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
					if (v["hotdeal"] == "Y") {
						var hotdeal_tag =
							'<img src="' +
							base_url +
							"assets/images/sowtex/hot_deal.png" +
							'" style=" float: right;    position: absolute; z-index: 100;right: 0; scale: .7;">';
					} else {
						var hotdeal_tag = "";
					}
					var color_str = "";

					$.each(v["color"], function (i, v) {
						if (colorMap[v.color]) {
							color_str += `<div class="mx-0 ms-1" title="${
								v.color
							}" style="height: 15px; width: 15px; background: ${
								colorMap[v.color]
							}; border:black 1px solid;"></div>`;
						} else {
							color_str +=
								'<div class="mx-0 ms-1" title="' +
								v["color"] +
								'" style="height: 15px; width: 15px; background-color: ' +
								v["color"] +
								'; border:1px solid black;"></div>';
						}
					});
					$("#product_div").append(
						'<div class="col-sm-6 col-md-4"> <div class="product-thumb"> ' +
							hotdeal_tag +
							'<div class="image"> <img src="' +
							base_url +
							"assets/images/Stock/" +
							v["image"] +
							'" alt="" class="img-fluid"> <div class="overlay"> <div class="button"> <a href="' +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/stock-detail/" +
							v["stockUniqueId"] +
							'" class="btn btn-outline-dark link"  target="_blank"><i class="fa fa-eye" aria-hidden="true"></i> View Detail</a> </div> </div> </div> <div class="product-disc" style="height:105px;"> <div class="row"><div class="col-10 pe-0"><h6 class="name"><a href="' +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/stock-detail/" +
							v["stockUniqueId"] +
							'" style="color: #110c5a; font-size: 18px !important; font-weight:600;" target="_blank">' +
							v["sub_cat"]
								.toLowerCase()
								.replace(/-/g, " ")
								.replace(/\b\w/g, (char) => char.toUpperCase()) +
							' </a></h6></div><div class="col-2 py-0" onclick="show_sharing(' +
							"'" +
							v["id"] +
							"'" +
							')"><div class="text-end mt-1"><i class="fa-solid fa-share-from-square fa-xl" style="font-size: 20px; color: #666;" alt=""></i></div></div><div class="col-7 d-flex align-items-center pe-0">Avl. Qty:&nbsp; <p style="font-size: 16px ;  font-weight: 800;" class="text-dark;">' +
							v["quan"] +
							'</p></div><div class="col-5 py-0 "><p style="font-size: 16px; text-align:end; font-weight:800; cursor: pointer;" class="py-0 text-dark">₹' +
							v["sto_price"] +
							'</p></div><div class="col-6" > ' +
							v["loc"] +
							'</div><div class="col-6  d-flex justify-content-end">' +
							color_str +
							'</div><div class="col-9 pe-0" style="color: #000000b7;"><p style="font-size: 12px; line-height: 1.1;" title="' +
							v["content"] +
							'">' +
							v["content"].substr(0, 26) +
							'</p></div><div class="col-3 position-relative">' +
							assured +
							'</div></div><div class="product-thumb-share" id="share_div' +
							v["id"] +
							'"> ' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-fb.png" alt="" onclick="window.open(&#39;' +
							fb_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-tw.png" alt="" onclick="window.open(&#39;' +
							twit_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-in.png" alt="" onclick="window.open(&#39;' +
							linkedin_link +
							')"></a>' +
							' <a href="#!"><img src="' +
							base_url +
							'assets/images/sowtex/share-wap.png" alt="" onclick="window.open(&#39;' +
							whats_link +
							')"></a></a> </div> </div> </div> </div>'
					);
				});
				$("#btn_more").html("");
				if (data.noofStock > 11) {
					$(
						'<button class="btn btn-success" onclick="surplus();">Load More</button>'
					).appendTo("#btn_more");
				}
				if (start >= data.noofStock) {
					$("#btn_more").html("");
				}
				$("#filter_form_2 #start_val").text(data.end);
				$("#filter_form_2 #location").val(location);

				if (location != "All Cities") {
					$("#filter_form_2 #location").html("");
					$("#filter_form_2 #location").append(
						'<option selected="" value="All Cities">Location</option>'
					);
					$.each(data.location, function (i, v) {
						$("#filter_form_2 #location").append(
							'<option value="' + v["id"] + '">' + v["name"] + "</option>"
						);
					});
					$("#filter_form_2 #location").val(location);
				}

				if (location == "All Cities") {
					$("#filter_form_2 #location").html("");
					$("#filter_form_2 #location").html(
						'<option selected="" value="All Cities">All Cities</option>'
					);
					$.each(data.location, function (i, v) {
						$("#filter_form_2 #location").append(
							'<option value="' + v["id"] + '">' + v["name"] + "</option>"
						);
					});
					// return false;
				}

				if (companies != "All Companies") {
					$("#filter_form_2 #companies").html("");
					$("#filter_form_2 #companies").html(
						'<option selected="" value="All Companies">All Companies</option>'
					);
					$.each(data.orgs, function (i, v) {
						// alert(v['orgId']);return false;
						$("#filter_form_2 #companies").append(
							'<option value="' + v["orgId"] + '">' + v["orgName"] + "</option>"
						);
					});
					$("#filter_form_2 #companies").val(companies);
				} else {
					$("#filter_form_2 #companies").html("");
					$("#filter_form_2 #companies").html(
						'<option selected="" value="All Companies">All Companies</option>'
					);
					$.each(data.orgs, function (i, v) {
						$("#filter_form_2 #companies").append(
							'<option value="' + v["orgId"] + '">' + v["orgName"] + "</option>"
						);
					});
				}
				// alert(sub_cat);return false;
				if (sub_cat != "All Sub Category") {
					$("#filter_form_2 #sub_cat").html("");
					$("#filter_form_2 #sub_cat").html(
						'<option selected="" value="All Sub Category">All Sub Category</option>'
					);
					$.each(data.sub_cats, function (i, v) {
						// alert(v['orgId']);return false;
						$("#filter_form_2 #sub_cat").append(
							'<option value="' +
								v["subCategoryId"] +
								'">' +
								v["subCategoryName"] +
								"</option>"
						);
					});
					$("#filter_form_2 #sub_cat").val(sub_cat);
				} else {
					$("#filter_form_2 #sub_cat").html("");
					$("#filter_form_2 #sub_cat").html(
						'<option selected="" value="All Sub Category">All Sub Category</option>'
					);
					$.each(data.sub_cats, function (i, v) {
						$("#filter_form_2 #sub_cat").append(
							'<option value="' +
								v["subCategoryId"] +
								'">' +
								v["subCategoryName"] +
								"</option>"
						);
					});
				}
				// console.log(data.price_range);
				// // data.price_range.min=100;
				// // data.price_range.max=500;
				// let minPrice = data.price_range.min; // Initial minimum price
				// let maxPrice = data.price_range.max; // Initial maximum price

				// const $slider = $("#price-slider"); // Slider element
				// const $minValue = $("#minValue"); // Input element for min value
				// const $maxValue = $("#maxValue");
				// // const $maxValue = $("#maxValue"); // Input element for max value
				// $slider.slider({
				// 	range: true,
				// 	min: data.price_range.min,
				// 	max: data.price_range.max,
				// 	values: [data.price_range.min, data.price_range.max], // Initialize slider values
				// 	slide: function (event, ui) {
				// 		// Update the read-only input fields dynamically as the slider moves
				// 		$minValue.val("₹ " + ui.values[0]);
				// 		$maxValue.val("₹ " + ui.values[1]);

				// 		// Update the variables with the selected values
				// 		minPrice = ui.values[0];
				// 		maxPrice = ui.values[1];
				// 	},
				// });

				// // Initialize the values in the input fields
				// $minValue.val(" ₹ " + $slider.slider("values", 0));
				// $maxValue.val(" ₹ " + $slider.slider("values", 1));
			},
		});
	}
	return false;
}

function login(callback) {
	$("#login_error").html("");
	var error_found = 0;
	var email = $("#login-model #email").val();
	var password = $("#login-model #password").val();

	if (!blank_check(email, "email_login")) {
		error_found++;
	}
	if (!blank_check(password, "password_login")) {
		error_found++;
	}

	var type = isMobileDevice ? "app" : "web";

	if (error_found) {
		if (callback) callback(false, { message: "Validation failed" });
		return;
	}

	$.ajax({
		url: base_url + "login",
		type: "POST",
		data: {
			email: email,
			password: password,
			type: type,
			csrf_test_name: csrf_hash,
		},
		success: function (response) {
			var data = $.parseJSON(response);
			if (data.res === "success") {
				if (callback)
					callback(true, { message: "Login Succesf", response: data });
			} else {
				let errorMessage = "An error occurred";
				if (data.res === "inactive") {
					errorMessage = "Your Account is Inactive. Click on Forget Password";
				} else if (data.res === "does_not_exist") {
					errorMessage = "Registered Email Not Exist";
				} else if (data.res === "Wrong Password") {
					errorMessage = "Wrong Password";
				}
				$("#login_error").html(errorMessage);
				if (callback) callback(false, { message: errorMessage });
			}
		},
		error: function () {
			if (callback) callback(false, "Server error");
		},
	});
}

// Function to handle login button click
function handleLogin(curpath, modalid) {
	// window.location.href = base_url + "control-panel/dashboard";
	login(function (success, data) {
		if (success) {
			console.log("Login successful:", data);
			$("#loginClsBtn").click();
			console.log(modalid);
			// Check if "stock-detail" exists in the URL
			if (
				curpath.includes("stock-detail") &&
				(modalid == "modal-enquiry" || modalid == "modal-Order")
			) {
				let skeletonModal = new bootstrap.Modal(
					document.getElementById(modalid),
					{
						backdrop: "static",
						keyboard: false,
					}
				);
				skeletonModal.show();
				console.log(data.response.userData.image);
			} else if (curpath.includes("product-detail")) {
				let skeletonModal = new bootstrap.Modal(
					document.getElementById("modal-enquiry"),
					{
						backdrop: "static",
						keyboard: false,
					}
				);
				skeletonModal.show();
			} else {
				console.log(modalid);
				window.location.href = base_url + "control-panel/dashboard";
			}
			var profile_img = "";
			$("#EnqBtnStockDetail").attr("data-target", "#modal-enquiry");
			$("#orderStockDetails").attr("data-target", "#modal-Order");
			var stockid=$("#stockId").val();
			var orgId=$("#orgId").val();
			$("#stockShLstBtn").attr("onclick", "shortlist_stock("+stockid+",'"+orgId+"')");
			$("#stockShLstBtn").removeAttr("data-target");
			
			var imgSrc =data.response.userData.image && data.response.userData.image !== ""
					? base_url + "assets/images/Profile/" + data.response.userData.image
					: base_url + "assets/admin/images/profile/avatar.png";
					$("#nav-header-right").html(
						'<div id="nav-header-right"> <div class="header-top-right d-flex"> <div class="search-header me-2"> <a href="javascript:void(0)" style="text-decoration: none; color: black;"><i class="fa-solid fa-magnifying-glass fa-xl "></i></a> </div> <a id="post-enq-fixed-btn" style="bottom: 110px; right: 10px; display: inline;" href="' +base_url +'/control-panel/add-new-enquiry" class="post-enquiry btn btn-primary position-fixed">Post Enquiry</a> <div class="admin-header"> <div class="display-none"> <ul class="d-flex login-register"> <li><a href="#" data-toggle="modal" class="d-flex align-items-center" data-target="#login-model"><img src="http://localhost/sowtex3.0/assets/front/img/user-icon.png" alt="login"><i class="fa-solid fa-user fa-md" style="color: #ffffff;"></i>Login </a></li> <li><a href="#">/</a></li> </ul> </div> <div class="avtar_info"> <div class="avtar_info-image"><img src="' +
							imgSrc +
							'"></div> <p>' +
							data.response.userData.first_name +
							" " +
							data.response.userData.last_name +
							'</p> <div class="drop-down-avtar"> <ul> <a href="' +
							base_url +
							'control-panel/dashboard"> <li>My Dashboard</li> </a> <a href="' +
							base_url +
							'control-panel/profile"> <li>Change Password</li> </a> <a href="' +
							base_url +
							'/logout"> <li>Logout</li> </a> </ul> </div> </div> </div> </div> </div>'
					);
			var memberShip=data.response.userData.membership;
			var userData=data.response.userData;
			if(memberShip=="Free"){
				$("#withoutlogin").html('<p>Want to Connect Supplier!!</p><a href="'+base_url+'membership/'+userData['id']+'"><button class="btn btn-warning" style="font-size: 13px;">Upgrade</button></a>');
			}
			if(memberShip=="Paid"){
				$("#withoutlogin").remove();
				$("#Freelogin").remove();
				$(".category-brief").append('<p>Want to Connect Supplier!!</p><a href=""><button class="btn btn-warning" style="font-size: 13px;" >Contact Supplier</button></a>');


			}
		} else {
			console.log("Login failed:", message);
		}
	});
}

function login_user() {
	$("#login_error").html("");
	var error_found = 0;
	var email = $("#login-model #email").val();
	var password = $("#login-model #password").val();
	//alert(email + password);
	if (!blank_check(email, "email_login")) {
		error_found++;
	}
	if (!blank_check(password, "password_login")) {
		error_found++;
	}
	if (isMobileDevice) {
		var type = "app";
	} else {
		var type = "web";
	}
	if (error_found) {
		return false;
	} else {
		$.ajax({
			url: base_url + "login",
			type: "POST",
			data: {
				email: email,
				password: password,
				type: type,
				csrf_test_name: csrf_hash,
			},
			success: function (response) {
				data = $.parseJSON(response);
				if (data.res === "success" && data.user_type === "Admin") {
					swal({
						title: "",
						text: "Login Succesfull!",
						icon: "success",
						buttons: false,
					});
					window.location.href = base_url + "control-panel/dashboard";
				} else if (data.res === "success" && data.user_type === "User") {
					swal({
						title: "",
						text: "Login Succesfull!",
						icon: "success",
						buttons: false,
					});
					window.location.href = base_url + "control-panel/dashboard";
				} else if (data.res === "success" && data.user_type === "Super Admin") {
					swal({
						title: "",
						text: "Login Succesfull!",
						icon: "success",
						buttons: false,
					});
					window.location.href = base_url + "control-panel/dashboard";
				} else if (data.res === "success" && data.user_type === "SowtexAdmin") {
					swal({
						title: "",
						text: "Login Succesfull!",
						icon: "success",
						buttons: false,
					});
					window.location.href = base_url + "control-panel/dashboard";
				} else if (data.res == "inactive") {
					$("#login_error").html(
						"Your Account is Inactive Click on Forget Password"
					);
				}

				if (data.res === "does_not_exist") {
					$("#login_error").html("Registered Email Not exist");
					//alert("Registered Email Not exist");
				}
				if (data.res === "Wrong Password") {
					$("#login_error").html("Wrong Password");
					// alert("wrong password");
				}
			},
		});
	}
	return false;
}

function blank_check(variable, string_name) {
	if (variable == "") {
		$("#" + string_name + "_error").html(" * This field is required.");
		return false;
	} else {
		$("#" + string_name + "_error").html("");
		return true;
	}
}

function stockEnq() {
	var error_found = 0;
	var min_qua = $("#min_qua").val();
	//var res_time = $('#res_time').val();
	var quot_price = $("#quot_price").val();
	var requirements = $("#requirement").val();
	var categoryId = $("#categoryId").val();
	var sub_category_id = $("#sub_category_id").val();
	var orgId = $("#orgId").val();
	var stockId = $("#stockId").val();
	var city_id = $("#city_id").val();
	var state_id = $("#state_id").val();
	var ctry_id = $("#ctry_id").val();
	var product_code = $("#product_code").val();

	var responceTime = $("#responceTime option:selected").val();
	if (error_found) {
		return false;
	} else {
		$("body").addClass("waiting");
		$.ajax({
			url: base_url + "enquiryon-stock",
			type: "POST",
			data: {
				categoryId: categoryId,
				sub_category_id: sub_category_id,
				orgId: orgId,
				stockId: stockId,
				state_id: state_id,
				city_id: city_id,
				ctry_id: ctry_id,

				enquiryUniqueId: product_code,
				minimumQuantity: min_qua,
				responceTime: responceTime,
				quotedPrice: quot_price,
				requirements: requirements,
				uom: stoUnitForStockDetails,
				csrf_test_name: csrf_hash,
			},
			success: function (response) {
				data = $.parseJSON(response);
				
				$("body").removeClass("waiting");
				if (data.status == "ok") {
					$("#orderModClsBtn").click();
					$("#modal-Order").hide().css({
						'opacity':'0'
					
					});
					$("#modal-enquiry button[type='button']").hide();
					swal({
						title: "",
						text: "Enquiry Sent!",
						icon: "success",
					}).then(() => {
						$(".swal-overlay").css("z-index", "300000");
						$(".swal-modal").css("z-index", "300000");
					});
					location.reload();
				}
			},
		});
	}
	return false;
}

function submitEnquiryOnProduct(product_code) {
	var error_found = 0;
	var product_code = product_code;
	var min_qua = $("#min_qua").val();
	var res_time = $("#res_time").val();
	var quot_price = $("#quot_price").val();
	var requirements = $("#requirement").val();
	var categoryId = $("#categoryId").val();
	var orgId = $("#orgId").val();
	var prod_id = $("#prod_id").val();
	var city_id = $("#city_id").val();
	var state_id = $("#state_id").val();
	var ctry_id = $("#ctry_id").val();

	var sub_category_id = $("#sub_category_id").val();
	var responceTime = $("#responceTime option:selected").val();

	if (error_found) {
		return false;
	} else {
		$.ajax({
			url: base_url + "enquiry-on-product",
			type: "POST",
			data: {
				categoryId: categoryId,
				orgId: orgId,
				prod_id: prod_id,
				state_id: state_id,
				city_id: city_id,
				ctry_id: ctry_id,
				sub_category_id: sub_category_id,
				enquiryUniqueId: product_code,
				minimumQuantity: min_qua,
				responceTime: responceTime,
				quotedPrice: quot_price,
				requirements: requirements,
				csrf_test_name: csrf_hash,
			},
			success: function (response) {
				if (response == 1) {
					//swal.fire("Enquiry Sent", "success");
					swal({
						title: "",
						text: "Enquiry Sent!",
						icon: "success",
					});
					location.reload();
				}
			},
		});
	}
	return false;
}

function shortlistProduct1() {
	var error_found = 0;
	var var1;
	if (error_found) {
		return false;
	} else {
		$.ajax({
			url: base_url + "product/shortlist",
			type: "POST",
			data: { var1: "5", csrf_test_name: csrf_hash },
			success: function (response) {
				if (response == 1) {
					//swal.fire("Enquiry Sent", "success");
					//location.reload();
				}
			},
		});
	}
	return false;
}

function comp_shortlist() {
	var error_found = 0;
	var var1;
	if (error_found) {
		return false;
	} else {
		$.ajax({
			url: base_url + "company/shortlist",
			type: "POST",
			data: { var1: "5", csrf_test_name: csrf_hash },
			success: function (response) {
				if (response == 1) {
					swal.fire("Enquiry Sent", "success");
					//location.reload();
				}
			},
		});
	}
	return false;
}

function shorlist_company(org_id, user_id) {
	$.ajax({
		url: base_url + "shortlist-company",
		type: "POST",
		data: { user_id: user_id, orgId: org_id, csrf_test_name: csrf_hash },
		success: function (response) {
			data = $.parseJSON(response);

			if (data.status == "success") {
				swal({
					title: "",
					text: "Company  Shortlisted!",
					icon: "success",
				});
				location.reload();
			} else {
				swal({
					title: "",
					text: "Someting Wrong!",
					icon: "error",
				});
			}
		},
	});
}

function unshorlist_company(org_id, user_id) {
	$.ajax({
		url: base_url + "unshort-company",
		type: "POST",
		data: { user_id: user_id, orgId: org_id, csrf_test_name: csrf_hash },
		success: function (response) {
			data = $.parseJSON(response);
			if (data.status == "success") {
				swal({
					title: "",
					text: "Company  UnShortlisted!",
					icon: "success",
				});
				location.reload();
			} else {
				swal({
					title: "",
					text: "Someting Wrong!",
					icon: "error",
				});
			}
		},
	});
}

function shorlist_company_stock(org_id, user_id) {
	$.ajax({
		url: base_url + "shortlist-company-stock",
		type: "POST",
		data: { user_id: user_id, orgId: org_id, csrf_test_name: csrf_hash },
		success: function (response) {
			data = $.parseJSON(response);
			if (data.status == "success") {
				swal({
					title: "",
					text: "Company  Shortlisted!",
					icon: "success",
				});
			} else {
				swal({
					title: "",
					text: "Someting Wrong!",
					icon: "error",
				});
			}
		},
	});
}

function shorlist_product(pro_id, user_id) {
	$.ajax({
		url: base_url + "shortlist-product",
		type: "POST",
		data: { user_id: user_id, pro_id: pro_id, csrf_test_name: csrf_hash },
		success: function (response) {
			data = $.parseJSON(response);
			if (data.status == "success") {
				swal({
					title: "",
					text: "Product Shortlisted!",
					icon: "success",
				});
				location.reload();
			} else if (data.status == "error") {
				swal({
					title: "",
					text: "Someting Wrong!",
					icon: "error",
				});
			}
		},
	});
}

function unshorlist_product(pro_id, user_id) {
	$.ajax({
		url: base_url + "unshortlist-product",
		type: "POST",
		data: { user_id: user_id, pro_id: pro_id, csrf_test_name: csrf_hash },
		success: function (response) {
			data = $.parseJSON(response);
			if (data.status == "success") {
				swal({
					title: "",
					text: "Product Unshortlisted!",
					icon: "success",
				});
				location.reload();
			} else if (data.status == "error") {
				swal({
					title: "",
					text: "Someting Wrong!",
					icon: "error",
				});
			}
		},
	});
}
var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

function registrationValidate() {
	// first name and last name
	//alert($("input[name='memType']:checked").val());return false;
	var fName = $("#fName").val();
	if (fName == "") {
		$("#fName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("First Name Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var lName = $("#lName").val();
	if (lName == "") {
		$("#lName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Last Name Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	// email validation
	var email = $("#email").val();
	if (!validateEmail(email)) {
		$("#email").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Please Enter Valid Email");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	if (email == "") {
		$("#email").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Email Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
		$.ajax({
			url: base_url + "userexist/",
			type: "POST",
			data: { email: $("#email").val(), csrf_test_name: csrf_hash },
			success: function (response) {
				if (response == 1) {
					$("#email").focus();
					$("#email_exist_div").removeClass("d-none");
					$("#email_exist_div").text("Email Already Exist");
					return false;
				}
			},
		});
	}

	// var code=$('#code').val('selectedvalue');

	var code = $("#code").find("option:selected").text();
	if (code == "Select Code") {
		$("#code").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select Phone Code");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	//  phone no validation required
	var phoneNumber = $("#phoneNumber").val();

	if (phoneNumber == "") {
		$("#phoneNumber").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Phone NO Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	if (phoneNumber.length < 6) {
		$("#phoneNumber").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Phone NO Should Have 6 Digit");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	if (phoneNumber.length > 15) {
		$("#phoneNumber").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Phone NO Should not be greater then 15 Digits");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	// $.ajax({
	//     url: base_url + "registration/phoneno-exist",
	//     type: "POST",
	//     data: { code: code, phoneNumber: phoneNumber, csrf_test_name: csrf_hash },
	//     success: function(response) {
	//         if (response == 1) {
	//             $("#phoneNumber").focus();
	//             $('#email_exist_div').removeClass('d-none');
	//             $('#email_exist_div').text('Mobile No. Already Exists');
	//             return false;
	//         } else {

	//             //$('#email_exist_div').addClass('d-none');
	//             //$('#email_exist_div').text("");
	//         }
	//     }
	// });
	// Company Name validation required
	var CName = $("#CName").val();
	if (CName == "") {
		$("#CName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Company Name Required");
		return false;
	} else {
		$("#CName").css("border", ""); // Reset border to default
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	if (CName.length < 4) {
		$("#CName").focus();
		// $("#CName").css("border", "1px solid red"); // Highlight the border in red
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Company Name should be more than 3 characters"); // Corrected message
		return false;
	} else {
		$("#CName").css("border", ""); // Reset the border to default
		$("#email_exist_div").addClass("d-none"); // Hide the error div
		$("#email_exist_div").text("");
	}
	$("#CName").css({
		border: "1px solid red",
		backgroundColor: "#ffe6e6", // Light red background
	});
	if (format.test(CName)) {
		$("#CName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text(
			"Special Characters Not Allowed In Company Name"
		);
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	// nature of bussiness validations

	var natOfBus = $("#natOfBus").find("option:selected").text();
	if (natOfBus == "Select") {
		$("#natOfBus").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select Nature of Bussiness");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var designation = $("#designation").find("option:selected").text();
	if (designation == "Select") {
		$("#designation").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select designation");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	// country  validation
	var state_drop = $("#Country_drop").find("option:selected").text();
	if (state_drop == "Select") {
		$("#Country_drop").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select Country");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	// state validation
	var state_drop = $("#state_drop").find("option:selected").text();
	if (state_drop == "Select") {
		$("#state_drop").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select State");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	// state validation
	var city_drop = $("#city_drop").find("option:selected").text();

	if (city_drop == "Select") {
		$("#city_drop").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select City");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	var zipcode = $("#zipcode").val();
	if (zipcode == "") {
		$("#zipcode").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Zipcode Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	var password = $("#password").val();
	var confirmPassword = $("#password_confirm").val();
	if (confirmPassword == "") {
		$("#password_confirm").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Confirm Password Required");
		return false;
	}
	if (password != confirmPassword) {
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Confirm password not matched");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
		var gender = $("input[name='memType']:checked").val();
		if (gender == "" || typeof gender == "undefined") {
			$("#email_exist_div").removeClass("d-none");
			$("#email_exist_div").text("Please choose Membership Type");
			return false;
		} else {
			$("#email_exist_div").addClass("d-none");
			$("#email_exist_div").text("");
		}
		if ($("#agree").not(":checked").length) {
			$("#agree").focus();
			$("#email_exist_div").removeClass("d-none");
			$("#email_exist_div").text("agree to all Terms & Conditions");
			return false;
		} else {
			$("#email_exist_div").addClass("d-none");
			$("#email_exist_div").text("");
		}
		registartionSubmitData();
	}
}

function registartionSubmitData() {
	$("body").addClass("waiting");
	$.ajax({
		url: base_url + "signup",
		type: "POST",
		data: {
			first_name: $("#fName").val(),
			last_name: $("#lName").val(),
			email: $("#email").val(),
			mobile: $("#phoneNumber").val(),
			CName: $("#CName").val(),
			natOfBus: $("#natOfBus").val(),
			password: $("#password").val(),
			designation: $("#designation").val(),
			city: $("#city_drop").val(),
			state: $("#state_drop").val(),
			zipcode: $("#zipcode").val(),
			memType: $("input[name='memType']:checked").val(),
			code: $("#countryCode").val(),
			country: $("#Country_drop").val(),
			csrf_test_name: csrf_hash,
		},
		success: function (response) {
			if (response) {
				$("body").removeClass("waiting");
				data = $.parseJSON(response);

				if (data.status == "error" && data.mobile == "mobile") {
					$("#email_exist_div").removeClass("d-none");
					$("#email_exist_div").text("Mobile No. Already Exists");
					return false;
				} else if (data.status == "error" && data.email == "email") {
					$("#email_exist_div").removeClass("d-none");
					$("#email_exist_div").text("Email No. Already Exists");
					return false;
				} else if (data.status == "OK") {
					$("#user_id").val(data.user_id);
					//return false;
					$("#otp_modal").modal("show");
					// $('#otp_modal').modal({backdrop: 'static', keyboard: false}, 'show');
				}

				//location.href = base_url + "registration-step2/" + $.trim(response);;
				return false;
			}
		},
	});
}

function registartion_step3() {
	//alert("here");

	// var selected = $(".soft_skill_list1 :selected:checkbox[name=type]:checked").map((_, e) => e.value).get();
	// var selected1 = $("#soft_skill_list1 :selected").map((_, e) => e.value).get();
	var selected = [];
	var selected1 = [];
	$("#register input[name='soft_skill_list[]']:checked").each(function () {
		selected.push($(this).val());
	});

	$("input[name='soft_skill_list1[]']:checked").each(function () {
		selected1.push($(this).val());
	});
	if (selected.length < 1 && selected1.length < 1) {
		$(".for_soft_skill").focus();
		$("#sell_cat_error").removeClass("d-none");
		$("#sell_cat_error").text(
			"Sellect One Selling Category or Buying Category"
		);
		return false;
	} else {
		$("#sell_cat_error").addClass("d-none");
		$("#sell_cat_error").text("");
	}

	// alert(selected);return false;
	var profile = $("#sample").find(".nicEdit-main").html();

	// alert(profile);return false;
	$("body").addClass("waiting");
	$("#add_button").attr("disabled", "disabled");
	$("#add_button").hide();
	$.ajax({
		url: base_url + "registration-step2/" + $("#orgId").val(),
		type: "POST",
		data: {
			buyCat: selected1,
			sellCat: selected,
			userId: $("#orgId").val(),
			profile: profile,
			csrf_test_name: csrf_hash,
		},
		success: function (response) {
			data = $.parseJSON(response);
			$("body").removeClass("waiting");
			$("#add_button").removeAttr("disabled");
			$("#add_button").show();
			if (data.status == "ok") {
				window.location.href = base_url + "registartion-successfull";
			}
		},
	});
}

function check_user_exist() {
	$.ajax({
		url: base_url + "userexist/",
		type: "POST",
		data: { email: $("#email").val(), csrf_test_name: csrf_hash },
		success: function (response) {
			if (response == 1) {
				$("#email").focus();
				$("#email_exist_div").removeClass("d-none");
				$("#email_exist_div").text("Email Already Exist");
				return false;
			} else {
				$("#email_exist_div").addClass("d-none");
				$("#email_exist_div").text("");
			}
		},
	});
}
$(document).ready(function () {
	$("#password_confirm").on("keyup", function () {
		var password = $("#password").val();
		var confirmPassword = $("#password_confirm").val();
		if (password != confirmPassword) {
			$("#email_exist_div").removeClass("d-none");
			$("#email_exist_div").text("Confirm password not matched");
		} else {
			$("#email_exist_div").addClass("d-none");
			$("#email_exist_div").text("");
		}
	});
});

function verify_otp() {
	var otp = $("#otp").val();
	$("#incorrect_passowrd").text("");
	$("#incorrect_passowrd").addClass("d-none");
	if (otp == "") {
		$("#incorrect_passowrd")
			.removeClass("d-none")
			.addClass("alert alert-danger");
		$("#incorrect_passowrd").text("OPT Required");
		$("#otp").focus();
		return false;
	}
	var user_id = $("#user_id").val();

	$.ajax({
		url: base_url + "registration/verify-otp",
		type: "POST",
		data: { otp: $("#otp").val(), user_id: user_id, csrf_test_name: csrf_hash },
		success: function (response) {
			data = $.parseJSON(response);
			if (data.status == 1 && data.mem_type == "Paid") {
				location.href = "membership/" + $.trim(user_id);
			} else if (data.status == 1 && data.mem_type == "Free") {
				$("#continue_link").prop(
					"href",
					base_url + "registration-step2/" + $.trim(user_id)
				);
				$("#otp_modal").modal("hide");
				$("#info-modal").modal("show");
				//location.href = 'registration-step2/' + $.trim(user_id);
			} else {
				$("#incorrect_passowrd").text("Incorrect OTP");
				$("#incorrect_passowrd").removeClass("d-none");
			}
		},
	});
}

function resend_otp() {
	var user_id = $("#user_id").val();
	$("#incorrect_passowrd").text("");
	$("#incorrect_passowrd").addClass("d-none");
	$.ajax({
		url: base_url + "registration/resend-otp",
		type: "POST",
		data: { user_id: user_id, csrf_test_name: csrf_hash },
		success: function (response) {
			if (response == 1) {
				//location.href = 'registration-step2/'+user_id;
				$("#incorrect_passowrd")
					.removeClass("d-none")
					.addClass("alert alert-danger ");
				$("#incorrect_passowrd").text("Resent please check");
			} else {
				// $.("#incorrect_passowrd").val('Resent please check');
				// $('#incorrect_passowrd').removeClass('d-none');
			}
		},
	});
}
$(function () {
	$("#register #countryCode").change(function () {
		var selectedText = $(this).find("option:selected").text();
		var selectedValue = $(this).val();
		$.ajax({
			url: base_url + "registration/get-state",
			type: "POST",
			data: { code: selectedValue, csrf_test_name: csrf_hash },
			success: function (response) {
				data = $.parseJSON(response);
				$("#state_drop").html("");
				$("city_drop").html("");
				$("#state_drop").prop("disabled", false);
				//alert("here");
				$("#state_drop").append('<option value="Select">Select</option>');
				$.each(data, function (i, v) {
					$("#state_drop").append(
						"<option value=" + v["id"] + ">" + v["name"] + "</option>"
					);
				});
				//console.log(data[1]['country_id']);
				$("#Country_drop").val(data[1]["country_id"]).change();
			},
		});
	});
});
$(function () {
	$("#register #Country_drop").change(function () {
		var selectedText = $(this).find("option:selected").text();
		var selectedValue = $(this).val();

		$.ajax({
			url: base_url + "registration/get-state-by-country",
			type: "POST",
			data: { country_code: selectedValue, csrf_test_name: csrf_hash },
			success: function (response) {
				data = $.parseJSON(response);
				$("#state_drop").html("");
				$("state_drop").html("");
				$("#state_drop").prop("disabled", false);
				//alert("here");
				$("#state_drop").append('<option value="Select">Select</option>');
				$.each(data, function (i, v) {
					$("#state_drop").append(
						"<option value=" + v["id"] + ">" + v["name"] + "</option>"
					);
				});
			},
		});
	});
});
$(function () {
	$("#register #state_drop").change(function () {
		var selectedText = $(this).find("option:selected").text();
		var selectedValue = $(this).val();
		$.ajax({
			url: base_url + "registration/get-city",
			type: "POST",
			data: { code: selectedValue, csrf_test_name: csrf_hash },
			success: function (response) {
				data = $.parseJSON(response);
				$("#city_drop").html("");
				$("#city_drop").prop("disabled", false);
				$("#city_drop").append('<option value="Select">Select</option>');
				$.each(data, function (i, v) {
					$("#city_drop").append(
						"<option value=" + v["id"] + ">" + v["name"] + "</option>"
					);
				});
			},
		});
	});
});
$("#register #email").focusout(function () {
	//alert("here");
	if ($("#email").val() == "") {
	} else {
		$.ajax({
			url: base_url + "userexist/",
			type: "POST",
			data: { email: $("#email").val(), csrf_test_name: csrf_hash },
			success: function (response) {
				if (response == 1) {
					$("#email_exist_div").removeClass("d-none");
					$("#email_exist_div").text("Email Already Exist");
					return false;
				} else {
					$("#email_exist_div").addClass("d-none");
				}
			},
		});
	}
});

function enquiryWithRegistration() {
	//check_user_exist();

	var fName = $("#firstName").val();
	if (fName == "") {
		$("#firstName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("First Name Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var lName = $("#lastName").val();
	if (lName == "") {
		$("#lastName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Last Name Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var email = $("#email").val();
	if (!validateEmail(email)) {
		$("#email_exist_div").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Please Enter Valid Email");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	// if (email == '') {
	//     $("#email").focus();
	//     $('#email_exist_div').removeClass('d-none');
	//     $('#email_exist_div').text('Email Required');
	//     return false;
	// } else {
	//     $('#email_exist_div').addClass('d-none');
	//     $('#email_exist_div').text("");
	//     $.ajax({
	//         url: base_url + "userexist/",
	//         type: "POST",
	//         data: { email: $("#email").val(), csrf_test_name: csrf_hash },
	//         success: function(response) {
	//             if (response == 1) {
	//                 $("#email").focus();
	//                 $('#email_exist_div').removeClass('d-none');
	//                 $('#email_exist_div').text('Email Already Exist');
	//                 return false;
	//             }
	//         }
	//     });
	// }

	var code = $("#code").find("option:selected").text();

	if (code == "Select Code") {
		$("#code").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select Phone Code");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	//  phone no validation required
	var phoneNumber = $("#mobile").val();

	if (phoneNumber == "") {
		$("#mobile").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Phone NO Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	if (phoneNumber.length < 6) {
		$("#mobile").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Phone NO Should Have 6 Digit");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	if (phoneNumber.length > 15) {
		$("#mobile").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Phone NO Should not be greater then 15 Digits");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var state_drop = $("#state_drop").find("option:selected").text();
	if (state_drop == "Select") {
		$("#state_drop").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select State");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var CName = $("#CName").val();
	if (CName == "") {
		$("#CName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Company Name Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	if (CName.length < 4) {
		$("#CName").focus();
		// $("#CName").css("border", "1px solid red"); // Highlight the border in red
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Company Name should be more than 3 characters"); // Corrected message
		return false;
	} else {
		$("#CName").css("border", ""); // Reset the border to default
		$("#email_exist_div").addClass("d-none"); // Hide the error div
		$("#email_exist_div").text("");
	}
	if (format.test(CName)) {
		$("#CName").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text(
			"Special Characters Not Allowed In Company Name"
		);
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var natOfBus = $("#natOfBus").find("option:selected").text();
	if (natOfBus == "Select") {
		$("#natOfBus").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select Nature of Bussiness");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var designation = $("#designation").find("option:selected").text();
	if (designation == "Select") {
		$("#designation").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Select designation");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var zipcode = $("#zipcode").val();
	if (zipcode == "") {
		$("#zipcode").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("ZipCode Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var cat = $("#cat option:selected").val().trim();
	if (cat == "") {
		$("#cat").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Category Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	var sub_cat = $("#sub_cat option:selected").val();
	if (sub_cat == "") {
		$("#sub_cat").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("Category Required");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}
	// if ($('#pref_location option:selected').length < 1) {
	//     $("#pref_location").focus();
	//     $('#email_exist_div').removeClass('d-none');
	//     $('#email_exist_div').text('Select location');
	//     return false;
	// } else {
	//     $('#email_exist_div').addClass('d-none');
	//     $('#email_exist_div').text("");
	// }
	//var pref_location = $("#pref_location :selected").map((_, e) => e.value).get();
	var location = [];
	$(".add_list input:checkbox:checked").each(function () {
		//alert($(this).val());
		//console.log("Id: " + $(this).attr("id") + " Value: " + $(this).val());
		location.push($(this).val());
	});
	//console.log(colorSel);return false;
	if (location.length < 1) {
		$(".dropdown-label").focus();
		$("#location_error").removeClass("d-none");
		$("#location_error").text("Location Required");
		//alert("here");
		return false;
	} else {
		$("#location_error").addClass("d-none");
		$("#location_error").text("");
	}
	var requirement = $("#requirement").val();
	if (requirement == "") {
		$("#requirement").focus();
		$("#requirement_error").removeClass("d-none");
		$("#requirement_error").text("please describe your requirement");
		return false;
	} else {
		$("#requirement_error").addClass("d-none");
		$("#requirement_error").text("");
	}
	if ($("#agree").not(":checked").length) {
		$("#agree").focus();
		$("#email_exist_div").removeClass("d-none");
		$("#email_exist_div").text("agree to all Terms & Conditions");
		return false;
	} else {
		$("#email_exist_div").addClass("d-none");
		$("#email_exist_div").text("");
	}

	var formData = new FormData();
	formData.append("first_name", $("#firstName").val());
	formData.append("last_name", $("#lastName").val());
	formData.append("email", $("#email").val());
	formData.append("code", $("#code").val());
	formData.append("CName", $("#CName").val());
	formData.append("natOfBus", $("#natOfBus").val());
	formData.append("mobile", $("#mobile").val());
	formData.append("designation", $("#designation").val());
	formData.append("city", $("#city_drop").val());
	formData.append("zipcode", $("#zipcode").val());
	formData.append("min_quant", $("#CName").val());
	formData.append("responseTime", $("#responseTime").val());
	formData.append("state", $("#state_drop").val());
	formData.append("cat", $("#cat").val());
	formData.append("sub_cat", $("#sub_cat").val());
	formData.append("requirement", requirement);
	formData.append("pref_location", location);
	if ($("input[type=file]").val() != "") {
		formData.append("img", $("#fileupload")[0].files[0]);
	}

	formData.append(csrf_test_name, csrf_hash);
	$.ajax({
		url: base_url + "reg-enquiry",
		type: "POST",
		data: formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function (response) {
			data = $.parseJSON(response);
			if (data.success == 1) {
				$("#otp_model_btn").click();
				$("#user_id").val(data.id);
				// return false;
				// location.href = base_url;
			} else if (data.status == "error" && data.mobile == "mobile") {
				//$("#email_exist_div").val
				$("#email_exist_div").removeClass("d-none");
				$("#email_exist_div").text("Mobile No Exist");
				return false;
			} else if (data.status == "error" && data.email == "email") {
				//$("#email_exist_div").val
				$("#email_exist_div").removeClass("d-none");
				$("#email_exist_div").text("Email Already Exist");
				return false;
			}
		},
	});
	//$("#otp_modal").modal("show");
	// $.ajax({
	//     url: base_url + "reg-enquiry",
	//     type: "POST",
	//     data: {
	//         first_name: $("#firstName").val(),
	//         last_name: $("#lastName").val(),
	//         email: $("#email").val(),
	//         code: $("#code").val(),
	//         CName: $("#CName").val(),
	//         natOfBus: $("#natOfBus").val(),
	//         mobile: $("#mobile").val(),
	//         designation: $("#designation").val(),
	//         city: $("#city_drop").val(),
	//         zipcode: $("#zipcode").val(),
	//         min_quant: $("#min_quant").val(),
	//         responseTime: $("#responseTime").val(),
	//         state: $("#state_drop").val(),
	//         cat: $("#cat").val(),
	//         sub_cat: $("#sub_cat").val(),
	//         pref_location: $("#pref_location").val(),
	//         csrf_test_name: csrf_hash
	//     },
	//     success: function(response) {
	//         data = $.parseJSON(response);
	//         if (data.success == 1) {
	//             //return false;
	//             location.href = base_url;
	//         } else if (data.status == "error" || data.mobile == "mobile") {
	//             //$("#email_exist_div").val
	//             $('#email_exist_div').text('Mobile No Exist');
	//             return false;
	//         }
	//     }
	// });
}

function check_page(p) {
	var varUrl = p.split("/");
	for (var i = 0; i < varUrl.length; i++) {
		var parameter = varUrl[i];

		if (parameter == "product-detail") {
			var orgId = $("#orgId").val();
			$.ajax({
				url: base_url + "similar-products",
				type: "POST",
				data: { orgId: orgId, csrf_test_name: csrf_hash },
				success: function (response) {
					$("#similar_div").html("");
					data = $.parseJSON(response);
					if (data.length > 0) {
						var relatedProduct = document.getElementById("related-product");
						relatedProduct.classList.remove("d-none");
						relatedProduct.style.cssText =
							"display: block; opacity: 0; transition: opacity 0.5s;";
						setTimeout(() => (relatedProduct.style.opacity = 1), 10);
					}
					$.each(data, function (i, v) {
						if (user_id == "") {
							var link = 'data-toggle="modal" data-target="#login-model"';
						} else {
							var link =
								"onclick=shorlist_product('" + v["id"] + "'," + user_id + ")";
						}
						var tag = "";
						var tag_content = "";
						if (v["featured"] == "Y") {
							var tag = "gold";
							var tag_content = '<div class="tag-featured">Featured</div>';
						} else if (v["gold"] == "Y") {
							var tag = "featured";
							var tag_content = '<div class="tag-featured">Gold</div>';
						} else if (v["lat_des"] == "Y") {
							var tag = "featured";
							var tag_content = '<div class="tag-featured">Latest Design</div>';
						} else if (v["certificate"]) {
							var tag = "featured";
							var tag_content =
								'<div class="tag-featured">' + v["certificate"] + "</div>";
						}

						var rating = Math.round(v["rating"]);
						var rat_string = "";
						for (var i = 0; i < rating; i++) {
							rat_string = rat_string + '<i class="fa fa-star checked"></i>';
						}
						for (var j = rating; j < 5; j++) {
							rat_string = rat_string + '<i class="fa fa-star"></i>';
						}
						if (v["certi_fab"] == "Y") {
							var sust =
								'<i class="fa fa-check" aria-hidden="true"></i> Certified';
						} else {
							var sust = "";
						}
						var fb_link =
							"https://www.facebook.com/sharer/sharer.php?u=" +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/product-detail/" +
							v["unique_id"] +
							"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
						var twit_link =
							"https://twitter.com/intent/tweet?url=" +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/product-detail/" +
							v["unique_id"] +
							"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
						var linkedin_link =
							"https://www.linkedin.com/sharing/share-offsite/?url=" +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/product-detail/" +
							v["unique_id"] +
							"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
						var whats_link =
							"https://web.whatsapp.com/send?text=" +
							base_url +
							v["comp"].toLowerCase() +
							"/" +
							v["cat"].toLowerCase() +
							"/" +
							v["sub_cat"].toLowerCase() +
							"/product-detail/" +
							v["unique_id"] +
							"', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes'";
						var color_str = "";

						var colorCount = 1;
						$.each(v["prod_col"], function (i, v) {
							if (colorCount > 4) {
								return false;
							}

							if (colorMap[v]) {
								color_str += `<div class="mx-0 ms-1" title="${v}" style="height: 15px; width: 15px; background: ${colorMap[v]}; border:black 1px solid;"></div>`;
							} else {
								color_str +=
									'<div class="mx-0 ms-1" title="' +
									v +
									'" style="height: 15px; width: 15px; background-color: ' +
									v +
									';border:black 1px solid;"></div>';
							}
							colorCount++;
						});
						$("#similar_div").append(
							'<div class="col-md-3 col-lg-2 col-10  " style="z-index:2;"> <div class="product-thumb">' +
								tag_content +
								'<div class="image"> ' +
								'<img src="' +
								base_url +
								"assets/images/Product/" +
								v["image"][0] +
								'" alt="" class="img-fluid"> <div class="overlay"><div class="button"> <a style="font-size:12px;" href="' +
								base_url +
								v["comp"].toLowerCase() +
								"/" +
								v["cat"].toLowerCase() +
								"/" +
								v["sub_cat"].toLowerCase() +
								"/product-detail/" +
								v["unique_id"] +
								'" class="btn btn-outline-dark link" target="_blank"><i class="fa fa-eye" aria-hidden="true"></i> View Detail</a> </div> </div> </div> <div class="product-disc"><div class="row"> <div class="col-12"><h6 class="name" ><a class="title fw-bold" title="' +
								v["sub_cat"].toLowerCase().toUpperCase().replace(/-/g, " ") +
								'" style="color: #110c5a; font-size: 14px; !important"  href="' +
								base_url +
								v["comp"].toLowerCase() +
								"/" +
								v["cat"].toLowerCase() +
								"/" +
								v["sub_cat"].toLowerCase() +
								"/product-detail/" +
								v["unique_id"] +
								'" target="_blank">' +
								v["sub_cat"].toLowerCase().toUpperCase().replace(/-/g, " ") +
								'</a></h6></div><div class="col-6" style="font-size: 12px; font-weight: 400;" title=" ' +
								v["city"] +
								'">  ' +
								v["city"] +
								'</div><div class="col-6 d-flex justify-content-end pe-1">' +
								color_str +
								'</div><div class="col-7 pe-0 "style="color:rgba(63, 63, 63, 0.76); font-size:10px;">' +
								v["content"].substr(0, 15) +
								'</div><div class="col-5 d-flex justify-content-end "><div><i class="fa-solid fa-eye fa-md" style="color:goldenrod;"></i><span class="ms-1" style="font-size:10px; color:rgba(63, 63, 63, 0.76);">' +
								v["views"] +
								'</span></div></div></div><div class="certification-prod-div" style="position: absolute; top: -25px; left:-22px;"><img style="scale: 0.4;" src="' +
								base_url +
								"assets/img/text_certificate/" +
								v["certi_img"] +
								'" /></div><div class="product-thumb-share" id="share_div' +
								v["unique_id"] +
								'"> ' +
								' <a href="#!"><img src="' +
								base_url +
								'assets/images/sowtex/share-fb.png" alt="" onclick="window.open(&#39;' +
								fb_link +
								')"></a>' +
								' <a href="#!"><img src="' +
								base_url +
								'assets/images/sowtex/share-tw.png" alt="" onclick="window.open(&#39;' +
								linkedin_link +
								')"></a>' +
								' <a href="#!"><img src="' +
								base_url +
								'assets/images/sowtex/share-in.png" alt="" onclick="window.open(&#39;' +
								twit_link +
								')"></a>' +
								' <a href="#!"><img src="' +
								base_url +
								'assets/images/sowtex/share-wap.png" alt="" onclick="window.open(&#39;' +
								whats_link +
								')"></a></a> </div></div></div> </div>'
						);
						color_str = "";
					});
				},
			});
		}
	}
}
var id = "<?php echo $category_id;?>";
$(document).ready(function () {
	check_page($(location).attr("href"));
});

function close_enquiry(enq_id) {
	swal({
		title: "Are you sure?",
		text: "You want to close this Enquiry",
		icon: "warning",
		buttons: ["No, cancel it!", "Yes, I am sure!"],
		dangerMode: true,
	}).then(function (isConfirm) {
		if (isConfirm) {
			$.ajax({
				url: base_url + "control-panel/close-enquiry",
				type: "POST",
				data: {
					enq_id: enq_id,
					csrf_test_name: csrf_hash,
				},
				success: function (response) {
					data = $.parseJSON(response);
					if (data.status == "success") {
						$("#status_" + enq_id).html("close");
						swal({
							title: "",
							text: "Enquiry Close successfully !",
							icon: "success",
						}).then(function () {
							//form.submit();
						});
					} else {
						swal({
							title: "Something Wrong",
							text: "Enquiry Not Clossed !",
							icon: "error",
						});
					}
				},
			});
			//   swal({
			//     title: 'Shortlisted!',
			//     text: 'Candidates are successfully shortlisted!',
			//     icon: 'success'
			//   }).then(function() {
			//     form.submit();
			//   });
		} else {
			swal("Cancelled", "Your Enquiry is safe :)", "error");
		}
	});
	// $.ajax({
	//     url: base_url + "control-panel/close-enquiry",
	//     type: "POST",
	//     data: {
	//         enq_id: enq_id,
	//         csrf_test_name: csrf_hash
	//     },
	//     success: function(response) {
	//         data = $.parseJSON(response);
	//         if (data.status == "success") {
	//             //$('#row_' + enq_id).remove();
	//             Swal.fire(
	//                 'Enquiry Closed',
	//                 '',
	//                 'success'
	//             )
	//             return false;
	//             //location.href = base_url;
	//         }
	//     }
	// });
}

function delete_prod(unique_id, orgId) {
	swal({
		title: "Are you sure?",
		text: "You want to Delete this Product",
		icon: "warning",
		buttons: ["No, cancel it!", "Yes, I am sure!"],
		dangerMode: true,
	}).then(function (isConfirm) {
		if (isConfirm) {
			$.ajax({
				url: base_url + "delete-product",
				type: "POST",
				data: {
					orgId: orgId,
					id: unique_id,
					csrf_test_name: csrf_hash,
				},
				success: function (response) {
					data = $.parseJSON(response);
					if (data.status == "success") {
						$("#prod_div" + unique_id).remove();
						swal({
							title: "",
							text: "Product Deleted Successfully !",
							icon: "success",
						}).then(function () {
							//form.submit();
						});
					} else {
						swal({
							title: "Something Wrong",
							text: "Product is Safe !",
							icon: "error",
						});
					}
				},
			});
			//   swal({
			//     title: 'Shortlisted!',
			//     text: 'Candidates are successfully shortlisted!',
			//     icon: 'success'
			//   }).then(function() {
			//     form.submit();
			//   });
		} else {
			swal("Cancelled", "Your Product is safe :)", "error");
		}
	});
}

function shortlist_stock(stock_id, user_id, orgId) {
	$.ajax({
		url: base_url + "control-panel/shortlist-stock",
		type: "POST",
		data: {
			stock_id: stock_id,
			user_id: user_id,
			orgId: orgId,

			csrf_test_name: csrf_hash,
		},
		success: function (response) {
			data = $.parseJSON(response);
			if (data.status == "success") {
				//swal.fire("", "Stock Shortlisted Succesfully", "Success");
				swal({
					title: "",
					text: "Stock Shortlisted Succesfully!",
					icon: "success",
				});
				location.reload();
			} else if (data.status == "error") {
				swal({
					title: "",
					text: "Something Wrong!",
					icon: "error",
				});
				a; //lert(data.error.error);
			}
		},
	});
}
function unshortlist_stock(stock_id, user_id, orgId) {
	$.ajax({
		url: base_url + "control-panel/unshortlist-stock",
		type: "POST",
		data: {
			stock_id: stock_id,
			user_id: user_id,
			orgId: orgId,

			csrf_test_name: csrf_hash,
		},
		success: function (response) {
			data = $.parseJSON(response);
			if (data.status == "success") {
				//swal.fire("", "Stock Shortlisted Succesfully", "Success");
				swal({
					title: "",
					text: "Stock UnShortlisted Succesfully!",
					icon: "success",
				});
				location.reload();
			} else if (data.status == "error") {
				swal({
					title: "",
					text: "Something Wrong!",
					icon: "error",
				});
				a; //lert(data.error.error);
			}
		},
	});
}

function activate_dnddummy(orgId) {
	swal({
		title: "Are you sure?",
		text: "You want to Delete this Product",
		icon: "warning",
		buttons: ["No, cancel it!", "Yes, I am sure!"],
		dangerMode: true,
	}).then(function (isConfirm) {
		if (isConfirm) {
			$.ajax({
				url: base_url + "activate-dnd",
				type: "POST",
				data: {
					orgId: orgId,

					csrf_test_name: csrf_hash,
				},
				success: function (response) {
					data = $.parseJSON(response);
					if (data.status == "success") {
						$("#prod_div" + unique_id).remove();
						swal({
							title: "",
							text: "Product Deleted Successfully !",
							icon: "success",
						}).then(function () {
							//form.submit();
						});
					} else {
						swal({
							title: "Something Wrong",
							text: "Product is Safe !",
							icon: "error",
						});
					}
				},
			});
			//   swal({
			//     title: 'Shortlisted!',
			//     text: 'Candidates are successfully shortlisted!',
			//     icon: 'success'
			//   }).then(function() {
			//     form.submit();
			//   });
		} else {
			swal("Cancelled", "Your Product is safe :)", "error");
		}
	});
}

$(".dropdown-all-categories").click(function () {
	$(this).toggleClass("dropdown-on");
});

$(".all-categories-tab-overlay").click(function () {
	$(".dropdown-all-categories").removeClass("dropdown-on");
});

function subscribe_email() {
	var email = $("#sub_email").val();
	if (email == "") {
		$("#sub_email").focus();
	} else {
		$.ajax({
			url: base_url + "subscribe-email",
			type: "POST",
			data: {
				email: email,
				csrf_test_name: csrf_hash,
			},
			success: function (response) {
				data = $.parseJSON(response);
				if (data.status == "ok") {
					//swal.fire("", "Stock Shortlisted Succesfully", "Success");
					swal({
						title: "",
						text: "Email Subscribed Succesfully!",
						icon: "success",
					});
					location.reload();
				} else if (data.status == "error" && data.title == "Member Exists") {
					swal({
						title: "",
						text: "Already Subscribed",
						icon: "success",
					});
					a; //lert(data.error.error);
				}
			},
		});
	}
}
$(document).ready(function () {
	function checkScreenSize() {
		if ($(window).width() > 675) {
			$(".extraMenuForMob, .extraMenuForMobEnq").addClass("d-none");
			// Your code here
		}
	}

	// Initial check
	checkScreenSize();

	// Check on window resize
	$(window).resize(function () {
		checkScreenSize();
	});
});
$(document).ready(function () {
	$(".js-menu-icon").on("click touchstart", { passive: true }, function (e) {
		e.preventDefault();
		// alert("here");
		$(this).toggleClass("fa-times fa-bars");
		$(".menu .container").removeClass("container--is-visible");
		$(".menu li").removeClass("is-selected");
		$(".js-navbar").toggleClass("navbar--is-visible");
		$(".extraMenuForMob, .extraMenuForMobEnq").toggleClass("d-none");
	});

	$(".menu li").on("click", function (e) {
		// e.preventDefault();
		var $this = $(this);
		$this.toggleClass("is-selected");

		var $currentContainer = $(this).find(".container");
		$currentContainer.toggleClass("container--is-visible");

		$(".menu .container")
			.not($currentContainer)
			.removeClass("container--is-visible");
		$(".menu li").not($this).removeClass("is-selected");
	});
});

$(document).ready(function () {
	$("ul.tabs li").click(function () {
		var tab_id = $(this).attr("data-tab");

		$("ul.tabs li").removeClass("current");
		$(".tab-content").removeClass("current");

		$(this).addClass("current");
		$("#" + tab_id).addClass("current");
	});
});

$(document).ready(function () {
	$("ul.taba li").click(function () {
		var tab_id = $(this).attr("data-tab");

		$("ul.taba li").removeClass("current");
		$(".tab-contenta").removeClass("current");
		$(".tab-contenta").addClass("tab-slider-loader");
		setTimeout(function () {
			$(".tab-contenta").removeClass("tab-slider-loader");
		}, 2200);

		$(this).addClass("current");
		$("#" + tab_id).addClass("current");
		// $(".tab-slider").slick("refresh");
	});
});

$(".search-header a").click(function () {
	$(".search-filter-tab").addClass("on");
});

$(".all-categories-tab-overlay").click(function () {
	$(".search-filter-tab").removeClass("on");
});

// $(".our-events-slider").slick({
// 	slidesToShow: 4,
// 	slidesToScroll: 1,
// 	autoplay: false,
// 	autoplaySpeed: 2000,
// 	arrows: true,
// 	dots: true,
// 	responsive: [
// 		{
// 			breakpoint: 1024,
// 			settings: {
// 				slidesToShow: 3,
// 				slidesToScroll: 3,
// 				infinite: true,
// 			},
// 		},
// 		{
// 			breakpoint: 600,
// 			settings: {
// 				slidesToShow: 2,
// 				slidesToScroll: 2,
// 			},
// 		},
// 		{
// 			breakpoint: 480,
// 			settings: {
// 				arrows: false,
// 				slidesToShow: 1,
// 				slidesToScroll: 1,
// 			},
// 		},
// 		// You can unslick at a given breakpoint now by adding:
// 		// settings: "unslick"
// 		// instead of a settings object
// 	],
// });

$(".what-suppliers-slider").slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
	arrows: true,
	dots: false,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				arrows: false,
				dots: false,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});

$(".upcoming-events-slider").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
	arrows: true,
	dots: false,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: false,
				dots: false,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});

$(".featured-categories-slider").slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
	arrows: true,
	dots: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				infinite: false,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});



$(".our-latest-stocks-slider").slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: false,
	dots: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				infinite: false,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});

$(".what-New-listing").slick({
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 2000,
	arrows: false,
	dots: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				infinite: false,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
			},
		},
	],
});

$(".featured-companies-slider").slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: false,
	dots: true,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
				infinite: false,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: false,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
			},
		},
		{
			breakpoint: 580,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});

$(".partners-slider-support").slick({
	slidesToShow: 7,
	slidesToScroll: 3,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: true,
	dots: false,
	rows: 2,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				arrows: false,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
				arrows: false,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
	],
});

$(".our-members-item-slider").slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000,
	responsive: [
		{
			breakpoint: 992,
			settings: {
				slidesToShow: 3,
				arrows: false,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
			},
		},
	],
});

$(".banner-slider").slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: true,
	dots: false,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				arrows: true,
				dots: false,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: false,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: true,
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});

// Character Text Limit

$("span a").text(function (index, currentText) {
	var maxLength = $(this).parent().attr("data-maxlength");
	if (currentText.length >= maxLength) {
		return currentText.substr(0, maxLength) + "...";
	} else {
		return currentText;
	}
});

// tab-slider
$(".tab-slider1").slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: true,
	dots: false,
	infinite: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});

// tab-slider
$(".tab-slider").slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 2000,
	arrows: false,
	dots: false,
	infinite: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
			},
		},
		// You can unslick at a given breakpoint now by adding:
		// settings: "unslick"
		// instead of a settings object
	],
});

// $("ul.taba li").click(function () {
// 	$(".tab-slider").slick("setPosition");
// });

//checkbox tag-----new
$(document).on("click", 'input[type="checkbox"]', function () {
	$('#homesearch input[type="checkbox"]').not(this).prop("checked", false);
	$(".categories-tab-close-btn").click();
});
function updateTextArea() {
	$('input[type="checkbox"]').not(this).prop("checked", false);
	var allVals = $("#grp1 :checked").val();
	var active_tab = $("#search_type").val();

	// $('.get_checked').text(allVals);
	if (active_tab == "location") {
		// $('.get_checked').val('');
		//return false;
	}
	if (active_tab == "products") {
		$("#key_w_pro_code").text("");
		$("#key_w_pro_code").text(allVals);
	}
	if (active_tab == "stock") {
		$("#key_w_sto_code").text("");
		$("#key_w_sto_code").text(allVals);
	}
	if (active_tab == "hot_deal") {
		$("#hot_deal_text").text("");
		$("#hot_deal_text").text(allVals);
	}
	if (active_tab == "lat_des") {
		$("#key_w_lat_des").text("");
		$("#key_w_lat_des").text(allVals);
	}
}

$(".move_to").on("click", function (e) {
	e.preventDefault();
	$("#contactsForm").attr("action", "/test1").submit();
});

$(function () {
	$("#grp1 input").click(updateTextArea);
});

// Initialize Glide
var glide = new Glide("#hot-deals-carousel", {
	type: "carousel", // Carousel type, can be 'slider' or 'carousel'
	startAt: 0, // Start at the first slide
	perView: 4, // Show 3 slides at a time
	gap: 20, // Space between slides
	loop: true,
	autoplay: 2000, // Autoplay every 3 seconds
	hoverpause: true, // Pause autoplay when hovering over the carousel
	breakpoints: {
		1024: {
			perView: 3, // 2 slides per view on smaller screens
		},
		768: {
			perView: 2, // 1 slide per view on even smaller screens
		},
		570: {
			perView: 1, // 1 slide per view on even smaller screens
		},
	},
});

glide.mount(); // Initialize the Glide instance