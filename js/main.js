/* $Id$ */

(function($){
	Main = {

		init : function(data){
			$(document).find("#category").change(function(ev , d){
				Main.renderWithCategory(ev);
			});

			$(document).find("#filter").change(function(ev , d){
				Main.renderWithFilter(ev);
			});

			Main.content = $(document).find("#content") ;
			Main.types = [] ;
			Main.renderAll(data.products);
		},

		renderWithCategory : function(ev){
			var cat = $("#category").find('option:selected').attr('id') ;
			Main.clear();
			Main.renderer(Main[cat]);
		},

		renderWithFilter : function(ev){
			var cat = $("#category").find('option:selected').attr('id') ;
			var filter = $("#filter").find('option:selected').attr('id') ;
			Main.clear();
			if(filter === "price"){
				Main.renderer(Main[cat].sort(Main.sortPrice));
			}else if(filter === "score"){
				Main.renderer(Main[cat].sort(Main.sortScore));
			}else{
				Main.renderer(Main[cat]);
			}
		},

		sortPrice : function(a,b){
			return Main.sortFun(a , b , 'price')
		},
		
		sortScore : function(a,b){
			return Main.sortFun(a , b , 'score')
		},

		sortFun : function(a,b,filterType){
			if(a[filterType] > b[filterType]){
				return 1;
			}
			else if (a[filterType] < b[filterType]){
				return -1;
			}
			else{
				return 0;
			}
		},

		renderAll : function(products){
			for(var i = 0 ; i < 1000 ; i++){
				var renderData = products[i] ;
				var typeArray = Main.getArray(renderData.cat);
				typeArray.push(renderData);

				Main.render(i , renderData);
			}

			this.addOptions();
			$(document).find("#loader").hide() ;
		},

		addOptions : function(){
			var select = $(document).find("#category") ;
			for(var i = 0 ; i<Main.types.length ; i++){
				select.append(Main.getOption(Main.types[i]));
			}
		},

		getOption  : function(type){
			return $("<option id="+type+">"+type.substr(0, 1).toUpperCase() + type.substr(1)+"</option>")
		},

		getArray : function(type){
			if(!Main[type]){
				Main.types.push(type);
				Main[type] = [] ;
			}
			return Main[type] ;
		},

		clear : function(){
			Main.content.empty() ;
		},

		renderer : function(products){
			for(var i=0 ; i < products.length ; i++){
				Main.render(i , products[i]);
			}
		},

		render : function(index , data){
			var mod = index%9 ;
			if(!mod){
				Main.table = this.createTable(3,3) ;
				Main.content.append(Main.table) ;
			}

			var ele = $(Main.table.find('.row').find('.cell').eq(mod));
			this.getProductElement(ele , data) ;
		},

		getProductElement  :function(ele , data){
			ele.append(this.createTitleEle(data.cat));
			ele.append(this.createImgEle(data.img));
			ele.append(this.createPriceEle(data.price));
			ele.append(this.createNameEle(data.name));
			ele.append(this.createScoreEle(data.score));
		},

		createScoreEle : function(score){
			return $("<span class='name' >"+score+"</span>");
		},

		createNameEle : function(name){
			return $("<span class='name' >"+name+"</span>");
		},

		createPriceEle : function(price){
			return $("<span class='price'><span class='price-text'>$"+price+"</span></span>");
		},

		createImgEle : function(src){
			return $("<div class='imgContainer'><img src="+src+"></img></div>");
		},

		createTitleEle : function(cat){
			return $("<span class='cat-name'>"+cat.toUpperCase()+"</span>");
		},
	
		createTable : function(row, column){
			var table = $("<div class='table'/>");
			for (var i=0; i<row; i++){
				table.append(Main.creatRow());
				for (var j=0;j<column;j++){
					 $(table.find('.row')[i]).append(Main.creatCol());
				}
			}

			return $(table) ;
		},

		creatRow : function(){
			return $("<div class='row'></div>") ;
		},

		creatCol : function(){
			return $("<div class='cell'></div") ;
		}

	}
})(jQuery);

