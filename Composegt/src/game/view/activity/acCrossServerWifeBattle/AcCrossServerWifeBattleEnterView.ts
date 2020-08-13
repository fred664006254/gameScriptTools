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
	private _enterBtn : BaseButton = null;
    private _joinDescText:BaseTextField = null;

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
			// "crossserverinti_detailbg-1","crossserverinti_enterin-1","crossserverintibg-1",
			// "crossserverinti_detailbg-4","crossserverinti_enterin-4","crossserverintibg-4",
		
			// "public_9_wordbg2",
            // "crossserverinti_flagword",
			// "rechargevie_db_01",

            "accrossserverwifebattle_descbg",
            "accrossserverwifebattle_desctitle",
            "accrossserverwifebattle_enterbg",
            "accrossserverwifebattle_enterbtn",
            "accrossserverwifebattle_helpbtn",
            "accrossserverwifebattle_title",
		]);
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
		return "btn_win_closebtn";
	}
	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_WIFEBATTLECROSS_GETINFO,requestData:{activeId : this.vo.aidAndCode}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		// console.log("AcCrossServerWifebattleEnterView-> data",data);
		this.vo.setActInfo(data.data.data);
		NetManager.request(NetRequestConst.REQUEST_WIFEBATTLE_CRASHMODEL,{});
	}
	protected getTitleStr():string
	{
		return "atkracecross";
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
	public initView():void
	{	

		
		let flagword = "accrossserverwifebattle_title";
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
		let bottomBg = BaseBitmap.create("public_9_wordbg");
		bottomBg.x = 0;
		bottomBg.y = GameConfig.stageHeigth - bottomBg.height + 40;
		this.addChild(bottomBg);

		let middleBg = BaseBitmap.create("accrossserverwifebattle_descbg");
		middleBg.x = 0;
		middleBg.y = bottomBg.y - middleBg.height + 5;
		

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
        this._enterBtn = ComponentManager.getButton("accrossserverwifebattle_enterbtn", '', this.enterInHandler,this);
		
		if(this._cdType > 1 && this._cdType < 4){
			this._enterBtn.setEnable(true);
		}
		else{
			//灰化
			this._enterBtn.setEnable(false);
		}
		//进入按钮
		this._enterBtn.setPosition(GameConfig.stageWidth / 2 - this._enterBtn.width / 2, middleBg.y - this._enterBtn.height + 70 );
		this.addChild(this._enterBtn);

        this.addChild(middleBg);

		//活动倒计时时间
		this._cdTimeDesc = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleCDTime" + this._cdType,[this.vo.getCountTimeStr(this._countDownTime)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
		this._cdTimeDesc.x = GameConfig.stageWidth/2 - this._cdTimeDesc.width/2;
		this._cdTimeDesc.y = middleBg.y + 27;
		this.addChild(this._cdTimeDesc);
		// if(this._countDownTime > 0){
		// 	this._countDownText = ComponentManager.getTextField(this.vo.getCountTimeStr(this._countDownTime), TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xff0000);
		// 	this._countDownText.setPosition(this._cdTimeDesc.x + this._cdTimeDesc.textWidth , this._cdTimeDesc.y);
		// 	this.addChild(this._countDownText);
		// }

        //是否有资格
        if(canJoin){
            this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc2"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        } else {
            this._joinDescText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleOpenDesc3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        }

        this._joinDescText.textAlign = egret.HorizontalAlign.CENTER;
        this._joinDescText.lineSpacing = 3;
        this._joinDescText.x = GameConfig.stageWidth/2 - this._joinDescText.width/2;
        this._joinDescText.y = this._cdTimeDesc.y + this._cdTimeDesc.height + 3;
        this.addChild(this._joinDescText);


		//活动时间
		let timeDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerWifeBattleTime", [vo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		timeDesc.x = 12;
		timeDesc.y = bottomBg.y + 15;
		this.addChild(timeDesc);

        //参与区服
        let pkzidsTxt= ComponentManager.getTextField(LanguageManager.getlocal('acCrossServerWifeBattlePkzids', [this.vo.getPkzidsStr()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		pkzidsTxt.x = timeDesc.x;
        pkzidsTxt.y = timeDesc.y + timeDesc.height + 5;
		this.addChild(pkzidsTxt);


		//规则描述
		let ruleDesc : BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acCrossServerWifeBattleRule")), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		ruleDesc.width = 616;//GameConfig.stageWidth - 100;
		ruleDesc.lineSpacing = 5;
		ruleDesc.x = pkzidsTxt.x;
		ruleDesc.y = pkzidsTxt.y + pkzidsTxt.textHeight + 5;
		this.addChild(ruleDesc);
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
				this._enterBtn.setEnable(true);
				this._countDownTime = this.vo.et - 86400 - GameData.serverTime;
			}
			else if(this._cdType == 3){
				this._countDownTime = view.vo.et - GameData.serverTime;
			}
			else if(this._cdType == 4){
				this._enterBtn.setEnable(false);
				this.hide();
				App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime4"));
				return;
			}
			
			this._cdTimeDesc.text = LanguageManager.getlocal("acCrossServerWifeBattleCDTime"+this._cdType,[this.vo.getCountTimeStr(this._countDownTime)]);
				
			// }
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
			App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerWifeBattleCDTime0"));
		}
	}

	public dispose():void
	{
	
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
		super.dispose();
	}
}