/**
 * 区服活动排名
 * author qianjun
 */
class AcConquerMainLandZRankView extends PopupView{
	// 滑动列表

	public constructor(){
		super();
	}
	
	private getUiCode():string{
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
	
	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
			`rank_1`,`rank_2`,`rank_3`
		]);
	}

	protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_MAINLAND_ZRANK,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.data.data){ 
            this.vo.setZrankinfo(data.data.data);
        } 
    }
	
	protected isHaveTitle():boolean{
		return true;
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



		let myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`crossranserver`) + Api.mergeServerVoApi.getAfterMergeSeverName(null, true, Api.mergeServerVoApi.getTrueZid()), 22, TextFieldConst.COLOR_BROWN_NEW); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myNameTxt, bottomBg, [25,10]);
		view.addChildToContainer(myNameTxt);


		let rankV = view.vo.getMyServerRank();
		let addV =  App.StringUtil.changeIntToText(view.vo.getMyServerScore());
		
		let str = '';
		if(rankV == 0){
			str = LanguageManager.getlocal('atkracedes4');
		}
		else{
			str = rankV.toString();
		}
		if(!view.vo.isCanJoin()){
			str = LanguageManager.getlocal('crossImacyNoAccess');
		}

		let myRankStr =  ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandPlayerRank",[str.toString()]), 22, TextFieldConst.COLOR_BROWN_NEW); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, myRankStr, bottomBg, [25,10]);
		view.addChildToContainer(myRankStr);

		let scoreStr =  ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandScoreRank-${code}`,[addV.toString()]), 22, TextFieldConst.COLOR_BROWN_NEW); 
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreStr, bottomBg, [65,10]);
		view.addChildToContainer(scoreStr);
	
		let titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acRankPop_title1"), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = this.x + 120;
        titleTxt1.y = this.y + 30;
        view.addChildToContainer(titleTxt1);

        let titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
        titleTxt2.x = this.x + 260;
        titleTxt2.y = titleTxt1.y;
		view.addChildToContainer(titleTxt2);

		let titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acConquerMainLandScore-${code}`), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW)
		titleTxt3.x = this.x + 400;
        titleTxt3.y = titleTxt1.y;
		view.addChildToContainer(titleTxt3);

		// let tmp = [];
		// for(let i = 1; i < 10; ++ i){
		// 	tmp.push({
		// 		zid : i,
		// 		value : App.MathUtil.getRandom(1,9999999),
		// 	});
		// }
		// let rankList = tmp;//[{}];
		let rankList = view.vo.getZrankList();
		let arr = [];
		for(let i in rankList){
			let unit = rankList[i];
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
		
		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,contentBg.width,contentBg.height - 10);
        let scrollList = ComponentManager.getScrollList(AcConquerMainLandZRankItem,arr,rect2);
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