/**
 * author:qianjun
 * desc:定军中原城市抢夺
*/
class AcConquerMainLandFirstShowView extends CommonView{



	public constructor(){
		super();
	}
	
	private getUiCode():string{
        let code = '';
        switch(Number(this.code)){
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
	
	private get cfg() : Config.AcCfg.ConquerMainLandCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcConquerMainLandVo{
        return <AcConquerMainLandVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return AcConst.AID_CONQUERMAINLAND;
	}

	private get acTivityId() : string{
        return `${this.param.data.aid}-${this.code}`;
	}

	protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
            `mainland_show_title-${code}`,
            `mainland_show_tip-${code}`,
            `mainland_show_bg-${code}`
		]);
    }
    

    protected getTitleBgName():string{
        return ''
    }
    protected getTitleStr():string{
        return ''
    }
    protected getCloseBtnName():string{
        return ''
    }
    protected isTouchMaskClose():boolean{
        return true;
    }

    protected getBgName():string{
        return '';
    }


	public initView():void{

        let code = this.code;
        let bg = BaseBitmap.create("public_9_black");
        let titleId = this.cfg.mainReward;
        //titleId = 3106;
        bg.alpha = 0.8;
        bg.width = GameConfig.stageWidth;
        bg.height =GameConfig.stageHeigth;
        this.addChild(bg);

        let huobg = BaseBitmap.create(`mainland_show_bg-${code}`)
        huobg.y = bg.height/2 - huobg.height/2;
        this.addChild(huobg);

        let title = BaseBitmap.create(`mainland_show_title-${code}`)
        title.setPosition(bg.x + bg.width/2 - title.width/2,huobg.y + 20);
        this.addChild(title);

        let titleStr = Config.TitleCfg.getTitleIcon3WithLv(titleId);
        let officerImg = BaseLoadBitmap.create(titleStr);
        officerImg.width = 186;
        officerImg.height = 42;
        officerImg.setPosition(title.x - 10 ,title.y + title.height + 30);
        this.addChild(officerImg);

        let roleNode: BaseDisplayObjectContainer|BaseLoadDragonBones = undefined;

        let resPath = "palace_db_" + titleId;
        if(App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske"))
        {
            roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath,0,"idle");
            roleNode.y = huobg.y + 240;
            this.addChild(roleNode);
            roleNode.setScale(1.1);
            
            let myHead = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPath());
            myHead.name = "myHead";
            myHead.setScale(0.75);
            this.addChild(myHead);

            roleNode.x = this.width/2 - roleNode.width/2;
            myHead.setPosition(roleNode.x - 47,roleNode.y - 34);
        }else{
            roleNode = Api.playerVoApi.getPlayerPortrait(titleId,1 );
            roleNode.setScale(0.8);
            roleNode.x = 170;
            roleNode.y = huobg.y + 170;
            this.addChild(roleNode);

        }

        let tip = BaseBitmap.create(`mainland_show_tip-${code}`)
        tip.setPosition(bg.x + bg.width/2 - tip.width/2,huobg.y + huobg.height - tip.height + 10);
        this.addChild(tip);



    }



	public dispose():void{
		super.dispose();
	}
}