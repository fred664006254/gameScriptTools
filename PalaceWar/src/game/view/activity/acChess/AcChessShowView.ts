/**
 * 棋社对弈--衣装展示
 * @author weixiaozhe  2020.5.8
 */
class AcChessShowView extends AcCommonView 
{

    private get TypeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }
	protected getTitleStr():string
	{
		return "";
	}    
	protected getTitleBgName():string
	{
		return "";
	}    
	protected getCloseBtnName():string
	{
		return "";
	}    
    private get cfg() : Config.AcCfg.ChessCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcChessView.AID, AcChessView.CODE);
    }
    protected get acVo():AcChessVo
	{
		return <AcChessVo>Api.acVoApi.getActivityVoByAidAndCode(AcChessView.AID,AcChessView.CODE);
	}
    public initView() 
    {
        this._maskBmp.visible = false;
        this.viewBg.visible = false;

        let bgmask:BaseShape=new BaseShape();
        bgmask.graphics.beginFill(0,0.8);
        bgmask.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
        bgmask.graphics.endFill();
        this.addChild(bgmask);
        bgmask.touchEnabled = true;
        bgmask.addTouchTap(()=>
        {
            this.hide();
        },this);

        let bg  = BaseBitmap.create("acchess_show_bg");
        this.addChild(bg);
        this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter,bg,this,[0,0]);        

        let servantSkinId = this.cfg.show1;
        let wifeSkinId = this.cfg.show2;
        let boneName = undefined;

        //佳人
        let wifeSkinCfg = Config.WifeskinCfg.getWifeCfgById(wifeSkinId);
        if (wifeSkinCfg && wifeSkinCfg.bone)
        {
            boneName = wifeSkinCfg.bone + "_ske";
        }
        let fun1 = ()=>
        {
            let caidai  = BaseBitmap.create("acchess_showpd2");
            this.addChild(caidai);
            this.setLayoutPosition(LayoutConst.leftbottom,caidai,bg,[0,50]);

            let namebg  = BaseBitmap.create("acchess_showmj2");
            this.addChild(namebg);
            this.setLayoutPosition(LayoutConst.leftbottom,namebg,bg,[50,230]);

            let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_show1"), 26,TextFieldConst.COLOR_LIGHT_YELLOW);
            if (PlatformManager.checkIsTextHorizontal()){
                namebg.rotation = -90;
                this.setLayoutPosition(LayoutConst.leftbottom,namebg,bg,[0, 160]);
                nameTxt.x = namebg.x + namebg.height/2 - nameTxt.width/2;
                nameTxt.y = namebg.y - namebg.width/2 - nameTxt.height/2;
            }
            else{
                nameTxt.multiline = true;
                nameTxt.width = nameTxt.size;
                nameTxt.height = namebg.height;
                nameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
                nameTxt.x = namebg.x + namebg.width/2 - nameTxt.width/2;
                nameTxt.y = namebg.y + namebg.height/2 - nameTxt.height/2;
            }
            this.addChild(nameTxt);
           
            let yellowBg  = BaseBitmap.create("acchess_showservtxt");
            this.addChild(yellowBg);
            yellowBg.x = namebg.x + namebg.width;
            yellowBg.y = namebg.y + 15;
            if (PlatformManager.checkIsTextHorizontal()){
                yellowBg.x = namebg.x + 15;
                yellowBg.y = namebg.y + namebg.width - 70;
            }

            let dengBtn = ComponentManager.getButton("acchess_showdeng", "", ()=>
            {
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSSKINPOPUPVIEW, 
                { 
                    wifeId: this.cfg.show2,
                    servantId:this.cfg.show1,
                    wifeNeedText: "acchessShowWifeTopMsg-"+AcChessView.CODE,
                    servantNeedText: "acchessShowServentTopMsg-"+AcChessView.CODE,
                    wifeNeed: "",
                    servantNeed: "",
                    isShowWife:false
                });            
                this.hide();
            }, this);
            dengBtn.x = this.width - dengBtn.width-17;
            dengBtn.y = namebg.y + namebg.height-140;
            if (PlatformManager.checkIsTextHorizontal()){
                dengBtn.y = namebg.y + namebg.height-70;
            }
            this.addChild(dengBtn);
            if(this.acVo.showExchangeDot())
            {
                App.CommonUtil.addIconToBDOC(dengBtn);
                let dot = <BaseBitmap>dengBtn.getChildByName("reddot");
                if(dot)
                {
                    dot.setPosition(60,65);
                }
            }else
            {
                App.CommonUtil.removeIconFromBDOC(dengBtn);
            }

            let exchangeImg  = BaseBitmap.create("acchess_showdengt1");
            this.addChild(exchangeImg);
            exchangeImg.x = dengBtn.x + 55;
            exchangeImg.y = dengBtn.y + 80;

            let str:string = this.cfg.change.needItem;
            let itemCfg : Config.ItemItemCfg = Config.ItemCfg.getItemCfgById(str.split("_")[1]);
            let itemNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_exchangepitemname"), 26,TextFieldConst.COLOR_LIGHT_YELLOW);
            this.addChild(itemNameTxt);
            itemNameTxt.x = GameConfig.stageWidth/2 - itemNameTxt.width/2-5;
            itemNameTxt.y = bg.y + bg.height - itemNameTxt.height - 125;

            let have = Api.itemVoApi.getItemNumInfoVoById(itemCfg.id);
            let numTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_exchangepro",[String(have),str.split("_")[2]]), 26,TextFieldConst.COLOR_WHITE);
            this.addChild(numTxt);
            numTxt.x = itemNameTxt.x + itemNameTxt.width;
            numTxt.y = itemNameTxt.y;

            let icon = BaseLoadBitmap.create(itemCfg.icon);
            this.addChild(icon);
            icon.width = icon.height = 45;
            icon.x = itemNameTxt.x - icon.width;
            icon.y = itemNameTxt.y - (icon.height/2 - itemNameTxt.height/2) - 5;     

            // let pnode = this.param.data.pnode;
            // pnode.visible = true;    
        }        
        let servantfunc = ()=>
        {
            //门客
            let skinCfg = Config.ServantskinCfg.getServantSkinItemById(servantSkinId);
            if (skinCfg && skinCfg.bone) 
            {
                boneName = skinCfg.bone + "_ske";
            }            
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) 
            {
                ResourceManager.loadResources(this.getBonesResArr(skinCfg.bone),null,()=>
                {
                    let servant = App.DragonBonesUtil.getLoadDragonBones(skinCfg.bone);
                    this.addChild(servant);
                    servant.setScale(0.7);
                    servant.setPosition(300,bg.y+bg.height-185);
                    fun1();
                },null,this);
            }else
            {
                let servant = BaseLoadBitmap.create(skinCfg.body);
                this.addChild(servant);
                servant.setScale(0.85);
                servant.setPosition(170,bg.y + bg.height-540);
                fun1();
            }
        }        
        let fun2 = ()=>
        {          
            let caidai  = BaseBitmap.create("acchess_showpd1");
            this.addChild(caidai);
            this.setLayoutPosition(LayoutConst.lefttop,caidai,bg,[0,180]);

            let namebg  = BaseBitmap.create("acchess_showmj1");
            this.addChild(namebg);
            this.setLayoutPosition(LayoutConst.righttop,namebg,bg,[50,80]);

            let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acchess_show2"), 26,TextFieldConst.COLOR_LIGHT_YELLOW);
            if (PlatformManager.checkIsTextHorizontal()){
                namebg.rotation = -90;
                this.setLayoutPosition(LayoutConst.righttop,namebg,bg,[namebg.height - 50, 80]);
                nameTxt.x = namebg.x + namebg.height/2 - nameTxt.width/2;
                nameTxt.y = namebg.y - namebg.width/2 - nameTxt.height/2;
            }
            else{
                nameTxt.multiline = true;
                nameTxt.width = nameTxt.size;
                nameTxt.height = namebg.height;
                nameTxt.verticalAlign = egret.VerticalAlign.MIDDLE;
                nameTxt.x = namebg.x + namebg.width/2 - nameTxt.width/2;
                nameTxt.y = namebg.y + namebg.height/2 - nameTxt.height/2;            
            }
            this.addChild(nameTxt);
            let yellowBg  = BaseBitmap.create("acchess_showwifetxt");
            this.addChild(yellowBg);
            yellowBg.x = namebg.x - yellowBg.width;
            yellowBg.y = namebg.y + 15;
            if (PlatformManager.checkIsTextHorizontal()){
                yellowBg.x = namebg.x + 15;
                yellowBg.y = namebg.y + namebg.width - 70;
            }

            let dengBtn = ComponentManager.getButton("acchess_showdeng", "", ()=>
            {
                AcChessView.IS_SHOW_RECHARGE = true;
                ViewController.getInstance().openView(ViewConst.POPUP.ACCHESSREWARDPOPVIEW, {aid:AcChessView.AID, code:AcChessView.CODE});
                this.hide();
            }, this);
            this.addChild(dengBtn);
            dengBtn.scaleX = -1;
            dengBtn.x = dengBtn.width-7;
            dengBtn.y = namebg.y + namebg.height-170;

            let exchangeImg  = BaseBitmap.create("acchess_showdengt2");
            this.addChild(exchangeImg);
            exchangeImg.x = 3;
            exchangeImg.y = dengBtn.y + 80;

            servantfunc();
        }
        if (wifeSkinCfg && (!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) 
        {
            ResourceManager.loadResources(this.getBonesResArr(wifeSkinCfg.bone),null,()=>
            {
                let wife = App.DragonBonesUtil.getLoadDragonBones(wifeSkinCfg.bone);
                wife.anchorOffsetX = wife.width / 2;
                wife.anchorOffsetY = wife.height;
                this.addChild(wife);
                wife.setPosition(0,0);
                wife.setScale(0.6);
                wife.setPosition(300,bg.y+350);
                fun2(); 
            },null,this);            
        }else
        {
            BaseLoadBitmap.create(wifeSkinCfg.body,null,
            {
                callback:()=>
                {
                    let wife = BaseLoadBitmap.create(wifeSkinCfg.body);
                    this.addChild(wife);
                    wife.anchorOffsetX = wife.width / 2;
                    wife.anchorOffsetY = wife.height;
                    wife.setScale(0.65);
                    wife.setPosition(150,bg.y-40);
                    fun2();
                },
                callbackThisObj:null,
                callbackParams:null
            });
        }          
    }

    private getDefaultResList(resArr: string[]): string[]
    {
        let arr = [];
        for (let i = 0; i < resArr.length; i++) {
            const element = resArr[i];
            let defRes = this.getDefaultRes(element);
            arr.push(defRes);
        }
        return arr;
    }
    protected getResourceList(): string[] {
        let codeRes = this.getDefaultResList([
        ])
        let baseList = [
            "acchess_show_bg",
            "acchess_showmj2",
            "acchess_showmj1",
            "acchess_showservtxt",
            "acchess_showdeng",
            "acchess_showdengt1",
            "acchess_showwifetxt",
            "acchess_showdengt2",
            "acchess_showpd1",
            "acchess_showpd2",
        ];
        let codeList = null;
        if (this.code == "1") {
            codeList = [
            ]
        }
        return super.getResourceList().concat(baseList).concat(codeList).concat(codeRes);
    }

   	private getBonesResArr(name:string):string[]
	{
		return [name+"_ske",name+"_tex_json",name+"_tex_png"];
	}

    private get acTivityId(): string {
        return `${AcChessView.AID}-${AcChessView.CODE}`;
    }
    //根据资源名字得到完整资源名字
    protected getDefaultRes(resName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(ResourceManager.hasRes(resName+"-"+this.code)){
            return resName+"-"+this.code;
        } else {
            return resName+"-"+defaultCode;
        }
    }
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }     
    
    public dispose(): void {
        super.dispose();           
    }
}