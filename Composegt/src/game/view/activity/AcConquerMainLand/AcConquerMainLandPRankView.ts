/**
 * 个人活动排名
 * author qianjun
 */
class AcConquerMainLandPRankView extends PopupView{
	// 滑动列表

	public constructor(){
		super();
	}
	
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
			case 2:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
	
	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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

	protected isHaveTitle():boolean{
		return true;
	}
	
	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
			`rank_1`,`rank_2`,`rank_3`
		]);
	}

	protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_MAINLAND_PRANK,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.data.data){ 
            this.vo.setPrankinfo(data.data.data);
        } 
    }

	public initView():void
	{		
		let view = this;
		let code = view.getUiCode();
		let contentBg = BaseBitmap.create("public_9v_bg12");
		contentBg.width = view.getShowWidth() - 60;
		contentBg.height = 530;
		contentBg.x = view.viewBg.x + view.viewBg.width/2 - contentBg.width/2;
		contentBg.y = 70;
		view.addChildToContainer(contentBg);






		let bottomBg = BaseBitmap.create("public_9v_bg12");
		bottomBg.width = contentBg.width;
		bottomBg.height = 86;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;
		bottomBg.y = contentBg.y + contentBg.height + 5 ;
		view.addChildToContainer(bottomBg);


		let myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('acConquerMainLandPrankPlayerName-1', [Api.playerVoApi.getPlayerName()]), 22,TextFieldConst.COLOR_BROWN_NEW); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25,10]);
		view.addChildToContainer(myNameTxt);

		let rankV = view.vo.getMyPrank();
		let addV =  App.StringUtil.changeIntToText(view.vo.getMyPScore());
		
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(!view.vo.isCanJoin()){
			str = LanguageManager.getlocal('crossImacyNoAccess');
			color = 0xff3c3c;
		}

		let myRankStr =  ComponentManager.getTextField(LanguageManager.getlocal("acwipeBossPlayerRank",[str.toString()]), 22, color); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
		view.addChildToContainer(myRankStr);

		let scoreStr =  ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandScoreRank-${code}`,[addV.toString()]), 22, TextFieldConst.COLOR_BROWN_NEW); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65,10]);
		view.addChildToContainer(scoreStr);
	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 90;
		titleTxt1.y = this.y + 30;
		if(PlatformManager.checkIsViSp()){
			titleTxt1.x -= 10;
		}
        view.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt2.x = this.x + 155;
		if(PlatformManager.checkIsViSp()){
			titleTxt2.x += 25;
		}
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt3.x = this.x + 275;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);

		let titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandScore-${code}`), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt4.x = this.x + 355;
        titleTxt4.y = titleTxt1.y;
		view.addChildToContainer(titleTxt4);

		let titleTxt5 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandScoreAdd-${code}`), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt5.x = this.x + 479;
        titleTxt5.y = titleTxt1.y;
		view.addChildToContainer(titleTxt5);

		// let tmp = [];
		// for(let i = 1; i < 10; ++ i){
		// 	tmp.push({
		// 		name : `玩家${i}`,
		// 		zid : i,
		// 		value : App.MathUtil.getRandom(1,9999999),
		// 		add : App.MathUtil.getRandom(1,9999999),
		// 	});
		// }
		let arr = [];
		let rankList = view.vo.getPrankList();
		for(let i in rankList){
			let unit = rankList[i];
			unit.pos = [
				{width : titleTxt1.textWidth, x : titleTxt1.x - 30}, 
				{width : titleTxt2.textWidth, x : titleTxt2.x - 30},
				{width : titleTxt3.textWidth, x : titleTxt3.x - 30}, 
				{width : titleTxt4.textWidth, x : titleTxt4.x - 30},
				{width : titleTxt5.textWidth, x : titleTxt5.x - 30}
			];
			arr.push(unit);
		}
		// let rankInfo = view.vo.getRankInfo();
		// if(rankInfo.rankList && rankInfo.rankList.length){
		// 	rankList = rankInfo.rankList;
		// }
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,contentBg.width,contentBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcConquerMainLandPRankItem,arr,rect2,this.code);
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

	protected resetBgSize():void{
		super.resetBgSize();
		// let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(`loctombranktip-${this.code}`),22,TextFieldConst.COLOR_LIGHT_YELLOW);
		// App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipTxt, this.viewBg, [0,this.viewBg.height]);
		// this.addChild(tipTxt);
		// tipTxt.visible = false;
		// this._tipTxt = tipTxt;
	}

	protected getShowWidth():number{
		return 585;
	}

	protected getShowHeight():number{
		return 798;
	}
	
	protected getTitleStr():string{
		return 'acArrowRankViewTitle';
	}


	public hide():void{
		super.hide();
	}


	public dispose():void{
		let view = this;
		super.dispose();
	}
}