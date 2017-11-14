$(document).ready(function()
{
	var objCustom 	= new classCustom();
});

var classCustom 	= function()
{
	var main 		= this;

	main.prevActive = null;

	main.init		= function()
	{
		main.initEvent();
	}

	main.initEvent 	= function()
	{
		$(window).on("resize", function()
		{
			if($(".tl-slidenav-previous").css("display") == "none")
			{
				var height 	= $(".tl-storyslider").height();

				$(".tl-storyslider").css({"left" : "0px", "width" : $(window).width()});
				$("#group_section").css("height", height + "px");
			}
			else
			{
				var width = $(window).width() - 280;
				var height 	= $(".tl-storyslider").height();

				$(".tl-storyslider").css({"left" : "280px", "width" : width});
				$("#group_section").css("height", height + "px");
			}
		});

		setTimeout(function()
		{
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
		},500);

		$(document).on("click", ".tl-slidenav-next", function()
		{
			ga('send', {
				hitType: 'event',
				eventAction: 'click',
				eventLabel: 'right'
			});

			main.updateData();
		});

		$(document).on("click", ".tl-slidenav-previous", function()
		{
			ga('send', {
				hitType: 'event',
				eventAction: 'click',
				eventLabel: 'left'
			});

			main.updateData();
		});

		$(document).on("click", ".tl-timemarker-content", function()
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

	main.updateData 	= function()
	{
		var index 	= $(".tl-timemarker-active").index();
		var color 	= "";
		var height 	= $(".tl-storyslider").height();

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

			var group = timeline.config.events[index].group;
			switch(group.toUpperCase())
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
					$("#group_content p").html("Foundations play a key role in catalyzing growth of the Impact Investing movement. They deploy capital, undewrite risk, support innovation and reinforce the legitimacy of the sector and its ability to deliver both a financial and social return. As more foundations enter this field, we expect to see the ecosystem continue to grow.");
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
					$("#group_content p").html("The involvement of institutional investors and traditional institutions is critical to crowd in the capital needed for impact investing to scale. When major financial and corporate actors add Impact Investments to their portfolios or develop products for the sector, capital inflows increase and the size of the market expands.");
					$("#group_content img").attr("src", "img/institutions_pickup.png");
				break;

				case 'Universities Join The Ranks'.toUpperCase():
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

		if($(".tl-slidenav-previous").css("display") == "none")
		{
			$("#group_section").css("display", "none");
			$("#group_section").css("height", height + "px");
			$("#group_section").css({backgroundColor : color});

			$(".tl-storyslider").animate({"left" : "0px", "width" : $(window).width()});
		}
		else
		{
			var width = $(window).width() - 280;

			$("#group_section").css("display", "block");
			$("#group_section").css("height", height + "px");
			// $("#group_section").css("background-color", color);

			$("#group_section").animate({"backgroundColor" : color});

			$(".tl-storyslider").animate({"left" : "280px", "width" : width});
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

function getGColor(item) {
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
