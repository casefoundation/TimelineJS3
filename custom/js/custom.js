$(document).ready(function()
{
	var objCustom 	= new classCustom();
});

var classCustom 	= function()
{
	var main 		= this;

	main.prevActive = null;
	main.body_h		= 1;

	main.init		= function()
	{
		main.initEvent();
	}

	main.initEvent 	= function()
	{
		$(window).on("resize", function()
		{
			// if($(".tl-slidenav-previous").css("display") == "none")
			// {
			// 	var height 	= $(".tl-storyslider").height();

			// 	$(".tl-storyslider").css({"left" : "0px", "width" : $(window).width()});
			// 	$("#group_section").css("height", height + "px");
			// }
			// else
			// {
			// 	var width = $(window).width() - 280;
			// 	var height 	= $(".tl-storyslider").height();

			// 	$(".tl-storyslider").css({"left" : "280px", "width" : width});
			// 	$("#group_section").css("height", height + "px");
			// }

			main.slider_height = 0;
			// location.reload();

			$(".tl-storyslider").css("margin-top", "0px");
			$(".tl-storyslider").css("top", "0px");
			$(".tl-storyslider").css("left", "0px");

			setTimeout(main.updateView, 350);
			setTimeout(main.updateData, 800);
			// main.updateView();
			// main.updateData();
		});

		setTimeout(function()
		{
			main.updateView();

			if(timeline.animator_storyslider)
			{
				timeline.animator_storyslider.stop = function()
				{
					console.log("stoped");
				}
			}

			$(".tl-timemarker").each(function()
			{
				var headline = $(this).find(".tl-headline").html();
				var curr_obj = this;

				for(var i = 0; i < timeline.config.events.length; i ++)
				{
					timeline.config.events[i].gcolor = getGColor(timeline.config.events[i]);

					if(timeline.config.events[i].text.headline == headline)
					{
						var rgba = main.hexToRGB(timeline.config.events[i].gcolor, 0.2);
						var rgb  = main.rgba2rgb({r : 255, g : 255, b : 255}, rgba);

						$(curr_obj).css({"background" : rgb});
						$(curr_obj).data("gcolor", timeline.config.events[i].gcolor);
						$(curr_obj).data("bgcolor", rgb);
						
						break;
					}
				}
			});

			$(".tl-headline").each(function()
			{
				var color = $(this).parents(".tl-timemarker").data("gcolor");

				$(this).parents(".tl-timemarker-content-container").prepend("<div class='color_bar'></div>");
				$(this).parents(".tl-timemarker-content-container").children(".color_bar").css('background', color);
			});
		}, 500);

		$(document).on("click", ".tl-slidenav-next", function()
		{
			ga('send', {
				hitType: 'event',
				eventAction: 'click',
				eventLabel: 'right'
			});

			main.updateData();
		});

		$(document).on("keyup", function()
		{
			main.updateData();
		});

		$(document).on("click", ".tl-slidenav-previous", function()
		{
			ga('send', {
				hitType: 'event',
				eventAction: 'click',
				eventLabel: 'left'
			});

			main.updateData(1);
		});

		$(document).on("click", ".tl-timemarker-content", function()
		{
			main.updateData();
		});

		$(document).on("touchend", function()
		{
			main.updateData();
		});

		$(document).on("click", ".tl-menubar-button", function()
		{
			var index = $(this).index();

			if(index == 0 || index == 1)
			{
				ga('send', {
					hitType: 'event',
					eventAction: 'click',
					eventLabel: 'zoom'
				});
			}

			main.updateData();
		});

		$(document).on("click", ".tl-timenav", function()
		{
			ga('send', {
				hitType: 'event',
				eventAction: 'click',
				eventLabel: 'timeline'
			});
		});

		$(document).on("click", ".tl-timemarker-content-container", function()
		{
			var color 	= $(this).parent().data("gcolor");
			var bgcolor = "";

			if(main.prevActive)
			{
				bgcolor = main.prevActive.data("bgcolor");
				main.prevActive.css("background", bgcolor);
			}
			
			$(this).parent().css("background", color);
			main.prevActive = $(this).parent();
		});
	}

	main.updateView 	= function()
	{
		var width 	= $(window).width();
		var height 	= $(window).height();

		var init_w 	= 1200;
		var init_h 	= 900;

		$(".tl-storyslider").css("left", "0px");
		$(".tl-storyslider").css("margin-top", "0px");

		if(window.innerHeight > window.innerWidth)
		{
			init_w = 800;
			init_h = 1000;

			$("#group_section").addClass("tl-layout-portrait");

			if(width < 500)
			{
				$("#group_section").addClass("portrait_mini");
			}
		}
		else
		{
			if(width < 850)
			{
				$("#group_section").addClass("landscape_mini");
				$("#group_section").css("width", "200px");
			}

			$("#group_section").removeClass("tl-layout-portrait");
			$("#group_section").removeClass("portrait_mini");
		}

		var scale 	= Math.min(width / init_w, height / init_h);
		var nav_h 	= $(".tl-timenav").height();

		if(scale < 1)
		{
			var l_h3 	= 18 * scale;
			var l_p 	= 16 * scale;
			var l_img 	= 70 * scale;
			var l_logo 	= 208 * scale;
			var l_top 	= 110 * scale;

			var r_h3 	= 20 * scale;
			var r_h2 	= 38 * scale;
			var r_p 	= 16 * scale;
			var r_em 	= 16 * scale;

			var btn_w 	= 54 * scale;
			var btn_h 	= 45 * scale;

			var time_h 	= nav_h * scale;
			var time_m 	= 0;
			var body_h 	= height - time_h;
			var mgn_top = nav_h * (scale - 1) / 2;
			var group_h = 250 * scale;

			main.body_h = body_h;

			$("#group_section #group_content h3").css({"font-size" : l_h3 + "px"});
			$("#group_section #group_content p").css({"font-size" : l_p + "px"});
			$("#group_section #group_content img").css("width", l_img + "px");
			$("#img_logo").css("width", l_logo + "px");
			$("#group_section #group_content").css({"margin-top" : l_top + "px"});

			$(".tl-slide-content h3.tl-headline-date").css("cssText", "font-size: " + r_h3 + "px !important");
			$(".tl-slide-content h2.tl-headline").css("cssText", "font-size: " + r_h2 + "px !important");
			$(".tl-slide-content .tl-text-content p").css("cssText", "font-size: " + r_p + "px !important");
			$(".tl-slide-content .tl-text-content em").css("cssText", "font-size: " + r_em + "px !important");
			$(".tl-slide:first-child .tl-text-content p").css("cssText", "font-size: " + r_h3 + "px !important");

			setTimeout(function()
			{
				if(window.innerHeight < window.innerWidth)
				{
					$(".tl-storyslider").css("cssText", "height: " + body_h + "px !important");
				}
				else
				{
					body_h = height - time_h;
					
					$(".tl-storyslider").css("cssText", "height: " + body_h + "px !important");
					$("#group_content").css({"padding-top" : "5px"});
				}

				$(".tl-menubar-button").css("width", btn_w + "px");
				$(".tl-menubar-button").css("height", btn_h + "px");
				$(".tl-menubar").css("top", (body_h + (time_h - btn_h * 3 - 12) / 2) + "px");

				time_m = (scale - 1) * $(".tl-timemarker").width();

				$(".tl-timemarker").css("transform", "scaleX(" + scale + ")");
				$(".tl-timeaxis span").css("transform", "scaleX(" + scale + ")");
				
			}, 200);

			$(".tl-timenav").css("cssText", "transform: scaleY(" + scale + ")");
			$(".tl-timenav").css("margin-top", mgn_top + "px");
			$(".tl-timenav").css("height", nav_h + "px");
			
			$("#group_section").css({"height": "100px", "top" : "0px", "left" : "0px"});
		}

	}

	main.updateData 	= function(is_first)
	{
		var index 	= $(".tl-timemarker-active").index();
		var color 	= "";
		var height 	= $(".tl-storyslider").height();
		var p_left 	= 0;

		if($(".tl-slider-container").length)
			p_left = $(".tl-slider-container").position().left;

		if(!main.slider_height)
			main.slider_height = $(".tl-storyslider").height();

		ga('send', {
			hitType: 'event',
			eventAction: 'view',
			eventLabel: 'page'
		});

		if($(".tl-timemarker:last-child").hasClass("tl-timemarker-active"))
		{
			ga('send', {
				hitType: 'event',
				eventAction: 'view',
				eventLabel: 'last'
			});
		}

		if(index != -1)
		{
			color = getGColor(timeline.config.events[index]);
 
 			switch(timeline.config.events[index].group.toUpperCase())
			{
				case "Metrics Landscape Takes Shape".toUpperCase() :
					$("#group_content h3").html("Metrics Landscape Takes Shape");
					$("#group_content p").html("Standards and metrics are critical to understanding success in the Impact Investing sector. Over the last ten years, significant progress has been made by multiple organizations to identify and put into pracitice quality social and financial performance measures and benchmarks.");
					$("#group_content img").attr("src", "img/metrics_landscape.png");
				break;

				case "Networks Activate".toUpperCase() :
					$("#group_content h3").html("Networks Activate");
					$("#group_content p").html("Networks are critical in any movement build. In the impact investing sector, diverse networks catering to investors, fieldbuilders and innovators have helped establish hubs of practice - offering resources to those looking to join the movement. The growth of those networks will be key to attracting more investors and entrepreneurs.");
					$("#group_content img").attr("src", "img/network_activate.png");
				break;

				case "New Products Hit the Market".toUpperCase() :
					$("#group_content h3").html("New Products Hit The Market");
					$("#group_content p").html("Products that put money to work by connecting investors and innovators are key to bringing more capital into impact investing. The continued growth in the breadth of products and innovation around their design is key to continuing to champion new ways to solve old problems.");
					$("#group_content img").attr("src", "img/new_product.png");
				break;

				case "Foundations Pave the Way".toUpperCase() :
					$("#group_content h3").html("Foundations Double Down");
					$("#group_content p").html("Foundations play a key role in catalyzing growth of the Impact Investing movement.They deploy capital, undewrite risk, support innovation and reinforce the legitimacy of the sector and its ability to deliver both a financial and social return. As more foundations enter this field, we expect to see the ecosystem continue to grow.");
					$("#group_content img").attr("src", "img/foundations_double.png");
				break;

				case "World Class Investors Come to the Table".toUpperCase() :
					$("#group_content h3").html("World Class Investors Come to the Table");
					$("#group_content p").html("One sign of growth in the sector is increased participation of world class investors. As well known venture capitalists, philanthropists and changemakers double down on impact investing and become champions of impact investing opportunities, confidence in the sector increases and attracts more investors.");
					$("#group_content img").attr("src", "img/world_class.png");
				break;

				case "Impact Companies Deliver on Promise".toUpperCase() :
					$("#group_content h3").html("Impact Companies Deliver on Promise");
					$("#group_content p").html("Stories of successful impact companies serve as inspiration for new entrepreneurs and proof points for investors. As these enterprises gain access to capital, succeed and are acquired by larger and more traditional corporations, investors and corporations are more likely to engage in Impact Investing.");
					$("#group_content img").attr("src", "img/impact_companies.png");
				break;

				case "Institutions Pick Up the Baton".toUpperCase() :
					$("#group_content h3").html("Institutions Pick Up the Baton");
					$("#group_content p").html("The involvement of institutional investors and traditional institutions is critical to crowd in the capital needed for Impact Investing to scale. When major financial and corporate actors add Impact Investments to their portfolios or develop products for the sector, capital inflows increase and the size of the market expands.");
					$("#group_content img").attr("src", "img/institutions_pickup.png");
				break;

				case 'Universities Join The Ranks'.toUpperCase() :
					$("#group_content h3").html("Universities Join The Ranks");
					$("#group_content p").html("The engagement of universities and academics in Impact Investing has jumpstarted the research, experimentation and thought leadership that anchors the sector and grounds the training of the next generation of impact investors and social entrepreneurs.");
					$("#group_content img").attr("src", "img/universities_rank.png");
				break;

				case "Families Take the Plunge".toUpperCase() :
					$("#group_content h3").html("Families Take The Plunge");
					$("#group_content p").html("Trailblazing individuals and families who have been impact investors long before the term \"impact investing\" was coined, bring experience and much needed lessons learned. Their continued activism and sharing of successes and failures encourages others into the field and directs innovation and experimentation that is central to the continued growth of the sector.");
					$("#group_content img").attr("src", "img/familes_take.png");
				break;

				case "Policy Clears The Way".toUpperCase() :
					$("#group_content h3").html("Policy Clears The Way");
					$("#group_content p").html("Creating a legal and regulatory environment that supports all facets of impact investing is critical to growing the field, increasing investor confidence and reducing the perception of risk. Over the past ten years, the passage of laws and establishment of regulations has standardized practices across borders, created onramps for more activity and removed barriers to scale.");
					$("#group_content img").attr("src", "img/policy_clears.png");
				break;
			}
		}

		if(index == -1)
		{
			$("#group_section").css("display", "none");

			if(window.innerHeight > window.innerWidth)
			{
				$(".tl-storyslider").animate({"margin-top" : "0px", "height" : main.slider_height + "px"});
			}
			else
			{
				$("#group_section").css("height", height + "px");
				$("#group_section").css({backgroundColor : color});

				$(".tl-storyslider").animate({"left" : "0px", "width" : $(window).width()});
			}
		}
		else
		{
			var l_width = $("#group_section").width();
			var width 	= $(window).width() - l_width;
			var mgn_t 	= $("#group_section").height();

console.log(l_width);

			$("#group_section").css("display", "block");
			$("#group_section").animate({"backgroundColor" : color});

			if(window.innerHeight > window.innerWidth)
			{
				height 	= main.body_h - mgn_t;

				if($(".tl-storyslider").length)
				{
					$(".tl-storyslider")[0].style.setProperty("margin-top", mgn_t + "px", "important");
					$(".tl-storyslider")[0].style.setProperty("height", height + "px", "important");
				}
			}
			else
			{
				$("#group_section").css("height", height + "px");
				$(".tl-storyslider").animate({"left" : l_width + "px", "width" : width});
			}
		}
	}

	main.hexToRGB 	= function(hex, alpha)
	{
		var r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16);

		if (alpha)
		{
			return {r : r, g : g, b : b, a : alpha};
		}
		else 
		{
			return {r : r, g : g, b : b};
		}
	}

	main.rgba2rgb 	= function(RGB_background, RGBA_color)
	{
		var alpha = RGBA_color.a;

		var r = Math.round((1 - alpha) * RGB_background.r + alpha * RGBA_color.r);
		var g = Math.round((1 - alpha) * RGB_background.g + alpha * RGBA_color.g);
		var b = Math.round((1 - alpha) * RGB_background.b + alpha * RGBA_color.b);

		return "rgb(" + r + "," + g + "," + b + ")";
	}

	main.init();
}

function getGColor(item) 
{
	switch(item.group.toUpperCase())
	{
		case "Metrics Landscape Takes Shape".toUpperCase() :
			return '#d32e58';
		case "Networks Activate".toUpperCase() :
			return '#86aa52';
		case "New Products Hit the Market".toUpperCase() :
			return '#44a8c0';
		case "Foundations Pave the Way".toUpperCase() :
			return '#e57742';
		case "World Class Investors Come to the Table".toUpperCase() :
			return '#8594ef';
		case "Impact Companies Deliver on Promise".toUpperCase() :
			return '#46abef';
		case "Institutions Pick Up the Baton".toUpperCase() :
			return '#e3a14a';
		case 'Universities Join The Ranks'.toUpperCase():
			return '#38c49f';
		case "Families Take the Plunge".toUpperCase() :
			return '#85b5ff';
		case "Policy Clears The Way".toUpperCase() :
			return '#A7B7D0';
	}
}