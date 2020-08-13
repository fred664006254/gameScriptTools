/*
author : qianjun
desc : 幸运翻牌活动简介
*/

class AcDestroySamePrevView extends BaseView
{
    public constructor() {
		super();
	}

    protected getTitleBgName():string
	{
		return null;
	}

	protected getTitleStr():string
	{
		return null;
	}

	protected getBgName():string
	{
		return "public_9_viewmask";
	}

        protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    protected getResourceList():string[]
	{
        let guidePic:string[] = [];
        let view = this;
        let code = view.getUiCode();
        return guidePic.concat([
           `destroyshowflower-${code}`,`destroyshowflower2-${code}`,`destroyshowdescbg-${code}`,`destroysameprevtitle-${code}`
        ]);	
    }

    private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    
    private get aid() : string{
        return `${this.param.data.aid}`;
    }

    private get code() : string{
        return `${this.param.data.code}`;
    }

    protected initView():void
    {
        this.addTouchTap(this.hide,this,null);


        let node = new BaseDisplayObjectContainer();
		this.addChild(node); 

        node.y = GameConfig.stageHeigth/2-480;
        let view = this;
        let code = view.getUiCode();
        let title = BaseBitmap.create(App.CommonUtil.getResByCode(`destroysameprevtitle`, code));
        title.setPosition(GameConfig.stageWidth/2-title.width/2,47);
        node.addChild(title);

        let bg1 = BaseBitmap.create(App.CommonUtil.getResByCode(`destroyshowflower2`, code));
        bg1.setPosition(GameConfig.stageWidth/2-bg1.width/2,230 );
        node.addChild(bg1);

        let bg2 = BaseBitmap.create(App.CommonUtil.getResByCode(`destroyshowflower`, code));
        bg2.setPosition(GameConfig.stageWidth/2-bg2.width/2,bg1.y );
        
        //红颜皮肤
        let infobg1 = BaseBitmap.create(App.CommonUtil.getResByCode(`destroyshowdescbg`, code));
        infobg1.width = 180;
        infobg1.height = 89; 
        infobg1.setPosition(400,250);
        node.addChild(infobg1);

        let wifeId = this.cfg.getSkin(code);
        let wifecfg = Config.WifeskinCfg.getWifeCfgById(wifeId);
        let wifeName = ComponentManager.getTextField(wifecfg.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,Number(code) == 3 ? TextFieldConst.COLOR_LIGHT_YELLOW : TextFieldConst.COLOR_BROWN);
        wifeName.setPosition(infobg1.x+90-wifeName.width/2,infobg1.y+(infobg1.height - wifeName.height)/2);
        node.addChild(wifeName);

        // let wifeAbility = ComponentManager.getTextField(LanguageManager.getlocal(`servant_newui_attr4`,[String(wifecfg.glamour)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // wifeAbility.setPosition(infobg1.x+105-wifeAbility.width/2,wifeName.y+22);
        // node.addChild(wifeAbility);


        let boneName = undefined;
        let wife = null;
        if (wifecfg && wifecfg.bone) {
            boneName = wifecfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(wifecfg.bone);
            wife.setScale(0.85);  //0.53
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = 320;
            wife.y = 750;
            wife.mask = new egret.Rectangle(-354,-665,914,685);
            node.addChild(wife);
        }
        else {
            if(!RES.hasRes(wifecfg.body)){
                wife = BaseLoadBitmap.create(`wife_skin_1012`);
            }
            else{
                wife = BaseLoadBitmap.create(wifecfg.body);
            }
            
            
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.6);
            wife.x = 120;
            wife.y = 250;
            node.addChild(wife);
        }

        //门客
        // let infobg2 = BaseBitmap.create(`luckdrawawardnamebg-${code}`);
        // infobg2.width = 180;
        // infobg2.height = 115;
        // infobg2.setPosition(290,420);
        // node.addChild(infobg2);

        // let servantId = this.cfg.servant;
        // let servantcfg = Config.ServantCfg.getServantItemById(servantId);
        // let servantName = ComponentManager.getTextField(servantcfg.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // servantName.setPosition(infobg2.x+105-servantName.width/2,infobg2.y+22);
        // node.addChild(servantName);

        // let attStr:string;
        // for (var index1 = 0; index1 < servantcfg.speciality.length; index1++) 
        // {
        //     var element = servantcfg.speciality[index1];
        //     if(index1 == 0){
        //         attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
                
        //     }else{
        //         attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
        //     }
        // }
        // let servantAttr = ComponentManager.getTextField(attStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // servantAttr.setPosition(infobg2.x+105-servantAttr.width/2,servantName.y+22);
        // node.addChild(servantAttr);

        // let servantAbility = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBuzhenZzhi`,[String(servantcfg.getTotalAbility())]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // servantAbility.setPosition(infobg2.x+105-servantAbility.width/2,servantAttr.y+22);
        // node.addChild(servantAbility);
        
        // let dagonBonesName = "servant_full2_" + servantId;
        // boneName = undefined;
        // if (servantcfg && dagonBonesName) {
        //     boneName = dagonBonesName + "_ske";
        // }
        // if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
        //     let servantIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
        //     servantIcon.scaleY = 0.95;
        //     servantIcon.scaleX = 0.95;
        //     servantIcon.x = 250;
        //     servantIcon.y = 770;
        //     node.addChild(servantIcon);
        // }
        // else {
        //     let servantImg = BaseLoadBitmap.create(servantcfg.fullIcon);
        //     servantImg.width = 405;
        //     servantImg.height = 467;
        //     servantImg.setScale(0.9);
        //     servantImg.x = 55;
        //     servantImg.y = 360;
        //     node.addChild(servantImg);
        // }


        node.addChild(bg2);

        let canget:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("joinAcCanGet"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        canget.setPosition(110,750);
        node.addChild(canget);

        let wifestr = LanguageManager.getlocal("skinViewTab2")+"--"+wifecfg.name;
        // let servantstr = LanguageManager.getlocal("itemType8")+"--"+servantcfg.name;
        let wifeget = ComponentManager.getTextField(wifestr,TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        wifeget.setPosition(180,780);
        node.addChild(wifeget);

        // let servantget = ComponentManager.getTextField(servantstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // servantget.setPosition(180,wifeget.y+25);
        // node.addChild(servantget);

        canget.rotation = 4;
        wifeget.rotation = 4;
        // servantget.rotation = 4;


        let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        closeText.setPosition((GameConfig.stageWidth-closeText.width)/2, GameConfig.stageHeigth - 60);
        this.addChild(closeText);
    }
}