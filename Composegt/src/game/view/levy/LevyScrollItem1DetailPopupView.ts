
class LevyScrollItem1DetailPopupView extends PopupView{
	// 滑动列表

	public constructor(){
		super();
	}


	protected isHaveTitle():boolean{
		return true;
	}
	
	protected getResourceList():string[]{
		return super.getResourceList().concat([
		]);
	}





	public initView():void
	{		
		let view = this;
		let contentBg = BaseBitmap.create("public_9v_bg12");
		contentBg.width = view.getShowWidth() - 60;
		contentBg.height = 520;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 70;
		view.addChildToContainer(contentBg);

		let bottomBg = BaseBitmap.create("public_9v_bg12");
		bottomBg.width = contentBg.width;
		bottomBg.height = 96;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = contentBg.y + contentBg.height + 5 ;
		view.addChildToContainer(bottomBg);

		let totalStr =  ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detail_total"), 22,TextFieldConst.COLOR_BROWN_NEW); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, totalStr, bottomBg, [125,5]);
		view.addChildToContainer(totalStr);

		let goldBm = BaseBitmap.create("public_icon2");
		goldBm.setPosition(totalStr.width + totalStr.x + 10, totalStr.y - (goldBm.height - totalStr.height)/2);
		view.addChildToContainer(goldBm);

		let totalRate = Api.levyVoApi.getLevyItemRate(0);
		let interval = Config.LevyCfg.LevyItemList[0].interval;
		let totalGold = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtxt2",[totalRate.grate,interval]), 22,TextFieldConst.COLOR_WARN_GREEN2);
        // totalGold.x = totalStr.x + totalStr.width + 40;
		// totalGold.y = totalStr.y+ 20;
		totalGold.setPosition(goldBm.x + goldBm.width + 10, totalStr.y);
		view.addChildToContainer(totalGold);
		

		// let totalFood = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtxt2",[totalRate.frate,interval]), 22,TextFieldConst.COLOR_BROWN_NEW);
        // totalFood.x = totalStr.x + totalStr.width + 155;
		// totalFood.y = totalStr.y+ 20;
		// view.addChildToContainer(totalFood);
		
		// let foodBm = BaseBitmap.create("public_icon3");
		// foodBm.setPosition(totalFood.x + totalFood.width/2 - foodBm.width/2,totalFood.y - 45);
		// view.addChildToContainer(foodBm);


		// let totalSoldier = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtxt2",[totalRate.srate,interval]), 22,TextFieldConst.COLOR_BROWN_NEW);
        // totalSoldier.x = totalStr.x + totalStr.width + 265;
		// totalSoldier.y = totalStr.y+ 20;
		// view.addChildToContainer(totalSoldier);
		
		// let soldierBm = BaseBitmap.create("public_icon4");
		// soldierBm.setPosition(totalSoldier.x + totalSoldier.width/2 - soldierBm.width/2,totalSoldier.y - 45);
		// view.addChildToContainer(soldierBm);
	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtitle1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 100;
		titleTxt1.y = this.y + 30;
        view.addChildToContainer(titleTxt1);


		let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtitle3"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt2.x = this.x + 285;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);

        let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("levy_scrollitem1detailtitle2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt3.x = this.x + 460;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);






		let addList:any = [];
		let personMap = Api.composemapVoApi.getMapinfoLvData();
		let lv = 1;
		for (const key in personMap) {
			addList.push({level:Number(key),num:personMap[key].length})
			lv ++ ;
		}

		let arr = [];
		for(let i in addList){
			let unit = addList[i];
			unit.pos = [
				{width : titleTxt1.textWidth, x : titleTxt1.x - 30}, 
				{width : titleTxt2.textWidth, x : titleTxt2.x - 30},
				{width : titleTxt3.textWidth, x : titleTxt3.x - 30}, 
			];
			arr.push(unit);
		}
		// let rankInfo = view.vo.getRankInfo();
		// if(rankInfo.rankList && rankInfo.rankList.length){
		// 	rankList = rankInfo.rankList;
		// }
		
		let rect = new egret.Rectangle(0,0,contentBg.width,contentBg.height - 10);
        let scrollList = ComponentManager.getScrollList(LevyScrollItem1DetailPopupViewItem,arr,rect);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, contentBg, [0,0]);
		view.addChildToContainer(scrollList);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}
	

	// protected getRequestData():{requestType:string,requestData:any}
	// {	
	// 	let view = this;
	// 	return {requestType:NetRequestConst.REQUEST_ACTIVITY_LOCTOMBRANK,requestData:{
	// 		activeId : view.vo.aidAndCode,
	// 	}};
	// }

	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
	// 	let view = this;
	// 	view.vo.setRankInfo(data.data.data);
	// }


	protected getShowWidth():number{
		return 585;
	}

	protected getShowHeight():number{
		return 798;
	}
	
	protected getTitleStr():string{
		return 'levyScrollItem1DetailPopupViewTitle';
	}


	public hide():void{
		super.hide();
	}


	public dispose():void{
		let view = this;
		super.dispose();
	}
}