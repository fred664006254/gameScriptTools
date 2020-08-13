/**
 * 子嗣属性详情
 * author qianjun
 */
class ChildDetailView  extends PopupView
{	// TypeScript file
    private _servantId:string=null;
    private _servantInfoObj:ServantInfoVo = null;
    private _container:BaseDisplayObjectContainer =null;
    private _rect2:egret.Shape =null;
    
    public constructor() {
		super();
	}
    protected getCloseBtnName():string 
    {
         return "sharepopupview_closebtn";   
    }
 	protected getBgName():string
    {
         return "servant_detailsbg";   
    }

    protected getTitleStr():string
	{
        return null;
    } 
    protected initView():void
    {
        // this.resetBgSize();
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"servant_detailsbg",
			"servant_namebg2",
			"servant_fl",
			"servant_detailstitles",
            "servant_detailsline",

			"servant_detailsfontbg",
            "sharepopupview_closebtn",
            "childeventview",
            Api.switchVoApi.checkIsInBlueWife() ? "childview_parent_blueType" : "childview_parent"
		]);
	}

	protected resetBgSize():void
	{ 
       
        this.width = GameConfig.stageWidth;
        let data : ChildInfoVo = this.param.data;
        this.viewBg.height = 830;
        this.viewBg.x= (this.width-this.viewBg.width)*0.5;
        this.viewBg.y= 100;// (this.height-this.viewBg.height)*0.5;
        if(GameConfig.stageHeigth>960)
        {
            this.viewBg.y = (GameConfig.stageHeigth - this.viewBg.height+60)*0.5;
        } 
        this._container = new BaseDisplayObjectContainer();
        this._container.setPosition(0,this.viewBg.y+45);
        this.addChild(this._container);
        
        this.closeBtn.x =this.closeBtn.x -20;
        this.closeBtn.y =this.viewBg.y-30;
        // this.viewBg.y = this.viewBg.y+20

        this._servantId = this.param.data;
        let servantInfoObj = Api.servantVoApi.getServantObj(this._servantId);
        this._servantInfoObj = servantInfoObj;
 
        let itemBg:BaseBitmap = BaseBitmap.create("childeventhshubg");
        itemBg.x = -10;
        this._container.addChild(itemBg); 

        let curlv = Api.playerVoApi.getPlayerLevel();
        let titleinfo = App.CommonUtil.getTitleData(Api.playerVoApi.getTitleInfo());
        if(titleinfo.clothes != ``){
            curlv = Number(titleinfo.clothes);
        }


        let wifevo = Api.wifeVoApi.getWifeInfoVoById(data.motherId);
        let wifeCfg:Config.WifeItemCfg =  Config.WifeCfg.getWifeCfgById(data.motherId); 
        let wifePic = wifeCfg.getBody(Api.switchVoApi.checkIsInBlueWife() && wifevo.sexflag && wifevo.sexflag >= 1);
        if(Api.wifeSkinVoApi.isHaveSkin(wifevo.id))
		{
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifevo.id);
			if(wifeSkinVo && wifeSkinVo.equip != ""){
				let skinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinVo.equip);
				wifePic = skinCfg.getBody(Api.switchVoApi.checkIsInBlueWife() && wifevo.sexflag && wifevo.sexflag >= 1);
			}
			
        }
        let wife = BaseLoadBitmap.create(wifePic);
        wife.setScale(0.4);
        wife.x = 210;
        wife.y = 70;
        this._container.addChild(wife); 

        var rect3:egret.Shape = new egret.Shape();
		rect3.graphics.beginFill(0x0000ff);
		rect3.graphics.drawRect(4,0,640,290);
		rect3.graphics.endFill();
		this._container.addChild(rect3);
        wife.mask = rect3;  

        let servant = Api.playerVoApi.getPlayerPortrait(curlv, Api.playerVoApi.getPlayePicId()); 
        servant.anchorOffsetX = servant.width / 2;
        servant.anchorOffsetY = servant.height / 2;
        servant.setScale(0.8);
        servant.x = 170;
        servant.y = 350;
        this._container.addChild(servant);
        if (curlv && Config.TitleCfg.checkHasSpecialHead(curlv))
        {
             servant.setScale(0.76);
            servant.x = 170;
             servant.y = 360;
        }
       
		var rect2:egret.Shape = new egret.Shape();
		rect2.graphics.beginFill(0x0000ff);
		rect2.graphics.drawRect(4,0,640,290);
		rect2.graphics.endFill();
		this._rect2 =rect2;
		this._rect2.visible =false;
		this._container.addChild(rect2);
        servant.mask = this._rect2;  


        let dqian = BaseBitmap.create(`childeventhsqian`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, dqian, itemBg, [0,15]);
        this._container.addChild(dqian); 

        let titiletxt = BaseBitmap.create(Api.switchVoApi.checkIsInBlueWife() ? "childview_parent_blueType" : "childview_parent");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titiletxt, itemBg, [0,60]);
        this._container.addChild(titiletxt); 

        //人物名称
        let namebg = BaseBitmap.create(`childeventdetailnamebg`);
        namebg.x = itemBg.x + 115;
        namebg.y = itemBg.y + 235;
        this._container.addChild(namebg);

        let penameTxt=  ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),18, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, penameTxt, namebg);
        this._container.addChild(penameTxt); 

        let titleimg = App.CommonUtil.getTitlePic(Api.playerVoApi.getTitleInfo());
        if(titleimg){
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, titleimg, namebg, [0,namebg.height]);
            this._container.addChild(titleimg); 
        }

        let namebg2 = BaseBitmap.create(`childeventdetailnamebg`);
        namebg2.x = 305;
        namebg2.y = namebg.y;
        this._container.addChild(namebg2);

        let res = `wifestatus_title${Api.wifestatusVoApi.getWifestatusLevelById(wifevo.id.toString())}${Api.switchVoApi.checkIsInBlueWife() ? `_male` : ``}`
        let wifestatus = BaseLoadBitmap.create(res, null, {callback : ()=>{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wifestatus, namebg2, [0,namebg2.height]);
            this._container.addChild(wifestatus);
        }, callbackThisObj : this});


        let penameTxt2=  ComponentManager.getTextField(wifevo.name,18,TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, penameTxt2, namebg2);
        this._container.addChild(penameTxt2); 

        //天赋和等级
        let detailbg1 = BaseBitmap.create(`servant_detailsfontbg`);
        detailbg1.width = 520;
        detailbg1.height = 50;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailbg1, itemBg, [3.5,itemBg.height + 8]);
        this._container.addChild(detailbg1); 

        let flimg:BaseBitmap = BaseBitmap.create("servant_fl")  
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flimg, detailbg1, [15,0]);
        this._container.addChild(flimg);
        
        let txt1 = ComponentManager.getTextField(LanguageManager.getlocal(`childdetailtip1`, [LanguageManager.getlocal(`child_quality${data.quality}`)]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt1, flimg, [flimg.width + 10,0]);
        this._container.addChild(txt1);

        let flimg2:BaseBitmap = BaseBitmap.create("servant_fl")  
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flimg2, detailbg1, [260,0]);
        this._container.addChild(flimg2);

        let childCfg = GameConfig.config.childCfg[data.quality.toString()];
        let txt2 = ComponentManager.getTextField(LanguageManager.getlocal(`childdetailtip2`, [childCfg.lv]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt2, flimg2, [flimg2.width + 10,0]);
        this._container.addChild(txt2);

        //亲密度、才艺值
        let detailbg2 = BaseBitmap.create(`servant_detailsfontbg`);
        detailbg2.width = 520;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailbg2, detailbg1, [0,detailbg1.height + 10]);
        this._container.addChild(detailbg2); 

        let flimg3:BaseBitmap = BaseBitmap.create("servant_fl")  
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flimg3, detailbg2, [15,15]);
        this._container.addChild(flimg3);
        
        let txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`childdetailtip3`, [wifevo.intimacy.toString()]), 20, TextFieldConst.COLOR_BLACK);
        txt3.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, flimg3, [flimg3.width + 10,0]);
        this._container.addChild(txt3);

        let flimg4:BaseBitmap = BaseBitmap.create("servant_fl")  
        flimg4.x = flimg3.x;
        flimg4.y = txt3.y + txt3.textHeight + 18;
        this._container.addChild(flimg4);

        let txt4 = ComponentManager.getTextField(LanguageManager.getlocal(`childdetailtip4`, [wifevo.artistry.toString()]), 20, TextFieldConst.COLOR_BLACK);
        txt4.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt4, flimg4, [flimg4.width + 10,0]);
        this._container.addChild(txt4);

        detailbg2.height = txt4.y + txt4.textHeight + 15 - detailbg2.y;

        //机遇事件加成
        let detailbg3 = BaseBitmap.create(`servant_detailsfontbg`);
        detailbg3.width = 520;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailbg3, detailbg2, [0,detailbg2.height + 10]);
        this._container.addChild(detailbg3); 

        let flimg5:BaseBitmap = BaseBitmap.create("servant_fl")  
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flimg5, detailbg3, [15,15]);
        this._container.addChild(flimg5);
        
        let num = data.attrCh;
        let total = 0;
        for(let i in num){
            total += (num[i]);
        }
        let txt5 = ComponentManager.getTextField(LanguageManager.getlocal(`childdetailtip5`, [(total).toString()]), 20, TextFieldConst.COLOR_BLACK);
        txt5.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt5, flimg5, [flimg5.width + 10,0]);
        this._container.addChild(txt5);
        for(let i = 1; i <= 4; ++ i){
            let temp = 0;
            if(num[i - 1]){
                temp = num[i - 1];
            }
            let attrtxt = ComponentManager.getTextField(LanguageManager.getlocal(`servant_newui_attr${i}`, [temp.toString()]), 20, 0x775108);
            attrtxt.x = txt5.x + (i % 2 == 0 ? 250 : 0);
            attrtxt.y = txt5.y + txt5.textHeight + (i / 2 > 1 ? 30 : 8)
            this._container.addChild(attrtxt);
        }
        let txt6 = ComponentManager.getTextField(LanguageManager.getlocal(`childdetailtip6`), 20, 0x775108);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt6, txt5, [0,txt5.textHeight + 60]);
        this._container.addChild(txt6);

        detailbg3.height = txt6.y + txt6.textHeight + 15 - detailbg3.y;
        //属性加成
        let detailbg4 = BaseBitmap.create(`servant_detailsfontbg`);
        detailbg4.width = 520;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, detailbg4, detailbg3, [0,detailbg3.height + 10]);
        this._container.addChild(detailbg4); 

        let flimg6:BaseBitmap = BaseBitmap.create("servant_fl")  
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flimg6, detailbg4, [15,15]);
        this._container.addChild(flimg6);
        
        let addnum = 0;
        let add1 = 0;
        let add2 = 0;
        if(Api.switchVoApi.checkOpenWifeStatus()){
            let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
            let starEffect = Config.WifestatusbaseCfg.starEffect;
            add1 = wifestatusVo.star*starEffect;
        }
        if(Api.switchVoApi.checkOpenQingYuanHuiJuan()){
            add2 = Api.encounterVoApi.getChildAdd(data.motherId);
        }
        let txt7 = ComponentManager.getTextField(LanguageManager.getlocal(`childdetailtip10`, [(add1 + add2).toFixed(1)]), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, txt7, flimg6, [flimg6.width + 10,0]);
        this._container.addChild(txt7);
        
        let startx = txt7.x;
        let starty = txt7.y + txt7.textHeight + 10;
        let height = 0;
        if(Api.switchVoApi.checkOpenWifeStatus()){
            let addtxt1 = ComponentManager.getTextField( LanguageManager.getlocal("childdetailtip9", [(add1).toFixed(1)]), 20, 0x775108);
            addtxt1.x = startx;
            addtxt1.y = starty;
            this._container.addChild(addtxt1);
            
            startx = txt7.x + 250;
            starty = addtxt1.y;
            height = addtxt1.y + addtxt1.textHeight;
        }

        if(Api.switchVoApi.checkOpenQingYuanHuiJuan()){
            let addtxt2 = ComponentManager.getTextField( LanguageManager.getlocal("childdetailtip8", [(add2).toFixed(1)]), 20, 0x775108);
            addtxt2.x = startx;
            addtxt2.y = starty;
            this._container.addChild(addtxt2);

            startx = txt7.x;
            starty = addtxt2.y + addtxt2.textHeight + 10;
            height = addtxt2.y + addtxt2.textHeight;
        }
        detailbg4.height = height + 15 - detailbg4.y;

        this._container.y =0; 
        var eheight = 810; 
        let sRect = new egret.Rectangle(0,0,520, eheight);
        let scrollV = ComponentManager.getScrollView(this._container,sRect);
        scrollV.x = 60;
        scrollV.y = this.viewBg.y-10;
        scrollV.horizontalScrollPolicy="off";
        scrollV.bounces = false;
        this.addChildToContainer(scrollV);  

         //翅膀
         let titlefont2:BaseBitmap = BaseBitmap.create("servant_detailstitles"); 
         this.addChildToContainer(titlefont2);
 
         let titlefont:BaseBitmap = BaseBitmap.create(Api.switchVoApi.checkIsInBlueWife()?"childeventdetailtitle_blueType":"childeventdetailtitle"); 
         titlefont.x = this.viewBg.x + (this.viewBg.width-titlefont.width)*0.5;
         titlefont.y = this.viewBg.y-titlefont.height+40;
         this.addChildToContainer(titlefont); 
 
         titlefont2.width = 520;
         titlefont2.x = 60
         titlefont2.y = titlefont.y+5;  
    }
 
    public dispose():void
	{
		this._servantId = null;
        this._container = null;
		super.dispose();
	}
}