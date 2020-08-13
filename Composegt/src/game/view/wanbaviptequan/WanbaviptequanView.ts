class WanbaviptequanView extends  PopupView {


	private _scrollList: ScrollList = null; 
	private _fourPeopleInfoVoList =null;

	private _activityTimerText: BaseTextField = null;
	private _acCDTxt: BaseTextField = null;
	private _ruleText: BaseTextField = null;
	private _inOrderText: BaseTextField = null;

	/** 当前vip */
	public static currentVip = 5;

	public constructor() {
		super();
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat([ 
			"strengthen_button","activity_db_01","wanbaviptequanbanner","activity_charge_red"
			,"wanbaviptequanicon0"
			,"wanbaviptequanicon1"
			,"wanbaviptequanicon2"
			,"wanbaviptequanicon3"
			,"wanbaviptequanicon4"
			,"wanbaviptequanicon5"
			,"wanbaviptequanicon6"
		]);
	}

	protected initView(): void 
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD),this.getRewardHandler,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetPushConst.PUSH_PAY),this.refreshVipLevel,this);
		let bg = BaseBitmap.create("public_tc_bg01");
		bg.width = 538;
	    bg.height = 735;
       	bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 9;
		this.addChildToContainer(bg);
		let banner = BaseBitmap.create("wanbaviptequanbanner");
       	banner.x = this.viewBg.x + this.viewBg.width/2 - banner.width/2;
		banner.y = 13;
		this.addChildToContainer(banner);
		this.showList(); 


        let currentDesc = ComponentManager.getTextField(LanguageManager.getlocal("wanbaviptequanCurrentDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        currentDesc.x = banner.x + 90
        currentDesc.y = banner.y + 77 - currentDesc.height / 2;
		this.addChildToContainer(currentDesc);
        let desc2 = ComponentManager.getTextField(LanguageManager.getlocal("wanbaviptequanDesc2"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        desc2.x = banner.x + 90
        desc2.y = banner.y + 107 - desc2.height / 2;
		this.addChildToContainer(desc2);

		let vipIcon:BaseBitmap = BaseBitmap.create("wanbaviptequanicon" + (WanbaviptequanView.currentVip));
        vipIcon.x = currentDesc.x + currentDesc.width + 10;
        vipIcon.y = banner.y + 77 - vipIcon.height/2;
		this.addChildToContainer(vipIcon);

        let rechargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "gotocharge",this.rechargeBtnClick,this);
		rechargeBtn.setScale(0.7);
        rechargeBtn.x = banner.x + 453 - rechargeBtn.width/2 * rechargeBtn.scaleX;
        rechargeBtn.y = banner.y + 107 - rechargeBtn.height/2 * rechargeBtn.scaleY;
        this.addChildToContainer(rechargeBtn);

	}
	 
	private showList(): void {
 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,515,560);
		this._scrollList = ComponentManager.getScrollList(WanbaviptequanCell,[1,2,3,4,5,6],rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(50,165); 
	}
 
    // 获得奖励
	private getRewardHandler(event:egret.Event)
	{
        if (event.data.data.cmd === NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD) {
            if (event.data.data.ret === 0) {                
				let rewardList =  GameData.formatRewardItem(event.data.data.data.rewards);				
				App.CommonUtil.playRewardFlyAction(rewardList);
            } else {
                App.CommonUtil.showTip(event.data.data.ret);
            }
        }
		this._scrollList.refreshData([1,2,3,4,5,6]);
	}
	private refreshVipLevel() {

		if (PlatformManager.checkIsWanbaSp() && Api.switchVoApi.checkOpenWanbaviptequan()) {
			if (PlatformManager.checkIsUseSDK() && RSDKHelper.isInit) {
				RSDKHelper.getWanbaviptequanLevel((vipLevel) => {
					WanbaviptequanView.currentVip = parseInt(vipLevel);
					this._scrollList.refreshData([1,2,3,4,5,6]);
				});
			}
		}
	}
	private rechargeBtnClick () {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
	}
	public dispose(): void 
	{
	 	 
		App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshVipLevel,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_OTHERINFO_GETWBVIPGIFTREWARD),this.getRewardHandler,this);
		super.dispose();
	}

}