/**
 * author yanyuling
 * @class PalaceEmperorLvupView
 */

class PalaceEmperorLvupView extends BaseView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _curTitleId:string;
    public constructor() {
        super();
	}

	// 标题背景名称
	protected getTitleStr():string
	{
		return "";
	}
	public initView():void
	{
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        this._curTitleId = this.param.data.titleId;

        let roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId);
		let titlecfg = Config.TitleCfg.getTitleCfgById(this._curTitleId);

        let nameBg = BaseBitmap.create("palace_titlebg3");
		nameBg.x = GameConfig.stageWidth/2 -  nameBg.width/2 ;
		nameBg.y = 30;// GameConfig.stageHeigth -  110;
        this._nodeContainer.addChild(nameBg);

		let titlepath = Config.TitleCfg.getTitleIcon3WithLv(this._curTitleId,roleinfo?roleinfo.titlelv:null);
        let officerImg = BaseLoadBitmap.create(titlepath);
        let deltaV = 0.8;
        officerImg.width = 186 * deltaV;
        officerImg.height = 42 * deltaV;
        officerImg.x =  nameBg.x + nameBg.width/2 - officerImg.width/2;
        officerImg.y = nameBg.y + nameBg.height/2 - officerImg.height/2;
        this._nodeContainer.addChild(officerImg);

		let roleNode: BaseDisplayObjectContainer|BaseLoadDragonBones = undefined;
		if( (Config.TitleCfg.isTheKingTitleId(this._curTitleId) && roleinfo.uid != "")|| (roleinfo instanceof PalaceRoleInfoVo && roleinfo.uid > 0) )
		{
			let resPath = "palace_db_" + this._curTitleId;
            let _loadNum = 0;
            let _maxLoadNum = 2;
			if( App.DeviceUtil.CheckWebglRenderMode() && ResourceManager.hasRes(resPath + "_ske")){
                let myHead:BaseLoadBitmap = undefined;
				let loadComplete=function(container:BaseDisplayObjectContainer):void
				{
                    _loadNum ++;
					if(_loadNum == _maxLoadNum){
						if(roleNode){
							roleNode.visible = true;
						}
                        if(myHead){
							myHead.visible = true;
						}
					}	
				}
				roleNode = App.DragonBonesUtil.getLoadDragonBones(resPath,0,"idle",loadComplete,this);
				roleNode.setScale(1.4);
				roleNode.y = nameBg.y + 140;
                this._nodeContainer.addChild(roleNode);
				let rect1:egret.Rectangle=egret.Rectangle.create();
				rect1.setTo(0,0,136,143);
				myHead = BaseLoadBitmap.create("user_head" + roleinfo.pic,rect1,{callback:loadComplete,callbackThisObj:this});
				myHead.visible=false;
				myHead.width = 136*0.92;
				myHead.height = 143*0.92;
				myHead.name = "myHead";
				myHead.visible = false;
				myHead.x = GameConfig.stageWidth/2 - myHead.width/2;
				myHead.y = roleNode.y - 37+6;
                this._nodeContainer.addChild(myHead);
				roleNode.x = GameConfig.stageWidth/2 ;
			}else
			{
				roleNode = Api.playerVoApi.getPlayerPortrait(Number(roleinfo.titleId),roleinfo.pic );
                this._nodeContainer.addChild(roleNode);
				if(Config.TitleCfg.isTheKingTitleId(this._curTitleId) ){
					let rect12:egret.Rectangle=egret.Rectangle.create();
					rect12.setTo(0,0,712,668);
					let myBody = <BaseLoadBitmap>roleNode.getChildByName("myBody");
					myBody.setload("user_body_full_3201_2",rect12);
					myBody.width =712;
					myBody.height = 668;
					myBody.visible=true;
					let myHead =  <BaseLoadBitmap>roleNode.getChildByName("myHead");
					myHead.setScale(0.92)
					myHead.x = 356-70 + 4;
					myHead.y = 10;
					myHead.visible = true;
				}
				roleNode.y = nameBg.y + 83;
				roleNode.x = GameConfig.stageWidth/2 - 185;

				if( (Number(this._curTitleId) >= 3101 && Number(this._curTitleId)  <= 3108)){
					// roleNode.x =  GameConfig.stageWidth/2 - roleNode.width/2+165;
					roleNode.x = GameConfig.stageWidth/2 - 185;
				}else{
					roleNode.x = GameConfig.stageWidth/2 - roleNode.width/2;
				}
			}
			roleNode.name = "roleNode";
			
        }

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"sysConfirm",this.hide,this);
		confirmBtn.x = GameConfig.stageWidth/2 - confirmBtn.width/2;
		confirmBtn.y = GameConfig.stageHeigth - this.container.y - confirmBtn.height - 20; 
		this._nodeContainer.addChild(confirmBtn);

		let palace_titlebg7 = BaseBitmap.create("palace_titlebg5");
		palace_titlebg7.x = GameConfig.stageWidth/2 - palace_titlebg7.width/2;
		palace_titlebg7.y = confirmBtn.y - palace_titlebg7.height - 10;
        this._nodeContainer.addChild(palace_titlebg7);

		let palace_title_txt2 = BaseBitmap.create("palace_title_txt3");
		palace_title_txt2.x = GameConfig.stageWidth/2 - palace_title_txt2.width/2;
		palace_title_txt2.y = palace_titlebg7.y + 30;
        this._nodeContainer.addChild(palace_title_txt2);

		let palace_title_txt3 = BaseBitmap.create("palace_title_txt1");
		palace_title_txt3.x = GameConfig.stageWidth/2 - palace_title_txt2.width/2 -30;
		palace_title_txt3.y = palace_title_txt2.y + palace_title_txt2.height - 5;
        this._nodeContainer.addChild(palace_title_txt3);

		let str1 = LanguageManager.getlocal("palace_titleName"+this.param.data.titleId);
		let txt = ComponentManager.getTextField(str1,30,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt.x = palace_title_txt3.x - txt.width - 5;
		txt.y = palace_title_txt3.y +15 ;
		this._nodeContainer.addChild(txt);

		let titleinfo =  Api.itemVoApi.getTitleInfoVoById(Number(this._curTitleId));
		let lv = titleinfo.lv;
		let txt2 = ComponentManager.getTextField(""+lv,30,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt2.x = palace_title_txt3.x + palace_title_txt3.width - 80 - txt2.width/2;
		txt2.y = txt.y ;
		this._nodeContainer.addChild(txt2);

		if( PlatformManager.checkIsViSp()){
			txt.y += 5;
			palace_title_txt3.x =  GameConfig.stageWidth/2 - palace_title_txt2.width/2 + 50;
			txt.x = palace_title_txt3.x - txt.width - 5;
			txt2.size = 40;
			txt2.x = palace_title_txt3.x + palace_title_txt3.width + 5;
		}else if( PlatformManager.checkIsJPSp()){
			txt.y += 5;
			palace_title_txt3.x =  GameConfig.stageWidth/2 - palace_title_txt2.width/2 + 70;
			txt.x = palace_title_txt3.x - txt.width - 5;
			txt2.size = 40;
			txt2.x = palace_title_txt3.x  + 105;
		}else if( PlatformManager.checkIsKRSp()||PlatformManager.checkIsKRNewSp()){
			txt.y += 5;
			palace_title_txt3.x = palace_title_txt2.x+100;
			txt.x = palace_title_txt3.x - txt.width - 5;
			txt2.size = 40;
			txt2.x = palace_title_txt3.x  + 65;
		}
		this.addTouchTap(this.hide,this);
    }
	protected getRequestData():{requestType:string,requestData:any}
	{ 
        if( !Api.palaceVoApi.isDataInit() || !Api.palaceVoApi.getRoleInfoByTitleId(this.param.data.titleId)){
            return {requestType:NetRequestConst.REQUEST_PALACE_GETCROSSPALACE,requestData:{}};
        }
	}
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"palace_title_txt1",
			"palace_title_txt2",
			"palace_title_txt3",
			"palace_titlebg3",
			"palace_titlebg5",
        ]);
	}

	public dispose():void
	{
        this._nodeContainer = null;
        this._curTitleId = null;

		super.dispose();
	}
}