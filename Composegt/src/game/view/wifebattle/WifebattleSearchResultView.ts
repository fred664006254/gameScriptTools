/**
 * 群芳会搜索到敌人
 */

class WifebattleSearchResultView  extends BaseView
{

    private _callback:Function = null;
    private _target:any = null;

    private _boneNode:BaseLoadDragonBones = null;
    private _wifeDragon:BaseLoadDragonBones|BaseLoadBitmap = null;
    public constructor() {
		super();
	}
    protected getCloseBtnName():string
    {
        return null;
    }
    protected isTouchMaskClose():boolean
    {
        return true;
    }

    protected isShowOpenAni():boolean
	{
		return false;
	}

	protected initView():void
	{
        this.titleTF.visible =false;
     
        if(this.param.data.callback && this.param.data.target){
            this._callback = this.param.data.callback;
            this._target = this.param.data.target;
        }
        this.showInitView();
        egret.Tween.get(this)
        .wait(500)
        .call(()=>{
            this.addTouchTap(this.hide,this);
        })
        // egret.Tween.get(this)
        // .wait(3000)
        // .call(this.hide,this);
        
    }
    public hide()
    {
        if(this._callback && this._target){
            this._callback.apply(this._target);
        }
        super.hide();
    }
    /**
     * 显示初始化View
     */
    private showInitView()
    {


        let vo = Api.wifebattleVoApi.wifebattleVo;

        let maxInfo:{wifeid:number,skin:number,sexflag?:number} = vo.getEnemyMaxInfo();
        if(maxInfo == null){
            this.hide();
            return;
        }

        let wifeCfg:Config.WifeItemCfg = null; 
        if(maxInfo.wifeid){
           
            wifeCfg = Config.WifeCfg.getWifeCfgById(maxInfo.wifeid);
        }


        let playerName = vo.ainfo.fname;

        let title = BaseBitmap.create("wifebattleview_enemytip");
        title.x = GameConfig.stageWidth/2 - title.width/2 -640;
        title.y = 70;
        this.addChildToContainer(title);

        let wifeName = ComponentManager.getTextField(playerName,24,TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeName.x = title.x + title.width/2 - wifeName.width/2;
        wifeName.y = title.y + 80;
        this.addChildToContainer(wifeName);

        let titleX = GameConfig.stageWidth/2 - title.width/2;
        let wifeX = titleX + title.width/2 - wifeName.width/2;

        egret.Tween.get(title)
        .wait(1000)
        .to({x:titleX},200);

        egret.Tween.get(wifeName)
        .wait(1000)
        .to({x:wifeX},200)
        


        //扇子
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("hydzsz_ske")) {
            this._boneNode=App.DragonBonesUtil.getLoadDragonBones("hydzsz",1);
            this._boneNode.x = GameConfig.stageWidth/2;
            this._boneNode.y = 800;
            this._boneNode.stop();
            this._boneNode.visible = false;
            this.addChildToContainer(this._boneNode);
            
            egret.Tween.get(this._boneNode)
            .wait(300)
            .call(()=>{
                this._boneNode.visible = true;
                this._boneNode.playDragonMovie('idle',1);
            });            
        } else {
            let shanzi = BaseLoadBitmap.create("wifebattleviewsearch_bg");
            shanzi.width = 640;
            shanzi.height = 418;
            shanzi.x = GameConfig.stageWidth/2 - shanzi.width/2;
            shanzi.y = 468;// 800 - shanzi.height;
            this.addChildToContainer(shanzi);


        }
        // let wifeImg = wifeCfg.body;//"wife_full_" + wifeCfg.id;
        let wifeImg = wifeCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1);
        if(maxInfo.skin){
            let myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
            wifeImg = myWifeSkinCfg.getBone(maxInfo.sexflag && maxInfo.sexflag >= 1);//"wife_full3_" + maxInfo.skin;
        }

        let wifeParent = new BaseDisplayObjectContainer();
        wifeParent.width = 640;
        wifeParent.height = 728;
        wifeParent.x = 0;
        wifeParent.y = 800 + 103 - 728;
        this.addChildToContainer(wifeParent);

        //红颜
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(wifeImg+"_ske")  && Api.wifeVoApi.isHaveBone(wifeImg+"_ske")) {
            let mask = BaseBitmap.create("wifebattleview_enemymask");
            mask.name = "mask";
            wifeParent.addChild(mask);
            wifeParent.mask = mask;
            this._wifeDragon = App.DragonBonesUtil.getLoadDragonBones(wifeImg);
            this._wifeDragon.x = GameConfig.stageWidth/2;
            this._wifeDragon.y = 715;//728;
            wifeParent.addChild(this._wifeDragon);
            this._wifeDragon.alpha = 0;
            egret.Tween.get(this._wifeDragon)
            .wait(800)
            .to({y:728-35,alpha:1},200)
           
        } else {
            if(maxInfo.skin){
                let myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
                wifeImg = myWifeSkinCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1);//"wife_skin_" + maxInfo.skin;
            }
            let mask = BaseBitmap.create("wifebattleview_enemymask");
            // mask.setScale(0.7);
            mask.name = "mask";
            // mask.x = wifeParent.width/2 - mask.width * 0.7/2;
            // mask.y = -88;

            wifeParent.addChild(mask);
            wifeParent.mask = mask;
            this._wifeDragon = BaseLoadBitmap.create(wifeImg);
            // this._wifeDragon.x = GameConfig.stageWidth/2;
            // this._wifeDragon.y = 715;//728;
            this._wifeDragon.width = 640;
            this._wifeDragon.height = 840;
            this._wifeDragon.setScale(0.7);
            this._wifeDragon.alpha = 0;
            this._wifeDragon.x = GameConfig.stageWidth/ 2 - this._wifeDragon.width * this._wifeDragon.scaleX/2;
            this._wifeDragon.y = 715 - 840*0.7//0;//715 - 840 * 0.7;//35;

            wifeParent.addChild(this._wifeDragon);
            // this._wifeDragon.alpha = 0;
            egret.Tween.get(this._wifeDragon)
            .wait(800)
            .to({y:693 - 840 * 0.7,alpha:1},200)
        }
       
       



    }

     protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            
            
		]);
	}
   
        

    public dispose()
    {

        egret.Tween.removeTweens(this);

        this._callback = null;
        this._target = null;

        super.dispose()
    }
}