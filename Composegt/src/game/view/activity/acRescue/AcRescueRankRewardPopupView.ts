/**
 * 排名奖励
 * author dky
 * date 2017/11/22
 * @class AcPunishRankRewardPopupView
 */
class AcRescueRankRewardPopupView extends PopupView
{
	// 滑动列表
	private _scrollList: ScrollList;
	private _scrollList2: ScrollList;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _curTabIdx=0;

	private _acData :any;

	private _acCDTxt: BaseTextField = null;
	private _acVo :AcRescueVo;
	// private _punishRewardList: any = {};
	private _myRankTF:BaseTextField;
	private _allianceRankTF:BaseTextField;
	private _myBtn:BaseButton;
	private _aBtn:BaseButton;
	static aid:string ="";
	static code:string="";
	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		this._acData = this.param.data.acData;
		this._acVo = <AcRescueVo>Api.acVoApi.getActivityVoByAidAndCode(AcRescueRankRewardPopupView.aid,AcRescueRankRewardPopupView.code);

		// let tabName = ["acPunishRankRewardTab1"];
		// let tabName = ["acPunishRankRewardTab1","acPunishRankRewardTab2"];
        // if(Api.switchVoApi.checkPunishAllianceRank()){
        //    tabName = ["acPunishRankRewardTab1"];
        // }
        // let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        // tabbarGroup.x = 35;
        // tabbarGroup.y = 15;
        // this.addChildToContainer(tabbarGroup);

		let contentBg = BaseBitmap.create("public_tc_bg01");
		contentBg.width = 540;
        contentBg.height = 685;
        contentBg.x = this.viewBg.width/2 - contentBg.width/2;
        contentBg.y = 53;
        this.addChildToContainer(contentBg);
		


		let bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = contentBg.width - 20;
        bottomBg.height = 110;
        bottomBg.x = contentBg.x + 10;
        bottomBg.y = contentBg.y + contentBg.height- 125;
        this.addChildToContainer(bottomBg);

		let rankV = "10000+";
        let addV = 0;
        if(this._acData.myrank.myrank)
        {
            rankV = String(this._acData.myrank.myrank);
            addV = this._acData.myrank.value;
        }
		let myRankStr = LanguageManager.getlocal("acPunishMyrank1",[rankV]);
		this._myRankTF = ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._myRankTF.x = bottomBg.x + 25;
		this._myRankTF.y = bottomBg.y + 15;
		this.addChildToContainer(this._myRankTF);


		let rankV2 = LanguageManager.getlocal("nothing");
        let addV2 = 0;
        if(this._acData.amyrank.myrank)
        {
            rankV2 = String(this._acData.amyrank.myrank);
            addV2 = this._acData.myrank.value;
        }
		let myRankStr2 = LanguageManager.getlocal("acPunishMyrank2",[rankV2]);
		this._allianceRankTF = ComponentManager.getTextField(myRankStr2, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._allianceRankTF.x = bottomBg.x + 25;
		this._allianceRankTF.y = bottomBg.y + 15;
		this.addChildToContainer(this._allianceRankTF);
		this._allianceRankTF.visible = false;

		this._acCDTxt =  ComponentManager.getTextField(myRankStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		this._acCDTxt.x = bottomBg.x + 220;
		this._acCDTxt.y = bottomBg.y + 15;
		this.addChildToContainer(this._acCDTxt);
		//初始化 时间
		let acCfg = Config.AcCfg.getCfgByActivityIdAndCode(AcRescueRankRewardPopupView.aid, AcRescueRankRewardPopupView.code);
		let deltaT = this._acVo.et - GameData.serverTime - 86400*acCfg.extraTime;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}



		this._myBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acPunishRankTab1",this.rankBtnClick,this);
		this._myBtn.x = this._myRankTF.x;
		this._myBtn.y = this._myRankTF.y + this._myRankTF.height + 13;
		// this._myBtn.
		this.addChildToContainer(this._myBtn);
		// this._myBtn.setColor(TextFieldConst.COLOR_BLACK);

		this._aBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"acPunishRankTab2",this.rankBtnClick2,this);
		this._aBtn.x = this._myRankTF.x;
		this._aBtn.y = this._myRankTF.y + this._myRankTF.height + 13;
		// this._aBtn.
		this.addChildToContainer(this._aBtn);
		// this._aBtn.setColor(TextFieldConst.COLOR_BLACK);
		this._aBtn.visible = false;

		
		let sendDesc = ComponentManager.getTextField(LanguageManager.getlocal("acRanktip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
		sendDesc.x = 230;
		sendDesc.y = bottomBg.y + 60;
		this.addChildToContainer(sendDesc);

		let dataList =new Array<any>();
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(AcRescueRankRewardPopupView.aid, AcRescueRankRewardPopupView.code);
		for (var index = 1; index < 9; index++) {
			dataList.push(cfg.personRank[index.toString()]);
			
		}

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,520,contentBg.height - 147);
		this._scrollList = ComponentManager.getScrollList(AcPunishRankRewardScrollItem,dataList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(contentBg.x + 10 ,contentBg.y + 10);

		this._scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )

		// let rect = egret.Rectangle.create();
		// rect.setTo(0,0,508,contentBg.height - 20);

		let dataList2 =new Array<any>();
		for (var index = 1; index < 9; index++) {
			if(cfg.allianceRank[index.toString()]){
				dataList2.push(cfg.allianceRank[index.toString()]);
			}
			
			
		}

		let rect2 = egret.Rectangle.create();
		rect2.setTo(0,0,520,contentBg.height -147);
		this._scrollList2 = ComponentManager.getScrollList(AcPunishRankAllianceRewardScrollItem,dataList2,rect2);
		this.addChildToContainer(this._scrollList2);
		this._scrollList2.setPosition(contentBg.x+ 10 ,contentBg.y + 10);
		this._scrollList2.visible = false;
		this._scrollList2.setEmptyTip(LanguageManager.getlocal("acPunishNoData") )

	}

	protected setTabBarPosition():void
	{

		this.tabbarGroup.setSpace(15);
		let tabX:number=0;
		let tabY:number=0;

		tabX=this.viewBg.x+43;
		tabY=this.viewBg.y+60;

		
		tabY+=this.getTabbarGroupY();;
		this.tabbarGroup.setPosition(tabX,tabY);

	}
	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}
    protected getTitleStr():string{
		return "acPunishRankRewardPopupViewTitle";
	}
	protected getTabbarTextArr():string[]
	{
		// let tabName = ["acPunishRankRewardTab1"];
		let tabName = ["acPunishRankRewardTab1","acPunishRankRewardTab2"];
        if(Api.switchVoApi.checkPunishAllianceRank()){
           tabName = ["acPunishRankRewardTab1"];
        }
		return tabName;
	}

	private rankBtnClick()
	{
		AcRescueRankPopupView.aid = AcRescueRankRewardPopupView.aid;
		AcRescueRankPopupView.code = AcRescueRankRewardPopupView.code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUERANKPOPUPVIEW);
	}
	private rankBtnClick2()
	{
		AcRescueRankPopupView.aid = AcRescueRankRewardPopupView.aid;
		AcRescueRankPopupView.code = AcRescueRankRewardPopupView.code;
		ViewController.getInstance().openView(ViewConst.POPUP.ACRESCUERANKPOPUPVIEW_TAB1);
		
	}

	public tick(): boolean {
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(AcRescueRankRewardPopupView.aid, AcRescueRankRewardPopupView.code);
		let deltaT = this._acVo.et - GameData.serverTime - 86400*cfg.extraTime;
		if (this._acCDTxt && deltaT > 0) {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
			return true;
		} else {
			this._acCDTxt.text = LanguageManager.getlocal("acFourPeople_acCD", [LanguageManager.getlocal("acFourPeoplea_acCDEnd")]);
		}
		return false;
	}

	protected clickTabbarHandler(params:any)
    {
		super.clickTabbarHandler(this);
        this._curTabIdx = params.index
        this.refreshRankList();
    }
    protected refreshRankList()
    {

		let dataList = this._acData.rankList;
        if(this._curTabIdx == 0){
           this._scrollList.visible = true;
		   this._scrollList2.visible = false;
		   this._aBtn.visible = false;
		   this._myBtn.visible = true;
		   this._myRankTF.visible = true;
		   this._allianceRankTF.visible = false;
        }
        else{
           
		   this._scrollList.visible = false;
		   this._scrollList2.visible = true;
		   this._aBtn.visible = true;
		   this._myBtn.visible = false;
		   this._myRankTF.visible = false;
		   this._allianceRankTF.visible = true;
            
        }
	}


	public hide():void
	{
		super.hide();
	}


	public dispose():void
	{

		
		// 未婚滑动列表
		this._scrollList = null;
		this._scrollList2 = null;

		this._myBtn = null;
		this._myRankTF = null;
		this._aBtn = null;
		this._allianceRankTF = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._acVo = null;
		super.dispose();
	}
}