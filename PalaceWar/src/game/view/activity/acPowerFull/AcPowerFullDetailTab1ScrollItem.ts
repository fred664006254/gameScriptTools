/**
 * shop item
 */
class AcPowerFullDetailTab1ScrollItem extends ScrollListItem{
    private _aid:string = null;
    private _code:string = null;
    private _data:any = null;

    public constructor(){
        super();
    }

    private get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcPowerFullVo{
        return <AcPowerFullVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

    public initItem(index:number, data:any, itemParam?:any){
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;

        let bg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
        bg.width = 172;
        bg.height = 287;
        this.addChild(bg);
        this.width = bg.width + this.getSpaceX();

        let itemRewardVo = GameData.formatRewardItem(data.getReward)[0];
		let itemName = ComponentManager.getTextField(itemRewardVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemRewardVo.nameColor);
		itemName.setPosition(bg.x + bg.width / 2 - itemName.width / 2, bg.y + 42 - itemName.height / 2);
		this.addChild(itemName);

		let itemContainer = GameData.getItemIcon(itemRewardVo, true, false);
		itemContainer.setPosition(bg.x + bg.width / 2 - itemContainer.width / 2, bg.y + 58);
        this.addChild(itemContainer);
        
        let limitNum = data.limitTime - this.vo.getShopBuyNum(data.id);
		if (limitNum < 0){
			limitNum = 0;
		}
		let limitTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDetailShopLimit", this.getTypeCode()), [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		limitTF.setPosition(bg.x + bg.width / 2 - limitTF.width / 2, bg.y + 190 - limitTF.height - 2);
        this.addChild(limitTF);

        if (data.discount) {
			let tag = BaseBitmap.create('shopview_corner');
			tag.setPosition(itemContainer.x, itemContainer.y);
			this.addChild(tag);

			let tagTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode('acPowerFullDetailShopDiscount', this.getTypeCode()), [String(data.discount)]), 18, TextFieldConst.COLOR_WARN_YELLOW);
			if (PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp()) {
                let tagnum = Math.floor(10 - data.discount);
				tagTxt.text = LanguageManager.getlocal(App.CommonUtil.getCnByCode('acPowerFullDetailShopDiscount', this.getTypeCode()), [String(tagnum * 10)])
			}
			tagTxt.width = 70;
			tagTxt.height = 20;
			tagTxt.textAlign = egret.HorizontalAlign.CENTER;
			tagTxt.anchorOffsetX = tagTxt.width / 2;
			tagTxt.anchorOffsetY = tagTxt.height / 2;
			App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tagTxt, tag, [-tagTxt.anchorOffsetX + 24, -tagTxt.anchorOffsetY + 22]);
			tagTxt.rotation = -45;
			this.addChild(tagTxt);
		}
        
        //积分icon
		let iconScale = 0.8;
		let needIcon = BaseBitmap.create("public_icon1");
		needIcon.setScale(iconScale);
		this.addChild(needIcon);

        //消耗积分
		let needTF = ComponentManager.getTextField(String(data.costMoney), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(needTF);
        
        let offestWidth = bg.width - needIcon.width * iconScale - needTF.width;
		needIcon.setPosition(bg.x + offestWidth / 2, bg.y + 202 - needIcon.height / 2 * iconScale);
		needTF.setPosition(needIcon.x + needIcon.width * iconScale, needIcon.y + needIcon.height / 2 * iconScale - needTF.height / 2);

        let shopBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acPowerFullDetailShopBuy", this.getTypeCode()), () => {
			if (!this.vo.isStart) {
				this.vo.showAcEndTip();
				return;
			}
            if (Api.playerVoApi.getPlayerGem() < data.costMoney) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acPowerFullDetailMoneyNotEnough", this.getTypeCode())));
                return;
			}
			
			NetManager.request(NetRequestConst.REQUEST_ACPOWERFULL_SHOPBUY, { activeId: this.vo.aidAndCode, shopId: data.id});
		}, this, null, null, null, TextFieldConst.COLOR_BLACK);
		shopBtn.setPosition(bg.x + bg.width / 2 - shopBtn.width / 2, bg.y + bg.height - 20 - shopBtn.height);
		this.addChild(shopBtn)
		if (limitNum <= 0) {
			shopBtn.setEnable(false);
		}
    }

    public getSpaceX():number{
        return 4;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._aid = null;
        this._code = null;
        this._data = null;

        super.dispose();
    }
}