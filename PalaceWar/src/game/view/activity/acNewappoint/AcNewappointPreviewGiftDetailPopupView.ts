/**
 * 新服预约礼包详情
 * author ycg
 * date 2020.6.29
 * @class AcNewappointPreviewGiftDetailPopupView
 */
class AcNewappointPreviewGiftDetailPopupView extends PopupView{

    public constructor(){
        super();
    }

    public getBgName():string{
        return App.CommonUtil.getResByCode("acnewappoint_giftdetailbg", this.getUiCode());
    }

    public getTitleStr():string{
        return null;
    }

    public initView():void{
        let titleBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_giftdetailtitle", this.getUiCode()));
        titleBg.setPosition(this.viewBg.x + this.viewBg.width/2 - titleBg.width/2, this.viewBg.y + 10);
        this.addChildToContainer(titleBg);

        let rewards = this.param ? this.param.data.rewards : "";
        let rewardArr = GameData.getRewardItemIcons(rewards, true, true);
        let itemW = 108;
        let itemH = 108;
        let itemScale = 0.7;
        let itemSpceX = 10;
        // let stX = 65 + (428 - rewardArr.length * (itemW * itemScale + itemSpceX) + itemSpceX)/2;
        let stX = this.viewBg.x + this.viewBg.width/2 - (rewardArr.length * (itemW * itemScale + itemSpceX) + itemSpceX)/2 +10;
        for (let i=0; i < rewardArr.length; i++){
            let item = rewardArr[i];
            item.setScale(itemScale);
            item.setPosition(stX + i * (itemW * itemScale + itemSpceX), this.viewBg.y + 240);
            this.addChildToContainer(item);
        }

        let infoBg = BaseBitmap.create(App.CommonUtil.getResByCode("acnewappoint_toptxtbg", this.getUiCode()));
        infoBg.setPosition(this.viewBg.x + this.viewBg.width/2 - infoBg.width/2, this.viewBg.y + 360);
        this.addChildToContainer(infoBg);

        let infoStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointPreviewGiftDetailInfo", this.getUiCode()));
        if (this.param && this.param.data.infoStr){
            infoStr = this.param.data.infoStr;
        }
        let info = ComponentManager.getTextField(infoStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        info.setPosition(infoBg.x + infoBg.width/2 - info.width/2, infoBg.y + infoBg.height/2 - info.height/2);
        this.addChildToContainer(info);

        let enterBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "confirmBtn", this.hide, this, null, null, null, TextFieldConst.COLOR_BLACK);
        enterBtn.setPosition(this.viewBg.x + this.viewBg.width/2 - enterBtn.width/2, this.viewBg.y + this.viewBg.height - enterBtn.height - 5);
        this.addChildToContainer(enterBtn);
    }

    protected resetBgSize():void{
        super.resetBgSize();
        this.closeBtn.x = this.viewBg.x + this.viewBg.width - this.closeBtn.width - 20;
        this.closeBtn.y = this.viewBg.y + 65;
        if (this._hudieClip){
            this._hudieClip.x = this.closeBtn.x-45;
			this._hudieClip.y = this.closeBtn.y-45;
        }
    }

    protected get code():string{
		return this.param ? this.param.data.code : "";
    }

    protected get aid():string{
        return this.param?this.param.data.aid:"";
    }

    private getUiCode():string{
        return this.code;
    }

    public getResourceList():string[]{
        return super.getResourceList().concat([
            "acnewappoint_giftdetailbg-1", "acnewappoint_giftdetailtitle-1",
            "acnewappoint_giftdetailbg-"+this.getUiCode(), "acnewappoint_giftdetailtitle-"+this.getUiCode(),
        ]);
    }

    public dipose():void{

        super.dispose();
    }
}