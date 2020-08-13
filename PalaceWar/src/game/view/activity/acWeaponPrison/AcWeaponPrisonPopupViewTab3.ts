/**
 * 奖池预览
 * date 2020.6.15
 */
class AcWeaponPrisonPopupViewTab3 extends CommonViewTab{
    private _scrollList:ScrollList = null;

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    private get cfg() : Config.AcCfg.WeaponPrisonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcWeaponPrisonVo{
        return <AcWeaponPrisonVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    
    private get code():string{
        return this.param.data.code;
    }
    
    private get aid():string{
        return this.param.data.aid;
    }
    
    private getTypeCode():string{
        return this.param.data.uicode;
    }

    public initView():void{

        this.vo.isTouchPool = true;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_WEAPONPRISON_SETTYPE, this.requestCallback, this);

        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);

        let topBg = BaseBitmap.create("acgoodmatch_topbg");
        topBg.width = 520;
        topBg.height = 60;
        this.addChild(topBg);
        topBg.setPosition(bg.x + bg.width/2 - topBg.width/2, bg.y + 9);
        let topInfo = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonPoolTopInfo", this.getTypeCode())), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.width = 480;
        topInfo.lineSpacing = 5;
        topInfo.setPosition(topBg.x + 20, topBg.y + topBg.height/2 - topInfo.height/2);
        this.addChild(topInfo);

        let dataList = this.cfg.getPoolRewards();
        let rect = new egret.Rectangle(0, 0, 530, 615);
        let scrollList = ComponentManager.getScrollList(AcWeaponPrisonPopupScrollItem3, dataList, rect, {aid:this.aid, code:this.code, id: this.param.data.id,uicode:this.param.data.uicode});
        scrollList.setPosition(bg.x, topBg.y + topBg.height + 6);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    }

    private requestCallback(evt:egret.Event):void{
        if (!evt.data.ret){
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acWeaponPrisonPoolTip2", this.getTypeCode())));
    }

    private refreshView():void{
        let dataList = this.cfg.getPoolRewards();
        this._scrollList.refreshData(dataList, {aid: this.aid, code: this.code});
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_WEAPONPRISON_SETTYPE, this.requestCallback, this);
        
        this._scrollList = null;
        super.dispose();
    }
}