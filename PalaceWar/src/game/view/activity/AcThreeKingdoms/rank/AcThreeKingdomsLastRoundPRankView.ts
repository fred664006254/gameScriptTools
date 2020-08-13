/**
 * 上轮个人活动排名
 * author qianjun
 */
class AcThreeKingdomsLastRoundPRankView extends CommonView{
	// 滑动列表
	private info = null;

	public constructor(){
		super();
	}
	
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
    }

    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }

	
	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([

		]);
	}

	protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETRANK,
            requestData:{
                activeId : this.acTivityId,
                round : Math.max(this.vo.getCurWeek() - 1, 1)
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.ret){
            let rdata = data.data.data;
            this.info = rdata;
        }
	}

	public initView():void
	{		
		let view = this;
		view.width = GameConfig.stageWidth;
		view.height = GameConfig.stageHeigth;
		let code = view.getUiCode();

		let juzhou = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsjzhou`, code));
		view.addChild(juzhou);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,juzhou,view.titleBg,[0,view.titleBg.height]);

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip7`, code)), 20, TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 10;
		tipTxt.textAlign= egret.HorizontalAlign.CENTER;
		tipTxt.width = 560;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,juzhou,[0,30]);

		let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip2`, code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
		view.addChild(dateTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,dateTxt,tipTxt,[0,tipTxt.textHeight+10]);
		
		//膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,0], true);
		view.addChild(bottomBg);

		//排名列表
		let title= BaseBitmap.create("qingyuanitemtitlebg");
		title.width = 610;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,title,juzhou,[0,juzhou.height+7]);
		this.addChild(title);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(42 , title.y+8);
		this.addChild(rankText);

		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(115 , rankText.y);
		this.addChild(nameText);

		let titleTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acLadder_rank_title3"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTxt.setPosition(275 , rankText.y);
		this.addChild(titleTxt);

		
		let serverTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		serverTxt.setPosition(400 , rankText.y);
		this.addChild(serverTxt);

		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip8-1"),20,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(475 , rankText.y);
		this.addChild(scoreText);

		let rankarr = view.info.rankArr;
		let myrankarr = view.info.myrankArr;
		let mypoint = 0;
		let rankV = 0;
		if(myrankarr && myrankarr.myrank){
			rankV = myrankarr.myrank;
		}
		if(myrankarr && myrankarr.value){
			mypoint = myrankarr.value;
		}
		let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip16-${code}`, [App.StringUtil.changeIntToText(mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, bottomBg, [25,35]);
		view.addChild(myKingdomTxt);
		//本轮个人排名
		let rankstr = ``;
		if(!this.vo.getMyKingdoms()){
			rankstr = LanguageManager.getlocal(`acThreeKingdomsTeam0-${code}`);
		}
		else if(rankV == 0){
			rankstr = LanguageManager.getlocal(`atkracedes4`);
		}
		else{
			rankstr = rankV.toString();
		}
		let color = String(0x21eb39);
		let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip15-${code}`, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0,myKingdomTxt.textHeight+20]);
		view.addChild(txt3);

		let list = ComponentManager.getScrollList(AcThreeKingdomsPrankItem,rankarr,new egret.Rectangle(0,0,610,bottomBg.y-title.y-title.height-10));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0,title.height+5]);
		view.addChild(list);
		list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
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
	// private userShotCallback(event : egret.Event):void{
    //     if(event.data.ret){
    //         let data = event.data.data.data;
	// 		if(event.data.data.cmd == NetRequestConst.REQUEST_RANKG_USERSHOT)
	// 		{
	// 			data["crossZone"] = 1;
	// 			data['zid'] = Api.mergeServerVoApi.getTrueZid(data.ruid);
	// 		}
	// 		ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW,data);
    //     }
    // }

	protected getTitleStr():string{
		return 'rankViewTitle';
	}

	public dispose():void{
		let view = this;
		view.info = null;
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANKG_USERSHOT),this.userShotCallback,this);
		super.dispose();
	}
}