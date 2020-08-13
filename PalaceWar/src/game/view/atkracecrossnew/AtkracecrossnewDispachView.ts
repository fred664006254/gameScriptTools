/**
 * author shaoliang
 * date 2020/6/16
 * @class AtkracecrossnewDispachView
 * 新跨服擂台 派遣门客
 */

class AtkracecrossnewDispachView extends CommonView
{

    private _dispatchTimeText:BaseTextField = null;
    private _dispatchTime:number = 0;
    private _chooseNum:BaseTextField = null;
    private _confirmBtn:BaseButton = null;
    private _noTimeText:BaseTextField = null;

    private _chooseServants:string[] = [];

    public constructor() {
		super();
	}

    protected getTitlePic():string
	{	
		return "newcrossatkrace_servanttitle";
	}

    private get crossVo():AcNewCrossServerAtkRaceVo
	{	
		let crossVo = <AcNewCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("newCrossServerAtkRace");
		return crossVo;
	}

    protected getRuleInfo():string
	{
		let key = `newatkracecrossDespath_rule`;

		return App.CommonUtil.getCrossLeagueCn(key, this.crossVo.isCrossLeague());
	}

	protected getRuleInfoParam():string[]
	{	
		let cfg = Api.atkracecrossVoApi.getNewCrossCfg();
		return [String(cfg.lowerLimit2),String(cfg.lowerLimit3)];
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"newcrossatkrace_check","newcrossatkrace_gone","dailytask_topbg","commonview_bigframe",
		"arena_bottom_bg","servant_namebg","mainlanddetailtitlebg2-1","newcrossatkrace_addbuffdetailbtn",

		]);
	}


    public initView():void
    {

		let topBg = BaseBitmap.create("dailytask_topbg");
		topBg.y = -25;
		this.addChildToContainer(topBg);

		let desc = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossDespathDesc"), 20,TextFieldConst.COLOR_WHITE);
		desc.width = 600;
		desc.lineSpacing = 4;
		desc.setPosition(20,0);
		this.addChildToContainer(desc);

		this._dispatchTime = this.crossVo.st + 7200 - GameData.serverTime;
		// this._dispatchTime = 1000;
		// let choosetime = ComponentManager.getTextField(this.getDispachTimeStr(), 20,TextFieldConst.COLOR_QUALITY_YELLOW);
		// choosetime.setPosition(desc.x,desc.y+desc.height+5);
		// this.addChildToContainer(choosetime);
		// this._dispatchTimeText = choosetime;

		let frame = BaseBitmap.create("commonview_bigframe");
		frame.width = GameConfig.stageWidth;
		frame.height = GameConfig.stageHeigth-110;
		frame.y = 100;
		this.addChildToContainer(frame);

		let values = this.crossVo.cfg.getBaseBuff();
        let v2 = Math.floor(values[0]* 1000+0.5)/10;
        let v3 = Math.floor(values[1]* 1000+0.5)/10;

        let value2 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_buff1",[String(v2)]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        value2.setPosition(GameConfig.stageWidth/2-value2.width-40,frame.y-value2.height-5);
        this.addChildToContainer(value2);

        let value3 = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecross_buff2",[String(v3)]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
        value3.setPosition(GameConfig.stageWidth/2+40,value2.y);
		this.addChildToContainer(value3);
		
		let addBuffBtn = ComponentManager.getButton("newcrossatkrace_addbuffdetailbtn", "", this.addBuffBtnClick, this);
		this.addChildToContainer(addBuffBtn);
		addBuffBtn.setScale(0.8);
		addBuffBtn.setPosition(value3.x + value3.width + 7, value3.y + value3.height/2 - addBuffBtn.height * addBuffBtn.scaleY/2);

		let choosebg = BaseBitmap.create("mainlanddetailtitlebg2-1");
		choosebg.width = 306;
		choosebg.setPosition(GameConfig.stageWidth/2-choosebg.width/2, 130);
		this.addChildToContainer(choosebg);

		let line1 = BaseBitmap.create("public_line3");
		line1.width = 600;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = choosebg.y+choosebg.height/2 -line1.height/2;
		this.addChildToContainer(line1);

		let choosenum = ComponentManager.getTextField(this.getChooseNumStr(), 22,TextFieldConst.COLOR_LIGHT_YELLOW);
		choosenum.width = choosebg.width;
		choosenum.textAlign = egret.HorizontalAlign.CENTER;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,choosenum,choosebg);
		this.addChildToContainer(choosenum);
		this._chooseNum = choosenum;

		this._chooseServants = this.crossVo.getSids(); //["1001","1002"];

		let sids = Api.servantVoApi.getServantInfoIdListWithSort(6);

		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,(GameConfig.stageHeigth - 410));
		let scrollContiner = new BaseDisplayObjectContainer();
		let scrollView = ComponentManager.getScrollView(scrollContiner,rect);
		scrollView.y = choosebg.y+choosebg.height+3;
		this.addChildToContainer(scrollView);

		let alphabg = BaseBitmap.create("public_alphabg");
		alphabg.width = 640;
		alphabg.height =  Math.ceil((sids.length-1)/5)*112;
		scrollContiner.addChild(alphabg);

		for (let i = 0; i<sids.length; i++ )
		{
			let onesid = sids[i];
			let choose = GameData.isInArray(onesid,this._chooseServants);
			let oneItem = new AtkracecrossnewServantIcon();
			oneItem.init(onesid,choose,this.chooseServant,this);
			oneItem.setPosition(28 + i%5*120, 3+ Math.floor(i/5)*112);
			scrollContiner.addChild(oneItem);
		}

		let downbg = BaseBitmap.create("arena_bottom_bg");
		downbg.height  =140;
		downbg.y = GameConfig.stageHeigth-downbg.height;
		this.addChild(downbg);

		let dispathBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW,"sysConfirm",this.enterRackHandler,this,null,0);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,dispathBtn,downbg);
		this.addChild(dispathBtn);

		let dispathTimeText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("newatkracecrossDespath_done"), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,dispathTimeText,downbg);
		this.addChild(dispathTimeText);

		this._confirmBtn = dispathBtn;
		this._noTimeText = dispathTimeText;
		
		this.resetServantNum();
		if (this._dispatchTime <= 0){
			dispathBtn.visible = false;
			dispathTimeText.visible = true;
		}
		else{
			dispathTimeText.visible = false;
			dispathBtn.visible = true;
		}
	}	
	
	private addBuffBtnClick():void{
		ViewController.getInstance().openView(ViewConst.COMMON.NEWATKRACECROSSBUFFVIEW,{
			code:Api.atkracecrossVoApi.newcrossCode
		});
	}

	private enterRackHandler():void
	{
		if (this._chooseServants.length < 30)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_tipLess"));
		}
		else
		{
			if (this.crossVo.st + 7200 <= GameData.serverTime){
				App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_done"));
				return;
			}
			this.request(NetRequestConst.REQUEST_NEWATKRACECROSS_CHANGESIDS,{changesids:this._chooseServants,activeId:this.crossVo.aidAndCode});
		}
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{

		if (data.ret)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_tipSuccess"));
		}
	}

	private chooseServant(oneIcon:AtkracecrossnewServantIcon):void
	{
		if (oneIcon.getChoose())
		{
			//取消
			GameData.arrayDelItem(oneIcon.getSid(),this._chooseServants);
			oneIcon.setCheck();
		}
		else
		{
			//选择
			if (this._chooseServants.length == 30)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("newatkracecrossDespath_tipMax"));
			}
			else
			{
				this._chooseServants.push(oneIcon.getSid());
				oneIcon.setCheck();
			}
		}
		this.resetServantNum();
	}

	private resetServantNum():void
	{
		this._chooseNum.text = this.getChooseNumStr();
		if (this._chooseServants.length == 30)
		{
			App.DisplayUtil.changeToNormal(this._confirmBtn);
		}
		else
		{
			App.DisplayUtil.changeToGray(this._confirmBtn);
		}
	}

	private getDispachTimeStr():string
	{	
		let time:number = this._dispatchTime;
		if (time < 0) {
			time = 0;
		}
		return LanguageManager.getlocal("newatkracecross_time",[App.DateUtil.getFormatBySecond(time)]);
	}

	private getChooseNumStr():string
	{	
		return LanguageManager.getlocal("newatkracecrossDespathChoose",[String(this._chooseServants.length),"30"]);
	}

	public tick():void
	{	

		// if (this._dispatchTimeText) {
			this._dispatchTime--;
			// this._dispatchTimeText.text = this.getDispachTimeStr();

			if (this._dispatchTime < 0) {
				// this._dispatchTimeText.dispose();
				// this._dispatchTimeText = null;

				this._confirmBtn.visible = false;
				this._noTimeText.visible = true;
			}
		// }
	}

    public dispose():void
	{	
		this._dispatchTimeText = null;
		this._chooseNum = null;
        this._dispatchTime = 0;

		this._confirmBtn = null;
		this._noTimeText = null;
		this._chooseServants.length = 0;

		super.dispose();
	}
}