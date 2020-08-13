/**
 * author:qianjun
 * desc:跨服亲密活动首页
*/
class AcCrossServerWifeBattleEnterView extends AcCommonView
{
	private _canJoinImg : BaseLoadBitmap = null;
	private _cdTimeDesc : BaseTextField = null;
	private _cdType :number = 0;//倒计时类型 0即将开始 1:准备倒计时  2:结束倒计时   3:展示期 4活动结束
	private _countDownText : BaseTextField = null;
	private _countDownTime : number = 0;
	private _enterBtn : BaseDisplayObjectContainer = null;
	private _joinDescText:BaseTextField = null;
	private _rewardBrn : BaseButton = null;

	public constructor() 
	{
		super();
	}

	// public static AID:string = null;
	// public static CODE:string = null;


    protected get aid():string
	{
		return "crossServerWifeBattle";
		
	}
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
        // return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
	}

    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"accrossserverwifebattleview",`sharepopupview_closebtn`,`specialview_commoni_namebg`,
			// "crossserverinti_detailbg-1","crossserverinti_enterin-1","crossserverintibg-1",
			// "crossserverinti_detailbg-4","crossserverinti_enterin-4","crossserverintibg-4",
		
			// "public_9_wordbg2",
            // "crossserverinti_flagword",
			// "rechargevie_db_01",
		]);
	}

	protected getRuleInfo():string{
		let str = `acCrossServerWifeBattleruleinfo`;
        if(LanguageManager.checkHasKey(`acCrossServerWifeBattleruleinfo-${this.code}`)){
            str = `acCrossServerWifeBattleruleinfo-${this.code}`;
        }
		return App.CommonUtil.getCrossLeagueCn(str,this.vo.isCrossLeague());
    } 


	protected initTitle() : void{

	}

	protected getBgName():string
	{
        return "accrossserverwifebattle_enterbg";
	}

	protected getCloseBtnName():string
	{
		// return ButtonConst.POPUP_CLOSE_BTN_1;
		return "sharepopupview_closebtn";
	}

	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return view.vo.test ? null : {requestType:NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETINFO,requestData:{activeId : this.vo.aidAndCode}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		// console.log("AcCrossServerWifebattleEnterView-> data",data);
		if(this.vo.test){
			
		}
		else{
			this.vo.setActInfo(data.data.data);
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_CRASHMODEL,{
				activeId : this.vo.aidAndCode
			});
		}
		
	}
	protected getTitleStr():string
	{
		return null;
	}
	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,640,1136);
			this.viewBg = BaseLoadBitmap.create(bgName,rect);
			this.viewBg.setPosition(0,(GameConfig.stageHeigth-this.viewBg.height)*0.1);
			this.addChild(this.viewBg); 
		}
	}

	private checkRed():void{
		if(this.vo.canLqAaward()){
			App.CommonUtil.addIconToBDOC(this._rewardBrn);
		}
		else{
			App.CommonUtil.removeIconFromBDOC(this._rewardBrn);
		}
	}

	public initView():void
	{	
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK,this.rankCallback,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkRed,this);
		let boneName = `crossServerWifeBattle_maintitleeffect`;
		if((!Api.switchVoApi.checkCloseBone()) && RES.hasRes(`${boneName}_tex_png`) && App.CommonUtil.check_dragon()){
			let maineff = App.DragonBonesUtil.getLoadDragonBones(boneName);
			maineff.setPosition(-10,20);
			this.addChildToContainer(maineff);
		}
		if(!this.vo.test){
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK,{activeId:this.vo.aidAndCode});
		}
		let flagword = App.CommonUtil.getCrossLeagueRes(`accrossserverwifebattle_title`,this.vo.isCrossLeague());
		let title = null;
        title =  BaseBitmap.create(flagword);
        // title.width = 640;
        // title.height = 120;
        title.x = 0;
        title.y = 0;
        this.addChildToContainer(title);

        //参赛资格
		let canJoin = this.vo.isCanJoin;

		if(PlatformManager.hasSpcialCloseBtn())
		{
			// if(canJoin==true)
			// {
			// 	this.closeBtn.y =80;
			// }
			// else
			// {
			// 	this.closeBtn.y =35;
			// }
            this.closeBtn.y =80;
		
		} else {
            this.closeBtn.y =35;
        }
		this.closeBtn.x = 550;

		//底部
		let vo = this.vo;
		//人物形象
		let bottomBg = BaseBitmap.create("public_9_wordbg");
		bottomBg.x = 0;
		bottomBg.height = 180;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height;
		
		let wifeCfg:any = Config.WifeCfg.getWifeCfgById(311);

		let woman1 = BaseLoadBitmap.create(wifeCfg.body);
		let woman2 = BaseLoadBitmap.create(`wife_full_303`);
		let woman3 = BaseLoadBitmap.create(`wife_full_302`);
		woman1.width = woman2.width = woman3.width = 640;
		woman1.height = woman2.height = woman3.height = 840;
		woman1.setScale(0.7);
		woman2.setScale(0.7);
		woman3.setScale(0.7);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, woman2, bottomBg, [-50,bottomBg.height-50]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, woman3, bottomBg, [-30,bottomBg.height-50]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, woman1, bottomBg, [0,bottomBg.height+150]);

		if (PlatformManager.checkIsRuSp())
		{
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, woman1, bottomBg, [0,bottomBg.height+100]);
		}

		this.addChild(woman1);
		this.addChild(woman3);
		this.addChild(woman2);

		let arr = [woman1,woman2,woman3];
		
		let pos = {
			1 : [280,140],
			2 : [75,235],
			3 : [170,230]
		}
		let rect = {
			1 : [180,180],
			2 : [130,100],
			3 : [90,90]
		}
		for(let i = 1; i < 4; ++ i){
			let rankimg = BaseBitmap.create(`accrossserverwifebattle_rank${i}`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankimg, arr[i - 1], pos[i]);
			this.addChild(rankimg);
			rankimg.name = `rankimg${i}`
			
			let eff = ComponentManager.getCustomMovieClip(`crosswifebattlerank${i}eff`, 15);
			this.addChild(eff);
			eff.playWithTime(-1);
			eff.width = rect[i][0];
			eff.height = rect[i][1];
			eff.anchorOffsetX = eff.width / 2;
			eff.anchorOffsetY = eff.height / 2;
			eff.x = rankimg.x + 30;
			eff.y = rankimg.y + 30;
			eff.name = `rankeff${i}`

			let nameTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_BROWN);
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, rankimg, [65,20]);
			this.addChild(nameTxt);
			nameTxt.name = `nameTxt${i}`;

			let rankTxtbg = BaseBitmap.create(`specialview_commoni_namebg`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rankTxtbg, rankimg, [0,rankimg.height-18]);
			this.addChild(rankTxtbg);
			rankTxtbg.name = `rankTxtbg${i}`;

			let scoreTxt = ComponentManager.getTextField(``, 18, TextFieldConst.COLOR_LIGHT_YELLOW);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, rankTxtbg);
			this.addChild(scoreTxt);
			scoreTxt.name = `scoreTxt${i}`
		}
		
	
		this.addChild(bottomBg);
		
		let btn = ComponentManager.getButton("accrossserverwifebattle_enterbtn", '', this.enterInHandler,this);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bottomBg, [0,-btn.height+20]);

		if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("crossServerWifeBattle_enterstageeffect_ske")) {
			let entergroup = new BaseDisplayObjectContainer();
			entergroup.width = 575;
			entergroup.height = 305;
			this.addChild(entergroup);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, entergroup, btn, [0,100]);

			let hudie = App.DragonBonesUtil.getLoadDragonBones("crossServerWifeBattle_enterstageeffect");
			entergroup.addChild(hudie);
			hudie.x = 307;
			this._enterBtn = entergroup;

			let txt = BaseBitmap.create(`accrossserverwifebattle_entertxt`);
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, txt, entergroup, [10,-txt.height], true);
			entergroup.addChild(txt);

			entergroup.addTouchTap(this.enterInHandler, this, null);
		}
		else{
			this._enterBtn = btn;
		}

		if(this._cdType > 1 && this._cdType < 4){
			App.DisplayUtil.changeToNormal(this._enterBtn);
		}
		else{
			//灰化
			App.DisplayUtil.changeToGray(this._enterBtn);
		}
		//进入按钮
		this.addChild(this._enterBtn);

		

		let cdbg = BaseBitmap.create("accrossserverwifebattle_cdbg");
		cdbg.width = 538;
		this.addChild(cdbg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, cdbg, bottomBg, [0,-5]);
		// middleBg.x = 0;
		// middleBg.y = bottomBg.y - middleBg.height + 5;

		// let middleBg = BaseBitmap.create("accrossserverwifebattle_descbg");
		// middleBg.x = 0;
		// middleBg.y = bottomBg.y - middleBg.height + 5;
		

		//当前时间段
        //当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
		this._cdType = vo.judgeTimeProcess();
		if(this._cdType > 0 && this._cdType < 4){
			if(this._cdType == 1){
				this._countDownTime = vo.st + 2 * 3600 - GameData.serverTime;
			}
			else if(this._cdType == 2){
				this._countDownTime = vo.et - 24 * 3600 - GameData.serverTime;
			}
			else{
				this._countDownTime = vo.et - GameData.serverTime;
			}
			// this.api.setCountDownTime(this._countDownTime);
		}

		// if(RES.hasRes(`crossserverinti_enterin-${view.code}`))
		// {
		// 	view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-${view.code}`, '', view.enterInHandler,this);
		// }
		// else{
		// 	view._enterBtn = ComponentManager.getButton(`crossserverinti_enterin-1`, '', view.enterInHandler,this);
		// }
		//活动倒计时时间
		this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + this._cdType,[this.vo.getCountTimeStr(this._countDownTime)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._cdTimeDesc, cdbg);
		this.addChild(this._cdTimeDesc);
		// if(this._countDownTime > 0){
		// 	this._countDownText = ComponentManager.getTextField(this.vo.getCountTimeStr(this._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
		// 	this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth , this._cdTimeDesc.y);
		// 	this.addChild(this._countDownText);
		// }

		//活动时间
		let timeDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleTime", [vo.acTimeAndHour]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x = 10;
		timeDesc.y = bottomBg.y + 50;
		this.addChild(timeDesc);

        //参与区服
		let pkzidsTxt = ComponentManager.getTextField(LanguageManager.getlocal('acCrossServerWifeBattlePkzids', [``]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		pkzidsTxt.x = timeDesc.x;
		pkzidsTxt.y = timeDesc.y + timeDesc.height + 5;
		this.addChild(pkzidsTxt);
		
		let joinServerTxt = ComponentManager.getLimitLengthServerName(this.vo.getPkzidsStr(), 20, bottomBg.width - pkzidsTxt.x - pkzidsTxt.width - 10, this, TextFieldConst.COLOR_LIGHT_YELLOW);
		joinServerTxt.x = pkzidsTxt.x + pkzidsTxt.textWidth;
		joinServerTxt.y = pkzidsTxt.y;
		this.addChild(joinServerTxt);
		

		//是否有资格
		if(canJoin){
			this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`acCrossServerWifeBattleOpenDesc1-${this.vo.code}`,this.vo.isCrossLeague())), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
		} else {
			this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(`acCrossServerWifeBattleOpenDesc2-${this.vo.code}`,this.vo.isCrossLeague())), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		}

		this._joinDescText.lineSpacing = 5;
		this._joinDescText.width = 620;
		this._joinDescText.x = timeDesc.x;
		this._joinDescText.y = pkzidsTxt.y + pkzidsTxt.height + 5;
		this.addChild(this._joinDescText);

		//活动奖励那妞
		let rewardBtn = ComponentManager.getButton(`accrossserverwifebattle_rewardbtn`, "", ()=>{
			//活动奖励
			ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERWIFEBATTLEREWARDVIEW,{
				aid : this.aid,
				code : this.code
			});
		}, this);
		this.addChild(rewardBtn);
		this._rewardBrn = rewardBtn;
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, rewardBtn, bottomBg, [15,-rewardBtn.height-10]);
		//规则描述
		this.freshView();
		this.tick();
	}

	public tick():void
	{	
		let view = this;
		if (this._cdTimeDesc) {
			-- this._countDownTime;
			// view.api.setCountDownTime(view._countDownTime);
			// this._countDownText.text = this.vo.getCountTimeStr(this._countDownTime);
			// if (this._countDownTime <= 0) {
			this._cdType = this.vo.judgeTimeProcess();
			if(this._cdType == 2){
				App.DisplayUtil.changeToNormal(this._enterBtn);
				this._countDownTime = this.vo.et - 86400 - GameData.serverTime;
			}
			else if(this._cdType == 3){
				this._countDownTime = view.vo.et - GameData.serverTime;
			}
			else if(this._cdType == 4){
				App.DisplayUtil.changeToGray(this._enterBtn);

				this.hide();
				App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime4"));
				return;
			}
			
			this._cdTimeDesc.text = LanguageManager.getlocal("acCrossServerWifeBattleCDTime"+this._cdType,[this.vo.getCountTimeStr(this._countDownTime)]);
			this._cdTimeDesc.x = GameConfig.stageWidth/2 - this._cdTimeDesc.textWidth/2;
			// }
		}
	}

	private freshView():void{
		let view = this;
		let rankData = [];
		if(this.vo.rankData && this.vo.rankData.rankarr){
			rankData = this.vo.rankData.rankarr;
		}
		for(let i = 1; i < 4; ++ i){
			let unit = rankData[i - 1];
			let nameTxt = <BaseTextField>view.getChildByName(`nameTxt${i}`);
			let rankTxtbg = <BaseBitmap>view.getChildByName(`rankTxtbg${i}`);
			let rankimg = <BaseBitmap>view.getChildByName(`rankimg${i}`);
			let scoreTxt =  <BaseTextField>view.getChildByName(`scoreTxt${i}`);
			let rankeff =  <CustomMovieClip>view.getChildByName(`rankeff${i}`);
			if(unit && this.vo.judgeTimeProcess() > 1){
				rankimg.alpha = rankTxtbg.alpha = nameTxt.alpha = scoreTxt.alpha = rankeff.alpha = 1;
				nameTxt.text = unit.name;
				scoreTxt.text = LanguageManager.getlocal(`acCrossServerWifeBattlescore`, [unit.point.toString()]);
				rankTxtbg.width = scoreTxt.textWidth + 40;
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rankTxtbg, rankimg, [0,rankimg.height-20]);
				App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, rankTxtbg);
			}
			else{
				rankimg.alpha = rankTxtbg.alpha = nameTxt.alpha = scoreTxt.alpha = rankeff.alpha = 0;
			}
			
		}
	}

	private enterInHandler() : void{
		let view = this;
		if(view._cdType > 1 && view._cdType < 4){
            // if(this.vo.isCanJoin){
                ViewController.getInstance().openView(ViewConst.COMMON.ACCROSSSERVERWIFEBATTLEVIEW,{
                    aid : this.aid,
                    code : this.code
                });
            // } else {
                // App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleNotCanJoin"));
            // }

		}
		else{
			let str = ``;
			if(view._cdType <= 1){
				str = `acCrossServerWifeBattleCDTime0`;
			}
			else{
				str = `acCrossServerWifeBattleCDTime4`;
			}
			App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCrossLeagueCn(str,this.vo.isCrossLeague())));
		}
	}

	private rankCallback(evt : egret.Event):void{
		this.vo.setRankData(evt.data.data.data);
		this.freshView();
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_RANK,this.rankCallback,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY,this.checkRed,this);
		this._canJoinImg = null;
		this._cdTimeDesc = null;
        this._cdType = 0;
        this._countDownText = null;
        this._countDownTime = null;
		if(this._enterBtn){
			this._enterBtn.removeTouchTap();
		}
		
		this._enterBtn = null;
		this._joinDescText = null;
		this._rewardBrn = null;
		super.dispose();
	}
}