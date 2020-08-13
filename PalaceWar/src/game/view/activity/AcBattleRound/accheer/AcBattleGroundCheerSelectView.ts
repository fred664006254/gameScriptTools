/**
 * 个人活动排名
 * author qianjun
 */
class AcBattleGroundCheerSelectView extends PopupView{
	// 滑动列表

	public constructor(){
		super();
	}
	  protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
	
	protected getOffsetX():number
	{
		return 41;
	}

	private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

    private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
    }
    
	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
			`rank_line`
		]);
	}

	public initView():void{		
		let view = this;
		let code = view.getUiCode();
		let contentBg = BaseBitmap.create("battlerankbg");
		contentBg.scaleX = 530/contentBg.width;
		contentBg.x = this.viewBg.width/2-530/2;
		contentBg.y = 10;
		view.addChildToContainer(contentBg);

		let fontTitleBg = BaseLoadBitmap.create("battletitle"); 
		fontTitleBg.y = 15;
		view.addChildToContainer(fontTitleBg);

		let tip1txt = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip9-${code}`), 22, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tip1txt, contentBg, [0,10]);
		view.addChildToContainer(tip1txt);

		fontTitleBg.width = 309+tip1txt.width+10;
		fontTitleBg.x = tip1txt.x + (tip1txt.width-fontTitleBg.width)/2;

		let titlebg = BaseBitmap.create("battleyellow");
		titlebg.width = 560-33.5;
		titlebg.height = 30;
		titlebg.x = contentBg.x + 2;
		titlebg.y = contentBg.y + 40;
		view.addChildToContainer(titlebg);
	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
        titleTxt1.x = titlebg.x + 30-20;
        titleTxt1.y = titlebg.y + 5;
        view.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4ZidTile-1"), titleTxt1.size)
        titleTxt2.x = titlebg.x + 150-20;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip10-${code}`), titleTxt1.size)
		titleTxt3.x = titlebg.x + 220-20;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);

		let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip11-${code}`), titleTxt1.size)
		titleTxt4.x = titlebg.x + 330-20;
        titleTxt4.y = titleTxt1.y;
		view.addChildToContainer(titleTxt4);


		// let tmp = [];
		// for(let i = 1; i < 10; ++ i){
		// 	tmp.push({
		// 		name : `玩家${i}`,
		// 		zid : i,
		// 		value : App.MathUtil.getRandom(1,9999999),
		// 		add : App.MathUtil.getRandom(1,9999999),
		// 	});
		// }
		//本服帮会
        let arr = [];
        let len = view.vo.getMapLenth();
		for(let i = 1; i <= len; ++ i){
			let unit = view.vo.getAllInfoById(i);
			if(Api.mergeServerVoApi.judgeIsSameServer(unit.server , Api.mergeServerVoApi.getTrueZid())){
				unit.pos = [
					{width : titleTxt1.textWidth, x : titleTxt1.x}, 
					{width : titleTxt2.textWidth, x : titleTxt2.x},
					{width : titleTxt3.textWidth, x : titleTxt3.x}, 
					{width : titleTxt4.textWidth, x : titleTxt4.x},
				];
				arr.push(unit);
			}
		}
		// let rankInfo = view.vo.getRankInfo();
		// if(rankInfo.rankList && rankInfo.rankList.length){
		// 	rankList = rankInfo.rankList;
		// }
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,555,arr.length * 80);
        let scrollList = ComponentManager.getScrollList(AcBattleGroundCheerSelectItem, arr, rect2, this.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, titlebg, [0,titlebg.height]);
		view.addChildToContainer(scrollList);
		scrollList.bounces = false;
		scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		
		contentBg.height = scrollList.height + scrollList.y;

		//他服帮会
		let otherbg = BaseBitmap.create("battlerankbg");
		otherbg.scaleX = 530/otherbg.width;
		otherbg.x = contentBg.x;
		otherbg.y = contentBg.y + contentBg.height + 20;
		view.addChildToContainer(otherbg);

        let othertxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip12-${code}`), 22, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, othertxt, otherbg, [0,10]);
		
		let fontTitleBg2 = BaseLoadBitmap.create("battletitle"); 
		fontTitleBg2.y = othertxt.y - 5;
		view.addChildToContainer(fontTitleBg2);
		view.addChildToContainer(othertxt);

		let othertitlebg = BaseBitmap.create("battleyellow");
		othertitlebg.width = 560-33.5;
		othertitlebg.height = 30;
		othertitlebg.x = titlebg.x;
		othertitlebg.y = otherbg.y + 40;
		view.addChildToContainer(othertitlebg);

		fontTitleBg2.width = 309+othertxt.width+10;
		fontTitleBg2.x = othertxt.x + (othertxt.width-fontTitleBg2.width)/2;

	
		let othertitleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acBattlerank3"), 22);
        othertitleTxt1.x = othertitlebg.x + 30-20;
        othertitleTxt1.y = othertitlebg.y + 5;
        view.addChildToContainer(othertitleTxt1);

        let othertitleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acBeautyVoteViewTab4ZidTile-1"), titleTxt1.size)
        othertitleTxt2.x = othertitlebg.x + 150-20;
        othertitleTxt2.y = othertitleTxt1.y;
		view.addChildToContainer(othertitleTxt2);

		let othertitleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip10-${code}`), titleTxt1.size)
		othertitleTxt3.x = othertitlebg.x + 220-20;
        othertitleTxt3.y = othertitleTxt1.y;
		view.addChildToContainer(othertitleTxt3);

		let othertitleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip11-${code}`), titleTxt1.size)
		othertitleTxt4.x = othertitlebg.x + 330-20;
        othertitleTxt4.y = othertitleTxt1.y;
		view.addChildToContainer(othertitleTxt4);


		// let tmp = [];
		// for(let i = 1; i < 10; ++ i){
		// 	tmp.push({
		// 		name : `玩家${i}`,
		// 		zid : i,
		// 		value : App.MathUtil.getRandom(1,9999999),
		// 		add : App.MathUtil.getRandom(1,9999999),
		// 	});
		// }
        arr = [];
		for(let i = 1; i <= len; ++ i){
			let unit = view.vo.getAllInfoById(i);
			if(!Api.mergeServerVoApi.judgeIsSameServer(unit.server , Api.mergeServerVoApi.getTrueZid())){
				unit.pos = [
					{width : titleTxt1.textWidth, x : titleTxt1.x}, 
					{width : titleTxt2.textWidth, x : titleTxt2.x},
					{width : titleTxt3.textWidth, x : titleTxt3.x}, 
					{width : titleTxt4.textWidth, x : titleTxt4.x},
				];
				arr.push(unit);
			}
		}
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,555,650 - othertitlebg.y - othertitlebg.height);
        let otherscrollList = ComponentManager.getScrollList(AcBattleGroundCheerSelectItem, arr, rect, view.code);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, otherscrollList, othertitlebg, [0,othertitlebg.height]);
		view.addChildToContainer(otherscrollList);
		otherscrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
		otherscrollList.bounces = false;
		
		otherbg.height = otherscrollList.height + otherscrollList.y - otherbg.y;

		let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`battlegroundcheertip13-${code}`), 20, TextFieldConst.COLOR_BLACK);
		tiptxt.lineSpacing = 5;
		tiptxt.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, otherbg, [0,otherbg.height + 10]);
		view.addChildToContainer(tiptxt);
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

	protected resetBgSize():void{
		super.resetBgSize();
	}

	protected getShowWidth():number{
		return 600;
	}

	protected getShowHeight():number{
		return 798;
	}
	
	protected getTitleStr():string{
		return 'rankViewTitle';
	}


	public hide():void{
		super.hide();
	}



	public dispose():void{
        let view = this;
        
		super.dispose();
	}
}