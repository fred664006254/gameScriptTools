/**
 * 本服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceView
 */

class PalaceView extends CommonView
{
    /**
     * 配置点击位置及跳转关系
     * 650 765
     */
    protected _posList = undefined;
    private _nodeContainer:BaseDisplayObjectContainer;
    private _bg:BaseBitmap;
    private _touchCancel:boolean = false;
    private _hitKey:string  = "";
    private _shadowList=[];
    private _curTouchShadow:BaseBitmap;
    private _birdList:CustomMovieClip[] =[];
    constructor()
    {
        super();
    }

    protected initView():void
	{
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();

        this.initPosCfg();
        let bg = BaseLoadBitmap.create(this.getBgRes());
        
        this._bg = bg;
        let parantNode = this._nodeContainer;
        if(Api.palaceVoApi.isCrossOpen()){
            this._bg.y = 0;
            let scroNode = new BaseDisplayObjectContainer();
            scroNode.height = 1631;
            scroNode.addChild(this._bg);
            let rect = new egret.Rectangle(0,0,GameConfig.stageWidth,GameConfig.stageHeigth- this.container.y+20);
            let scrolV = ComponentManager.getScrollView(scroNode,rect);
            scrolV.y = -20;
            this._nodeContainer.addChild(scrolV);
            scrolV.bounces = false;
            scrolV.horizontalScrollPolicy = "off";
            parantNode = scroNode;
            scrolV.scrollTop = 300;
        }else{
            this._nodeContainer.addChild(bg);
            this._bg.y =  GameConfig.stageHeigth - 1136 - this.container.y+20;
        }
        this._bg.addTouch(this.onBgTouchHandler,this,null,true);

        let buiCfg = GameConfig.config.buildingCfg;
        let buiIdlist = Object.keys(buiCfg);
        buiIdlist.sort((dataA,dataB)=>{
            return Number(dataA) - Number(dataB);
        })
        
        for (var index in this._posList) {
            let poscfg =this._posList[index];
            let buildId= poscfg.buildingid;// buiIdlist[index+starIdx];
            let cfg = buiCfg[buildId];

            let shadowImg =  BaseBitmap.create("palace_shadow"+poscfg.shadowId);
            shadowImg.x = this._bg.x + poscfg.x;
            shadowImg.y = this._bg.y + poscfg.y;
            shadowImg.setScale(4);
            shadowImg.alpha = 0.5;
            shadowImg.visible = false;
            parantNode.addChild(shadowImg);
            shadowImg.name = buildId;
            this._shadowList[buildId] = shadowImg;

            let buildingFlag = BaseLoadBitmap.create("palace_build_"+buildId);
            if (this.isLockedWithSwitch(buildId) )
            {
                App.DisplayUtil.changeToGray(buildingFlag);
            }

            buildingFlag.width = 35;
            buildingFlag.height = 96;
            buildingFlag.setScale(0.9);
            buildingFlag.x = this._bg.x + poscfg.flagx;
            buildingFlag.y = this._bg.y + poscfg.flagy;
            parantNode.addChild(buildingFlag);

            if(poscfg.shadowId == "1" && PlatformManager.checkIsViSp() )
            {
                shadowImg.x = this._bg.x + 134;
                shadowImg.y = this._bg.y + 218;
                buildingFlag.x = this._bg.x + poscfg.flagx;// + 30;
                buildingFlag.y = this._bg.y + poscfg.flagy ;//+ 20;
            }
        }
        
        let effpos = this.getEffPos();
        for (let eindex = 0; eindex < effpos.length; eindex++) {
            var element = effpos[eindex];
            let springClip = ComponentManager.getCustomMovieClip("palacenewfountaineffect",8,100);
            let deltaS2 = 1.0;
            springClip.width = 72*deltaS2;
            springClip.height = 72*deltaS2;
            // skinClip.blendMode = egret.BlendMode.ADD;
            springClip.x = this._bg.x + element.x;
            springClip.y = this._bg.y + element.y;
            parantNode.addChild(springClip);
            springClip.playWithTime(0);
        }
        if(Api.palaceVoApi.isCrossOpen()){
            this.showBirdsClip(parantNode);
        }

        // 大地图光
        let _mapGuang = ComponentManager.getCustomMovieClip("cityscene_guang",7,200);
        _mapGuang.width = 300;
        _mapGuang.height = 300;
        _mapGuang.setScale(2);
        _mapGuang.x = -50;
        _mapGuang.y = -90;
        _mapGuang.playWithTime(0);
        _mapGuang.blendMode = egret.BlendMode.ADD; 
        parantNode.addChild(_mapGuang);
    }

    private showBirdsClip(parentNode:BaseDisplayObjectContainer)
    {
        let bird1 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird1.setPosition(this._bg.x + 671, this._bg.y + 140);
        bird1.setScale(1);
        parentNode.addChild(bird1);
        bird1.playWithTime(-1);

        let bird2 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird2.setPosition(this._bg.x + 671, this._bg.y + 140);
        bird2.setScale(0.6);
        parentNode.addChild(bird2);
        bird2.playWithTime(-1);

        let bird3 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird3.setPosition(this._bg.x + 674, this._bg.y + 140);
        bird3.setScale(0.8);
        parentNode.addChild(bird3);
        bird3.playWithTime(-1);

        egret.Tween.get(bird1, { loop: true }).wait(3000).to({
            x: this._bg.x + 671,
            y: this._bg.y + 140 - 100
        }, 0).to({
            x: this._bg.x - 57,
            y: this._bg.y + 142 - 100,
            scaleX: 0.3,
            scaleY: 0.3,
        }, 11000);

        egret.Tween.get(bird2, { loop: true }).wait(3000).wait(2000).to({
            x: this._bg.x + 690,
            y: this._bg.y + 175 - 100
        }, 0).to({
            x: this._bg.x - 57,
            y: this._bg.y + 142 - 100,
            scaleX: 0.3,
            scaleY: 0.3,
        }, 11000) ;

        egret.Tween.get(bird3, { loop: true }).wait(3000).wait(2000).to({
            x: this._bg.x + 674,
            y: this._bg.y + 118 - 100
        }, 0).to({
            x: this._bg.x - 57,
            y: this._bg.y + 142 - 100,
            scaleX: 0.3,
            scaleY: 0.3,
        }, 11000);
    }

    public getEffPos()
    {
        if(!Api.palaceVoApi.isCrossOpen()){
            return [{x:126,y:310},{x:445,y:308}];
        }else{
            return [{x:126,y:805},{x:445,y:805}];
        }
    }
    protected isLockedWithSwitch(buiId:string)
    {

        let buildcfg = GameConfig.config.buildingCfg[buiId];
        if(buildcfg.state == 0 && !Api.switchVoApi.checkIsBuildingState(buiId))
        {
            return true;
        }

        if(buildcfg.state == 1)
        {
            return false;
        }

        return false
    }

    protected getStartIdx():number
    {
        return 7;
    }
    protected getCorssBtnPath()
    {
        return "palacve_goBtn";
    }
    public initPosCfg()
    {   
        if(!Api.palaceVoApi.isCrossOpen()){
            this._posList = Config.SceneCfg.getSceneCfgBySceneName("palace");
        }else{
            this._posList = Config.SceneCfg.getSceneCfgBySceneName("crosspalace");
        }
    }
    public getBgRes():string
    {
        if(!Api.palaceVoApi.isCrossOpen()){
            return "palace_bg2_2";
        }else{
            return "palace_bg3_2";
        }
    }

    protected crossBtnHandler()
    {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACECROSSVIEW);
        this.hide();
    }

    private onBgTouchHandler(e:egret.TouchEvent):void
	{
		if(e.type==egret.TouchEvent.TOUCH_BEGIN)
		{
            let hitPos = new egret.Point(Math.floor(e.localX),Math.floor(e.localY));
            this._hitKey = "";
            // for (let key = 0; key < this._posList.length; key++)
            for (var key in this._posList) 
			{
				let cfgPos =this._posList[key];
                if(cfgPos.shadowId == "1" && PlatformManager.checkIsViSp() ){
                    cfgPos.x =  134;
                    cfgPos.y =  218;
                }

                if(cfgPos.x <= hitPos.x && hitPos.x <= cfgPos.x + cfgPos.width)
                {
                   if(cfgPos.y <= hitPos.y && hitPos.y <= cfgPos.y + cfgPos.heigh)
                    {
                        let buiId = cfgPos.buildingid;
                        this._curTouchShadow = this._shadowList[buiId];
                        this._curTouchShadow.visible = true;
                        let bcfg = GameConfig.config.buildingCfg[buiId]
                        if(this.isLockedWithSwitch(buiId) )
                        {
                            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
                        }else{
                            this._hitKey = this._curTouchShadow.name;
                        }
                        break;
                    } 
                }
			}
		}

		if(e.type==egret.TouchEvent.TOUCH_CANCEL)
		{
            this._touchCancel = true;
            this._hitKey = "";
            if(this._curTouchShadow){
                this._curTouchShadow.visible = false;
            }
            this._curTouchShadow = null;
		}

		if(e.type==egret.TouchEvent.TOUCH_END)
		{
            if(!this._touchCancel && this._hitKey != ""){
                // this._hitKey 处理点击
                this.doHitProcess(this._hitKey);
            }
            this._touchCancel = false;
            this._hitKey = "";
             if(this._curTouchShadow){
                this._curTouchShadow.visible = false;
             }
            this._curTouchShadow = null;
		}
	}

    protected doHitProcess(key:string)
    {
        let buildcfg = GameConfig.config.buildingCfg[key];
        let titleId = buildcfg.title;
        let buildingId = key;
        if(Object.keys(titleId).length == 1)
        {
            let tid = titleId[0];
            let titlecfg = Config.TitleCfg.getTitleCfgById(tid);
            if(titlecfg.unlock == 0)
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotOpen"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW,{titleId:tid,buildingId:buildingId});
        }else{
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEGROUPVIEW,{buildingId:buildingId});
        }
    }

    protected getSoundBgName():string
	{
		return SoundConst.MUSIC_PALACE;
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
         
            "palace_hisBtn1",
            "palace_hisBtn2",
            "palace_hisBtn3",
            "palacve_goBtn",
            "palacve_backBtn",
            "palace_shadow1","palace_shadow2","palace_shadow3","palace_shadow4","palace_shadow5",
            // "palace_building_flag1","palace_building_flag2","palace_building_flag3","palace_building_flag4",
        ]);
	};
    protected getRequestData():{requestType:string,requestData:any}
	{ 
        if(!Api.palaceVoApi.isCrossOpen()){
            NetManager.request(NetRequestConst.REQUEST_PALACE_GETCROSSPALACE,{});
            return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
        }else{
            NetManager.request(NetRequestConst.REQUEST_PALACE_GETPALACEINFO,{});
            return {requestType:NetRequestConst.REQUEST_PALACE_GETCROSSPALACE,requestData:{}};
        }

        // return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
	}
    public dispose():void
	{
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        this._bg.removeTouch();
        this._posList = [];
        this._bg = null;
        this._touchCancel = null;
        this._hitKey = "";
        this._shadowList= [];
        this._curTouchShadow = null;
        this._birdList = [];

        super.dispose();
    }
}