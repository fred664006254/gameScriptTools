/**
 * 携美同游 场景剧情
 * author ycg
 * date 2019.11.4
 * @class AcTravelWithBeautyScenePopupView
 */
class AcTravelWithBeautyScenePopupView extends PopupView{
    private _callback:Function = null;
    private _obj:any = null;

    public constructor(){
        super();
    }

    public initView():void{
        let bgName = this.param.data.bgName;
        let msgKey = this.param.data.msgKey;
        this._callback = this.param.data.callback;
        this._obj = this.param.data.obj;

        let bgStr = ResourceManager.hasRes(bgName) ? bgName : "actravelwithbeauty_scenebg-1";
        let bg = BaseLoadBitmap.create(bgStr);
        bg.width = 548;
        bg.height = 375;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);

        let vo = < AcTravelWithBeautyVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        let skinId = vo.getShowWifeSkinId();
        let skinCfg = Config.WifeskinCfg.getWifeCfgById(skinId);
        let wife = BaseLoadBitmap.create(skinCfg.body);
        wife.width = 640;
        wife.height = 840;
        wife.setScale(0.4);
        wife.anchorOffsetY = wife.height;
        wife.anchorOffsetX = wife.width / 2;
        wife.x = bg.x + bg.width / 2;
        wife.y = bg.y + bg.height;
        this.addChildToContainer(wife);

        let taoxinFullParticle = App.ParticleUtil.getParticle("taoxin");
        taoxinFullParticle.x = -200;
        taoxinFullParticle.y = -20;
        taoxinFullParticle.scaleX = 0.7;
        taoxinFullParticle.scaleY = 0.7;
        taoxinFullParticle.start();
        this.addChildToContainer(taoxinFullParticle);

        let bottomTxt = ComponentManager.getTextField(LanguageManager.getlocal(msgKey), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        bottomTxt.width = bg.width - 40;
        bottomTxt.lineSpacing = 5;
        bottomTxt.setPosition(bg.x + bg.width/2 - bottomTxt.width/2, bg.y + bg.height + 5);
        this.addChildToContainer(bottomTxt);

        this.closeBtn.setEnable(false);
        egret.Tween.get(this.closeBtn).wait(1000).
        call(()=>{
            this.closeBtn.setEnable(true);
        }).
        wait(5000).
        call(()=>{
            this.hide();
        })
    }

    private getTypeCode():string{
        if (this.param.data.code == "2"){
            return "1";
        }
        return this.param.data.code;
    }

    protected getTitleStr():string{
        return "acTravelWithBeautyFavorTitle-"+this.getTypeCode();
    }

    protected getResourceList():string[]{
        return super.getResourceList().concat([
            "taoxin","taoxin_json",
        ]);
    }

    public dispose():void{
        if (this._callback){
            this._callback.apply(this._obj);
        }
        this._callback = null;
        this._obj = null;
        super.dispose();
    }
}