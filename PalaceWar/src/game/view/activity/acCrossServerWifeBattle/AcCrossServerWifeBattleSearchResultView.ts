/**
 * 群芳会搜索到敌人
 */

class AcCrossServerWifeBattleSearchResultView  extends BaseView
{

    private _callback:Function = null;
    private _target:any = null;

    private _boneNode:BaseLoadDragonBones = null;
    private _wifeDragon:BaseLoadDragonBones|BaseLoadBitmap|BaseDisplayObjectContainer = null;
    private aid:string = null;
    private code :string = null;
    private get vo() : AcCrossServerWifeBattleVo{
        return <AcCrossServerWifeBattleVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid,this.code);
    }
	private get cfg() : Config.AcCfg.CrossServerWifeBattleCfg{
 		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
	}
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
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
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


        let vo = this.vo;

        let maxInfo:{wifeid:number,skin:number,sexflag?:number} = vo.getEnemyMaxInfo();
        if(maxInfo == null){
            this.hide();
            return;
        }

        let isBlue = false;
        if(maxInfo.sexflag && maxInfo.sexflag >= 1){
            isBlue = true;
        }

        let wifeCfg:Config.WifeItemCfg = null; 
        if(maxInfo.wifeid){
           
            wifeCfg = Config.WifeCfg.getWifeCfgById(maxInfo.wifeid);
        }
        let server = null;
        if(this.vo.wifebattlecross.ainfo.qu > 0){
        
            server = LanguageManager.getlocal("mergeServerOnlyqu",[String(this.vo.wifebattlecross.ainfo.qu)]);
        } else {
            
            server = LanguageManager.getlocal("ranserver2",[String(this.vo.wifebattlecross.ainfo.zid)]);
        }

        // let playerName = vo.wifebattlecross.ainfo.fname;
        let playerName = String(this.vo.wifebattlecross.ainfo.fname+" ("+server+")");

        let title = BaseBitmap.create("wifebattleview_enemytip");
        title.x = GameConfig.stageWidth/2 - title.width/2 -640;
        title.y = 70;
        this.addChildToContainer(title);

        let wifeName = ComponentManager.getTextField(playerName,24,TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeName.x = title.x + title.width/2 - wifeName.width/2;
        wifeName.y = title.y + 90;
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
        //let wifeImg = "wife_full_" + wifeCfg.id;
        let wifeImg = wifeCfg.getBody(maxInfo.sexflag && maxInfo.sexflag >= 1);
        if(maxInfo.skin){
            let myWifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(maxInfo.skin);
            wifeImg = myWifeSkinCfg.getBone(maxInfo.sexflag && maxInfo.sexflag >= 1);
            //wifeImg = myWifeSkinCfg.bone;//"wife_full3_" + maxInfo.skin;
        }

        let wifeParent = new BaseDisplayObjectContainer();
        wifeParent.width = 640;
        wifeParent.height = 728;
        wifeParent.x = 0;
        wifeParent.y = 800 + 103 - 728;
        this.addChildToContainer(wifeParent);

        let doubleGragon = App.CommonUtil.getDoubleGragon(wifeCfg.id);//
        let boneName = '';
        if (wifeImg) {
            boneName = wifeImg + "_ske";
            if(doubleGragon){
                boneName = `wife_full_${wifeCfg.id}_1` + "_ske";//wifeCfg.id
            }
        }
        //红颜
        if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes(boneName)  && Api.wifeVoApi.isHaveBone(boneName)) {
            let mask = BaseBitmap.create("wifebattleview_enemymask");
            mask.name = "mask";
            wifeParent.addChild(mask);
            wifeParent.mask = mask;
            if(doubleGragon){
                this._wifeDragon = doubleGragon;
            }
            else{
                this._wifeDragon = App.DragonBonesUtil.getLoadDragonBones(wifeImg);
            }
            this._wifeDragon.x = GameConfig.stageWidth/2;
            this._wifeDragon.y = 715;//728;
            wifeParent.addChild(this._wifeDragon);
            this._wifeDragon.alpha = 0;
            egret.Tween.get(this._wifeDragon)
            .wait(800)
            .to({y:728-35,alpha:1},200).call(()=>{
                let talkBg = BaseBitmap.create("wifebattleview_talkbg"); 
                let talkTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
                talkBg.name = "talkBg";
                talkTxt.name = "talkTxt";
                talkTxt.width = 200;
                
                let talkStr = LanguageManager.getlocal(`wifeBattleEnemyTalk${isBlue ? "_blueType":""}`);
                
                talkTxt.text = talkStr;
                
                talkBg.width = talkTxt.width + 40;
                talkBg.height = talkTxt.height + 40 + 20;

                talkBg.scaleX = -1;

                talkBg.x = 600;
                talkBg.y = title.y + title.height + 5;
                this.addChildToContainer(talkBg);

                talkTxt.x = talkBg.x - talkBg.width + talkBg.width/2 - talkTxt.width/2;
                talkTxt.y = talkBg.y + talkBg.height/2 - talkTxt.height/2 - 10;
                this.addChildToContainer(talkTxt);

                if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wifebattlehudie_ske")) {
                    let hudie = App.DragonBonesUtil.getLoadDragonBones("wifebattlehudie");
                    hudie.x = talkBg.x - talkBg.width+20;
                    hudie.y = talkBg.y+5;
                    this.addChildToContainer(hudie);
                    egret.Tween.get(hudie, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);
                }

                egret.Tween.get(talkBg, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);
                egret.Tween.get(talkTxt, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);        

                let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                closeText.textAlign = egret.HorizontalAlign.CENTER;
                closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,GameConfig.stageHeigth - 50);
                this.addChildToContainer(closeText);

            }, this);
           
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
            .to({y:693 - 840 * 0.7,alpha:1},200).call(()=>{
                let talkBg = BaseBitmap.create("wifebattleview_talkbg"); 
                let talkTxt = ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
                talkBg.name = "talkBg";
                talkTxt.name = "talkTxt";
                talkTxt.width = 200;
                
                let talkStr = LanguageManager.getlocal(`wifeBattleEnemyTalk${isBlue ? "_blueType":""}`);
                
                talkTxt.text = talkStr;
                
                talkBg.width = talkTxt.width + 40;
                talkBg.height = talkTxt.height + 40 + 20;

                talkBg.scaleX = -1;

                talkBg.x = 600;
                talkBg.y = title.y + title.height + 5;
                this.addChildToContainer(talkBg);

                talkTxt.x = talkBg.x - talkBg.width + talkBg.width/2 - talkTxt.width/2;
                talkTxt.y = talkBg.y + talkBg.height/2 - talkTxt.height/2 - 10;
                this.addChildToContainer(talkTxt);

                if (App.CommonUtil.check_dragon() && !Api.switchVoApi.checkCloseBone() && RES.hasRes("wifebattlehudie_ske")) {
                    let hudie = App.DragonBonesUtil.getLoadDragonBones("wifebattlehudie");
                    hudie.x = talkBg.x - talkBg.width+20;
                    hudie.y = talkBg.y+5;
                    this.addChildToContainer(hudie);
                    egret.Tween.get(hudie, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);
                }

                egret.Tween.get(talkBg, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);
                egret.Tween.get(talkTxt, {loop : true}).wait(5000).to({alpha : 0}, 200).wait(5000).to({alpha : 1}, 200);        

                let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                closeText.textAlign = egret.HorizontalAlign.CENTER;
                closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,GameConfig.stageHeigth - 50);
                this.addChildToContainer(closeText);

            }, this);
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
        this._boneNode = null;
        this._wifeDragon = null;
        this.aid = null;
        this.code = null;
        super.dispose()
    }
}