/**
 * 邀请好友规则说明
 * author qianjun
 * 
 */
class InviteFriendRulePopupView extends PopupView{

	public constructor() {
		super();
    }

	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
		return null;
    }

    protected getTitleBgName():string{
        return null;
    }
    
    // 背景图名称
    protected getBgName():string
    {
        return "invitefriendtipbg";
    }

	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
    }

    protected resetBgSize():void{
        let view = this;
		super.resetBgSize();
		let cfg = Config.InvitefriendCfg;
        view.closeBtn.x = view.viewBg.x + view.viewBg.width - view.closeBtn.width + 18;
		view.closeBtn.y = view.viewBg.y - 8;

		let tipBg = BaseBitmap.create(`invitefriendtiptop`);
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipBg, view.container, [-10,15], true);
		view.addChildToContainer(tipBg);

		let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysTip`), TextFieldConst.SIZE_32, 0xFEFEFE);
		tipTxt.stroke = 2;
		tipTxt.strokeColor = 0x822800;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, tipBg, [0,10]);
		view.addChildToContainer(tipTxt);

		let descTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendRuleTip`, [cfg.getInvitePoint1()+""]), TextFieldConst.SIZE_22, 0x355D94);
		descTxt.stroke = 0;
		descTxt.lineSpacing = 13;
		descTxt.width = 470;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, tipBg, [62,tipBg.height+19]);
		view.addChildToContainer(descTxt);

		let descBg = BaseBitmap.create(`ab_bird_infoattrbg`);
		descBg.width = 500;
		descBg.height = 212;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descBg, descTxt, [0,descTxt.height+22]);
		view.addChildToContainer(descBg);

		let descGroup = new BaseDisplayObjectContainer();
		descGroup.width = descBg.width;

		let task2 = cfg.getInvitePoint(2);
		let task3 = cfg.getInvitePoint(3);
		let task4 = cfg.getInvitePoint(4);
		let detailTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendRuleDesc`, [task2, task3, task4]), TextFieldConst.SIZE_22, 0xFFFFFF);
		detailTxt.stroke = 2;
		detailTxt.strokeColor = 0x000000;
		detailTxt.lineSpacing = 13;
		detailTxt.width = 360;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, detailTxt, descGroup, [14,26]);
		descGroup.addChild(detailTxt);

		let fillBg = BaseBitmap.create("public_alphabg");
		fillBg.width = descGroup.width;
		fillBg.height = descGroup.height;
		descGroup.addChild(fillBg);

		let scrollView = ComponentMgr.getScrollView(descGroup, new egret.Rectangle(0,0,descBg.width,descBg.height-10));
		view.addChildToContainer(scrollView);
		scrollView.bounces = false;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollView, descBg);

		let conbtn = ComponentMgr.getButton(ButtonConst.BTN_CONFIRM, LangMger.getlocal(`sysconfirm`), view.hide, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, conbtn, descBg, [0,descBg.height+15]);
		view.addChildToContainer(conbtn);
    }

    
	public dispose():void{
        let view = this;
		super.dispose();
	}
}