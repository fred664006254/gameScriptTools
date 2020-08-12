/*
 *@description: 每日签到
 *@author: yangtao 
 *@update date: 2020-06-4 09:46:37
 *@version 
 */

class SingInPopupView extends PopupView
{
	private signInfoList = [];
	private listView:ScrollList;
	private titleCon:BaseDisplayObjectContainer;
	private buyBtn;
	private treasureBox:BaseBitmap;
	private signGet:BaseBitmap;
	private signMask:BaseBitmap;
	private _dbxq : BaseLoadDragonBones = null;
	private dbxqGroup:BaseDisplayObjectContainer;

	public constructor() 
	{
		super();
	}

	 protected getNetConstEventArr():string[]{
		return [
			NetConst.SIGNINFO_SIGN
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.SIGNINFO_SIGN:
                view.signCom(evt);
                break;
		}
    }

	protected initView():void
	{	
		this.initsignInfo();
		//App.MsgHelper.addEvt(NetConst.SIGNINFO_SIGN, this.refreshList, this);
		this.listView = ComponentMgr.getScrollList(SingInItem, this.signInfoList, new egret.Rectangle(0, 0, 522, 402),6);
		this.listView.bounces = false;
		this.listView.horizontalScrollPolicy = `off`;
        this.listView.verticalScrollPolicy = `off`;
		this.listView.width = 522;
		this.listView.height = 402;

		this.addChildToContainer(this.listView);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, this.listView,this.viewBg,[6,91]);

		this.treasureBox = BaseBitmap.create(Api.SigninfoVoApi.getSignWeek()?"singin_14":"singin_7");
		this.addChildToContainer(this.treasureBox);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.treasureBox,this.viewBg,[0,123]);
		this.treasureBox.touchEnabled = true;
		this.treasureBox.addTouchTap(this.signBox, this);

		this.signMask = BaseBitmap.create("singin_mask_2");
		this.addChildToContainer(this.signMask);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.signMask,this.viewBg,[0,123]);
		this.signMask.visible = false;

		this.signGet = BaseBitmap.create("singin_seven_get");
		this.addChildToContainer(this.signGet);
		App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom,this.signGet,this.treasureBox);
		this.signGet.visible = false;

		this.dbxqGroup = new BaseDisplayObjectContainer();
		this.dbxqGroup.width = 520;
		this.dbxqGroup.height = 217;
		this.addChildToContainer(this.dbxqGroup);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.dbxqGroup,this.viewBg,[0,113]);
		this.dbxqGroup.mask = new egret.Rectangle(0,0,this.dbxqGroup.width,this.dbxqGroup.height);
		//if(Api.SigninfoVoApi.isSignWeek()&&(Api.SigninfoVoApi.getSignHsa())){
			this._dbxq = App.DragonBonesUtil.getLoadDragonBones(`royalpass_lb_2`);
            this._dbxq.scaleX = 0.65;
			this._dbxq.scaleY = 0.85;
            this._dbxq.blendMode = egret.BlendMode.ADD;
            this.dbxqGroup.addChild(this._dbxq);
            this._dbxq.setPosition(280,100);
            this._dbxq.visible = true;
		//}

		this.buyBtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal(`menu_sing_in`), this.signBtn, this.viewBg);
        this.addChildToContainer(this.buyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.buyBtn, this.viewBg, [0,38]);
		this.reSignBtn();
		
	}

	private reSignBtn():void{
		if(Api.SigninfoVoApi.gethasSign()){
			App.DisplayUtil.changeToGray(this.buyBtn);
			this.buyBtn.touchEnabled = false;
		}else{
			this.buyBtn.touchEnabled = true;
		}
		if(Api.SigninfoVoApi.getSignSeven()){
			this.signMask.visible = true;
			this.signGet.visible = true;
			this.treasureBox.touchEnabled = false;
			if(this._dbxq){
            	this._dbxq.visible = false;
        	}
		}

		
	}

	protected initBg(){
		super.initBg();
		//this.viewBg.width = this.getShowWidth();
		
	}
	private refreshList(){
		this.signInfoList = Api.SigninfoVoApi.getSignData();
		if(this.listView != null){
			this.listView.refreshData(this.signInfoList);
		}

	}

	public getResourceList(){
		return super.getResourceList().concat(["singin_bg", 
		"singin_tittle","singin_get_bg",
		"singin_geting_bg","singin_get",
		"singin_14","singin_7",
		"singin_light","singin_seven_get",
		"singin_mask_1","singin_mask_2"])
	}

	private signBox():void{
		if(Api.SigninfoVoApi.isSignWeek()&&Api.SigninfoVoApi.getSignHsa()){
			NetManager.request(NetConst.SIGNINFO_SIGN, {});
		}else{
			let freerewardvo = GameData.formatRewardItem(Api.SigninfoVoApi.getShowWordData())[0];
			ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW, {
                  title : LangMger.getlocal(Api.SigninfoVoApi.getSignWeek()?"boxname_1003":"boxname_1004"),
                  handler : this,
                  needCancel : true,
                  needClose : 1,
                  boxId : freerewardvo.id,
                  isbuy : false,
                });
		}
	}
	protected getRequestData():{requestType:string,requestData:any}
	{
		return null;
	}
	private initsignInfo(){
		this.signInfoList = Api.SigninfoVoApi.getSignData();
	}
	protected getShowHeight():number
	{
		return 838;
	}
	protected getshowwidth():number
	{
		return 565;
	}

	// 背景图名称
    protected getBgName():string
    {
        return "singin_bg";
    }
	protected initTitle(){

	}
	protected resetBgSize():void{
		super.resetBgSize();
		this.titleCon = new BaseDisplayObjectContainer();
		this.addChild(this.titleCon);
		let timeBg = BaseBitmap.create("singin_tittle");
		this.titleCon.addChild(timeBg);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg,this.viewBg,[0,5]);

		let titleText = ComponentMgr.getTextField('11', TextFieldConst.SIZE_32,ColorEnums.white);
		titleText.text = LangMger.getlocal(`menu_sing_in_title`);
		titleText.stroke = 2;
		titleText.strokeColor = 0x890F0F;
		this.titleCon.addChild(titleText);

		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleText,timeBg,[0,-5]);
		App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, this.closeBtn, this.viewBg,[-2,-2]);
	}

	private signBtn():void
	{
		Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
		NetManager.request(NetConst.SIGNINFO_SIGN, {});
	}

	private signCom(event):void{
		let view = this;
		let data = event.data.data.data;
		let rewards = data.rewards;
        let ret = event.data.ret;
		this.refreshList();
		this.reSignBtn();
		let freerewardvo = GameData.formatRewardItem(Api.SigninfoVoApi.getReWordData())[0];
		if(freerewardvo.type == 50){
			ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
				rewards : rewards,
				title : LangMger.getlocal(`sysGetReward`),
				isBoxBuy : false,//连续购买模式
				specialBoxId : freerewardvo.id,
				handler : this,
				needCancel : true,
				closecallback : ()=>{
					App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
				},
			}); 
		}else{
			ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
				rewards : rewards,
				title : LangMger.getlocal(`sysGetReward`),
				handler : view,
				callback : ()=>{
					App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
				},
				closecallback : ()=>{
					App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
				},
			}); 
		}

	}
	public dispose():void
	{
		//App.MsgHelper.removeEvt(NetConst.SIGNINFO_SIGN, this.refreshList, this);
		this.listView = null;
		this.signInfoList = [];
		if(this._dbxq){
            this._dbxq.dispose();
            this._dbxq = null;
        }
		super.dispose();
	}

}