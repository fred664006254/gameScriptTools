class ZeroGiftPopupViewTab1 extends CommonViewTab {
    private hasInit = false;
    private buyBtn: BaseButton;
    constructor() {
        super();
        // this.initView();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }
    protected initView(): void {
        if (this.hasInit == false) {
            let X = this.x;
            this.hasInit = true;
            let des4888 = BaseBitmap.create("zerogift_des4888");
            des4888.x = -1//(GameConfig.stageWidth - des4888.width) / 2 - X//-9;
            des4888.y = 110;
            this.addChild(des4888);
            //龙骨动画组，第一个为头像
            let head = BaseBitmap.create("zerogift_headicon");
            head.x = 147, head.y = des4888.y + 190;
            this.addChild(head);
            //权势增幅
            let shili = BaseBitmap.create("zerogift_shili_40000");
            shili.x = (GameConfig.stageWidth - shili.width) / 2 - X;//150
            shili.y = 565//head.y + 270;
            this.addChild(shili);
            //六个物品，
            let rewardString = Config.ZerogiftCfg.getList(1),
                contentList: Array<RewardItemVo> = GameData.formatRewardItem(rewardString);//shopItemCfg.contentList;
            let _scroRect = new egret.Rectangle(0, 0, 380, 200);
            let _scrollList = ComponentManager.getScrollList(ZeroGiftItem, contentList, _scroRect);
            _scrollList.x = 104;
            _scrollList.y = shili.y + 42;
            this.addChild(_scrollList);

            let buyBtn = ComponentManager.getButton(("acredlotuswarrior_btn-1"), `zeroprice_${4888}`, this.touchBtn, this, null, null, TextFieldConst.FONTSIZE_TITLE_BIG);
            buyBtn.x = 151; buyBtn.y = 825;
            this.addChild(buyBtn);
            this.buyBtn = buyBtn;
            buyBtn.setColor(TextFieldConst.COLOR_BTN_YELLOW);

            App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
            let zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
            if (zeroGift) {
                if (zeroGift["flags"]['1'] >= 1) {
                    buyBtn.setText("atkrace_buy_already");
                    buyBtn.setEnable(false);
                    buyBtn.removeTextIcon();
                } else {
                    buyBtn.addTextIcon("public_icon1", 1);
                }
            }
        }

    }
    public touchBtn() {
        let view: ZeroGiftPopupView = <ZeroGiftPopupView>ViewController.getInstance().getView("ZeroGiftPopupView");
        view.toBuy('1', 4888);
    }
    public receiveData(event) {
        //购买成功，按键置灰，
        let zeroGift = Api.otherInfoVoApi.getOtherInfo().info["zeroGift"];
        if (zeroGift) {
            if (zeroGift["flags"]['1'] >= 1) {
                this.buyBtn.setText("atkrace_buy_already");
                this.buyBtn.setEnable(false);
                this.buyBtn.removeTextIcon();
            }
        }
    }
    public dispose() {
        super.dispose();
        this.buyBtn = null;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_BUY_ZEROGIFT, this.receiveData, this);
        this.hasInit = false;
    }
}