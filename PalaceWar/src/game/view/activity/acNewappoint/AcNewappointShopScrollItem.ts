/**
 * shop item
 */
class AcNewappointShopScrollItem extends ScrollListItem{
    private _aid:string = null;
    private _code:string = null;
    private _data:any = null;

    public constructor(){
        super();
    }

    public initItem(index:number, data:any, itemParam?:any){
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;

        let bg = BaseLoadBitmap.create("acmotherdayview_common_itembluebg");
        bg.width = 172;
        bg.height = 287;
        this.addChild(bg);

        let itemRewardVo = GameData.formatRewardItem(data.getReward)[0];
		let itemName = ComponentManager.getTextField(itemRewardVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, itemRewardVo.nameColor);
		itemName.setPosition(bg.x + bg.width / 2 - itemName.width / 2, bg.y + 42 - itemName.height / 2);
		this.addChild(itemName);

		let itemContainer = GameData.getItemIcon(itemRewardVo, true, false);
		itemContainer.setPosition(bg.x + bg.width / 2 - itemContainer.width / 2, bg.y + 58);
        this.addChild(itemContainer);
        
        let limitNum = data.limitTime - this.vo.getExchangeNum(data.id);
		if (limitNum < 0){
			limitNum = 0;
		}
		let limitTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointChangeNum", this.getTypeCode()), [String(limitNum)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
		limitTF.setPosition(bg.x + bg.width / 2 - limitTF.width / 2, bg.y + 190 - limitTF.height - 2);
        this.addChild(limitTF);
        
        //积分icon
		let iconScale = 0.35;
		let needIcon = BaseLoadBitmap.create(App.CommonUtil.getResByCode("acnewappoint_scoreitemicon", this.getTypeCode()));
		needIcon.width = 100;
		needIcon.height = 100;
		needIcon.setScale(iconScale);
		this.addChild(needIcon);

        //消耗积分
		let needTF = ComponentManager.getTextField(String(data.costScore), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this.addChild(needTF);
        
        let offestWidth = bg.width - needIcon.width * iconScale - needTF.width;
		needIcon.setPosition(bg.x + offestWidth / 2, bg.y + 202 - needIcon.height / 2 * iconScale);
		needTF.setPosition(needIcon.x + needIcon.width * iconScale, needIcon.y + needIcon.height / 2 * iconScale - needTF.height / 2);

        let shopBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acNewappointChangeBtnName", this.getTypeCode()), () => {
			if (!this.vo.isStart) {
				this.vo.showAcEndTip();
				return;
			}
            if (this.vo.getScore() < data.costScore) {
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acNewappointChangeTip", this.getTypeCode())));
                return;
			}
			
			NetManager.request(NetRequestConst.REQUEST_ACNEWAPPOINT_EXCHANGE, { activeId: this.vo.aidAndCode, shopId: data.id});
				
		}, this, null, null, null, TextFieldConst.COLOR_BLACK);
		shopBtn.setPosition(bg.x + bg.width / 2 - shopBtn.width / 2, bg.y + bg.height - 20 - shopBtn.height);
		this.addChild(shopBtn)
		if (limitNum <= 0) {
			shopBtn.setEnable(false);
		}
    }

    private get vo():AcNewappointVo{
        return <AcNewappointVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected get code():string{
		return this._code;
    }

    private get aid():string{
        return this._aid;
    }

    private getTypeCode():string{
        return this.code;
    }

    public getSpaceX():number{
        return 5;
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