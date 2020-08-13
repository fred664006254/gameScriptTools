/**
 * 排行列表节点
 */
class AcConquerMainLandServantInfoListItem extends ScrollListItem {
    private _code: string = '';
    public constructor() {
        super();
    }

    private get cfg(): Config.AcCfg.ConquerMainLandCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo(): AcConquerMainLandVo {
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId(): string {
        return `${this.aid}-${this.code}`;
    }

    private get aid(): string {
        return AcConst.AID_CONQUERMAINLAND;
    }

    private get code(): string {
        return this._code;
    }

    protected getUiCode(): string {
        let code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }

    private servantInfo: ServantInfoVo = null;
    private _name: BaseTextField = null;
    private _add: BaseTextField = null;
    private _total: BaseTextField = null;

    protected initItem(index: number, data: any, item: any) {
        this._code = item.code;
        this.width = 600;
        this.height = 50;  //rankbg_1

        this.servantInfo = Api.servantVoApi.getServantObj(data);

        let tarColor = TextFieldConst.COLOR_BROWN_NEW;

        let pos = item.pos[0];
        let rankTxt = ComponentManager.getTextField(this.servantInfo.servantName, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        rankTxt.x = pos.x + (pos.width - rankTxt.width) / 2 - 25;
        rankTxt.y = this.height / 2 - rankTxt.height / 2;
        this.addChild(rankTxt);
        this._name = rankTxt;


        pos = item.pos[1];
        let nameTxt = ComponentManager.getTextField(App.StringUtil.changeIntToText3(this.vo.extraAttr[data] || 0) , TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        nameTxt.x = pos.x + (pos.width - nameTxt.width) / 2 - 25;
        nameTxt.y = this.height / 2 - nameTxt.height / 2;;
        this.addChild(nameTxt);
        this._add = nameTxt;

        pos = item.pos[2];
        let extraStren = (this.vo.extraAttr[data] || 0) * this.vo.getPowerAddBuff();
        let str = LanguageManager.getlocal('acConquerMainLandServantNumWithAdd', [App.StringUtil.changeIntToText3((Number(this.servantInfo.total)+ Number(extraStren)))+'', App.StringUtil.changeIntToText3(extraStren) + ''])
        let serverTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, tarColor)
        serverTxt.x = pos.x + (pos.width - serverTxt.width) / 2 - 25;
        serverTxt.y = nameTxt.y;
        this.addChild(serverTxt);

        this._total = serverTxt;



        let line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y = this.height - line.height;
    }


    public refreshData(data: any) {
        this.servantInfo = Api.servantVoApi.getServantObj(data);
        this._name.text = this.servantInfo.servantName;
        this._add.text = this.vo.extraAttr[data] || 0;
        let extraStren = (this.vo.extraAttr[data] || 0) * this.vo.getPowerAddBuff();
        let str = LanguageManager.getlocal('acConquerMainLandServantNumWithAdd', [this.servantInfo.total + extraStren + '', extraStren + ''])
        this._total.text = str
    }

	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 0;
    }
    public dispose(): void {
        this.servantInfo = null;
        this._name = null;
        this._add = null;
        this._total = null;
        super.dispose();
    }
}
