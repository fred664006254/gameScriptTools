/**
 * 皮肤
 * author yanyuling
 * @class AcOneYearPackSkinDetailView
 */

class AcOneYearPackSkinDetailView  extends CommonView
{
	private _nodeContainer:BaseDisplayObjectContainer;
    private _wifeSkinId:string;
    private _inflagImg:BaseBitmap =undefined; 
	public constructor() {
		super();
	}

	public initView():void
	{
        let serSkincfg = undefined;
        let wifeSkincfg = undefined;
        let skinImgPath = "";
        let skinNameStr = "";
        let wifeOrSerNameStr = "";
        let data = this.param.data;
        let skinW = 640;
        let skinH = 840;
        let tarScale = 1.0;
        let bone = undefined;
        let bgStr = "skin_detailbg1";

        this._wifeSkinId = this.param.data.wifeskinid;
        tarScale = 0.55;
        wifeSkincfg = Config.WifeskinCfg.getWifeCfgById(this._wifeSkinId);
        skinImgPath = wifeSkincfg.body;
        bone = wifeSkincfg.bone;
        wifeOrSerNameStr = LanguageManager.getlocal("wifeName_"+wifeSkincfg.wifeId);
        skinNameStr = wifeSkincfg.name;
        bgStr = "skin_detailbg2";
        

        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.y = -15;
        this.addChildToContainer(this._nodeContainer);

        let infobg = BaseLoadBitmap.create(bgStr);
        infobg.width = 640;
        infobg.height = 720;
        infobg.y = -this.container.y;
		
		this._nodeContainer.addChild(infobg);

        let probg2 =  BaseBitmap.create("wifeview_xinxibanbg");
		probg2.width = 640;
        probg2.x = GameConfig.stageWidth/2 - probg2.width/2;
		probg2.y = -this.container.y + 720 - 140;
        probg2.height = GameConfig.stageHeigth - this.container.y - probg2.y+15;

		let boneName = "";
        if(bone){
            boneName = bone + "_ske";
        }

        let dbEnable = true;
        if(this._wifeSkinId && !Api.wifeVoApi.isHaveBone(boneName)){
            dbEnable = false;
        }
        
        if(!Api.switchVoApi.checkCloseBone() && bone && boneName && dbEnable && RES.hasRes(boneName)&&App.CommonUtil.check_dragon() ){
            let _droWifeIcon=App.DragonBonesUtil.getLoadDragonBones(bone);
            let sv = 0.8;
            if(data.wifeId){
            }else if(data.servantId)
            {
                sv = 0.9;
            }
            _droWifeIcon.setScale(sv);
            _droWifeIcon.anchorOffsetY = _droWifeIcon.height*sv;
            _droWifeIcon.anchorOffsetX = _droWifeIcon.width/2*sv;
            _droWifeIcon.x = GameConfig.stageWidth/2;
            _droWifeIcon.y = probg2.y+80 ;
            this._nodeContainer.addChild(_droWifeIcon);
        }else{
            let skinImg = BaseLoadBitmap.create(skinImgPath);
            skinImg.width = skinW;
            skinImg.height = skinH;
            skinImg.setScale(tarScale);
            skinImg.anchorOffsetY = skinImg.height;
            skinImg.anchorOffsetX = skinImg.width/2;
            skinImg.x = GameConfig.stageWidth/2;
            skinImg.y = probg2.y +5;
            this._nodeContainer.addChild(skinImg);
        }
        
        let skinnamebg = BaseBitmap.create("servant_skinnamebg");
		skinnamebg.y = 25;
        skinnamebg.x = 20;
		this._nodeContainer.addChild(skinnamebg);

        let ownerNamebg = BaseBitmap.create("public_lockbg");
		ownerNamebg.y = probg2.y - 50;
        ownerNamebg.x =  GameConfig.stageWidth/2 - ownerNamebg.width/2;
		this._nodeContainer.addChild(ownerNamebg);
     
		this._nodeContainer.addChild(probg2);
        
         let public_listbg =  BaseBitmap.create("public_9v_bg09");
		public_listbg.width = probg2.width - 30;
        public_listbg.x = probg2.x + 15;
		public_listbg.y = probg2.y + 25;
        public_listbg.height = probg2.height - 60;
		this._nodeContainer.addChild(public_listbg);
        
        let proTopTxt = ComponentManager.getTextField(LanguageManager.getlocal("skinview_DetaipTopTxt1"),24,TextFieldConst.COLOR_BROWN);
        if(wifeSkincfg){
            proTopTxt.text = LanguageManager.getlocal("skinview_DetaipTopTxt2");
        }
        proTopTxt.x = probg2.x + probg2.width / 2  - proTopTxt.width/2;
        proTopTxt.y = public_listbg.y + 15;
        this._nodeContainer.addChild(proTopTxt);

        let leftLine = BaseBitmap.create("public_v_huawen01");
		leftLine.anchorOffsetY = leftLine.height / 2;
		leftLine.setPosition(probg2.x + probg2.width / 2  - leftLine.width - 90, proTopTxt.y + 10)
		this._nodeContainer.addChild(leftLine);

		let rightLine = BaseBitmap.create("public_v_huawen01");
		rightLine.anchorOffsetX = rightLine.width / 2;
		rightLine.anchorOffsetY = rightLine.height / 2;
		rightLine.rotation = 180;
		rightLine.setPosition(probg2.x + probg2.width / 2 + rightLine.width / 2 + 90, leftLine.y)
		this._nodeContainer.addChild(rightLine);

        let skinNameTxt = ComponentManager.getTextField(skinNameStr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        skinNameTxt.x = skinnamebg.x + 25;
        skinNameTxt.y = skinnamebg.y + 15;
        this._nodeContainer.addChild(skinNameTxt);

        let wifeOrSerNameTxt = ComponentManager.getTextField(wifeOrSerNameStr,20,TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeOrSerNameTxt.x = skinNameTxt.x ;
        wifeOrSerNameTxt.y = skinNameTxt.y + 25;
        this._nodeContainer.addChild(wifeOrSerNameTxt);

        let ownerNameTxtStr = "";//LanguageManager.getlocal("skin_ownerNameStr2");
        ownerNamebg.visible = false;
        let skinvo:WifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(wifeSkincfg.wifeId);
        
        //拥有者属性
        if(skinvo){
            // let resultData = this._skinNetData.result;
            let skinLv = Api.wifeSkinVoApi.getWifeSkinLV(wifeSkincfg.id);
            let lvtxt  =  ComponentManager.getTextField(LanguageManager.getlocal("skin_wifeskinLv",[""+skinLv]),22,TextFieldConst.COLOR_BROWN); 
            lvtxt.x = probg2.x + probg2.width/2 - lvtxt.width/2;
            lvtxt.y = proTopTxt.y + 40;
            this._nodeContainer.addChild(lvtxt);
            lvtxt.visible = Api.wifeSkinVoApi.isOwnSkinOfSkinId(wifeSkincfg.id);
            let attr = [
                "0",
                App.StringUtil.changeIntToText(skinvo.intimacy),
                App.StringUtil.changeIntToText(skinvo.glamour),
            ]
            for (let index = 1; index <= 2; index++) {
                let ProTxt =  ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
                ProTxt.text = LanguageManager.getlocal("skindetail_wifeproTxt"+index,[ attr[index] ]);
                if(index%2 == 1){
                    ProTxt.x = probg2.x + 70;
                }else{
                    ProTxt.x = probg2.x + 400;
                }
                ProTxt.y = lvtxt.y + 32;
                this._nodeContainer.addChild(ProTxt); 
            }
        }else{
            let data =  this.param.data;
            let uiType = data["uiType"];
            let tipStr = "acOneYearPackSkinDetail_onWife";
            let tipTxt =   ComponentManager.getTextField("",30,TextFieldConst.COLOR_BROWN);
            tipTxt.text = LanguageManager.getlocal(tipStr);
            tipTxt.x = probg2.x + probg2.width/2 - tipTxt.width/2;
            tipTxt.y = probg2.y + 100;
            this._nodeContainer.addChild(tipTxt);
        }
        
        let dropDescBg = BaseBitmap.create( "public_left2");
        dropDescBg.width = 604 ;
        dropDescBg.height = 30;
        dropDescBg.x = probg2.x + probg2.width/2 - dropDescBg.width/2;
        dropDescBg.y = probg2.y + probg2.height - dropDescBg.height- 38;
        this._nodeContainer.addChild(dropDescBg);
        let dropTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_BROWN);
        dropTxt.x = dropDescBg.x + dropDescBg.width / 2;
        dropTxt.y = dropDescBg.y + 7;
        this._nodeContainer.addChild(dropTxt);

         
        dropTxt.text = wifeSkincfg.dropDesc;
        let addvalues = Api.wifeSkinVoApi.getWifeSkinProAdd(wifeSkincfg.id,true);
      
        let proTopTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("skindetail_skinpro"),24,TextFieldConst.COLOR_BROWN);
        proTopTxt2.x = probg2.x + probg2.width / 2  - proTopTxt.width/2;
        proTopTxt2.y = proTopTxt.y + 130;
        this._nodeContainer.addChild(proTopTxt2);

        let leftLine2 = BaseBitmap.create("public_v_huawen01");
        leftLine2.anchorOffsetY = leftLine.height / 2;
        leftLine2.setPosition(leftLine.x , proTopTxt2.y + 10 )
        this._nodeContainer.addChild(leftLine2);

        let rightLine2 = BaseBitmap.create("public_v_huawen01");
        rightLine2.anchorOffsetX = rightLine.width / 2;
        rightLine2.anchorOffsetY = rightLine.height / 2;
        rightLine2.rotation = 180;
        rightLine2.setPosition(rightLine.x , leftLine2.y)
        this._nodeContainer.addChild(rightLine2);

        for (let index = 0; index < 6; index++) {
            let wifeProTxt =  ComponentManager.getTextField("",20,TextFieldConst.COLOR_BROWN);
            wifeProTxt.y = proTopTxt2.y + 35 + Math.floor(index/2)*30;
            let addV = "" + addvalues[index];
            if(index < 4 && addvalues[index] == 0 ){
                addV = addvalues[index + 6] * 100 + "%";
            }
            if(index%4 == 0)
            {
                let skprobg = BaseBitmap.create("public_ditu");
                //  if (index == 5){
                //    skprobg.texture = ResourceManager.getRes( "public_ditu");
                // }
                skprobg.width =598 ;
                skprobg.height = 30;
                this._nodeContainer.addChild(skprobg);
                skprobg.x =GameConfig.stageWidth/2 - skprobg.width/2;// - probg.width /2 ;
                skprobg.y = wifeProTxt.y - 5;
            }
            let addVStr =  App.StringUtil.formatStringColor(addV,0x13851e);
            wifeProTxt.text = LanguageManager.getlocal("skin_myPro1_"+index,[ addVStr]);
                if(index%2 == 1){
                wifeProTxt.x = probg2.x + 360;
            }else{
                wifeProTxt.x = probg2.x + 70;
            }
            
            this._nodeContainer.addChild(wifeProTxt); 
        }
         dropTxt.anchorOffsetX = dropTxt.width/2;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "skin_detail_probg",
            "skin_rankbtn_down","skin_rankbtn","skin_bookbg","servant_star",
            "arena_rank","arena_rank_text" ,"forpeople_bottom","wifeview_xinxibanbg",
            "servant_skinnamebg","public_v_huawen01",
		]);
	}

    // protected getTitleParams():string[]
	// {
    //     let skincfg = Config.WifeskinCfg.getWifeCfgById(this.param.data.wifeskinid);
    //     return [ skincfg.wifeName,skincfg.name];
	// }
   

    public dispose()
    {
        this._nodeContainer = null;
        this._wifeSkinId = null;
        this._inflagImg = null;

        super.dispose();
    }
}