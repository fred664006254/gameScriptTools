/**
 * 本轮攻城战排名
 * author qianjun
 */
class AcThreeKingdomsCityWarPrankView extends CommonView{
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

	private get day():number{
		return this.param.data.number < 3 ? 6 : 7;
	}

	private get ftype():number{
		return this.param.data.number % 2 == 1 ? 3 : 4;
	}

	protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GETCITYRANK,
            requestData:{
                activeId : this.acTivityId,
				day : this.day,
				ftype : this.ftype
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

		let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip17`, code)), 20, TextFieldConst.COLOR_BROWN);
		tipTxt.lineSpacing = 10;
		tipTxt.textAlign= egret.HorizontalAlign.CENTER;
		tipTxt.width = 560;
		view.addChild(tipTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,tipTxt,juzhou,[0,30]);
		//本周六的第一场攻城战
		let week = view.vo.getCurWeek();
		let start = view.vo.activeSt + (week - 1) * (7 * 86400);
		let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[view.ftype - 1];
		//周六
		let st = start + (view.day - 1) * 86400 + unit.popularityRange[0] * 3600;
		let et = start + (view.day - 1) * 86400 + unit.popularityRange[1] * 3600;

		// let st2 = start + (7 - 1) * 86400 + unit.popularityRange[0] * 3600;
		// let et2 = start + (7 - 1) * 86400 + unit.popularityRange[1] * 3600;

		let timeparam = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;

		let dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip18`, code), [timeparam]), 20, TextFieldConst.COLOR_BROWN);
		view.addChild(dateTxt);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop,dateTxt,tipTxt,[0,tipTxt.textHeight+10]);
		
		//膜拜背景
		let bottomBg = BaseBitmap.create("arena_bottom");
		bottomBg.height = 135;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0,0], true);
		view.addChild(bottomBg);

		//查看奖励
		let rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode(`acThreeKingdomsRanktip3`, code), ()=>{
			ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSCITYWARREWARDVIEW, {
				code : view.code,
				aid : view.aid,
				mypoint : mypoint,
				rankstr : rankstr
			})
		}, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25,0]);
		view.addChild(rewardBtn);

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
		let myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip9-${code}`, [App.StringUtil.changeIntToText(mypoint)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
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
		let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsRanktip5-${code}`, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0,myKingdomTxt.textHeight+20]);
		view.addChild(txt3);

		// let arr = [];
		// for(let i = 1; i < 20; ++ i){
		// 	arr.push({
		// 		uid : 1002740+i,
		// 		zid : App.MathUtil.getRandom(1,16),
		// 		title : {
		// 			title : 3000 + i,
		// 			level : App.MathUtil.getRandom(1,9),
		// 		},
		// 		name : `玩家${i}`,
		// 		kingdom : App.MathUtil.getRandom(1,4),
		// 		level : App.MathUtil.getRandom(1,9),
		// 		value : App.MathUtil.getRandom(1,10000),
		// 	});
		// }
		// //rankarr
		let list = ComponentManager.getScrollList(AcThreeKingdomsCityWarPrankItem,rankarr,new egret.Rectangle(0,0,610,bottomBg.y-title.y-title.height-10));
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, title, [0,title.height+5]);
		view.addChild(list);
		list.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
	}
	protected getTitleStr():string{
		return 'rankViewTitle';
	}

	public dispose():void{
		let view = this;
		view.info = null;
		super.dispose();
	}
}