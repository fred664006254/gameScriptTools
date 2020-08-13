/**
 * 明君出巡 动画展示
 * date 2019.12.14
 * author ycg
 * @calss EmperorOutFirstAniView
 */
class EmperorOutFirstAniView extends BaseView{
    private _showData:any = null;

    public constructor(){
        super();
    }

    protected getRequestData():{requestType:string,requestData:any}
	{	
        // this.request(NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO, {fuid: this.param.data.uid});
        return {requestType:NetRequestConst.REQUEST_EMPERORACHIEVE_SHOW_NOTICE, requestData:null};
	}

	protected receiveData(data:{ret:boolean, data:any}):void
	{
        if(data && data.ret)
        { 
            if (data.data.cmd == NetRequestConst.REQUEST_EMPERORACHIEVE_SHOW_NOTICE){
                Api.emperorAchieveVoApi.setShowAni(true);
            }
            else if (data.data.cmd == NetRequestConst.REQUEST_EMPERORACHIEVE_GETOUTING_INFO){
                this._showData = Api.emperorAchieveVoApi.getOutDataByuid(this.param.data.uid);
            }
        } 
	}

    public initView():void{
		App.LogUtil.log("EmperorOutFirstAniView initview");
		this._showData = Api.emperorAchieveVoApi.getOutDataByuid(this.param.data.uid);
        let title = BaseBitmap.create("emperorout_showani_titlebg"); //122
        title.setPosition(GameConfig.stageWidth/2 - title.width/2 + 30, 20);
        
		let role = this.getRoleContainer(this._showData, 1.4);
		role.setPosition(-20, title.y + title.height + 10);
		this.addChildToContainer(role);
		role.visible = false;

		let scrollAni = ComponentManager.getCustomMovieClip("emeprorout_showani_effect", 12, 70); //282
		scrollAni.setPosition(10, role.y + role.height - 282 + 30);
		if (scrollAni.y + 282 - 50 > GameConfig.stageHeigth){
			App.LogUtil.log("max********");
			scrollAni.y = GameConfig.stageHeigth - 282 - 30;
		}
		else{
			let offY = GameConfig.stageHeigth - scrollAni.y - 282;
			if (offY > 50){
				title.y = title.y + offY /2;
				role.y = title.y + title.height + 10;
				scrollAni.y = scrollAni.y + offY/2;
			}
		}
        this.addChildToContainer(scrollAni);
		scrollAni.playWithTime(1);
		this.addChildToContainer(title);

		let tip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutFirstAniViewTip", [this._showData.data.name]), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_BLACK);
        tip.lineSpacing = 8;
        tip.textAlign = TextFieldConst.ALIGH_CENTER;
        tip.anchorOffsetX = tip.width/2;
        tip.setPosition(GameConfig.stageWidth/2, scrollAni.y + 141 - tip.height/2);
        this.addChildToContainer(tip);
        tip.visible = false;

        let view = this;
        scrollAni.setEndCallBack(()=>{
			App.LogUtil.log("aaaa firstani");
			tip.visible = true;
			role.visible = true;
			this._maskBmp.addTouchTap(view.hide, view);
            egret.Tween.get(view).wait(3000).call(()=>{
                view.hide();
            }, view);
        }, view);   
    }

    public getRoleContainer(roleData:any, roleScale:number):BaseDisplayObjectContainer{
		let data = roleData.data;
        let titleData = App.CommonUtil.getTitleData(data.title);
        let curLevel = titleData.clv;
        let titleCfg = Config.TitleCfg;
		let titleconfig = null;
		let curTitleId = null;
        if (titleData.clothes){
			titleconfig = titleCfg.getTitleCfgById(titleData.clothes);
			curTitleId = titleData.clothes;
        }
        
		if(titleconfig && titleconfig.isTitle == 1 && (titleconfig.titleType == 1 || titleconfig.titleType == 2 || titleconfig.titleType == 7) ){
            curTitleId = titleData.clothes;
            curLevel = titleData.tlv;
			if(curLevel == 0){
				curLevel = 1;
			}
        }
		let userContainer:BaseDisplayObjectContainer = null;
		App.LogUtil.log("EmperorOutFirstAniView:curTitleId "+curTitleId);
		if(curTitleId){

			// userContainer.x = posX;
			// userContainer.y = 20;
			userContainer = new BaseDisplayObjectContainer();
			userContainer.name = "userContainer";
			this.addChildToContainer(userContainer);

			let role = null;
			let tcfg = Config.TitleCfg.getTitleCfgById(curTitleId);
			let resPath = "palace_db_" + curTitleId + (tcfg.titleType == 7 ? `_${Api.playerVoApi.getUserSex(data.pic)}` : ``);
			if((!Api.switchVoApi.checkCloseBone()) && App.CommonUtil.check_dragon() && ResourceManager.hasRes(resPath + "_ske")){
				App.LogUtil.log("aaa dragonbone ");
				role = App.CommonUtil.getPlayerDragonRole(curTitleId, data.pic, curLevel);
				role.x = 340; //w432, h508
				role.y = 35;
				userContainer.addChild(role);
				role.name = 'role';
				userContainer.height = 790;
			}else{
				role = Api.playerVoApi.getPlayerPortrait(Number(curTitleId), data.pic);
				role.y = -30;
				let isnew = Api.playerVoApi.getNewPalaceRole(curTitleId);
				if (isnew){
					role.x = 0;
				}
				else{
					role.x = 155;
				}
				userContainer.addChild(role);
				userContainer.height = 765;
			}
		}else{
			userContainer = new BaseDisplayObjectContainer();
			let role = Api.playerVoApi.getPlayerPortrait(Number(data.level), data.pic,0,false,null,null,curLevel);
			role.width = 300;
			role.y = -30;
			role.x = 190;
			userContainer.name = "userContainer";
			userContainer.addChild(role);
			userContainer.height = 765;
		}

        return userContainer;
    }

    protected getTitleStr():string{
        return null;
    }

    protected getTitleBgName():string{
        return "";
    }

    protected getBgName():string{
        return "";
	}
	
	// protected getShowWidth():number{
	// 	return GameConfig.stageWidth;
	// }

	// protected getShowHeight():number{
	// 	return GameConfig.stageHeigth;
	// }

    protected isHideTitleBgShadow():boolean{
        return true;
    }

    protected getRuleInfo():string{
        return "";
    }

    protected getCloseBtnName():string{
        return null;
    }

    public getResourceList():string[]{
        return super.getResourceList().concat([
            "emperorout_showani_titlebg", "emeprorout_showani_effect",
        ]);
    }

    public dispose():void{
        this._showData = null;

        super.dispose();
    }
}